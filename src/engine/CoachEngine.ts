/**
 * Operator40 — CoachEngine + MotivationEngine + SpeechManager
 * Priority: 1) safety/form correction, 2) movement instruction, 3) rep milestone, 4) motivation
 * Cooldown prevents spamming same message; speech queue + Web Speech API.
 */
import { tCoach, normalizeLang, SupportedLang } from './LocalizationManager';
import { localizedCue } from './exercises/definitions';

type Lang = SupportedLang;

interface CoachOpts {
  lang?: Lang;
  enableVoice?: boolean;
  cooldownMs?: number; // default 2800 per cue type
}

export class CoachEngine {
  private lang: Lang;
  private enableVoice: boolean;
  private cooldownMs: number;
  private lastSpokeByKey: Map<string, number> = new Map();
  private lastGeneralSpeak = 0;
  private queue: string[] = [];

  constructor(opts: CoachOpts = {}) {
    this.lang = normalizeLang(opts.lang);
    this.enableVoice = !!opts.enableVoice;
    this.cooldownMs = opts.cooldownMs ?? 2800;
  }

  setLang(lang: string): void { this.lang = normalizeLang(lang); }
  setVoiceEnabled(v: boolean): void { this.enableVoice = v; if (!v) this.cancelSpeech(); }

  /** Decide feedback based on priority. Called each frame where form is available. */
  decideFeedback(params: {
    phase: string;
    formQuality: number;
    cues: string[]; // cue keys like 'backStraight'
    velocity: number;
    reps: number;
    targetReps?: number | null;
    elapsedMs: number;
    isHold?: boolean;
  }): { text: string | null; priority: number; cueKey?: string } {
    const { formQuality, cues, reps, targetReps, isHold } = params;

    // 1. Safety/form correction — top priority if quality low and cue present
    if (formQuality < 58 && cues[0]) {
      const cue = cues[0];
      // map generic cue keys to coach keys if needed; otherwise use localizedCue fallback
      const key = cueToCoachKey(cue);
      if (key && this.canSpeakKey(key)) {
        return { text: key ? tCoach(key, this.lang) : localizedCue(cue, this.lang as any), priority: 1, cueKey: key ?? cue };
      }
      if (cues.length) return { text: localizedCue(cue, this.lang as any), priority: 1, cueKey: cue };
    }

    // 2. Movement instruction — scendi ancora / distendi
    if (cues.includes('scendiAncora') || cues.includes('distendiBraccia') || cues.includes('distendiGambe')) {
      const k = cues.find(c => ['scendiAncora', 'distendiBraccia', 'distendiGambe'].includes(c));
      if (k && this.canSpeakKey(k)) {
        return { text: localizedCue(k, this.lang as any), priority: 2, cueKey: k };
      }
    }

    // 3. Rep milestone — announce milestones and near-end
    if (targetReps && reps >= 0) {
      const remaining = targetReps - reps;
      if (remaining === 0 && reps > 0) {
        // handled as mission complete elsewhere
      } else if (remaining === 1) {
        if (this.canSpeakKey('oneMore')) return { text: tCoach('coach.oneMore', this.lang), priority: 3, cueKey: 'oneMore' };
      } else if (remaining === 2) {
        if (this.canSpeakKey('twoMore')) return { text: tCoach('coach.twoMore', this.lang), priority: 3, cueKey: 'twoMore' };
      } else if (remaining === 3) {
        if (this.canSpeakKey('threeMore')) return { text: tCoach('coach.threeMore', this.lang), priority: 3, cueKey: 'threeMore' };
      }
    }

    // 4. Motivation — periodic, only when form good
    if (formQuality > 75 && reps > 0 && reps % 5 === 0) {
      // every 5 good reps
      if (this.canSpeakKey('greatJob')) return { text: tCoach('coach.greatJob', this.lang), priority: 4, cueKey: 'greatJob' };
    }

    return { text: null, priority: 99 };
  }

  /** Motivation tick outside per-frame: call when reps increment or timer milestones */
  motivationForRep(reps: number, targetReps?: number | null, quality?: number): string | null {
    if (!targetReps) {
      if (reps > 0 && reps % 6 === 0 && (quality ?? 100) > 65) return tCoach('coach.greatJob', this.lang);
      return null;
    }
    const remaining = targetReps - reps;
    if (remaining === 3) return tCoach('coach.threeMore', this.lang);
    if (remaining === 2) return tCoach('coach.twoMore', this.lang);
    if (remaining === 1) return tCoach('coach.oneMore', this.lang);
    if (remaining === 0) return tCoach('coach.missionComplete', this.lang);
    if (reps > 0 && reps % 5 === 0 && (quality ?? 70) > 72) return tCoach('coach.greatJob', this.lang);
    if (reps === 1 && (quality ?? 0) > 80) return tCoach('coach.good', this.lang);
    return null;
  }

  canSpeakKey(key: string): boolean {
    const last = this.lastSpokeByKey.get(key) ?? 0;
    return performance.now() - last > this.cooldownMs;
  }

  markSpoken(key: string): void {
    this.lastSpokeByKey.set(key, performance.now());
    this.lastGeneralSpeak = performance.now();
  }

  // ---- SpeechManager (Web Speech API) ----
  speak(text: string, opts: { priority?: number; key?: string; force?: boolean; rate?: number } = {}): void {
    if (!text) return;
    if (!this.enableVoice) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (!opts.force && opts.key && !this.canSpeakKey(opts.key)) return;
    if (!opts.force && performance.now() - this.lastGeneralSpeak < 1100) {
      // queue instead of interrupting too fast
      if (this.queue.length < 2) this.queue.push(text);
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = this.lang === 'de' ? 'de-DE' : this.lang === 'fr' ? 'fr-FR' : this.lang === 'it' ? 'it-IT' : 'en-US';
      u.rate = opts.rate ?? 1.0;
      u.volume = 0.95;
      u.onend = () => {
        if (opts.key) this.markSpoken(opts.key);
        this.lastGeneralSpeak = performance.now();
        // flush queue one
        const nxt = this.queue.shift();
        if (nxt) setTimeout(() => this.speak(nxt, { force: true }), 250);
      };
      u.onerror = () => { if (opts.key) this.markSpoken(opts.key); };
      window.speechSynthesis.speak(u);
      if (opts.key) this.markSpoken(opts.key);
      this.lastGeneralSpeak = performance.now();
    } catch {}
  }

  speakKey(coachKey: string, fallbackCue?: string): void {
    const text = COACH_KEY_EXISTS(coachKey) ? tCoach(coachKey, this.lang) : (fallbackCue ? localizedCue(fallbackCue, this.lang as any) : coachKey);
    this.speak(text, { key: coachKey });
  }

  cancelSpeech(): void {
    try { window.speechSynthesis?.cancel(); } catch {}
    this.queue = [];
  }
}

function cueToCoachKey(cue: string): string | null {
  const map: Record<string, string> = {
    backStraight: 'coach.backStraight',
    scendiAncora: 'coach.goLower',
    distendiBraccia: 'coach.extendArms',
    distendiGambe: 'coach.extendLegs',
    coreTight: 'coach.coreTight',
    control: 'coach.control',
    steady: 'coach.steady',
    kneesOverToes: 'coach.kneesOverToes',
    elbows45: 'coach.extendArms',
    hipsUp: 'coach.hipsStable',
  };
  return map[cue] ?? null;
}

function COACH_KEY_EXISTS(k: string): boolean {
  // lazy check: try to see if tCoach returns not key itself for en
  return k.startsWith('coach.');
}
