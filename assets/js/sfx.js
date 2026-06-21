/* ============================================================
   SFX — Synthesized Sound Effects via Web Audio API
   Tidak perlu file audio eksternal.
   ============================================================ */

const SFX = (function () {
  "use strict";

  let ctx = null;
  let muted = false;
  let master = null;          // master volume bus
  const MASTER_VOLUME = 1.0;  // volume keseluruhan (penuh)

  function getCtx() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      // Master gain langsung ke speaker (tanpa kompresor agar tidak teredam)
      master = ctx.createGain();
      master.gain.value = MASTER_VOLUME;
      master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function out() { return master || getCtx().destination; }

  // ---------- Helper: play a tone ----------
  function playTone(freq, type, duration, gainVal, startDelay) {
    if (muted) return;
    const c = getCtx();
    const t = c.currentTime + (startDelay || 0);
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type || "sine";
    osc.frequency.setValueAtTime(freq, t);
    // attack lembut supaya tidak ada "klik" di awal nada
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(gainVal || 0.18, t + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0008, t + duration);
    osc.connect(gain);
    gain.connect(out());
    osc.start(t);
    osc.stop(t + duration + 0.02);
  }

  // ---------- Helper: noise burst ----------
  function playNoise(duration, gainVal, startDelay) {
    if (muted) return;
    const c = getCtx();
    const t = c.currentTime + (startDelay || 0);
    const bufSize = c.sampleRate * duration;
    const buf = c.createBuffer(1, bufSize, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource();
    src.buffer = buf;
    const gain = c.createGain();
    gain.gain.setValueAtTime(gainVal || 0.06, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    const filter = c.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 800;
    filter.Q.value = 1.5;
    src.connect(filter);
    filter.connect(gain);
    gain.connect(out());
    src.start(t);
    src.stop(t + duration);
  }

  // =========================================================
  //  PUBLIC METHODS
  // =========================================================
  const api = {
    /** Tebakan benar — ding naik */
    correct() {
      playTone(880, "sine", 0.15, 0.15, 0);
      playTone(1100, "sine", 0.2, 0.12, 0.08);
    },

    /** Tebakan salah — buzz rendah */
    wrong() {
      playTone(180, "sawtooth", 0.22, 0.1, 0);
      playNoise(0.12, 0.05, 0.05);
    },

    /** Kata selesai / menang — melodi 4 nada */
    win() {
      playTone(523, "sine", 0.14, 0.15, 0);       // C5
      playTone(659, "sine", 0.14, 0.15, 0.12);     // E5
      playTone(784, "sine", 0.14, 0.15, 0.24);     // G5
      playTone(1047, "sine", 0.35, 0.18, 0.36);    // C6
    },

    /** Kalah — nada turun sedih */
    lose() {
      playTone(440, "sine", 0.25, 0.12, 0);        // A4
      playTone(370, "sine", 0.25, 0.12, 0.2);      // F#4
      playTone(294, "sine", 0.4, 0.14, 0.4);       // D4
    },

    /** Mulai sesi — jingle pendek */
    start() {
      playTone(523, "triangle", 0.12, 0.12, 0);    // C5
      playTone(659, "triangle", 0.12, 0.12, 0.1);  // E5
      playTone(784, "triangle", 0.12, 0.12, 0.2);  // G5
      playTone(1047, "triangle", 0.22, 0.14, 0.3); // C6
      playTone(784, "triangle", 0.12, 0.1, 0.42);  // G5
      playTone(1047, "triangle", 0.3, 0.16, 0.5);  // C6
    },

    /** Lewati kata — nada netral */
    skip() {
      playTone(600, "triangle", 0.1, 0.1, 0);
      playTone(500, "triangle", 0.15, 0.08, 0.08);
    },

    /** Huruf duplikat — klik pendek */
    duplicate() {
      playTone(300, "square", 0.06, 0.06, 0);
    },

    /** Timer tick saat warning — tick halus */
    tick() {
      playTone(1200, "sine", 0.04, 0.07, 0);
      playNoise(0.03, 0.03, 0.02);
    },

    /** Waktu habis */
    timeUp() {
      playTone(500, "sawtooth", 0.2, 0.1, 0);
      playTone(350, "sawtooth", 0.3, 0.12, 0.15);
      playNoise(0.2, 0.05, 0.3);
    },

    /** Sesi selesai */
    sessionEnd() {
      playTone(784, "sine", 0.2, 0.12, 0);
      playTone(659, "sine", 0.2, 0.12, 0.18);
      playTone(784, "sine", 0.2, 0.12, 0.36);
      playTone(1047, "sine", 0.45, 0.16, 0.54);
    },

    /** Klik tombol keyboard — feedback ringan */
    keyClick() {
      playTone(700, "sine", 0.03, 0.05, 0);
    },

    /** Pilih opsi (arah terjemahan) — dua nada lembut naik */
    select() {
      playTone(660, "triangle", 0.08, 0.09, 0);
      playTone(990, "triangle", 0.12, 0.09, 0.06);
    },

    /** Atur volume keseluruhan (0..1) */
    setVolume(v) {
      getCtx();
      if (master) master.gain.value = Math.max(0, Math.min(1, v));
    },

    /** Toggle mute */
    toggleMute() {
      muted = !muted;
      return muted;
    },

    isMuted() { return muted; },

    /** Wajib dipanggil dari user gesture untuk unlock AudioContext */
    unlock() {
      const c = getCtx();
      if (c.state === "suspended") c.resume();
      // Mainkan buffer hening sekejap supaya audio benar-benar aktif (terutama iOS/Safari)
      try {
        const buf = c.createBuffer(1, 1, c.sampleRate);
        const src = c.createBufferSource();
        src.buffer = buf;
        src.connect(out());
        src.start(0);
      } catch (e) {}
    }
  };

  // Auto-unlock pada interaksi pertama pengguna (klik/tap/tombol) di mana pun.
  // Browser memblokir audio sampai ada gesture asli; ini memastikan suara aktif.
  (function attachAutoUnlock() {
    const events = ["pointerdown", "touchend", "keydown", "click"];
    function once() {
      api.unlock();
      events.forEach((ev) => window.removeEventListener(ev, once, true));
    }
    events.forEach((ev) => window.addEventListener(ev, once, true));
  })();

  return api;
})();
