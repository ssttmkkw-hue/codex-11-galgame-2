import { portrait } from './art.js';
import { advance, choose, clock, currentLine, newNight, storyScene, visit, waitForDawn, walk } from './game.js';
import { NightMusic } from './music.js';
import { DAWN, START, districts, endings, heroines } from './story.js';
import { loadGallery, loadSettings, loadSlot, saveGallery, saveSettings, saveSlot } from './storage.js';
import { escapeHTML, icon, mapView, photo, resultsView, sceneView, titleView } from './ui.js';

const app = document.querySelector('#app');
const panel = document.querySelector('#panel');
const notification = document.querySelector('#notice');
const music = new NightMusic();
const settings = loadSettings();
const gallery = loadGallery();
let state = null;
let isTitle = true;
let selected = 'shibuya';
let mode = null;
let typing = null;
let readTimer;
let noticeTimer;
let panelTrigger;
let galleryPreview = null;

function soundCue() {
  if (galleryPreview) {
    const { id, type } = galleryPreview;
    const ending = type === 'ending' ? endings[id] : null;
    music.setCue({
      district: ending ? memoryDistrict(id) : heroines[id].district,
      time: ending ? DAWN : START,
      character: ending ? ending.character : id,
      affection: 9,
      mood: ending ? 'ending' : 'scene',
      ending: ending ? id : null,
    });
    return;
  }
  const scene = state && !isTitle ? storyScene(state) : null;
  const character = scene?.character ?? null;
  music.setCue({
    district: isTitle ? 'shibuya' : state.district,
    time: isTitle ? START : state.time,
    character,
    affection: character ? state.bonds[character].affection : 0,
    mood: isTitle ? 'title' : state.ending ? 'ending' : state.phase,
    ending: isTitle ? null : state.ending,
  });
}

function applyVolume() {
  music.volume(settings.muted && !galleryPreview ? 0 : settings.volume / 100);
}

function stopPreview() {
  if (!galleryPreview) return;
  galleryPreview = null;
  applyVolume();
  soundCue();
}

function notify(text) {
  clearTimeout(noticeTimer);
  notification.textContent = text;
  notification.classList.add('visible');
  noticeTimer = window.setTimeout(() => notification.classList.remove('visible'), 2600);
}

function pause() {
  clearTimeout(readTimer);
  if (typing) {
    cancelAnimationFrame(typing.frame);
    typing.node.textContent = typing.text;
    typing = null;
  }
}

function scheduleRead() {
  clearTimeout(readTimer);
  if (!mode || isTitle || panel.open || state.phase !== 'scene' || !currentLine(state)) return;
  const length = currentLine(state).text.length;
  const delay = mode === 'skip' ? 70 : settings.auto * 1000 + Math.min(1600, length * 20);
  readTimer = window.setTimeout(() => transition(advance(state)), delay);
}

function writeLine({ instant = false } = {}) {
  const text = currentLine(state)?.text;
  const node = app.querySelector('.story-text [aria-hidden]');
  if (!text || !node) return;
  if (instant || mode === 'skip' || settings.speed === 0 || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    node.textContent = text;
    scheduleRead();
    return;
  }
  const characters = Array.from(text);
  const started = performance.now();
  const tick = (now) => {
    const count = Math.max(1, Math.floor((now - started) / settings.speed));
    node.textContent = characters.slice(0, count).join('');
    if (count >= characters.length) {
      typing = null;
      scheduleRead();
    } else {
      typing.frame = requestAnimationFrame(tick);
    }
  };
  typing = { text, node, frame: requestAnimationFrame(tick) };
}

function render({ instant = false, focus = false } = {}) {
  const active = document.activeElement;
  const restore = app.contains(active) && active instanceof HTMLButtonElement ? active.dataset : null;
  pause();
  document.body.dataset.screen = isTitle ? 'title' : state.phase;
  if (isTitle) {
    const hasSave = ['auto', 'slot1', 'slot2', 'slot3'].some(loadSlot);
    app.innerHTML = titleView(hasSave, settings.muted);
  } else if (state.phase === 'scene') {
    app.innerHTML = sceneView(state, mode, settings.muted);
    writeLine({ instant });
  } else {
    app.innerHTML = state.phase === 'map' ? mapView(state, selected, settings.muted) : resultsView(state, settings.muted);
  }
  if (!panel.open) {
    const matches = restore ? [...app.querySelectorAll('button[data-action]')].filter((button) =>
      button.dataset.action === restore.action && button.dataset.id === restore.id && !button.disabled) : [];
    const match = matches.find((button) => button.className === active.className) ?? matches[0];
    if (match) match.focus({ preventScroll: true });
    else if (focus) {
      const target = app.querySelector('.choice:not([disabled]), .next-line') ?? app.querySelector('main h1');
      target?.focus({ preventScroll: true });
    }
  }
  soundCue();
}

