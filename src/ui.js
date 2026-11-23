import { portrait } from './art.js';
import { availableScene, clock, currentChoices, currentLine, dawnOptions, storyScene, walkingTime } from './game.js';
import { DAWN, START, districts, endings, heroines } from './story.js';

const paths = {
  train: '<rect x="5" y="3" width="14" height="16" rx="3"/><path d="M5 12h14M9 19l-3 3m9-3 3 3M9 15h.01m6 0h.01"/>',
  arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  back: '<path d="m14 6-6 6 6 6"/>',
  next: '<path d="m9 6 6 6-6 6"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M9 3h6l.7 3 2.5 1.4 2.9-.9 3 5.2-2.2 2.1v2.8l2.2 2.1-3 5.2-2.9-.9-2.5 1.4-.7 3H9l-.7-3-2.5-1.4-2.9.9-3-5.2 2.2-2.1v-2.8l-2.2-2.1 3-5.2 2.9.9 2.5-1.4z" transform="translate(2.5 .8) scale(.79)"/>',
  sound: '<path d="M3 9v6h4l5 4V5L7 9zm13 0a4 4 0 0 1 0 6m2-9a8 8 0 0 1 0 12"/>',
  mute: '<path d="M3 9v6h4l5 4V5L7 9zm13 1 5 5m-5 0 5-5"/>',
  gallery: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="9" r="1.6"/><path d="m21 16-5-5-8 9"/>',
  pin: '<path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0z"/><circle cx="12" cy="10" r="2"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  book: '<path d="M4 4h6c2 0 2 2 2 2s0-2 2-2h6v15h-6c-2 0-2 2-2 2s0-2-2-2H4zm8 2v15"/>',
  save: '<path d="M4 4h13l3 3v13H4zM8 4v6h8V4M8 20v-6h8v6"/>',
  play: '<path d="m8 5 12 7-12 7z"/>',
  skip: '<path d="m4 6 8 6-8 6zm8 0 8 6-8 6z"/>',
  x: '<path d="m6 6 12 12M18 6 6 18"/>',
  lock: '<rect x="6" y="10" width="12" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v2"/>',
  music: '<path d="M9 17V6l11-3v11M9 9l11-3"/><ellipse cx="6" cy="17" rx="3" ry="2"/><ellipse cx="17" cy="14" rx="3" ry="2"/>',
};

