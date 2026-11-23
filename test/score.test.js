import assert from 'node:assert/strict';
import test from 'node:test';
import { NightMusic } from '../src/music.js';
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
    const bars = Array.from({ length: cue.ending ? 24 : 16 }, (_, bar) => composeBar({
      time: cue.ending ? DAWN : START, affection: 7, ...cue,
    }, bar));
    assert.notDeepEqual(bars[0].events, bars[8].events);
    if (cue.ending) assert.ok(bars.at(-1).bpm < bars[0].bpm);
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
  assert.equal(signatures.size, map.length + encounters.length + finale.length);
});

test('music preserves the phrase across an encounter and starts previews and finales on the next beat', () => {
  const music = new NightMusic();
  const transitions = [];
  music.tone = () => {};
  music.drum = () => {};
  music.changeSection = (at, key, keepPhrase) => {
    transitions.push(key);
    music.section = {
      key, district: music.cue.district, ending: music.cue.ending, preview: music.cue.preview,
      bar: keepPhrase ? music.section.bar : 0, beat: 0,
      filter: { frequency: { setTargetAtTime() {} } },
    };
  };
  music.playBeat(0);
  music.setCue({ ...music.cue, character: 'mio', mood: 'scene' });
  for (let beat = 1; beat <= 3; beat++) music.playBeat(beat);
  assert.deepEqual(transitions, ['title']);
  music.playBeat(4);
  assert.equal(music.section.bar, 1);
  assert.deepEqual(transitions, ['title', 'mio']);

  music.setCue({ ...music.cue, ending: 'mioAfter', time: DAWN, mood: 'ending' });
  music.playBeat(5);
  assert.equal(music.section.key, 'mioAfter');
  music.setCue({ ...music.cue, preview: 1 });
  music.playBeat(6);
  assert.equal(music.section.key, 'preview:1:mioAfter');
  assert.equal(music.section.bar, 0);
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
