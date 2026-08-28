/**
 * Operator40 — FeatureExtractor (Fase 2)
 * Estrae feature normalizzate da landmarks 2D + worldLandmarks 3D per il classificatore temporale.
 * Tutte le feature sono in 0..1 per stabilità del modello, indipendenti da distanza camera / corporatura.
 */
import type { PoseLandmarks } from '../../engine/types';
import { LM, angleFromLandmarks, bilateralAngle, torsoLength, dist2D } from '../pose/Geometry';

export interface ExerciseFeatures {
  // angoli normalizzati 0..1 (angle/180)
  kneeNorm: number;
  hipFlexNorm: number;
  trunkNorm: number;
  elbowNorm: number;
  // geometria normalizzata torso
  legSpreadNorm: number;
  hipYNorm: number;
  torsoLen: number;
  // derivate temporali (verranno calcolate dal buffer)
  velocity: number;
  symmetry: number;
  // raw per debug
  kneeRaw: number;
  hipFlexRaw: number;
}

export function extractFeatures(lm: PoseLandmarks, worldLm: PoseLandmarks | null, prevFeatures: ExerciseFeatures | null, dtMs: number): ExerciseFeatures {
  const knee = bilateralAngle(lm, [LM.left_hip, LM.left_knee, LM.left_ankle], [LM.right_hip, LM.right_knee, LM.right_ankle]);
  // hipFlex = shoulder-hip-knee
  const hipFlex = bilateralAngle(lm, [LM.left_shoulder, LM.left_hip, LM.left_knee], [LM.right_shoulder, LM.right_hip, LM.right_knee]);
  const trunk = bilateralAngle(lm, [LM.left_shoulder, LM.left_hip, LM.left_ankle], [LM.right_shoulder, LM.right_hip, LM.right_ankle]);
  const elbow = bilateralAngle(lm, [LM.left_shoulder, LM.left_elbow, LM.left_wrist], [LM.right_shoulder, LM.right_elbow, LM.right_wrist]);

  const tl = torsoLength(lm);
  const rawSpread = (() => {
    const a = lm[LM.left_ankle], b = lm[LM.right_ankle];
    if (!a || !b) return 0;
    return Math.hypot(a.x - b.x, a.y - b.y);
  })();
  const legSpreadNorm = tl > 1e-6 ? rawSpread / tl : 0;
  const hipY = ((lm[LM.left_hip]?.y ?? 0.5) + (lm[LM.right_hip]?.y ?? 0.5)) / 2;

  // worldLandmarks depth correction: se disponibile, usa Z per correggere angoli compressi da prospettiva
  let depthCorrection = 0;
  if (worldLm) {
    const wHipZ = ((worldLm[LM.left_hip]?.z ?? 0) + (worldLm[LM.right_hip]?.z ?? 0)) / 2;
    const wKneeZ = ((worldLm[LM.left_knee]?.z ?? 0) + (worldLm[LM.right_knee]?.z ?? 0)) / 2;
    // se knee è molto più avanti di hip in profondità, siamo in vista laterale — angolo più affidabile
    depthCorrection = Math.abs(wKneeZ - wHipZ);
  }

  const dt = dtMs || 16;
  let velocity = 0;
  if (prevFeatures) {
    // velocity sul knee (più stabile per rep counting)
    velocity = ((knee - prevFeatures.kneeRaw) / (dt / 1000));
  }

  // symmetry: differenza knee left vs right
  const leftKnee = angleFromLandmarks(lm, LM.left_hip, LM.left_knee, LM.left_ankle);
  const rightKnee = angleFromLandmarks(lm, LM.right_hip, LM.right_knee, LM.right_ankle);
  const symDiff = Math.abs(leftKnee - rightKnee);
  const symmetry = Math.max(0, 100 - symDiff * 2.5); // 0-100

  return {
    kneeNorm: knee / 180,
    hipFlexNorm: hipFlex / 180,
    trunkNorm: trunk / 180,
    elbowNorm: elbow / 180,
    legSpreadNorm,
    hipYNorm: hipY,
    torsoLen: tl,
    velocity,
    symmetry,
    kneeRaw: knee,
    hipFlexRaw: hipFlex,
  };
}

export function featuresToVector(f: ExerciseFeatures): number[] {
  // 8-dim vector per frame: compatto, normalizzato, pronto per GRU/DTW
  return [
    f.kneeNorm,
    f.hipFlexNorm,
    f.trunkNorm,
    f.elbowNorm,
    Math.min(1, f.legSpreadNorm / 2),
    f.hipYNorm,
    Math.tanh(f.velocity / 400), // compress velocity -1..1
    f.symmetry / 100,
  ];
}