function transition(next, instant = false) {
  if (next === state) return;
  const phase = state?.phase;
  const district = state?.district;
  state = next;
  isTitle = false;
  if (state.phase !== 'scene' || !currentLine(state)) mode = null;
  if (phase !== state.phase || district !== state.district) selected = state.district;

  const character = storyScene(state)?.character;
  if (character && !gallery.seen.includes(character)) {
    gallery.seen.push(character);
    saveGallery(gallery);
  }
  if (state.phase === 'results' && !gallery.locations[state.ending]) {
    if (!gallery.unlocked.includes(state.ending)) gallery.unlocked.push(state.ending);
    gallery.locations[state.ending] = state.district;
    if (!saveGallery(gallery)) notify('浏览器无法保存画廊进度。');
  }
  saveSlot('auto', state);
  render({ instant, focus: true });
  if (phase !== state.phase) window.scrollTo(0, 0);
}

function home() {
  isTitle = true;
  mode = null;
  render();
  window.scrollTo(0, 0);
  app.querySelector('[data-action="start"]')?.focus({ preventScroll: true });
}

function showPanel(title, content, keepPreview = false) {
  pause();
  if (!keepPreview) stopPreview();
  if (!panel.open) panelTrigger = document.activeElement;
  panel.innerHTML = `<header class="panel-header"><h2 id="panel-title">${title}</h2><button class="quiet close" data-action="close" aria-label="关闭">${icon('x')}</button></header><div class="panel-body">${content}</div>`;
  if (!panel.open) panel.showModal();
  panel.querySelector('.close').focus({ preventScroll: true });
}

function closePanel(restoreFocus = true) {
  if (!panel.open) return;
  panel.close();
  stopPreview();
  scheduleRead();
  if (restoreFocus && panelTrigger?.isConnected) panelTrigger.focus({ preventScroll: true });
}

function slots(canSave) {
  const caption = ({ state }) => `${clock(state.time)} · ${districts[state.district].name} · ${storyScene(state)?.title ?? '夜行地图'}`;
  const html = [['auto', '自动存档'], ['slot1', '存档 01'], ['slot2', '存档 02'], ['slot3', '存档 03']].map(([id, label]) => {
    const slot = loadSlot(id);
    const date = slot ? new Date(slot.date).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : '';
    return `<div class="slot">
      <div><strong>${label}</strong><p>${slot ? caption(slot) : '空存档'}</p>${date ? `<small>${date}</small>` : ''}</div>
      <div class="slot-actions">
        ${canSave && id !== 'auto' ? `<button class="secondary" data-action="save" data-id="${id}">${slot ? '覆盖' : '保存'}</button>` : ''}
        <button class="secondary" data-action="load" data-id="${id}" ${slot ? '' : 'disabled'}>读取</button>
      </div>
    </div>`;
  }).join('');
  showPanel(canSave ? '存读档' : '读取存档', `<p class="panel-note">夜行会自动存档。手动存档保存在当前浏览器。</p><div class="slots">${html}</div>`);
}

function showSettings() {
  const slider = (label, name, min, max, step, suffix) => `<label class="slider">
    <span>${label}<output for="setting-${name}">${settings[name]}${suffix}</output></span>
    <input id="setting-${name}" type="range" min="${min}" max="${max}" step="${step}" value="${settings[name]}" data-setting="${name}" data-suffix="${suffix}">
  </label>`;
  showPanel('设置', `
    ${slider('音乐音量', 'volume', 0, 100, 1, '%')}
    ${slider('文字速度（0 为立即显示）', 'speed', 0, 50, 1, ' 毫秒/字')}
    ${slider('自动阅读停留时间', 'auto', 1.5, 6, .1, ' 秒')}
    <div class="key-help"><p><kbd>空格</kbd> / <kbd>Enter</kbd> 继续对话</p><p><kbd>A</kbd> 自动 · <kbd>S</kbd> 跳过 · <kbd>L</kbd> 文本记录</p></div>
  `);
}

