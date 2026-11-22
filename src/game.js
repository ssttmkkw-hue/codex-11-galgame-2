import { START, DAWN, districts, heroines, prologue, routes, towerEvent, endings } from './story.js';

const journeys = {
  shibuya: { shinjuku: 42, akihabara: 88, asakusa: 103, tower: 51 },
  shinjuku: { akihabara: 76, asakusa: 96, tower: 67 },
  akihabara: { asakusa: 34, tower: 62 },
  asakusa: { tower: 82 },
};

export function walkingTime(from, to) {
  if (from === to) return 0;
  return journeys[from]?.[to] ?? journeys[to]?.[from] ?? Infinity;
}

export function clock(minutes) {
  return [Math.floor(minutes / 60), minutes % 60].map((number) => String(number).padStart(2, '0')).join(':');
}

export function storyScene(state) {
  const { kind, id, chapter } = state.scene ?? {};
  if (kind === 'prologue') return prologue;
  if (kind === 'tower') return towerEvent;
  if (kind === 'route') return { ...routes[id][chapter], character: id, district: heroines[id].district };
  if (kind === 'ending') return endings[id];
  return null;
}

export function currentLine(state) {
  const scene = storyScene(state);
  const lines = state.reply === null ? scene?.lines : scene?.choices[state.reply].reply;
  return lines?.[state.line] ?? null;
}

export function currentChoices(state) {
  if (state.phase !== 'scene' || state.reply !== null || currentLine(state)) return [];
  return storyScene(state).choices ?? [];
}

function recordLine(state) {
  const line = currentLine(state);
  if (!line) return state;
  const scene = storyScene(state);
  const speaker = line.spoken ? heroines[scene.character].name : '旁白';
  return { ...state, log: [...state.log, { text: line.text, speaker, time: state.time }] };
}

function enter(state, scene) {
  return recordLine({ ...state, phase: 'scene', scene, line: 0, reply: null });
}

function eventLog(state, text) {
  return { ...state, log: [...state.log, { text, speaker: '夜行记录', time: state.time }] };
}

export function newNight() {
  const bonds = Object.fromEntries(Object.keys(heroines).map((id) => [id, { chapter: 0, affection: 0, promise: false }]));
  return enter({
    version: 1, time: START, district: 'shibuya', districts: ['shibuya'],
    bonds, towerSeen: false, towerMemory: false, ending: null, log: [],
  }, { kind: 'prologue' });
}

export function advance(state) {
  if (state.phase !== 'scene' || !currentLine(state)) return state;
  const next = { ...state, line: state.line + 1 };
  if (currentLine(next)) return recordLine(next);
  if (state.scene.kind === 'ending') return { ...next, phase: 'results' };
  if (state.reply !== null) return { ...next, phase: 'map', scene: null, line: 0, reply: null };
  return next;
}

export function choose(state, index) {
  const choice = currentChoices(state)[index];
  if (!choice || state.time + choice.cost > DAWN) return state;
  const { kind, id, chapter } = state.scene;
  let next = { ...state, time: state.time + choice.cost, line: 0, reply: index };
  if (kind === 'route') {
    const affection = state.bonds[id].affection + choice.affection;
    const promise = state.bonds[id].promise || (routes[id][chapter].promiseScene === true && choice.affection > 0 && affection >= 6);
    next = { ...next, bonds: { ...state.bonds, [id]: { chapter: chapter + 1, affection, promise } } };
  }
  if (kind === 'tower') next = { ...next, towerSeen: true, towerMemory: index === 0 };
  return recordLine(eventLog(next, `${choice.label}（+${choice.cost} 分钟）`));
}

export function availableScene(state, district = state.district) {
  const id = districts[district]?.route;
  if (id) {
    const chapter = state.bonds[id].chapter;
    const scene = routes[id][chapter];
    if (scene && (!scene.requiresPromise || state.bonds[id].promise)) return { kind: 'route', id, chapter, title: scene.title, minimum: Math.min(...scene.choices.map((choice) => choice.cost)) };
  }
  if (district === 'tower' && !state.towerSeen) {
    return { kind: 'tower', title: towerEvent.title, minimum: Math.min(...towerEvent.choices.map((choice) => choice.cost)) };
  }
  return null;
}

export function visit(state) {
  if (state.phase !== 'map') return state;
  const scene = availableScene(state);
  if (!scene || state.time + scene.minimum > DAWN) return state;
  const { kind, id, chapter } = scene;
  return enter(state, { kind, id, chapter });
}

export function walk(state, to) {
  if (state.phase !== 'map' || !Object.hasOwn(districts, to)) return state;
  const cost = walkingTime(state.district, to);
  if (cost === 0 || state.time + cost > DAWN) return state;
  const next = {
    ...state, district: to, time: state.time + cost,
    districts: state.districts.includes(to) ? state.districts : [...state.districts, to],
  };
  return eventLog(next, `步行抵达${districts[to].name}（+${cost} 分钟）`);
}

export function dawnOptions(state) {
  if (state.phase !== 'map') return [];
  const local = state.district === 'tower' && state.towerMemory ? 'tower' : 'solo';
  const options = [{ id: local, district: state.district, cost: DAWN - state.time, walk: 0, label: '留在这里等始发' }];
  for (const [id, heroine] of Object.entries(heroines)) {
    if (!state.bonds[id].promise) continue;
    options.push({
      id, district: heroine.district, cost: DAWN - state.time, walk: walkingTime(state.district, heroine.district),
      label: `与${heroine.short}一起等始发`,
    });
  }
  return options;
}

export function waitForDawn(state, id) {
  const option = dawnOptions(state).find((entry) => entry.id === id);
  if (!option || option.walk > option.cost) return state;
  const next = { ...state, time: DAWN, district: option.district, ending: id };
  return enter(eventLog(next, option.label), { kind: 'ending', id });
}
