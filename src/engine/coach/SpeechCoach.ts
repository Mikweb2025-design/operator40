/**
 * Operator40 — SpeechCoach
 * Optional AI coach via Web Speech Synthesis (on-device, no upload).
 * Throttled, language-aware, respects user toggle + page visibility.
 */
import { localizedCue } from '../exercises/definitions';

type Lang = 'it' | 'en' | 'de';

export class SpeechCoach {
  private enabled = false;
  private lang: Lang = 'it';
  private lastSpokeAt = 0;
  private cooldownMs = 2800;
  private queue: string[] = [];
  private speaking = false;

  constructor(enabled = false, lang: Lang = 'it', cooldownMs = 2800) {
    this.enabled = enabled;
    this.lang = lang;
    this.cooldownMs = cooldownMs;
    if (typeof window !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) this.cancel();
      });
    }
  }

  setEnabled(v: boolean): void { this.enabled = v; if (!v) this.cancel(); }
  setLang(l: Lang): void { this.lang = l; }
  setCooldown(ms: number): void { this.cooldownMs = ms; }

  private canSpeak(): boolean {
    if (!this.enabled) return false;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
    if (document.hidden) return false;
    if (performance.now() - this.lastSpokeAt < this.cooldownMs) return false;
    return true;
  }

  speak(text: string, opts?: { force?: boolean; rate?: number }): void {
    if (!text) return;
    if (!opts?.force && !this.canSpeak()) {
      // queue at most one pending cue, drop oldest burst
      this.queue[this.queue.length ? 0 : 0] = text;
      if (this.queue.length > 2) this.queue.shift();
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = this.lang === 'de' ? 'de-DE' : this.lang === 'en' ? 'en-US' : 'it-IT';
      u.rate = opts?.rate ?? 1.0;
      u.volume = 0.95;
      this.speaking = true;
      u.onend = () => { this.speaking = false; this.lastSpokeAt = performance.now(); this.flushQueue(); };
      u.onerror = () => { this.speaking = false; this.lastSpokeAt = performance.now(); };
      window.speechSynthesis.speak(u);
      this.lastSpokeAt = performance.now();
    } catch { /* ignore */ }
  }

  speakCue(cueKey: string, opts?: { force?: boolean }): void {
    const text = localizedCue(cueKey, this.lang);
    this.speak(text, opts);
  }

  speakCount(count: number): void {
    if (!this.canSpeak()) return;
    const t = this.lang === 'it' ? `${count}` : this.lang === 'de' ? `${count}` : `${count}`;
    this.speak(t, { rate: 1.15 });
  }

  private flushQueue(): void {
    if (!this.enabled || this.speaking) return;
    const next = this.queue.shift();
    if (next && this.canSpeak()) this.speak(next);
  }

  cancel(): void {
    try { window.speechSynthesis?.cancel(); } catch {}
    this.speaking = false;
    this.queue = [];
  }
}
