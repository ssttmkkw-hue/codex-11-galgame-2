import { DAWN, START, districts, endings, heroines, routes } from './story.js';
import { storyScene } from './game.js';

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
  if (!state || state.version !== 1 || !['scene', 'map', 'results'].includes(state.phase)) return false;
  if (!Object.hasOwn(districts, state.district) || !Number.isInteger(state.time) || state.time < START || state.time > DAWN) return false;
  if (!Array.isArray(state.log) || !state.log.every((entry) => entry && typeof entry.text === 'string' && typeof entry.speaker === 'string' && Number.isInteger(entry.time))) return false;
  if (!Array.isArray(state.districts) || !state.districts.includes(state.district)
    || !state.districts.every((id) => Object.hasOwn(districts, id))) return false;
  if (typeof state.towerSeen !== 'boolean' || typeof state.towerMemory !== 'boolean') return false;
  if (state.ending !== null && !Object.hasOwn(endings, state.ending)) return false;
  for (const id of Object.keys(heroines)) {
    const bond = state.bonds?.[id];
    if (!bond || !Number.isInteger(bond.chapter) || bond.chapter < 0 || bond.chapter > routes[id].length
      || !Number.isInteger(bond.affection) || typeof bond.promise !== 'boolean') return false;
  }
  if (state.phase === 'map') return state.scene === null && state.ending === null;
  const { kind, id, chapter } = state.scene ?? {};
  if (!['prologue', 'tower', 'ending', 'route'].includes(kind)) return false;
  if (kind === 'route' && (!Object.hasOwn(routes, id) || !Number.isInteger(chapter) || !routes[id][chapter])) return false;
  if (kind === 'ending' && (state.time !== DAWN || id !== state.ending || !Object.hasOwn(endings, id))) return false;
  if (kind !== 'ending' && (state.ending !== null || state.phase === 'results')) return false;
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
  // Older saves withheld the third-scene promise after two short visits.
  for (const id of Object.keys(heroines)) {
    const bond = slot.state.bonds[id];
    if (bond.chapter === 3 && bond.affection === 5) bond.promise = true;
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
  return { seen: [...new Set(seen)], unlocked: [...new Set(unlocked)], locations };
}

export const saveGallery = (gallery) => write('gallery', gallery);
