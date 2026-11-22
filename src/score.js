import { DAWN, START } from './story.js';

const d = [50, 54, 57, 61, 64];       // Dmaj9
const df = [42, 57, 61, 62, 66];      // Dmaj7/F♯
const d6 = [50, 54, 57, 59, 64];      // D6/9
const a = [45, 55, 61, 64, 66];       // A13
const aSus = [45, 52, 55, 59, 62];    // A9sus4
const b = [47, 54, 57, 61, 62];       // Bm9
const g = [43, 50, 54, 57, 59];       // Gmaj9
const gm = [43, 58, 62, 64, 67];      // Gm6
const e = [40, 55, 59, 62, 66];       // Em9
const f = [42, 49, 52, 57, 59];       // F♯m11

const districts = {
  shibuya: {
    bpm: 76, backing: 'electric', lead: 'felt', harmony: [b, g, d, a, b, df, e, aSus],
    melody: [[74, 73, 69], [71, 69, 66], [69, 73, 78], [76, 73, 71], [74, 78, 76], [73, 69, 66], [67, 71, 74], [69, 64]],
    rhythm: [[.5, 2], [1.5, 4], [2.5, 3], [3.5, 2]], bass: [0, 2.5], drums: [[1, 'rim'], [1.75, 'tick'], [3, 'rim']],
  },
  shinjuku: {
    bpm: 84, backing: 'guitar', lead: 'electric', harmony: [e, a, d, b, g, gm, df, a],
    melody: [[71, 74, 76], [73, 71, 69], [66, 69, 73], [74, 69, 66], [71, 69, 66], [70, 67, 64], [66, 69, 74], [73, 69]],
    rhythm: [[.67, 3], [1.67, 2], [2.67, 4], [3.67, 3]], bass: [0, 1.67, 3], drums: [[.67, 'tick'], [1, 'brush'], [2.67, 'tick'], [3, 'brush']],
  },
  akihabara: {
    bpm: 90, backing: 'pluck', lead: 'bell', harmony: [f, g, d, a, b, g, e, aSus],
    melody: [[73, 76, 73], [74, 71, 69], [78, 76, 73], [76, 78, 69], [71, 74, 81], [78, 74, 71], [67, 71, 76], [74, 69]],
    rhythm: [[.5, 3], [1, 2], [1.75, 4], [2.5, 3], [3.25, 1]], bass: [0, 1.5, 3], drums: [[.5, 'tick'], [1.5, 'rim'], [2.5, 'tick'], [3.5, 'rim']],
  },
  asakusa: {
    bpm: 67, backing: 'felt', lead: 'flute', harmony: [d, g, e, a, df, g, e, d6],
    melody: [[69, 66, 64], [66, 69, 71], [67, 66, 64], [64, 69, 73], [74, 69, 66], [67, 69, 71], [71, 66, 64], [66, 62]],
    rhythm: [[.8, 2], [2, 3], [3.15, 4]], bass: [0, 2.75], drums: [[2.67, 'air']],
  },
  tower: {
    bpm: 72, backing: 'glass', lead: 'felt', harmony: [g, df, e, aSus, g, d, e, a],
    melody: [[67, 71, 74], [73, 69, 66], [67, 71, 76], [76, 74, 69], [74, 78, 81], [76, 73, 69], [67, 71, 74], [73, 69]],
    rhythm: [[.5, 2], [1.5, 4], [2.5, 1], [3.5, 3]], bass: [0, 2], drums: [[1.67, 'air'], [3.5, 'tick']],
  },
};

const heroines = {
  mio: {
    lead: 'felt', counter: 'flute',
    motif: [[.25, 74, .78], [1.25, 73, .4], [1.75, 69, 1.65]],
    melody: [null, [66, 69, 71], [74, 76, 78], [76, 73, 69], null, [66, 69, 74], [71, 67, 66], [64, 69]],
  },
  ren: {
    lead: 'guitar', counter: 'electric',
    motif: [[.67, 71, .42], [1.33, 74, .62], [2.17, 76, .8], [3.17, 74, .6]],
    melody: [null, [73, 71, 69], [66, 69, 74], [69, 74, 78], null, [70, 67, 64], [66, 69, 73], [76, 73]],
  },
  yui: {
    lead: 'bell', counter: 'pluck',
    motif: [[.25, 73, .35], [.75, 76, .32], [1.25, 73, .65], [2.5, 81, .9]],
    melody: [null, [74, 71, 69], [73, 74, 78], [76, 73, 81], [74, 78, 83], [78, 74, 71], [76, 71, 67], [69, 74]],
  },
  suzu: {
    lead: 'flute', counter: 'cello',
    motif: [[.5, 69, 1.3], [2, 66, .72], [3, 64, .8]],
    melody: [null, [67, 66, 71], [67, 71, 76], [73, 71, 69], null, [74, 71, 69], [67, 66, 64], [66, 62]],
  },
};

