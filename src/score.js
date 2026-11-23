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
const bm = [46, 54, 59, 62, 66];      // Bm(maj7)/A♯
const c = [48, 55, 59, 62, 64];       // Cmaj9
const ef = [44, 52, 59, 62, 66];      // E9/G♯
const fa = [42, 52, 58, 61, 66];      // F♯7
const ga = [45, 54, 59, 62, 67];      // Gmaj7/A

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
  mioAfter: {
    bpm: 70, lead: 'felt', backing: 'vibes', counter: 'cello',
    harmony: [b, bm, d, ef, g, gm, aSus, d6],
    melody: [[74, 73, 69], [78, 74, 69], [73, 76, 78], [80, 78, 76], [74, 71, 69], [70, 67, 64], [74, 71, 69], [66, 74]],
    rhythm: [[.33, 2], [1.5, 4], [2.75, 3], [3.5, 2]],
  },
  renAfter: {
    bpm: 79, lead: 'reed', backing: 'guitar', counter: 'vibes',
    harmony: [e, ga, df, b, c, gm, a, d6],
    melody: [[71, 74, 76], [78, 74, 71], [69, 73, 78], [81, 78, 74], [76, 79, 83], [82, 79, 76], [73, 76, 78], [76, 74]],
    rhythm: [[.67, 2], [1.67, 3], [2.67, 1], [3.67, 4]],
  },
  yuiAfter: {
    bpm: 88, lead: 'pluck', backing: 'electric', counter: 'bell',
    harmony: [f, g, b, a, d, ef, ga, d6],
    melody: [[73, 76, 73], [74, 78, 83], [78, 81, 86], [85, 83, 81], [78, 76, 81], [80, 78, 76], [78, 74, 71], [76, 74]],
    rhythm: [[.25, 3], [1, 2], [1.75, 4], [2.5, 3], [3.25, 1]],
  },
  suzuAfter: {
    bpm: 66, lead: 'cello', backing: 'guitar', counter: 'flute',
    harmony: [d, g, e, fa, b, df, gm, d6],
    melody: [[69, 66, 64], [66, 71, 74], [76, 71, 67], [66, 70, 73], [74, 78, 81], [81, 78, 76], [79, 76, 70], [69, 74]],
    rhythm: [[.5, 3], [1.75, 4], [2.5, 2], [3.15, 1]],
  },
};

const bridges = {
  shibuya: { harmony: [g, df, e, aSus, f, b, e, a], melody: [[71, 74, 78], [76, 73, 69], [67, 71, 76], [74, 76, 69]] },
  shinjuku: { harmony: [g, gm, df, b, e, a, d6, a], melody: [[74, 78, 79], [82, 79, 76], [78, 74, 69], [71, 74, 78]] },
  akihabara: { harmony: [b, fa, g, a, f, b, e, ga], melody: [[78, 81, 83], [82, 78, 73], [74, 78, 81], [85, 81, 78]] },
  asakusa: { harmony: [g, df, e, aSus, g, gm, a, d6], melody: [[74, 71, 69], [66, 69, 73], [76, 71, 67], [69, 71, 74]] },
  tower: { harmony: [b, g, df, aSus, e, c, a, d6], melody: [[74, 78, 81], [79, 78, 74], [73, 69, 66], [67, 69, 76]] },
  mio: { harmony: [g, df, e, a, bm, b, ga, d6], melody: [[78, 74, 71], [69, 73, 74], [76, 74, 71], [69, 73, 76]] },
  ren: { harmony: [g, gm, df, b, e, ef, a, d6], melody: [[79, 76, 74], [70, 74, 76], [78, 74, 69], [71, 74, 78]] },
  yui: { harmony: [b, g, f, a, d, ef, ga, d6], melody: [[81, 78, 74], [78, 74, 71], [73, 76, 81], [83, 81, 76]] },
  suzu: { harmony: [g, e, df, ga, b, g, gm, d6], melody: [[71, 74, 78], [76, 71, 67], [66, 69, 73], [74, 71, 69]] },
  solo: { harmony: [g, d, e, aSus, b, c, ga, d6], melody: [[71, 74, 78], [76, 74, 69], [67, 71, 74], [69, 74, 76]] },
  mioAfter: { harmony: [g, gm, df, b, ef, e, a, d6], melody: [[74, 78, 79], [82, 79, 76], [78, 74, 73], [71, 74, 78]] },
  renAfter: { harmony: [c, ga, d, b, e, gm, ga, d6], melody: [[76, 79, 83], [81, 79, 74], [78, 76, 73], [74, 78, 83]] },
  yuiAfter: { harmony: [g, f, b, fa, g, ef, ga, d6], melody: [[83, 81, 78], [81, 78, 76], [78, 81, 86], [85, 82, 78]] },
  suzuAfter: { harmony: [g, df, b, fa, b, e, gm, d6], melody: [[71, 74, 78], [76, 73, 69], [71, 74, 78], [82, 78, 73]] },
};

