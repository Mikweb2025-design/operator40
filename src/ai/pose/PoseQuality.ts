/**
 * Operator40 — PoseQuality (spec §6)
 * Three scores: poseConfidence (overall visibility), landmarkConfidence (per joint), exerciseConfidence (required landmarks for that exercise).
 * If essential landmarks unreliable → pause analysis (return exerciseConfidence < threshold).
 */
import type { PoseLandmarks } from '../../engine/types';
import { visibilityScore, clamp } from '../../engine/math';

export interface PoseQualityResult {
  poseConfidence: number; // 0-100 overall
  landmarkConfidence: Record<number, number>; // per index 0-100
  exerciseConfidence: number; // 0-100 for required set
  requiredVisible: boolean;
  missing: number[];
}

export function evaluatePoseQuality(lm: PoseLandmarks | null, required: number[], thresholds?: { poseMin?: number; requiredMin?: number }): PoseQualityResult {
  if (!lm) return { poseConfidence: 0, landmarkConfidence: {}, exerciseConfidence: 0, requiredVisible: false, missing: required.slice() };
  const landmarkConfidence: Record<number, number> = {};
  for (let i = 0; i < lm.length; i++) landmarkConfidence[i] = Math.round((lm[i]?.visibility ?? 0) * 100);

  const poseConfidence = Math.round(visibilityScore(lm, [11,12,23,24,25,26,13,14,15,16]) * 100);
  const reqScores = required.map(idx => (lm[idx]?.visibility ?? 0) * 100);
  const avgReq = reqScores.length ? reqScores.reduce((a,b)=>a+b,0)/reqScores.length : poseConfidence;
  const minReq = reqScores.length ? Math.min(...reqScores) : poseConfidence;
  // exerciseConfidence: avg 70% + min 30% to penalize single missing joint
  const exerciseConfidence = Math.round(clamp(avgReq * 0.7 + minReq * 0.3, 0, 100));
  const requiredMin = thresholds?.requiredMin ?? 38; // 0.38 visibility
  const missing = required.filter(idx => (lm[idx]?.visibility ?? 0) * 100 < requiredMin);
  // Side-view tolerance: allow up to 2 symmetric missing if avg still good (one side occluded)
  // e.g., squat side view: right hip/knee/ankle occluded but left side perfect → still track
  const requiredVisible = exerciseConfidence >= 38 && missing.length <= 2;
  return { poseConfidence, landmarkConfidence, exerciseConfidence, requiredVisible, missing };
}

export function shouldPauseAnalysis(q: PoseQualityResult): boolean {
  // Only pause on very low confidence; missing alone not blocking if one side visible
  return q.exerciseConfidence < 38;
}
