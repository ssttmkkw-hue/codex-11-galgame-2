import { composeBar } from './score.js';
import { START } from './story.js';

const instruments = {
  felt: { harmonics: [1, .15, .09, .018], attack: .025, decay: 2.2, release: .16 },
  electric: { harmonics: [1, .28, .075, .095, .02], attack: .015, decay: 1.65, release: .16 },
  guitar: { harmonics: [1, .36, .25, .11, .043, .027], attack: .012, decay: 2.25, release: .12 },
  pluck: { harmonics: [1, .21, .32, .06, .13, .023, .038], attack: .008, decay: 3.75, release: .095 },
  bell: { harmonics: [1, .135, .025], overtone: [4.012, .15], attack: .013, decay: 2.1, release: .24 },
  glass: { harmonics: [1, .07, .085], overtone: [2.997, .07], attack: .056, decay: 2.45, release: .32 },
  flute: { harmonics: [1, .14, .065, .014], attack: .14, sustain: .7, release: .33, vibrato: 2.7 },
  cello: { harmonics: [1, .56, .38, .19, .11, .065, .043], attack: .21, sustain: .67, release: .32, vibrato: 3.8 },
  pad: { harmonics: [1, .17, .045], overtone: [1.003, .41], attack: .54, sustain: .67, release: .7 },
  strings: { harmonics: [1, .36, .25, .075, .038], overtone: [1.004, .36], attack: .39, sustain: .72, release: .58 },
  bass: { harmonics: [1, .22, .06], attack: .025, decay: 1.35, release: .15 },
};

const drums = {
  tick: { length: .044, frequency: 5350, q: .9 },
  rim: { length: .074, frequency: 1420, q: 5 },
  brush: { length: .20, frequency: 2860, q: .8 },
  air: { length: .24, frequency: 2000, q: .7 },
};

const hz = (note) => 440 * 2 ** ((note - 69) / 12);
const floor = .00001;
const sectionKey = ({ district, character, ending }) => ending ? `dawn:${ending}` : character ?? district;

export class NightMusic {
  constructor() {
    this.cue = { district: 'shibuya', character: null, time: START, mood: 'title', affection: 0, ending: null };
    this.level = .65;
  }

  async start() {
    try {
      if (!this.ctx) this.connect(new (window.AudioContext || window.webkitAudioContext)());
      if (this.ctx.state !== 'running') await this.ctx.resume();
      if (this.timer === undefined) this.timer = window.setInterval(() => this.schedule(), 35);
      this.schedule();
      return this.ctx.state === 'running';
    } catch {
      return false;
    }
  }

  connect(ctx) {
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.master.gain.value = this.level ** 1.4 * .8;
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -19;
    limiter.knee.value = 16;
    limiter.ratio.value = 3;
    this.master.connect(limiter).connect(ctx.destination);

    this.room = ctx.createConvolver();
    const response = ctx.createBuffer(2, Math.floor(ctx.sampleRate * 1.85), ctx.sampleRate);
    for (let channel = 0; channel < 2; channel++) {
      const samples = response.getChannelData(channel);
      let seed = 62417 * (channel + 1);
      const preDelay = Math.floor(ctx.sampleRate * (.024 + .007 * channel));
      for (let i = preDelay; i < samples.length; i++) {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        samples[i] = (seed / 2147483648 - 1) * (1 - i / samples.length) ** 3.4;
      }
    }
    this.room.buffer = response;
    const wet = ctx.createGain();
    wet.gain.value = .24;
    this.room.connect(wet).connect(this.master);

    this.waves = Object.fromEntries(Object.entries(instruments).map(([voice, { harmonics }]) => [
      voice, ctx.createPeriodicWave(new Float32Array(harmonics.length + 1), Float32Array.of(0, ...harmonics)),
    ]));
    this.noise = ctx.createBuffer(1, Math.floor(ctx.sampleRate * .3), ctx.sampleRate);
    const noise = this.noise.getChannelData(0);
    for (let i = 0; i < noise.length; i++) noise[i] = Math.random() * 2 - 1;
    this.next = ctx.currentTime + .065;
  }

  setCue(cue) {
    this.cue = cue;
  }

  volume(level) {
    this.level = level;
    if (!this.ctx) return;
    this.master.gain.setTargetAtTime(level ** 1.4 * .8, this.ctx.currentTime, .065);
  }