export const icon = (id) => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[id]}</svg>`;

export const escapeHTML = (text) => String(text).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
export const photo = (district) => `./assets/${district}.webp`;

function soundButton(muted) {
  return `<button class="quiet sound-toggle" data-action="sound" aria-pressed="${!muted}" aria-label="音乐">${icon(muted ? 'mute' : 'sound')}<span>${muted ? '静音' : '声音'}</span></button>`;
}

function brand(interactive) {
  const content = `<span class="brand-mark">${icon('train')}</span><span>东京夜行线 <small>TOKYO NIGHT LINE</small></span>`;
  return interactive ? `<button class="brand" data-action="home" aria-label="回到标题">${content}</button>` : `<div class="brand">${content}</div>`;
}

export function titleView(hasAuto, muted) {
  return `<main class="title-screen">
    <header class="title-bar">
      ${brand(false)}
      <nav aria-label="主菜单">${soundButton(muted)}<button class="quiet" data-action="settings">${icon('settings')}<span>设置</span></button></nav>
    </header>
    <section class="hero" style="--scene: url('${photo('shibuya')}')">
      <div class="hero-inner">
        <div class="hero-copy">
          <p class="hero-context"><span></span> 东京 · 末班车已离站</p>
          <h1 lang="ja">終電のあと、<br><em>始発まで。</em></h1>
          <p class="title-translation">终电之后，始发之前</p>
          <p class="hero-description">在涩谷错过了末班车。<br>距离始发还有四小时二十分。今晚，你想往哪里走？</p>
          <div class="title-actions">
            ${hasAuto ? `<button class="primary" data-action="load" data-id="auto">继续夜行 ${icon('arrow')}</button>` : ''}
            <button class="${hasAuto ? 'secondary' : 'primary'}" data-action="start"><span>${hasAuto ? '开始新的一夜' : '开始夜行'}</span>${icon('arrow')}</button>
            <button class="quiet" data-action="load-menu">${icon('save')}<span>读取存档</span></button>
            <button class="quiet title-gallery" data-action="gallery">${icon('gallery')}<span>回忆画廊</span></button>
          </div>
        </div>
        <div class="hero-ticket" aria-label="夜间时刻表，始发 04:50">
          <span class="ticket-kicker">${icon('clock')} 夜间时刻表</span>
          <strong>00:30</strong>
          <span class="ticket-line"><i></i><i></i></span>
          <span class="ticket-end"><span>始发 / FIRST TRAIN</span><b>04:50</b></span>
        </div>
      </div>
    </section>
    <section class="destinations" aria-labelledby="destinations-heading">
      <div class="section-heading"><h2 id="destinations-heading">${icon('pin')} 夜行地图</h2><span>五处停靠点 <i></i> 步行</span></div>
      <div class="destination-grid">
        ${Object.entries(districts).map(([id, district]) => `<button class="destination-card" data-action="district" data-id="${id}" style="--district: ${district.color}; --scene: url('${photo(id)}')">
          <span><small>${district.en}</small><strong>${district.name}</strong></span>${icon('next')}
        </button>`).join('')}
      </div>
    </section>
  </main>`;
}

function hud(state, muted) {
  const district = districts[state.district];
  return `<header class="game-bar">
    ${brand(true)}
    <div class="game-location"><span>${icon('pin')}</span><div><strong>${district.name}</strong><small lang="ja">${district.ja}</small></div></div>
    <div class="game-time"><div><strong>${clock(state.time)}</strong><small>始发 / 04:50</small></div>
      <progress aria-label="夜间进度" max="${DAWN - START}" value="${state.time - START}"></progress>
    </div>
    <nav aria-label="声音与设置">${soundButton(muted)}<button class="quiet game-settings" data-action="settings" aria-label="设置">${icon('settings')}</button></nav>
  </header>`;
}

function scenePortrait(state, scene, current) {
  if (!scene.character) return '';
  const lines = state.reply === null ? scene.lines : scene.choices[state.reply].reply;
  const spoken = (current?.spoken ? current : lines.slice(0, state.line + 1).findLast((entry) => entry.spoken))
    ?? (state.reply === null ? null : scene.lines.findLast((entry) => entry.spoken));
  const warm = spoken?.warm ?? (state.scene.kind === 'ending' || state.scene.chapter > 0 || scene.character === 'suzu');
  return portrait(scene.character, spoken?.expression, spoken?.pose, warm, state.scene.kind === 'ending');
}

export function sceneView(state, mode, muted) {
  const scene = storyScene(state);
  const heroine = heroines[scene.character];
  const current = currentLine(state);
  const choices = currentChoices(state);
  const ending = state.scene.kind === 'ending';
  const tag = ending ? '始发 · 终章' : state.scene.kind === 'route' ? `第 ${state.scene.chapter + 1} 幕` : state.scene.kind === 'tower' ? '夜行 · 东京塔' : '序章';
  const remaining = DAWN - state.time;
  return `<main class="game-screen scene-screen ${ending ? 'dawn-screen' : ''}" style="--scene: url('${photo(state.district)}'); --accent: ${heroine?.color ?? 'var(--mint)'}">
    ${hud(state, muted)}
    <div class="scene-heading"><span>${tag}</span><h1 tabindex="-1">${scene.title}</h1></div>
    <div class="scene-portrait ${current && !current.spoken ? 'listening' : ''}">${scenePortrait(state, scene, current)}</div>
    <div class="story-deck">
      ${choices.length ? `<section class="dialogue choice-deck" aria-labelledby="choice-title">
        <div class="dialogue-tag" id="choice-title">${icon('clock')} 还能停留 ${remaining} 分钟</div>
        ${choices.map((choice, index) => `<button class="choice" data-action="choose" data-id="${index}" ${choice.cost > remaining ? 'disabled' : ''}>
          <span>${choice.label}</span><span class="cost">+${choice.cost} 分钟</span>${icon('next')}
        </button>`).join('')}
      </section>` : `<section class="dialogue" aria-label="对话" data-action="advance">
        <div class="dialogue-tag speaker">${current?.spoken ? heroine.name : '旁白'}${current?.spoken && !ending ? `<small lang="ja">${heroine.kana}</small>` : ''}</div>
        <p class="story-text"><span aria-hidden="true"></span><span class="story-copy">${escapeHTML(current?.text ?? '')}</span></p>
        <button class="next-line" data-action="advance" aria-label="继续对话" title="继续对话 (空格 / Enter)">${icon('down')}</button>
      </section>`}
      ${toolbar(mode, !current, true)}
    </div>
  </main>`;
}

function toolbar(mode, stop, reading) {
  return `<nav class="toolbar" aria-label="阅读与存档">
    <div>
      <button class="quiet" data-action="log">${icon('book')} 文本记录</button>
      <button class="quiet" data-action="save-menu">${icon('save')} 存读档</button>
    </div>
    ${reading ? `<div>
      <button class="quiet" data-action="auto" aria-pressed="${mode === 'auto'}" ${stop ? 'disabled' : ''} title="自动阅读 (A)">${icon('play')} 自动</button>
      <button class="quiet" data-action="skip" aria-pressed="${mode === 'skip'}" ${stop ? 'disabled' : ''} title="跳过对话 (S)">${icon('skip')} 跳过</button>
    </div>` : ''}
  </nav>`;
}

function diagram(state, selected) {
  const points = Object.entries(districts);
  const here = districts[state.district].point;
  const there = districts[selected].point;
  return `<div class="map-diagram">
    <svg class="street-map" viewBox="0 0 510 280" aria-hidden="true">
      <defs><pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#9cd7ce" opacity=".095"/></pattern></defs>
      <path d="M0 0h510v280H0z" fill="url(#grid)"/>
      <g class="minor-roads">
        <path d="M-10 59 83 71 118 40 233 35 285 58 345 45 414 92 538 112M-10 169 85 154 134 166 161 149 228 144 304 160 360 128 519 139M-9 242 56 234 113 248 184 213 250 266 327 246 512 252M26 0 43 80 28 120 52 205 29 280M161 0 155 83 176 126 157 181 185 259 176 280M245 0 219 66 236 97 199 173 220 280M305 0 319 52 298 134 330 197 302 280M416 0 408 77 421 141 396 195 413 280M473 0 469 96 486 164 464 223 490 280"/>
        <path d="M6 108 89 116 161 112 233 104 303 116 407 111 507 119M7 198 104 193 186 180 285 202 386 185 512 190M70 0 66 54 90 111 81 169 101 228 98 280M341 0 366 47 343 94 370 179 349 280"/>
      </g>
      <path class="map-river-edge" d="M443-20C376 27 440 54 430 84S369 108 375 146 464 200 446 236 452 267 497 295"/>
      <path class="map-river" d="M443-20C376 27 440 54 430 84S369 108 375 146 464 200 446 236 452 267 497 295"/>
      <path class="map-route" d="M73 223Q102 176 91 144T117 92Q168 67 210 89T302 107Q335 89 382 50M73 223Q151 245 169 223T262 231Q291 202 281 168T302 107"/>
      ${state.district !== selected ? `<path class="map-active-route" d="M${here.join(' ')} Q${(here[0] + there[0]) / 2 + 18} ${(here[1] + there[1]) / 2 - 22} ${there.join(' ')}"/>` : ''}
      ${points.map(([id, district]) => {
        const [x, y] = district.point;
        const [dx, dy] = district.label;
        return `<g class="map-node ${selected === id ? 'selected' : ''}" style="--node: ${district.color}">
          ${state.district === id ? `<circle class="map-current" cx="${x}" cy="${y}" r="11"/>` : ''}
          <circle class="map-dot" cx="${x}" cy="${y}" r="5"/><text x="${x + dx}" y="${y + dy}">${district.ja}</text>
        </g>`;
      }).join('')}
    </svg>
    <div class="map-targets">
      ${points.map(([id, district]) => `<button data-action="select" data-id="${id}" aria-label="${district.name}地图标记" aria-pressed="${id === selected}" style="--x:${district.point[0] / 5.1}%;--y:${district.point[1] / 2.8}%"></button>`).join('')}
    </div>
    <div class="map-key"><span><i></i> 当前位置</span><span><i></i> 选中目的地</span></div>
  </div>`;
}

export function mapView(state, selected, muted) {
  const district = districts[selected];
  const remaining = DAWN - state.time;
  const cost = walkingTime(state.district, selected);
  const local = cost === 0;
  const event = availableScene(state, selected);
  const canVisit = Boolean(event && cost + event.minimum <= remaining);
  const navigation = Object.entries(districts).map(([id, place]) => {
    const time = walkingTime(state.district, id);
    return `<button class="map-stop" data-action="select" data-id="${id}" aria-pressed="${selected === id}" style="--stop: ${place.color}">
      <span class="stop-bullet"></span><span>${place.name}</span><small>${time ? `${time} 分钟` : '当前位置'}</small>
    </button>`;
  }).join('');
  const wait = dawnOptions(state).map((option) => `<button class="wait-button" data-action="wait" data-id="${option.id}" ${option.walk > remaining ? 'disabled' : ''}>
    <span>${option.label}<small>${option.walk ? `${districts[option.district].name} · 步行 ${option.walk} 分钟` : '当前位置'}</small></span>
    <small>${option.walk > remaining ? '来不及抵达' : '04:50'}</small>${icon('next')}
  </button>`).join('');
  return `<main class="game-screen map-screen" style="--scene: url('${photo(state.district)}')">
    ${hud(state, muted)}
    <section class="map-shell" aria-labelledby="map-title">
      <header class="map-header">
        <div><p class="map-overline">${icon('pin')} 东京夜行线</p><h1 id="map-title" tabindex="-1">选择下一站</h1></div>
        <span class="time-chip">${icon('clock')} 距始发 <b>${remaining}</b> 分钟</span>
      </header>
      <div class="map-content">
        ${diagram(state, selected)}
        <div class="map-list" aria-label="目的地列表">${navigation}</div>
      </div>
      <div class="map-details">
        <div class="place-detail" style="--scene: url('${photo(selected)}'); --place: ${district.color}">
          <small>${district.en}</small><strong>${district.name}</strong><span>${district.note}</span>
        </div>
        <div class="map-actions">
          ${local && canVisit ? `<button class="primary local-event" data-action="visit"><span>${district.route ? '与' + heroines[district.route].short + '停留' : '在塔下停留'}<small>${event.title} · ${event.minimum} 分钟起</small></span>${icon('arrow')}</button>` : ''}
          ${local && event && !canVisit ? '<p class="map-hint">始发前的时间已不够停留。</p>' : ''}
          ${local && !event ? '<p class="map-hint">这里的故事已经读完。可以等始发，或继续走。</p>' : ''}
          ${!local ? `<button class="primary local-event" data-action="walk" data-id="${selected}" ${cost > remaining ? 'disabled' : ''}><span>步行前往<small>${cost > remaining ? '始发前无法抵达' : `+${cost} 分钟 · ${clock(state.time + cost)} 抵达`}</small></span>${icon('arrow')}</button>
          ${event && cost <= remaining ? `<p class="map-hint">${canVisit ? `可停留 · ${event.title}` : '抵达后时间不足，无法停留。'}</p>` : ''}` : ''}
        </div>
      </div>
      <section class="dawn-board" aria-labelledby="dawn-title">
        <h2 id="dawn-title">${icon('train')} 始发安排</h2>
        <div class="wait-list">${wait}</div>
      </section>
    </section>
    <div class="map-toolbar">${toolbar(null, true, false)}</div>
  </main>`;
}

export function resultsView(state, muted) {
  const ending = endings[state.ending];
  const accent = heroines[ending.character]?.color ?? 'var(--mint)';
  return `<main class="game-screen results-screen dawn-screen" style="--scene: url('${photo(state.district)}'); --accent: ${accent}">
    ${hud(state, muted)}
    <div class="result-art">${ending.character ? portrait(ending.character, ending.expression ?? 'tender', ending.pose ?? 'hold', true, true) : ''}</div>
    <section class="results-copy">
      <p class="hero-context"><span></span> 04:50 · 夜行结束</p>
      <p class="ending-ja" lang="ja">${ending.ja}</p>
      <h1 tabindex="-1">${ending.title}</h1>
      <p>${ending.summary}</p>
      <div class="title-actions"><button class="primary" data-action="memory" data-id="${state.ending}">${icon('book')} 重读与配乐</button>
        <button class="secondary" data-action="home">回到标题 ${icon('arrow')}</button>
        <button class="quiet" data-action="log">${icon('book')} 文本记录</button>
        <button class="quiet" data-action="save-menu">${icon('save')} 存读档</button>
      </div>
    </section>
  </main>`;
}
