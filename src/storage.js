import { DAWN, START, districts, endings, heroines, routes } from './story.js';
import { ORIGINAL_ROUTE_LENGTH, storyScene } from './game.js';

const key = 'shihatsu.v1.';
export const defaults = { volume: 65, speed: 24, auto: 3.2, muted: false };
const limits = { volume: [0, 100], speed: [0, 50], auto: [1.5, 6] };
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function read(name) {
  try {
    return JSON.parse(localStorage.getItem(key + name));
  } catch {
    return null;
  }
}

function write(name, value) {
  try {
    localStorage.setItem(key + name, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function validNight(state) {
  if (!state || ![1, 2].includes(state.version) || !['scene', 'map', 'results'].includes(state.phase)) return false;
  const legacy = state.version === 1;
  if (!Object.hasOwn(districts, state.district) || !Number.isInteger(state.time) || state.time < START || state.time > DAWN) return false;
  if (!Array.isArray(state.log) || !state.log.every((entry) => entry && typeof entry.text === 'string' && typeof entry.speaker === 'string' && Number.isInteger(entry.time))) return false;
  if (!Array.isArray(state.districts) || !state.districts.includes(state.district)
    || !state.districts.every((id) => Object.hasOwn(districts, id))) return false;
  if (typeof state.towerSeen !== 'boolean' || typeof state.towerMemory !== 'boolean') return false;
  if (state.ending !== null && !Object.hasOwn(endings, state.ending)) return false;
  for (const id of Object.keys(heroines)) {
    const bond = state.bonds?.[id];
    if (!bond || !Number.isInteger(bond.chapter) || bond.chapter < 0 || bond.chapter > (legacy ? ORIGINAL_ROUTE_LENGTH : routes[id].length)
      || !Number.isInteger(bond.affection) || bond.affection < 0 || typeof bond.promise !== 'boolean'
      || (!legacy && typeof bond.followUp !== 'boolean')
      || (bond.followUp && (!bond.promise || bond.chapter <= ORIGINAL_ROUTE_LENGTH))) return false;
  }
  if (state.phase === 'map') return state.scene === null && state.ending === null;
  const { kind, id, chapter } = state.scene ?? {};
  if (!['prologue', 'tower', 'ending', 'route'].includes(kind)) return false;
  if (kind === 'route' && (!Object.hasOwn(routes, id) || !Number.isInteger(chapter) || !routes[id][chapter]
    || (legacy && chapter >= ORIGINAL_ROUTE_LENGTH))) return false;
  if (kind === 'ending' && (state.time !== DAWN || id !== state.ending || !Object.hasOwn(endings, id))) return false;
  if (kind !== 'ending' && (state.ending !== null || state.phase === 'results')) return false;
  if (kind === 'ending' && endings[id].rendezvous && (legacy || !state.bonds[endings[id].character].followUp)) return false;
  if (!Number.isInteger(state.line) || state.line < 0) return false;
  const scene = storyScene(state);
  if (state.phase === 'results') return state.reply === null && state.line === scene.lines.length;
  if (state.reply === null) return state.line < scene.lines.length || (state.line === scene.lines.length && Boolean(scene.choices?.length));
  const reply = Number.isInteger(state.reply) && scene.choices?.[state.reply]?.reply;
  return Boolean(reply && state.line < reply.length);
}

export function loadSlot(id) {
  const slot = read(id);
  if (!slot || !Number.isFinite(slot.date) || !validNight(slot.state)) return null;
  const { state } = slot;
  if (state.version === 1) {
    state.version = 2;
    for (const bond of Object.values(state.bonds)) {
      // The original release could withhold a valid third-scene promise.
      if (bond.chapter === 3 && bond.affection === 5) bond.promise = true;
      bond.followUp = false;
    }
    if (state.phase === 'results') state.line = storyScene(state).lines.length;
  }
  return slot;
}

export function saveSlot(id, state) {
  return write(id, { date: Date.now(), state });
}

export function loadSettings() {
  const saved = read('settings') ?? {};
  const settings = { ...defaults, muted: saved.muted === true };
  for (const [name, [min, max]] of Object.entries(limits)) {
    if (Number.isFinite(saved[name])) settings[name] = clamp(saved[name], min, max);
  }
  return settings;
}

export const saveSettings = (settings) => write('settings', settings);

export function loadGallery() {
  const saved = read('gallery') ?? {};
  const seen = Array.isArray(saved.seen) ? saved.seen.filter((id) => Object.hasOwn(heroines, id)) : [];
  const unlocked = Array.isArray(saved.unlocked) ? saved.unlocked.filter((id) => Object.hasOwn(endings, id)) : [];
  const locations = Object.fromEntries(unlocked.flatMap((id) => {
    const district = saved.locations?.[id];
    return Object.hasOwn(districts, district) ? [[id, district]] : [];
  }));
  const codas = Array.isArray(saved.codas) ? saved.codas.filter((id) => unlocked.includes(id) && endings[id].coda) : [];
  return { seen: [...new Set(seen)], unlocked: [...new Set(unlocked)], locations, codas: [...new Set(codas)] };
}

export const saveGallery = (gallery) => write('gallery', gallery);
