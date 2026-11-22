import { DAWN, START } from './story.js';

const D = [50, 57, 61, 66];
const A = [45, 57, 61, 64];
const Bm = [47, 57, 62, 66];
const Fsm = [42, 54, 61, 64];
const G = [43, 54, 57, 59];
const Em = [52, 55, 59, 66];

const themes = {
  shibuya: {
    bpm: 76, voice: 'piano', chords: [Bm, G, D, A],
    melody: [[74, 73, 69], [71, 69, 66], [69, 73, 78], [76, 73, 71]],
    arp: [[.5, 1], [1.5, 2], [2.5, 3], [3.5, 2]], bass: [0, 2.5], drums: 'rim',
  },
  shinjuku: {
    bpm: 83, voice: 'guitar', chords: [Em, A, D, Bm],
    melody: [[71, 74, 76], [73, 71, 69], [66, 69, 73], [71, 69, 66]],
    arp: [[.67, 2], [1.67, 1], [2.67, 3], [3.67, 2]], bass: [0, 1.67, 3], drums: 'brush',
  },
  akihabara: {
    bpm: 88, voice: 'bell', chords: [Fsm, G, D, A],
    melody: [[73, 76, 73], [74, 71, 69], [78, 76, 73], [76, 73, 69]],
    arp: [[.5, 2], [1, 1], [1.75, 3], [2.5, 2], [3.25, 1]], bass: [0, 1.5, 3], drums: 'tick',
  },
  asakusa: {
    bpm: 66, voice: 'felt', chords: [D, G, Em, A],
    melody: [[69, 66, 64], [66, 69, 71], [67, 66, 64], [64, 69, 73]],
    arp: [[.8, 1], [2, 2], [3, 3]], bass: [0, 2.75], drums: 'air',
  },
  tower: {
    bpm: 72, voice: 'glass', chords: [G, D, Em, A],
    melody: [[67, 71, 74], [73, 69, 66], [67, 71, 76], [76, 73, 69]],
    arp: [[.5, 2], [1.5, 3], [2.5, 1], [3.5, 2]], bass: [0, 2], drums: 'air',
  },
};

const heroineThemes = {
  mio: { voice: 'felt', chordOrder: [0, 1, 2, 3], motif: [[.25, 74, .78], [1.25, 73, .4], [1.75, 69, 1.65]], reply: [66, 69, 74] },
  ren: { voice: 'guitar', chordOrder: [0, 1, 3, 2], motif: [[.67, 71, .42], [1.33, 74, .62], [2.17, 76, .8], [3.17, 74, .6]], reply: [73, 69, 66] },
  yui: { voice: 'bell', chordOrder: [0, 1, 3, 2], motif: [[.25, 73, .35], [.75, 76, .32], [1.25, 73, .65], [2.5, 81, .9]], reply: [74, 71, 69] },
  suzu: { voice: 'flute', chordOrder: [0, 2, 1, 0], motif: [[.5, 69, 1.3], [2, 66, .72], [3, 64, .8]], reply: [67, 66, 69] },
};

const synth = {
  piano: { partials: [[1, 1], [2, .24], [3, .07]], attack: .012, decay: 2.2 },
  felt: { partials: [[1, 1], [2, .11], [3, .04]], attack: .025, decay: 2.15 },
  guitar: { partials: [[1, 1], [2, .26], [3, .09], [4, .045]], attack: .014, decay: 1.9 },
  bell: { partials: [[1, 1], [2, .17], [3, .06], [4.01, .08]], attack: .018, decay: 2.4 },
  glass: { partials: [[1, 1], [2, .09], [3.002, .06]], attack: .055, decay: 2.8 },
  flute: { partials: [[1, 1], [2, .12], [3, .06]], attack: .14, sustain: .7, release: .36 },
  pad: { partials: [[1, 1], [1.002, .35], [2, .12]], attack: .55, sustain: .65, release: .65 },
  bass: { partials: [[1, 1], [2, .18]], attack: .025, decay: 1.25 },
};

const hz = (note) => 440 * 2 ** ((note - 69) / 12);
const lerp = (a, b, x) => a + (b - a) * x;
const beatPattern = [0, 1.5, 2.5];
const districts = Object.keys(themes);

