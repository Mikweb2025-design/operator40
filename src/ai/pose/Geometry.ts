/**
 * Operator40 — Geometry (spec §8)
 * Reusable, side-effect free, normalized to reduce camera distance/size sensitivity.
 * All coordinates are normalized 0..1 (MediaPipe). Distances are in normalized units;
 * for body-relative metrics we divide by torso length.
 */
import type { Landmark, PoseLandmarks } from '../../engine/types';
import { LM, angleDeg, angleFromLandmarks, bilateralAngle, dist2D, midpoint, clamp } from '../../engine/math';

export { LM, angleDeg, angleFromLandmarks, bilateralAngle, dist2D, midpoint, clamp };

// Additional geometry required by spec §8
export function calculateAngle(a: Landmark, b: Landmark, c: Landmark): number { return angleDeg(a,b,c); }
export function calculateDistance(a: Landmark, b: Landmark): number { return dist2D(a,b); }
export function calculateMidpoint(a: Landmark, b: Landmark): Landmark { return midpoint(a,b); }

export function calculateVelocity(prev: number, curr: number, dtMs: number): number {
  if (dtMs <= 0) return 0;
  return (curr - prev) / (dtMs / 1000);
}
export function calculateAcceleration(prevVel: number, currVel: number, dtMs: number): number {
  if (dtMs <= 0) return 0;
  return (currVel - prevVel) / (dtMs / 1000);
}
export function torsoLength(lm: PoseLandmarks): number {
  const s = midpoint(lm[LM.left_shoulder] ?? lm[LM.right_shoulder], lm[LM.right_shoulder] ?? lm[LM.left_shoulder]);
  const h = midpoint(lm[LM.left_hip] ?? lm[LM.right_hip], lm[LM.right_hip] ?? lm[LM.left_hip]);
  if (!s || !h) return 0.35;
  return Math.hypot(s.x - h.x, s.y - h.y) || 0.35;
}
export function normalizedDistance(a: Landmark, b: Landmark, lm: PoseLandmarks): number {
  const d = dist2D(a,b);
  const tl = torsoLength(lm);
  return tl > 1e-6 ? d / tl : d;
}
export function calculateBodyLine(lm: PoseLandmarks): number {
  // shoulder-hip-ankle collinearity 180 = straight
  return bilateralAngle(lm, [LM.left_shoulder, LM.left_hip, LM.left_ankle], [LM.right_shoulder, LM.right_hip, LM.right_ankle]);
}
export function calculateTorsoAngle(lm: PoseLandmarks): number {
  // hip-shoulder vs vertical; approximated via shoulder-hip-knee vs 180
  return bilateralAngle(lm, [LM.left_shoulder, LM.left_hip, LM.left_knee], [LM.right_shoulder, LM.right_hip, LM.right_knee]);
}
export function calculateLegAngle(lm: PoseLandmarks, side: 'left'|'right' = 'left'): number {
  return side === 'left'
    ? angleFromLandmarks(lm, LM.left_hip, LM.left_knee, LM.left_ankle)
    : angleFromLandmarks(lm, LM.right_hip, LM.right_knee, LM.right_ankle);
}
export function calculateArmAngle(lm: PoseLandmarks, side: 'left'|'right' = 'left'): number {
  return side === 'left'
    ? angleFromLandmarks(lm, LM.left_shoulder, LM.left_elbow, LM.left_wrist)
    : angleFromLandmarks(lm, LM.right_shoulder, LM.right_elbow, LM.right_wrist);
}
export function calculateRangeOfMotion(history: number[]): number {
  if (!history.length) return 0;
  return Math.max(...history) - Math.min(...history);
}
export function calculateSymmetry(leftVal: number, rightVal: number): number {
  // 100 = perfect symmetry, 0 = 40deg diff
  return clamp(100 - Math.abs(leftVal - rightVal) * 2.5, 0, 100);
}
export function landmarkVelocity(prev: Landmark, curr: Landmark, dtMs: number): number {
  if (!prev || !curr || dtMs <= 0) return 0;
  return Math.hypot(curr.x - prev.x, curr.y - prev.y) / (dtMs / 1000);
}
export function bodyAlignmentScore(lm: PoseLandmarks): number {
  // 0-100 from trunkLean: 180=100, 150=0
  const line = calculateBodyLine(lm);
  return clamp((line - 150) * (100/30), 0, 100);
}
