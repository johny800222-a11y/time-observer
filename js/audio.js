/* 時空觀測器・音效（WebAudio 即時合成，不需要音檔）與語音朗讀 */
window.SFX = (function () {
  'use strict';
  let ctx = null, on = true;

  function ac() {
    if (!ctx) {
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; }
    }
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    return ctx;
  }

  function tone(freq, dur, type = 'sine', vol = 0.06, when = 0, slideTo = null) {
    if (!on) return;
    const c = ac(); if (!c) return;
    const t = c.currentTime + when;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(c.destination);
    o.start(t); o.stop(t + dur + 0.03);
  }

  return {
    setOn(v) { on = !!v; },
    unlock() { ac(); },
    blip()    { tone(900 + Math.random() * 140, 0.03, 'square', 0.012); },
    click()   { tone(660, 0.07, 'triangle', 0.05); },
    open()    { tone(440, 0.12, 'sine', 0.05); tone(660, 0.14, 'sine', 0.04, 0.06); },
    clue()    { [784, 988, 1175].forEach((f, i) => tone(f, 0.16, 'triangle', 0.05, i * 0.07)); },
    success() { [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.24, 'triangle', 0.06, i * 0.09)); },
    warn()    { tone(220, 0.38, 'sawtooth', 0.05, 0, 110); tone(233, 0.38, 'square', 0.025, 0.05, 117); },
    warp()    { tone(110, 1.7, 'sawtooth', 0.03, 0, 1500); tone(170, 1.7, 'sine', 0.04, 0.1, 2300); },
    card()    { [1047, 1319, 1568, 2093].forEach((f, i) => tone(f, 0.2, 'sine', 0.04, i * 0.06)); }
  };
})();

window.VOICE = (function () {
  'use strict';
  const ok = 'speechSynthesis' in window;
  let voices = [];
  if (ok) {
    const load = () => { try { voices = speechSynthesis.getVoices(); } catch (e) { voices = []; } };
    load();
    try { speechSynthesis.addEventListener('voiceschanged', load); } catch (e) {}
  }
  return {
    supported: ok,
    speak(text) {
      if (!ok) return;
      try {
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'zh-TW';
        const v = voices.find(v => /zh[-_]TW/i.test(v.lang)) || voices.find(v => /^zh/i.test(v.lang));
        if (v) u.voice = v;
        u.rate = 1;
        speechSynthesis.speak(u);
      } catch (e) {}
    },
    stop() { if (ok) try { speechSynthesis.cancel(); } catch (e) {} }
  };
})();