const finales = {
  mio: {
    bpm: 68, lead: 'felt', backing: 'guitar', counter: 'flute',
    harmony: [b, g, df, a, b, e, aSus, d6],
    melody: [null, [66, 69, 71], [74, 76, 78], [81, 76, 73], null, [67, 71, 78], [76, 74, 69], [66, 74]],
    rhythm: [[0, 2], [.75, 4], [1.5, 3], [3.25, 2]],
  },
  ren: {
    bpm: 77, lead: 'guitar', backing: 'electric', counter: 'cello',
    harmony: [e, a, d, b, g, gm, a, d6],
    melody: [null, [73, 69, 66], [69, 73, 78], [76, 74, 71], [71, 74, 79], [76, 74, 70], [69, 73, 76], [78, 74]],
    rhythm: [[.67, 3], [1.67, 1], [2.67, 4], [3.67, 2]],
  },
  yui: {
    bpm: 81, lead: 'bell', backing: 'electric', counter: 'pluck',
    harmony: [f, g, d, a, b, g, aSus, d6],
    melody: [null, [74, 71, 69], [73, 76, 78], [76, 81, 85], [83, 81, 78], [74, 78, 83], [81, 76, 74], [78, 74]],
    rhythm: [[.25, 3], [1.25, 2], [2, 4], [2.75, 3], [3.5, 4]],
  },
  suzu: {
    bpm: 62, lead: 'flute', backing: 'felt', counter: 'cello',
    harmony: [d, g, e, aSus, df, g, gm, d6],
    melody: [null, [67, 66, 71], [76, 71, 67], [69, 74, 76], null, [71, 74, 78], [79, 76, 74], [69, 66, 62]],
    rhythm: [[0, 2], [.9, 3], [2, 4], [3.15, 3]],
  },
  tower: {
    bpm: 64, lead: 'glass', backing: 'felt', counter: 'cello',
    harmony: [g, df, e, aSus, b, g, a, d6],
    melody: [[67, 71, 74], [73, 69, 66], [67, 71, 76], [81, 76, 74], [78, 81, 86], [83, 81, 78], [76, 73, 69], [74]],
    rhythm: [[.75, 2], [1.5, 3], [2.5, 4], [3.4, 3]],
  },
  solo: {
    bpm: 64, lead: 'felt', backing: 'glass', counter: 'flute',
    harmony: [b, g, d, aSus, df, e, a, d6],
    melody: [[74, 73, 69], [66, 69], [69, 73, 78], [76, 74], [73, 69, 66], [67, 71, 76], [76, 73, 69], [66, 62]],
    rhythm: [[1, 2], [2.5, 4], [3.5, 3]],
  },
};

export function composeBar(cue, number) {
  const district = districts[cue.district];
  const heroine = heroines[cue.character];
  const finale = finales[cue.ending];
  const score = finale ?? district;
  const melody = finale ?? heroine ?? district;
  const bar = number % score.harmony.length;
  const [root, ...notes] = score.harmony[bar];
  const progress = (cue.time - START) / (DAWN - START);
  const closeness = Math.min(1, (cue.affection ?? 0) / 9);
  const walking = !heroine && !finale && cue.mood !== 'scene';
  const events = [];
  const note = (voice, pitch, offset, length, volume, pan = 0) => events.push({ voice, pitch, offset, length, volume, pan });

  // Hold the bass and leave space around the last chord.
  const resolution = finale && bar === score.harmony.length - 1;
  note('bass', root, 0, resolution ? 3.7 : 1.85, finale ? .085 : .115);
  if (!finale) for (const offset of score.bass.slice(1)) {
    const neighbor = offset === 3 ? score.harmony[(bar + 1) % score.harmony.length][0] : root + 7;
    note('bass', neighbor, offset, .88, .058);
  }

  for (const [index, pitch] of notes.entries()) {
    const voice = finale ? 'strings' : 'pad';
    note(voice, pitch, index * .06, 3.65, (finale ? .029 : .018 + .012 * progress) * (index === 0 ? .72 : 1), (index - 1.5) * .28);
  }

  for (const [index, [offset, degree]] of score.rhythm.entries()) {
    if (resolution && offset >= 2.5) break;
    const octave = index % 2 === 0 && degree < 4 ? 12 : 0;
    note(score.backing, notes[degree - 1] + octave, offset, 1.16, walking ? .055 : .036, index % 2 ? .37 : -.37);
  }

  if (!finale) {
    const level = (walking ? .058 : .03) * (1 - progress * .64);
    for (const [index, [offset, style]] of score.drums.entries()) {
      events.push({ style, offset, volume: level * (index % 2 === 0 ? .72 : 1) });
    }
  }

  const pitches = melody.melody[bar];
  const timing = cue.district === 'shinjuku' && cue.ending !== 'solo' ? [.37, 1.67, 2.67] : [.22, 1.55, 2.6];
  const level = finale ? .12 : heroine ? .08 + .031 * closeness : .085;
  const phrase = pitches ? pitches.map((pitch, index) => [
    timing[index], pitch, index === pitches.length - 1 ? (resolution ? 2.8 - timing[index] / 2 : 1.36) : .94,
  ]) : heroine.motif;
  for (const [offset, pitch, length] of phrase) note(melody.lead, pitch, offset, length, level, .03);

  if (finale || heroine && closeness >= .30) {
    const counter = finale ?? heroine;
    const pitch = counter.counter === 'cello' ? notes[1] - 12 : notes[bar % 2 + 1] + 12;
    const volume = finale ? .06 : .027 + closeness * .027;
    note(counter.counter, pitch, counter.counter === 'cello' ? .9 : 2.05, counter.counter === 'cello' ? 2.4 : 1.55, volume, -.4);
  }

  if ((progress > .53 || finale) && (bar % 4 === 2 || number % 16 === 5)) {
    note('glass', notes[3] + 12, 3.33, 1.85, .038, .48);
  }
  const bpm = finale ? score.bpm : district.bpm - 6 * progress - (heroine ? 2 : 0);
  return { events, bpm, brightness: finale ? 5200 : 7200 - 2050 * progress + 450 * closeness };
}
