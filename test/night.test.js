import assert from 'node:assert/strict';
import test from 'node:test';
import {
  advance, availableScene, choose, currentLine, dawnOptions, newNight, storyScene, visit, waitForDawn, walk,
} from '../src/game.js';
import { loadSlot, validNight } from '../src/storage.js';
import { DAWN, districts, endings, heroines, routes } from '../src/story.js';

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

function mockSavedNight(context, state) {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  context.after(() => {
    if (descriptor) Object.defineProperty(globalThis, 'localStorage', descriptor);
    else delete globalThis.localStorage;
  });
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: { getItem: () => JSON.stringify({ date: 1, state }) },
  });
}

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

test('all six scenes fit for every heroine and the last choice can unlock an alternate ending', () => {
  for (const [id, heroine] of Object.entries(heroines)) {
    let state = start();
    if (state.district !== heroine.district) state = walk(state, heroine.district);
    for (const scene of routes[id].slice(0, 5)) {
      assert.equal(availableScene(state).title, scene.title);
      state = decision(visit(state), 0);
    }

    const alternate = `${id}After`;
    assert.equal(waitForDawn(state, alternate), state);
    const original = waitForDawn(state, id);
    assert.ok(storyScene(original).lines.includes(endings[id].coda[0]));
    assert.equal(waitForDawn(decision(visit(state), 1), alternate).phase, 'map');

    state = decision(visit(state), 0);
    assert.equal(state.bonds[id].chapter, routes[id].length);
    const ending = readScene(waitForDawn(state, alternate));
    assert.equal(ending.ending, alternate);
    assert.equal(ending.phase, 'results');
    assert.equal(waitForDawn(state, id).ending, id);
  }
});

test('a legacy save restores a commitment made after two short visits', (context) => {
  let state = start();
  for (const option of [1, 1, 0]) state = decision(visit(state), option);
  state.version = 1;
  state.bonds.mio.promise = false;
  mockSavedNight(context, state);
  const saved = loadSlot('slot1').state;
  assert.equal(saved.version, 2);
  assert.equal(waitForDawn(saved, 'mio').ending, 'mio');
});

test('legacy endings retain their reading position and completed results load with new lines', (context) => {
  let state = start();
  for (let chapter = 0; chapter < 5; chapter++) state = decision(visit(state), 0);
  state.version = 1;
  for (const bond of Object.values(state.bonds)) delete bond.followUp;
  let ending = waitForDawn(state, 'mio');
  const legacy = { ...ending };
  mockSavedNight(context, legacy);
  while (currentLine(ending) !== endings.mio.coda[0]) ending = advance(ending);
  Object.assign(legacy, ending);
  const resumed = loadSlot('slot1').state;
  assert.equal(currentLine(resumed), endings.mio.coda[0]);
  assert.equal(currentLine(advance(resumed)), endings.mio.after[0]);

  Object.assign(legacy, readScene(ending));
  const completed = loadSlot('slot1').state;
  assert.equal(completed.phase, 'results');
  assert.equal(completed.line, storyScene(completed).lines.length);
  assert.ok(validNight(completed));
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
