import assert from 'node:assert/strict';
import test from 'node:test';
import {
  advance, availableScene, choose, currentLine, dawnOptions, newNight, storyScene, visit, waitForDawn, walk,
} from '../src/game.js';
import { loadSlot, validNight } from '../src/storage.js';
import { DAWN, districts, heroines, routes } from '../src/story.js';

function readScene(state) {
  while (state.phase === 'scene' && currentLine(state)) state = advance(state);
  assert.ok(validNight(state));
  return state;
}

function decision(state, index) {
  const before = readScene(state);
  const after = choose(before, index);
  assert.notEqual(after, before);
  assert.ok(after.time > before.time);
  assert.ok(validNight(after));
  return readScene(after);
}

const start = () => decision(newNight(), 0);

test('the clock budgets every encounter and cannot fit four introductions', () => {
  function mostMeetings(state, met = new Set()) {
    let max = met.size;
    for (const [id, district] of Object.entries(districts)) {
      if (!district.route || met.has(district.route)) continue;
      const arrived = state.district === id ? state : walk(state, id);
      if (arrived.district !== id || !availableScene(arrived)) continue;
      const scene = visit(arrived);
      if (scene === arrived) continue;
      const fastest = storyScene(scene).choices.findIndex(({ cost }) => cost === availableScene(arrived).minimum);
      max = Math.max(max, mostMeetings(decision(scene, fastest), new Set([...met, district.route])));
    }
    return max;
  }
  assert.equal(mostMeetings(start()), 3);
});

test('each heroine can be promised dawn on the shortest path to her commitment', () => {
  for (const [id, heroine] of Object.entries(heroines)) {
    let state = start();
    if (state.district !== heroine.district) state = walk(state, heroine.district);
    for (const option of [1, 1, 0]) state = decision(visit(state), option);

    assert.equal(state.bonds[id].affection, 5);
    assert.ok(dawnOptions(state).some((option) => option.id === id));
    state = readScene(waitForDawn(state, id));
    assert.equal(state.ending, id);
    assert.equal(state.time, DAWN);
    assert.equal(state.phase, 'results');
  }
});

test('every optional final scene fits in the night and adds an ending line', () => {
  for (const [id, heroine] of Object.entries(heroines)) {
    let state = start();
    if (state.district !== heroine.district) state = walk(state, heroine.district);
    for (const option of [0, 0, 0, 0, 0]) {
      state = decision(visit(state), option);
    }

    assert.equal(state.bonds[id].chapter, routes[id].length);
    const ending = waitForDawn(state, id);
    assert.ok(storyScene(ending).lines.includes(storyScene(ending).coda[0]));
    assert.equal(readScene(ending).phase, 'results');
  }
});

test('a legacy save restores a commitment made after two short visits', (context) => {
  let state = start();
  for (const option of [1, 1, 0]) state = decision(visit(state), option);
  state.bonds.mio.promise = false;
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  context.after(() => {
    if (descriptor) Object.defineProperty(globalThis, 'localStorage', descriptor);
    else delete globalThis.localStorage;
  });
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: { getItem: () => JSON.stringify({ date: 1, state }) },
  });
  const saved = loadSlot('slot1').state;
  assert.equal(waitForDawn(saved, 'mio').ending, 'mio');
});

test('a remote rendezvous charges and records the walk before dawn', () => {
  let state = start();
  for (const option of [0, 0, 0]) state = decision(visit(state), option);
  state = walk(state, 'shinjuku');
  const ending = waitForDawn(state, 'mio');
  const [travel, wait] = ending.log.slice(-3, -1);

  assert.equal(travel.time, state.time + 42);
  assert.match(travel.text, /步行抵达涩谷/);
  assert.equal(wait.time, DAWN);
  assert.equal(ending.district, 'shibuya');

  const tooLate = { ...state, time: DAWN - 41 };
  assert.equal(waitForDawn(tooLate, 'mio'), tooLate);
});

test('tower and solo endings resolve from the map, even when the clock reaches dawn', () => {
  const atTower = walk(start(), 'tower');
  const marked = decision(visit(atTower), 0);
  assert.equal(readScene(waitForDawn(marked, 'tower')).ending, 'tower');

  const late = { ...atTower, time: DAWN - 51 };
  const back = walk(late, 'shibuya');
  assert.equal(back.time, DAWN);
  assert.equal(visit(back), back);
  assert.equal(readScene(waitForDawn(back, 'solo')).ending, 'solo');
});
