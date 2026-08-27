let _audioCtx = null;

export function getAudioCtx() {
  try {
    if (!_audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      _audioCtx = new Ctx();
    }
    if (_audioCtx.state === 'suspended') _audioCtx.resume();
    return _audioCtx;
  } catch {
    return null;
  }
}

export function unlockAudio() {
  try {
    const ctx = getAudioCtx();
    if (ctx && ctx.state === 'suspended') ctx.resume();
  } catch {
    /* ignore */
  }
}

if (typeof window !== 'undefined') {
  ['pointerdown', 'touchend', 'keydown'].forEach((evt) =>
    window.addEventListener(evt, unlockAudio, { once: true, passive: true })
  );
}

export function playBeep(freq = 660, duration = 0.12) {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.02);
  } catch {
    /* audio not available */
  }
}

export function playClick() {
  playBeep(1500, 0.025);
}

export function vibrate(pattern) {
  try {
    if (navigator.vibrate) navigator.vibrate(pattern);
  } catch {
    /* not available */
  }
}

export function speak(text, lang, locales) {
  try {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = (lang && locales[lang]) || 'it-IT';
    u.rate = 1.03;
    window.speechSynthesis.speak(u);
  } catch {
    /* not available */
  }
}