export class NightMusic {
  constructor() {
    this.cue = { district: 'shibuya', character: null, time: START, mood: 'title', affection: 0 };
    this.level = .65;
    this.beat = 0;
    this.bpm = 76;
    this.bar = 0;
  }

  async start() {
    try {
      if (!this.ctx) this.connect(new (window.AudioContext || window.webkitAudioContext)());
      if (this.ctx.state !== 'running') await this.ctx.resume();
      if (this.timer === undefined) this.timer = window.setInterval(() => this.schedule(), 50);
      return this.ctx.state === 'running';
    } catch {
      return false;
    }
  }

  connect(ctx) {
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.master.gain.value = this.level ** 1.45 * .65;
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -22;
    limiter.knee.value = 20;
    limiter.ratio.value = 3;
    this.master.connect(limiter).connect(ctx.destination);
    const room = ctx.createConvolver();
    room.buffer = ctx.createBuffer(2, Math.floor(ctx.sampleRate * 1.65), ctx.sampleRate);
    for (let channel = 0; channel < 2; channel++) {
      const samples = room.buffer.getChannelData(channel);
      let seed = 62417 * (channel + 1);
      for (let i = 0; i < samples.length; i++) {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        samples[i] = (seed / 2147483648 - 1) * (1 - i / samples.length) ** 3;
      }
    }
    const wet = ctx.createGain();
    wet.gain.value = .2;
    room.connect(wet).connect(this.master);
    this.tracks = Object.fromEntries(districts.map((id) => {
      const bus = ctx.createGain();
      bus.gain.value = id === this.cue.district ? 1 : 0;
      bus.connect(this.master);
      bus.connect(room);
      return [id, bus];
    }));
    this.noise = ctx.createBuffer(1, Math.floor(ctx.sampleRate * .3), ctx.sampleRate);
    const noise = this.noise.getChannelData(0);
    for (let i = 0; i < noise.length; i++) noise[i] = Math.random() * 2 - 1;
    this.next = ctx.currentTime + .08;
    this.active = this.cue;
  }

  volume(level) {
    this.level = level;
    if (!this.ctx) return;
    this.master.gain.setTargetAtTime(level ** 1.45 * .65, this.ctx.currentTime, .09);
  }

  setCue(cue) {
    this.cue = cue;
  }

  tone(bus, voice, note, at, length, level, pan = 0) {
    const ctx = this.ctx;
    const { partials, attack, decay, release = .09, sustain } = synth[voice];
    const duration = Math.max(.11, length);
    const finish = at + duration + release;
    const amp = ctx.createGain();
    amp.gain.setValueAtTime(.00003, at);
    amp.gain.exponentialRampToValueAtTime(level, at + attack);
    if (sustain) {
      const hold = at + Math.max(duration, attack + .03);
      amp.gain.exponentialRampToValueAtTime(level * sustain, hold);
      amp.gain.exponentialRampToValueAtTime(.00003, hold + release);
    } else {
      const tail = Math.max(at + attack + .025, finish);
      amp.gain.exponentialRampToValueAtTime(Math.max(.00004, level * Math.exp(-duration * decay)), tail - .055);
      amp.gain.exponentialRampToValueAtTime(.00003, tail);
    }
    const stereo = ctx.createStereoPanner();
    stereo.pan.value = pan;
    amp.connect(stereo).connect(bus);
    const stop = sustain ? at + Math.max(duration, attack + .03) + release : finish;
    partials.forEach(([multiple, weight], index) => {
      const osc = ctx.createOscillator();
      const mix = ctx.createGain();
      osc.frequency.value = hz(note) * multiple;
      mix.gain.value = weight;
      if (index > 0 && !sustain) mix.gain.setTargetAtTime(weight * .1, at + attack, .18 / index);
      osc.connect(mix).connect(amp);
      osc.start(at);
      osc.stop(stop + .03);
      osc.onended = () => {
        osc.disconnect();
        mix.disconnect();
        if (index === partials.length - 1) {
          amp.disconnect();
          stereo.disconnect();
        }
      };
    });
  }

