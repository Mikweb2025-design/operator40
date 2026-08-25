/**
 * Operator40 — ExerciseAnalyzer base (spec §10)
 * Each exercise has its own analyzer with phases, not generic thresholds.
 * Rep counting requires confidence > threshold (spec §12).
 */
import type { PoseLandmarks, EnginePhase } from '../../engine/types';
import type { PoseQualityResult } from '../pose/PoseQuality';

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

  abstract analyze(lm: PoseLandmarks, timestamp: number, dtMs: number, quality: PoseQualityResult): AnalyzerResult;

  reset(){
    this.phase='READY';
    this.lastTransitionAt=0;
    this.trough=180; this.peak=0; this.lastRepAt=0;
  }

  protected shouldCountRep(now: number, repConf: number, thresh = 80): boolean {
    if (repConf < thresh) return false;
    if (this.lastRepAt && (now - this.lastRepAt) < 300) return false;
    return true;
  }
}