function showLog() {
  showPanel('文本记录', `<ol class="backlog">${state.log.map((entry) => `<li>
    <span class="log-time">${clock(entry.time)}</span><div><strong>${escapeHTML(entry.speaker)}</strong><p>${escapeHTML(entry.text)}</p></div>
  </li>`).join('')}</ol>`);
  const body = panel.querySelector('.panel-body');
  body.scrollTop = body.scrollHeight;
}

function showGallery() {
  const endingsList = Object.entries(endings).map(([id, ending]) => {
    const unlocked = gallery.unlocked.includes(id);
    return `<button class="memory ${unlocked ? '' : 'locked'}" data-action="memory" data-id="${id}" ${unlocked ? '' : 'disabled'}
      ${unlocked ? `style="--scene: url('${photo(memoryDistrict(id))}')"` : ''}>
      <span>${unlocked ? icon('gallery') : icon('lock')}</span><strong>${unlocked ? ending.title : '尚未解锁'}</strong>
    </button>`;
  }).join('');
  const faces = Object.entries(heroines).map(([id, person]) => {
    const seen = gallery.seen.includes(id);
    return `<button class="gallery-person" data-action="person" data-id="${id}" ${seen ? '' : 'disabled'} style="--person: ${seen ? person.color : 'var(--muted)'}">
      ${seen ? portrait(id, 'neutral') : icon('lock')}<span>${seen ? person.name : '尚未相遇'}</span>
    </button>`;
  }).join('');
  showPanel('回忆画廊', `<h3 class="panel-subhead">始发的故事 <span>${gallery.unlocked.length} / ${Object.keys(endings).length}</span></h3>
    <div class="memory-grid">${endingsList}</div><h3 class="panel-subhead people-heading">夜里遇见的人 <span>${gallery.seen.length} / ${Object.keys(heroines).length}</span></h3><div class="people-grid">${faces}</div>`);
}

function memoryDistrict(id) {
  return endings[id].district ?? gallery.locations[id] ?? 'shibuya';
}

function previewButton(id, type, label) {
  const playing = galleryPreview?.id === id && galleryPreview.type === type;
  return `<button class="secondary" data-action="preview" data-id="${id}" data-type="${type}" aria-pressed="${playing}">${icon('music')} ${label}</button>`;
}

function showPerson(id, variant = 0) {
  if (!gallery.seen.includes(id)) return;
  const person = heroines[id];
  const looks = [
    ['日常', 'neutral', 'still', false], ['笑容', 'smile', 'still', false], ['惊讶', 'surprise', 'offer', false],
    ['沉思', 'sad', 'crossed', true], ['专注', 'resolve', 'hold', true], ['打趣', 'wry', 'crossed', true],
    ['害羞', 'shy', 'hold', true], ['温柔', 'tender', 'hold', true], ['放声笑', 'laugh', 'wave', true],
  ];
  const [, expression, pose, warm] = looks[variant];
  showPanel(person.name, `<div class="person-preview" style="--person: ${person.color}; --scene: url('${photo(person.district)}')">${portrait(id, expression, pose, warm)}</div>
    <div class="person-content"><p lang="ja">${person.kana}</p><p><strong>${person.role}</strong> · ${person.bio}</p></div>
    <div class="look-list">${looks.map(([label], i) => `<button class="secondary" data-action="look" data-id="${id}" data-variant="${i}" aria-pressed="${i === variant}">${label}</button>`).join('')}</div>
    <div class="memory-controls"><button class="quiet" data-action="gallery">${icon('back')} 返回画廊</button>
      ${previewButton(id, 'person', '聆听角色旋律')}</div>`, galleryPreview?.type === 'person' && galleryPreview.id === id);
}

function showMemory(id) {
  if (!gallery.unlocked.includes(id)) return;
  const ending = endings[id];
  showPanel(ending.title, `<div class="memory-preview" style="--scene: url('${photo(memoryDistrict(id))}')">${ending.character ? portrait(ending.character, 'tender', 'hold', true) : ''}</div>
    <p class="memory-ja" lang="ja">${ending.ja}</p>
    <div class="memory-controls"><button class="quiet" data-action="gallery">${icon('back')} 返回画廊</button>
      ${previewButton(id, 'ending', '聆听结尾曲')}</div>`);
}

function showDistrict(id) {
  const district = districts[id];
  showPanel(district.name, `<div class="district-preview" style="--scene: url('${photo(id)}')"></div><p class="memory-ja" lang="ja">${district.ja} · ${district.note}</p>
    <button class="secondary" data-action="start">开始夜行 ${icon('arrow')}</button>`);
}

