/**
 * Operator40 — ExerciseAnalyzer base (spec §10)
 * Each exercise has its own analyzer with phases, not generic thresholds.
 * Rep counting requires confidence > threshold (spec §12).
 */
import type { PoseLandmarks, EnginePhase } from '../../engine/types';
import type { PoseQualityResult } from '../pose/PoseQuality';
import { angleFromLandmarks } from '../pose/Geometry';
import { extractFeatures, type ExerciseFeatures } from '../classifier/FeatureExtractor';
import { TemporalBuffer } from '../classifier/TemporalBuffer';
import { TemporalClassifier } from '../classifier/TemporalClassifier';

export type AnalyzerPhase = string; // e.g. READY/DESCENDING/BOTTOM/ASCENDING/TOP

export interface AnalyzerResult {
  phase: AnalyzerPhase;
  enginePhase: EnginePhase; // mapped to generic for FitnessEngine compatibility
  repIncrement: boolean;
  repConfidence: number; // 0-100
  formScore: number; // 0-100
  poseQuality: PoseQualityResult;
  cues: string[];
  primaryAngle: number;
  secondaryAngles: Record<string, number>;
  velocity: number;
  direction: 'down'|'up'|'hold'|'idle';
}

export abstract class ExerciseAnalyzer {
  abstract readonly id: string;
  abstract readonly requiredLandmarks: number[];
  protected phase: AnalyzerPhase = 'READY';
  protected lastTransitionAt = 0;
  protected trough = 180;
  protected peak = 0;
  protected lastRepAt = 0;

  // Fase 2: temporal buffer + classifier per validazione sequenza (30 frame)
  protected temporalBuffer = new TemporalBuffer(30, 1200);
  protected temporalClassifier: TemporalClassifier | null = null;
  protected worldLandmarks: PoseLandmarks | null = null;
  protected motionContext: { impactScore: number; rhythmHz: number; hasData: boolean; enabled: boolean } | null = null;
  protected lastFeatures: ExerciseFeatures | null = null;
  protected dwellAtBottom = 0; // ms trascorso in BOTTOM per bonus confidenza

  abstract analyze(lm: PoseLandmarks, timestamp: number, dtMs: number, quality: PoseQualityResult): AnalyzerResult;

  reset(){
    this.phase='READY';
    this.lastTransitionAt=0;
    this.trough=180; this.peak=0; this.lastRepAt=0;
    this.bilateralVisEma={}; this.bilateralSide={};
    this.temporalBuffer.clear();
    this.temporalClassifier?.reset();
    this.lastFeatures=null;
    this.dwellAtBottom=0;
    this.worldLandmarks=null;
  }

  // Fase 1 wiring: chiamata da FitnessEngine prima di analyze
  setWorldLandmarks(w: PoseLandmarks | null){ this.worldLandmarks = w; }
  setMotionContext(c: { impactScore: number; rhythmHz: number; hasData: boolean; enabled: boolean } | null){ this.motionContext = c; }

  protected getTemporalClassifier(exercise: string): TemporalClassifier {
    if (!this.temporalClassifier) {
      this.temporalClassifier = new TemporalClassifier(exercise);
    }
    return this.temporalClassifier;
  }

  protected pushTemporalFrame(lm: PoseLandmarks, ts: number, dtMs: number){
    const feats = extractFeatures(lm, this.worldLandmarks, this.lastFeatures, dtMs);
    this.temporalBuffer.push(feats, ts);
    this.lastFeatures = feats;
    // dwell tracking: se in BOTTOM incrementa
    if (this.phase === 'BOTTOM') this.dwellAtBottom += dtMs;
    else this.dwellAtBottom = 0;
    return feats;
  }

  protected evaluateTemporalConfidence(feats: ExerciseFeatures, ts: number): { confidence: number; shouldCount: boolean; debug: string } {
    if (!this.temporalClassifier) return { confidence: 0, shouldCount: false, debug: 'no classifier' };
    const res = this.temporalClassifier.evaluate(this.temporalBuffer, feats, this.dwellAtBottom, ts);
    return { confidence: res.confidence, shouldCount: res.shouldCount, debug: res.reason };
  }

  // Visibility state for bilateralJointAngle, keyed by joint name (e.g. 'knee', 'trunk')
  private bilateralVisEma: Record<string, { l: number; r: number }> = {};
  private bilateralSide: Record<string, 'left'|'right'|'avg'> = {};

  /**
   * Angle at a bilateral joint (e.g. both knees, shoulder-hip-ankle line) picking the
   * more visible side instead of always averaging left+right. A plain average lets an
   * occluded/estimated side (very common in side-view filming) drag the angle toward a
   * value neither leg actually has. EMA-smooths visibility and requires a clear margin
   * to switch sides, so the choice doesn't flicker frame-to-frame near the threshold.
   */
  protected bilateralJointAngle(
    key: string,
    lm: PoseLandmarks,
    left: [number, number, number],
    right: [number, number, number],
    opts?: { visThreshold?: number; switchMargin?: number; emaAlpha?: number }
  ): number {
    const visThreshold = opts?.visThreshold ?? 0.4;
    const switchMargin = opts?.switchMargin ?? 0.12;
    const alpha = opts?.emaAlpha ?? 0.35;
    const al = angleFromLandmarks(lm, left[0], left[1], left[2]);
    const ar = angleFromLandmarks(lm, right[0], right[1], right[2]);
    const rawVl = Math.min(lm[left[0]]?.visibility ?? 0, lm[left[1]]?.visibility ?? 0, lm[left[2]]?.visibility ?? 0);
    const rawVr = Math.min(lm[right[0]]?.visibility ?? 0, lm[right[1]]?.visibility ?? 0, lm[right[2]]?.visibility ?? 0);
    const prevEma = this.bilateralVisEma[key] ?? { l: rawVl, r: rawVr };
    const vl = prevEma.l * (1 - alpha) + rawVl * alpha;
    const vr = prevEma.r * (1 - alpha) + rawVr * alpha;
    this.bilateralVisEma[key] = { l: vl, r: vr };

    const lOk = vl >= visThreshold, rOk = vr >= visThreshold;
    const prevSide = this.bilateralSide[key] ?? 'avg';
    let side: 'left'|'right'|'avg';
    if (lOk && rOk) side = Math.abs(vl - vr) < switchMargin ? 'avg' : (vl > vr ? 'left' : 'right');
    else if (lOk) side = 'left';
    else if (rOk) side = 'right';
    else side = prevSide; // both unreliable this frame: hold last known-good side rather than snap to a garbage average

    // Hysteresis: require a clear win to switch away from an already-committed side.
    if (prevSide !== 'avg' && side !== prevSide && side !== 'avg') {
      const winMargin = side === 'left' ? vl - vr : vr - vl;
      if (winMargin < switchMargin) side = prevSide;
    }
    this.bilateralSide[key] = side;
    return side === 'left' ? al : side === 'right' ? ar : (al + ar) / 2;
  }

  // Per-exercise tunable debounce (ms)
  protected minRepIntervalMs = 320;
  protected minPhaseMs = 120; // minimum time in phase before transition (anti-jitter)

  protected shouldCountRep(now: number, repConf: number, thresh = 80): boolean {
    if (repConf < thresh) return false;
    if (this.lastRepAt && (now - this.lastRepAt) < this.minRepIntervalMs) return false;
    return true;
  }
  protected phaseElapsed(now:number): number {
    return now - this.lastTransitionAt;
  }
  protected canTransition(now:number, minMs?:number): boolean {
    return this.phaseElapsed(now) >= (minMs ?? this.minPhaseMs);
  }
}