  changeSection(at, key) {
    const old = this.section;
    if (old) {
      old.bus.gain.setTargetAtTime(0, at, .105);
      // Any already scheduled note releases safely through the reverb.
      window.setTimeout(() => {
        old.filter.disconnect();
        old.bus.disconnect();
      }, 1900);
    }
    const bus = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = .22;
    filter.frequency.value = 7200;
    bus.gain.setValueAtTime(0, at);
    bus.gain.linearRampToValueAtTime(1, at + (old ? .21 : .11));
    filter.connect(bus);
    bus.connect(this.master);
    bus.connect(this.room);
    this.section = { key, filter, bus, bar: 0, beat: 0, bpm: old?.bpm };
  }

  tone(bus, { voice, pitch, length, volume, pan }, at, beatLength) {
    const ctx = this.ctx;
    const instrument = instruments[voice];
    const { attack, sustain, decay, release, overtone, vibrato } = instrument;
    const duration = Math.max(attack + .075, length * beatLength);
    const finish = at + duration + release;
    const amp = ctx.createGain();
    amp.gain.setValueAtTime(floor, at);
    amp.gain.exponentialRampToValueAtTime(volume, at + attack);
    if (sustain) {
      amp.gain.exponentialRampToValueAtTime(volume * sustain, at + Math.min(duration, attack + .22));
      amp.gain.setValueAtTime(volume * sustain, at + duration);
    } else {
      amp.gain.exponentialRampToValueAtTime(Math.max(floor * 2, volume * Math.exp(-duration * decay)), at + duration);
    }
    amp.gain.exponentialRampToValueAtTime(floor, finish);

    const stereo = ctx.createStereoPanner();
    stereo.pan.value = pan;
    amp.connect(stereo).connect(bus);
    const oscillator = ctx.createOscillator();
    oscillator.setPeriodicWave(this.waves[voice]);
    oscillator.frequency.value = hz(pitch);
    oscillator.connect(amp);
    oscillator.start(at);
    oscillator.stop(finish + .015);
    oscillator.onended = () => {
      oscillator.disconnect();
      amp.disconnect();
      stereo.disconnect();
    };
    if (overtone) {
      const shimmer = ctx.createOscillator();
      const mix = ctx.createGain();
      shimmer.frequency.value = hz(pitch) * overtone[0];
      mix.gain.setValueAtTime(overtone[1], at);
      if (!sustain) mix.gain.setTargetAtTime(.001, at + attack, .33);
      shimmer.connect(mix).connect(amp);
      shimmer.start(at);
      shimmer.stop(finish);
      shimmer.onended = () => {
        shimmer.disconnect();
        mix.disconnect();
      };
    }
    if (vibrato) {
      const lfo = ctx.createOscillator();
      const depth = ctx.createGain();
      lfo.frequency.value = 4.8;
      depth.gain.setValueAtTime(0, at);
      depth.gain.setTargetAtTime(vibrato, at + attack, .18);
      lfo.connect(depth).connect(oscillator.detune);
      lfo.start(at);
      lfo.stop(finish);
      lfo.onended = () => {
        lfo.disconnect();
        depth.disconnect();
      };
    }
  }

  drum(bus, { style, volume }, at) {
    const ctx = this.ctx;
    const { length, frequency, q } = drums[style];
    const source = ctx.createBufferSource();
    source.buffer = this.noise;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = frequency;
    filter.Q.value = q;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(floor, at);
    gain.gain.linearRampToValueAtTime(volume, at + .01);
    gain.gain.exponentialRampToValueAtTime(floor, at + length);
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
    if (this.ctx.state !== 'running') return;
    const now = this.ctx.currentTime;
    if (this.next < now) this.next = now + .05;

    // Schedule one beat at a time so scene changes can crossfade on the pulse.
    while (this.next <= now + .14) {
      this.next += this.playBeat(this.next);
    }
  }

  playBeat(at) {
    const key = sectionKey(this.cue);
    if (key !== this.section?.key) this.changeSection(at, key);
    const section = this.section;
    if (section.beat === 0) {
      const { events, bpm, brightness } = composeBar(this.cue, section.bar);
      section.bpm = section.bpm ? section.bpm + (bpm - section.bpm) * .58 : bpm;
      section.events = events;
      section.filter.frequency.setTargetAtTime(brightness, at, .4);
    }

    const beatLength = 60 / section.bpm;
    for (const event of section.events) {
      if (Math.floor(event.offset) !== section.beat) continue;
      const start = at + (event.offset - section.beat) * beatLength;
      if (event.style) this.drum(section.filter, event, start);
      else this.tone(section.filter, event, start, beatLength);
    }
    section.beat = (section.beat + 1) % 4;
    if (section.beat === 0) section.bar += 1;
    return beatLength;
  }
}
