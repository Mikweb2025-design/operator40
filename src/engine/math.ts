/**
 * Operator40 — AI Fitness Engine — Math primitives
 * Pure functions, no side effects, hot-path optimized.
 */
import type { Landmark, PoseLandmarks } from './types';

// MediaPipe Pose 33 landmarks indices (0..32)
// https://developers.google.com/mediapipe/solutions/vision/pose_landmarker
export const LM = {
  nose: 0,
  left_eye_inner: 1, left_eye: 2, left_eye_outer: 3,
  right_eye_inner: 4, right_eye: 5, right_eye_outer: 6,
  left_ear: 7, right_ear: 8,
  left_mouth: 9, right_mouth: 10,
  left_shoulder: 11, right_shoulder: 12,
  left_elbow: 13, right_elbow: 14,
  left_wrist: 15, right_wrist: 16,
  left_pinky: 17, right_pinky: 18,
  left_index: 19, right_index: 20,
  left_thumb: 21, right_thumb: 22,
  left_hip: 23, right_hip: 24,
  left_knee: 25, right_knee: 26,
  left_ankle: 27, right_ankle: 28,
  left_heel: 29, right_heel: 30,
  left_foot_index: 31, right_foot_index: 32,
} as const;

/** Angle at b formed by a-b-c, in degrees 0..180. Returns 180 if degenerate. */
export function angleDeg(a: Landmark, b: Landmark, c: Landmark): number {
  const abx = a.x - b.x, aby = a.y - b.y;
  const cbx = c.x - b.x, cby = c.y - b.y;
  const dot = abx * cbx + aby * cby;
  const mag = Math.hypot(abx, aby) * Math.hypot(cbx, cby);
  if (mag < 1e-9) return 180;
  const cos = Math.max(-1, Math.min(1, dot / mag));
  return (Math.acos(cos) * 180) / Math.PI;
}

export function angleFromLandmarks(lm: PoseLandmarks, a: number, b: number, c: number): number {
  const pa = lm[a], pb = lm[b], pc = lm[c];
  if (!pa || !pb || !pc) return 180;
  return angleDeg(pa, pb, pc);
}

/** Mean of left+right angles (e.g. both knees) — robust if one side occluded. */
export function bilateralAngle(
  lm: PoseLandmarks,
  left: [number, number, number],
  right: [number, number, number],
  visThreshold = 0.4
): number {
  const al = angleFromLandmarks(lm, left[0], left[1], left[2]);
  const ar = angleFromLandmarks(lm, right[0], right[1], right[2]);
  const vl = Math.min(lm[left[0]]?.visibility ?? 1, lm[left[1]]?.visibility ?? 1, lm[left[2]]?.visibility ?? 1);
  const vr = Math.min(lm[right[0]]?.visibility ?? 1, lm[right[1]]?.visibility ?? 1, lm[right[2]]?.visibility ?? 1);
  const lOk = vl >= visThreshold, rOk = vr >= visThreshold;
  if (lOk && rOk) return (al + ar) / 2;
  if (lOk) return al;
  if (rOk) return ar;
  return (al + ar) / 2;
}

export function dist2D(a: Landmark, b: Landmark): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function midpoint(a: Landmark, b: Landmark): Landmark {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, z: ((a.z ?? 0) + (b.z ?? 0)) / 2, visibility: Math.min(a.visibility ?? 1, b.visibility ?? 1) };
}

export function visibilityScore(lm: PoseLandmarks, indices: number[]): number {
  if (!lm || lm.length === 0) return 0;
  let sum = 0, n = 0;
  for (const i of indices) {
    const v = lm[i]?.visibility;
    if (v != null) { sum += v; n++; }
  }
  return n ? sum / n : 0;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}
export function lerp(a: number, b: number, t: number): number { return a + (b - a) * t; }
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/** Velocity deg/s from angle history */
export function velocityDegPerSec(prevAngle: number, currAngle: number, dtMs: number): number {
  if (dtMs <= 0) return 0;
  return (currAngle - prevAngle) / (dtMs / 1000);
}

/** Normalize quality helpers */
export function qualityFromDeviation(deviationDeg: number, toleranceDeg: number): number {
  // 100 at 0 deviation, 0 at >= tolerance*2
  return clamp(100 * (1 - deviationDeg / (toleranceDeg * 2)), 0, 100);
}