function start() {
  if (loadSlot('auto')) {
    showPanel('开始新的夜行', `<p class="panel-note">开始后将覆盖自动存档。手动存档会保留。</p><button class="primary" data-action="new-night">开始新的一夜 ${icon('arrow')}</button>`);
    return;
  }
  resetNight();
}

function resetNight() {
  closePanel(false);
  mode = null;
  selected = 'shibuya';
  transition(newNight());
}

function toggleMode(nextMode) {
  if (isTitle || state.phase !== 'scene' || !currentLine(state)) return;
  mode = mode === nextMode ? null : nextMode;
  for (const id of ['auto', 'skip']) app.querySelector(`[data-action="${id}"]`).setAttribute('aria-pressed', String(mode === id));
  if (mode === 'skip') pause();
  if (!typing) scheduleRead();
}

function handleAdvance() {
  if (typing) {
    pause();
    scheduleRead();
    return;
  }
  transition(advance(state));
}

const actions = {
  start,
  'new-night': resetNight,
  home,
  choose: (id) => transition(choose(state, Number(id))),
  advance: handleAdvance,
  select: (id) => { selected = id; render(); },
  visit: () => transition(visit(state)),
  walk: (id) => transition(walk(state, id)),
  wait: (id) => transition(waitForDawn(state, id)),
  auto: () => toggleMode('auto'),
  skip: () => toggleMode('skip'),
  log: showLog,
  gallery: showGallery,
  memory: showMemory,
  district: showDistrict,
  person: (id) => showPerson(id),
  look: (id, button) => {
    showPerson(id, Number(button.dataset.variant));
    panel.querySelector('.look-list [aria-pressed="true"]')?.focus({ preventScroll: true });
  },
  preview: (id, button) => {
    if (button.getAttribute('aria-pressed') === 'true') {
      button.setAttribute('aria-pressed', 'false');
      stopPreview();
      return;
    }
    if (settings.volume === 0) {
      notify('音乐音量为零。可以在设置中调高音量。');
      return;
    }
    galleryPreview = { id, type: button.dataset.type };
    applyVolume();
    soundCue();
    button.setAttribute('aria-pressed', 'true');
  },
  settings: showSettings,
  sound: () => {
    settings.muted = !settings.muted;
    applyVolume();
    saveSettings(settings);
    render({ instant: true });
  },
  close: () => closePanel(),
  'load-menu': () => slots(false),
  'save-menu': () => slots(true),
  save: (id) => {
    if (!saveSlot(id, state)) {
      notify('保存失败。请检查浏览器的本地存储设置。');
      return;
    }
    slots(true);
    panel.querySelector(`[data-action="save"][data-id="${id}"]`)?.focus();
    notify('已保存夜行。');
  },
  load: (id) => {
    const slot = loadSlot(id);
    if (!slot) return;
    closePanel(false);
    mode = null;
    selected = slot.state.district;
    transition(slot.state, true);
    window.scrollTo(0, 0);
    notify('已读取存档。');
  },
};

document.addEventListener('click', (event) => {
  if (event.target === panel) {
    const bounds = panel.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closePanel();
    return;
  }
  const button = event.target.closest('[data-action]');
  if (!button || button.disabled) return;
  const action = button.dataset.action;
  if (action === 'preview' || (action === 'sound' && settings.muted)) {
    music.start().then((started) => {
      if (!started) notify('浏览器未能开启声音。');
    });
  } else if (!settings.muted && action !== 'sound') music.start();
  actions[action]?.(button.dataset.id, button);
});

document.addEventListener('keydown', (event) => {
  if (panel.open || event.repeat || event.ctrlKey || event.altKey || event.metaKey || isTitle) return;
  if (!settings.muted) music.start();
  if (event.code === 'KeyL') showLog();
  if (state.phase !== 'scene') return;
  if (event.code === 'KeyA') toggleMode('auto');
  if (event.code === 'KeyS') toggleMode('skip');
  if (['Space', 'Enter'].includes(event.code) && !(document.activeElement instanceof HTMLButtonElement) && currentLine(state)) {
    event.preventDefault();
    handleAdvance();
  }
});

panel.addEventListener('cancel', (event) => {
  event.preventDefault();
  closePanel();
});

panel.addEventListener('input', (event) => {
  const input = event.target;
  if (!input.dataset.setting) return;
  settings[input.dataset.setting] = Number(input.value);
  input.closest('label').querySelector('output').value = `${input.value}${input.dataset.suffix}`;
  applyVolume();
  saveSettings(settings);
});

applyVolume();
render();