const timing = { shinjuku: [.37, 1.67, 2.67], akihabara: [.25, 1.25, 2.75], asakusa: [.5, 1.95, 3] };

export function composeBar(cue, number) {
  const district = districts[cue.district];
  const heroine = heroines[cue.character];
  const finale = finales[cue.ending];
  const score = finale ?? district;
  const melody = finale ?? heroine ?? district;
  const phraseBar = number % (finale ? 24 : 16);
  const bar = phraseBar % 8;
  const bridge = phraseBar >= 8 && phraseBar < 16 ? bridges[cue.ending ?? cue.district] : null;
  const harmony = bridge?.harmony ?? score.harmony;
  const resolution = finale && phraseBar === 23;
  const [root, ...notes] = harmony[bar];
  const progress = (cue.time - START) / (DAWN - START);
  const closeness = Math.min(1, (cue.affection ?? 0) / 9);
  const chapter = cue.chapter ?? 0;
  const walking = cue.mood === 'map';
  const title = cue.mood === 'title';
  const fuller = Boolean(bridge || (heroine && chapter >= 3));
  const events = [];
  const note = (voice, pitch, offset, length, volume, pan = 0) => events.push({ voice, pitch, offset, length, volume, pan });

  note('bass', root, 0, resolution ? 3.7 : finale ? 2.75 : 1.85, finale ? .077 : .10);
  if (!finale || bridge) for (const offset of (finale ? [2.67] : score.bass.slice(1))) {
    const neighbor = offset >= 3 ? harmony[(bar + 1) % harmony.length][0] : root + 7;
    note('bass', neighbor, offset, .88, .045);
  }

  for (const [index, pitch] of notes.entries()) {
    const voice = (finale && phraseBar >= 8) || (heroine && fuller) ? 'strings' : 'pad';
    note(voice, pitch, index * .075, 3.54, (finale ? .024 : .016 + .012 * progress) * (index === 0 ? .72 : 1), (index - 1.5) * .28);
  }

  for (const [index, [offset, degree]] of score.rhythm.entries()) {
    if (resolution && offset >= 1.5) break;
    if (title && index % 2) continue;
    const octave = index % 2 === 0 && degree < 4 ? 12 : 0;
    note(score.backing, notes[degree - 1] + octave, offset, 1.16, walking ? .052 : .034, index % 2 ? .37 : -.37);
  }

  if (!finale && !title) {
    const level = (walking ? .058 : .03) * (1 - progress * .64);
    for (const [index, [offset, style]] of score.drums.entries()) {
      events.push({ style, offset, volume: level * (index % 2 === 0 ? .72 : 1) });
    }
    if (walking && district.bpm >= 80 && fuller) events.push({ style: 'kick', offset: 0, volume: level * .55 });
  }

  const pitches = bridge ? bridge.melody[bar] ?? [notes[2] + 12, notes[bar % 3] + 12, notes[3] + 12] : melody.melody[bar];
  const offsets = timing[cue.ending === 'solo' ? 'shibuya' : cue.district] ?? [.22, 1.55, 2.6];
  const level = finale ? .11 : heroine ? .076 + .031 * closeness : .076;
  const phrase = resolution ? [[.4, 74, 3.15]] : pitches ? pitches.map((pitch, index) => [
    offsets[index], pitch, index === pitches.length - 1 ? 1.32 : .82,
  ]) : heroine.motif;
  for (const [index, [offset, pitch, length]] of phrase.entries()) {
    note(melody.lead, melody.lead === 'cello' ? pitch - 12 : pitch, offset, length, level * (index === 1 ? .83 : 1), .03);
  }

  const counter = (finale ?? heroine)?.counter;
  if (counter && !resolution && (finale || closeness >= .30)) {
    const low = counter === 'cello';
    const pitch = low ? notes[1] - 12 : notes[bar % 2 + 1] + 12;
    const volume = finale ? .046 : .023 + closeness * .027;
    note(counter, pitch, low ? .9 : 2.05, low ? 2.35 : 1.24, volume, -.4);
    if (fuller && bar % 2 === 0) note(counter, low ? notes[2] - 12 : notes[2] + 12, 3.22, 1.17, volume * .76, .37);
  }

  if (!resolution && (progress > .53 || finale) && (bar % 4 === 2 || phraseBar === 21)) {
    note('glass', notes[3] + 12, 3.33, 1.85, .032, .48);
  }
  if (!resolution && (bridge || (finale && phraseBar >= 16)) && bar % 2 === 1) {
    note(finale ? 'vibes' : 'glass', notes[2] + 12, .15, 1.4, .032, .52);
    note(finale ? 'vibes' : 'glass', notes[3] + 12, 1.8, 1.25, .025, .43);
  }
  const bpm = finale ? score.bpm - (resolution ? 4 : 0) : district.bpm - 6 * progress - (heroine || title ? 2 : 0);
  return { events, bpm, brightness: finale ? 4900 + (bridge ? 750 : 0) : 7200 - 2050 * progress + 450 * closeness };
}
