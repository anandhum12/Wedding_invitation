import { useCallback, useEffect, useRef, useState } from 'react';

/*
 * Background music — starts when the guest clicks "Open Invitation".
 *
 * Put the song at  public/music.mp3  and it is played on loop.
 * If that file is missing or can't be played, a gentle generated Carnatic-style
 * ambience is used instead (tanpura drone + veena-like plucks in raga Mohanam).
 */
const MUSIC_FILE = `${import.meta.env.BASE_URL}music.mp3`;
const SONG_VOLUME = 0.7;

const SA = 146.83; // D3
const MOHANAM = [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2, 9 / 4, 5 / 2, 3];
const TANPURA = [SA * 0.75, SA, SA, SA / 2];

function buildSynth() {
  const AC = window.AudioContext || window.webkitAudioContext;
  const ctx = new AC();
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  const bus = ctx.createGain();
  bus.connect(master);

  // simple feedback-delay "temple hall" reverb
  const delay = ctx.createDelay(1);
  delay.delayTime.value = 0.37;
  const fb = ctx.createGain();
  fb.gain.value = 0.38;
  const tone = ctx.createBiquadFilter();
  tone.type = 'lowpass';
  tone.frequency.value = 2200;
  const wet = ctx.createGain();
  wet.gain.value = 0.4;
  bus.connect(delay);
  delay.connect(tone);
  tone.connect(fb);
  fb.connect(delay);
  tone.connect(wet);
  wet.connect(master);

  const pluck = (freq, t, { type = 'sawtooth', dur = 3, gain = 0.08, cutoff = 1400 } = {}) => {
    const env = ctx.createGain();
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(cutoff * 2.2, t);
    lp.frequency.exponentialRampToValueAtTime(cutoff * 0.4, t + dur);
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(gain, t + 0.012);
    env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    lp.connect(env);
    env.connect(bus);
    [0, 4].forEach((cents) => {
      const o = ctx.createOscillator();
      o.type = type;
      o.frequency.value = freq;
      o.detune.value = cents;
      o.connect(lp);
      o.start(t);
      o.stop(t + dur + 0.05);
    });
  };

  let nextDrone = 0;
  let droneStep = 0;
  let nextNote = 0;
  let noteIdx = 5;
  let timer = null;

  const schedule = () => {
    const ahead = ctx.currentTime + 0.4;
    while (nextDrone < ahead) {
      pluck(TANPURA[droneStep % 4], nextDrone, { dur: 3.4, gain: 0.05, cutoff: 900 });
      droneStep += 1;
      nextDrone += 0.85;
    }
    while (nextNote < ahead) {
      if (Math.random() > 0.28) {
        noteIdx = Math.min(MOHANAM.length - 1, Math.max(0, noteIdx + [-2, -1, -1, 1, 1, 2][Math.floor(Math.random() * 6)]));
        pluck(SA * 2 * MOHANAM[noteIdx], nextNote, { type: 'triangle', dur: 2.6, gain: 0.07, cutoff: 2600 });
        if (Math.random() > 0.75) {
          const grace = Math.min(MOHANAM.length - 1, noteIdx + 1);
          pluck(SA * 2 * MOHANAM[grace], nextNote + 0.42, { type: 'triangle', dur: 2, gain: 0.045, cutoff: 2400 });
        }
      }
      nextNote += 1.7 * (0.75 + Math.random() * 0.6);
    }
  };

  return {
    ctx,
    start() {
      ctx.resume();
      const now = ctx.currentTime;
      nextDrone = now + 0.05;
      nextNote = now + 1.2;
      master.gain.cancelScheduledValues(now);
      master.gain.setTargetAtTime(0.5, now, 1.2);
      clearInterval(timer);
      timer = setInterval(schedule, 120);
      schedule();
    },
    stop() {
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setTargetAtTime(0, now, 0.35);
      clearInterval(timer);
    },
    dispose() {
      clearInterval(timer);
      ctx.close();
    },
  };
}

function buildEngine() {
  const audio = new Audio(MUSIC_FILE);
  audio.loop = true;
  audio.preload = 'auto';
  let synth = null;
  let useSynth = false;
  let fade = null;

  const fadeTo = (target, done) => {
    clearInterval(fade);
    fade = setInterval(() => {
      const next = audio.volume + (target > audio.volume ? 0.05 : -0.05);
      if ((target > audio.volume && next >= target) || (target <= audio.volume && next <= target)) {
        audio.volume = Math.max(0, Math.min(1, target));
        clearInterval(fade);
        done?.();
      } else {
        audio.volume = Math.max(0, Math.min(1, next));
      }
    }, 60);
  };

  const fallback = () => {
    useSynth = true;
    synth = synth || buildSynth();
    synth.start();
  };

  return {
    start() {
      if (useSynth) return synth.start();
      audio.volume = 0;
      audio
        .play()
        .then(() => fadeTo(SONG_VOLUME))
        .catch(fallback);
    },
    stop() {
      if (useSynth) return synth.stop();
      fadeTo(0, () => audio.pause());
    },
    dispose() {
      clearInterval(fade);
      audio.pause();
      synth?.dispose();
    },
  };
}

export function useAmbientMusic() {
  const [playing, setPlaying] = useState(false);
  const engine = useRef(null);
  const get = () => (engine.current ??= buildEngine());

  // Must be called from a click handler so browsers allow audio playback.
  const play = useCallback(() => {
    get().start();
    setPlaying(true);
  }, []);

  const toggle = useCallback(() => {
    setPlaying((p) => {
      if (p) get().stop();
      else get().start();
      return !p;
    });
  }, []);

  useEffect(() => () => engine.current?.dispose(), []);

  return { playing, play, toggle };
}