  drum(bus, style, at, level) {
    const ctx = this.ctx;
    const source = ctx.createBufferSource();
    source.buffer = this.noise;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = { brush: 2800, rim: 1100, tick: 4800, air: 1900 }[style];
    filter.Q.value = style === 'rim' ? 4 : 1.3;
    const length = { brush: .14, rim: .055, tick: .035, air: .18 }[style];
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(.0001, at);
    gain.gain.linearRampToValueAtTime(level, at + .012);
    gain.gain.exponentialRampToValueAtTime(.0001, at + length);
    source.connect(filter).connect(gain).connect(bus);
    source.start(at);
    source.stop(at + length);
    source.onended = () => {
      source.disconnect();
      filter.disconnect();
      gain.disconnect();
    };
  }

  schedule() {
    const ctx = this.ctx;
    if (ctx.state !== 'running') return;
    const now = ctx.currentTime;
    if (this.next < now) {
      this.next = now + .06;
      this.beat = 0;
    }
    if (this.next > now + .16) return;

    if (this.beat === 0) {
      const leaving = this.active.district !== this.cue.district;
      if (leaving || this.active.mood !== this.cue.mood || this.active.character !== this.cue.character) this.bar = 0;
      if (leaving) {
        for (const id of districts) this.tracks[id].gain.setTargetAtTime(id === this.cue.district ? 1 : 0, this.next, .48);
      }
      this.active = this.cue;
      this.playBar(this.next);
      this.bar += 1;
      this.next += this.barDuration;
    }
  }

  playBar(at) {
    const { district, character, mood, time, affection } = this.active;
    const theme = themes[district];
    const finale = mood === 'ending';
    const motif = heroineThemes[character];
    const progress = (time - START) / (DAWN - START);
    const targetBpm = theme.bpm - 6 * progress - (finale ? 6 : 0);
    this.bpm = lerp(this.bpm, targetBpm, .38);
    const beat = 60 / this.bpm;
    this.barDuration = 4 * beat;
    const bar = this.bar % 4;
    const bus = this.tracks[district];
    const chord = finale && motif ? theme.chords[motif.chordOrder[bar]] : theme.chords[bar];
    const note = (voice, pitch, offset, length, volume, pan) =>
      this.tone(bus, voice, pitch, at + offset * beat, length * beat, volume, pan);
    const intimate = mood === 'scene' && Boolean(motif);
    const closeness = Math.min(1, affection / 9);

    chord.slice(1).forEach((pitch, i) => {
      note('pad', pitch, i * .07, 3.65, .025 + progress * .012, (i - 1) * .4);
      if (finale) note('pad', pitch - 12, i * .07, 3.65, .016, (1 - i) * .48);
    });
    for (const [i, offset] of theme.bass.entries()) {
      note('bass', i === 0 ? chord[0] : chord[1] - 12, offset, 1.25, i === 0 ? .13 : .065, -.04);
    }
    for (const [i, [offset, degree]] of theme.arp.entries()) {
      note(theme.voice, chord[degree] + (i % 2 === 0 ? 12 : 0), offset, 1.24, intimate ? .034 : .061, i % 2 ? .36 : -.34);
    }
    if (!finale) {
      const drumLevel = (intimate ? .027 : .06) * (1 - progress * .58);
      for (const offset of [1, 3]) this.drum(bus, theme.drums, at + offset * beat, drumLevel);
    }

    if (motif && (intimate || finale)) {
      const level = finale ? .13 : .075 + .042 * closeness;
      if (bar === 0 || bar === 2) {
        for (const [offset, pitch, length] of motif.motif) {
          const variation = bar === 2 && offset >= 1.75 ? -2 : 0;
          note(motif.voice, pitch + variation, offset, length, level, .08);
        }
      } else {
        motif.reply.forEach((pitch, i) => note(motif.voice, pitch, beatPattern[i], i === 2 ? 1.3 : .74, level * .89, .08));
      }
      if (finale || closeness > .48) note('glass', chord[bar === 3 ? 1 : 2] + 12, 3.12, 1.3, .046, -.44);
    } else {
      theme.melody[bar].forEach((pitch, i) => {
        const voice = finale ? 'flute' : theme.voice;
        note(voice, pitch, beatPattern[i] + (district === 'shinjuku' ? .16 : .02), i === 2 ? 1.36 : .78, .085, .12);
      });
    }
  }
}
