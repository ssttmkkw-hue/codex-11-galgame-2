import assert from 'node:assert/strict';
import test from 'node:test';
import { composeBar } from '../src/score.js';
import { DAWN, START, districts, endings, heroines } from '../src/story.js';

test('district, character, and ending scores contain playable notes across the full phrase', () => {
  const map = Object.keys(districts).map((district) => ({ district, mood: 'map' }));
  const encounters = Object.entries(heroines).map(([character, { district }]) => ({ character, district, mood: 'scene' }));
  const finale = Object.entries(endings).map(([ending, { district, character }]) => ({
    ending, district: district ?? 'shibuya', character, mood: 'ending',
  }));
  const signatures = new Set();
  for (const cue of [...map, ...encounters, ...finale]) {
    const bars = Array.from({ length: 16 }, (_, bar) => composeBar({
      time: cue.ending ? DAWN : START, affection: 7, ...cue,
    }, bar));
    signatures.add(JSON.stringify(bars));
    for (const { events, bpm } of bars) {
      assert.ok(bpm > 55 && bpm < 100);
      assert.ok(events.some(({ voice }) => voice && !['bass', 'pad', 'strings'].includes(voice)));
      for (const event of events) {
        assert.ok(event.offset >= 0 && event.offset < 4);
        assert.ok(event.volume > 0 && event.volume < 1);
        if (event.voice) {
          assert.ok(Number.isInteger(event.pitch));
          assert.ok(event.length > 0);
        }
        if (cue.ending) assert.equal(event.style, undefined);
      }
    }
  }
  assert.equal(signatures.size, 15);
});

test('the arrangement softens by dawn and adds a countermelody with affection', () => {
  const cue = { district: 'shibuya', character: 'mio', mood: 'scene', time: START, affection: 0 };
  const early = composeBar(cue, 0);
  const late = composeBar({ ...cue, time: DAWN - 1 }, 0);
  assert.ok(late.bpm < early.bpm);
  assert.ok(late.brightness < early.brightness);
  assert.ok(late.events.find(({ style }) => style).volume < early.events.find(({ style }) => style).volume);
  assert.ok(!early.events.some(({ voice }) => voice === 'flute'));
  assert.ok(composeBar({ ...cue, affection: 6 }, 0).events.some(({ voice }) => voice === 'flute'));
});
