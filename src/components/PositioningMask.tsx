/**
 * Operator40 — PositioningMask
 * Ghost silhouette guide for READY positioning before counting.
 * Shows ideal pose outline per exercise (normalized 0..1) and highlights alignment.
 * When user stays aligned for ~800ms, overlay fades and exercise starts.
 */
import React from 'react';
import { PAPER, BLAZE, KHAKI, OLIVE } from '../constants/theme.js';
import type { PoseLandmarks } from '../engine/types';
import { LM } from '../engine/math';

// Ideal READY positions (normalized 0..1) for key exercises — tuned for 4/3 portrait, frontal slight lateral
// Only a subset of landmarks defines the silhouette; we draw stick figure from these ideals.
type IdealPose = Partial<Record<number, { x: number; y: number }>>;

const IDEAL_READY: Record<string, IdealPose> = {
  squat: {
    [LM.nose]: { x: 0.5, y: 0.18 },
    [LM.left_shoulder]: { x: 0.42, y: 0.32 }, [LM.right_shoulder]: { x: 0.58, y: 0.32 },
    [LM.left_elbow]: { x: 0.38, y: 0.50 }, [LM.right_elbow]: { x: 0.62, y: 0.50 },
    [LM.left_wrist]: { x: 0.36, y: 0.62 }, [LM.right_wrist]: { x: 0.64, y: 0.62 },
    [LM.left_hip]: { x: 0.44, y: 0.58 }, [LM.right_hip]: { x: 0.56, y: 0.58 },
    [LM.left_knee]: { x: 0.44, y: 0.78 }, [LM.right_knee]: { x: 0.56, y: 0.78 },
    [LM.left_ankle]: { x: 0.44, y: 0.96 }, [LM.right_ankle]: { x: 0.56, y: 0.96 },
  },
  pushup: {
    // plank top position (lateral-ish, but frontal still shows)
    [LM.left_shoulder]: { x: 0.35, y: 0.45 }, [LM.right_shoulder]: { x: 0.35, y: 0.45 },
    [LM.left_elbow]: { x: 0.35, y: 0.60 }, [LM.right_elbow]: { x: 0.35, y: 0.60 },
    [LM.left_wrist]: { x: 0.35, y: 0.75 }, [LM.right_wrist]: { x: 0.35, y: 0.75 },
    [LM.left_hip]: { x: 0.60, y: 0.48 }, [LM.right_hip]: { x: 0.60, y: 0.48 },
    [LM.left_knee]: { x: 0.75, y: 0.55 }, [LM.right_knee]: { x: 0.75, y: 0.55 },
    [LM.left_ankle]: { x: 0.88, y: 0.62 }, [LM.right_ankle]: { x: 0.88, y: 0.62 },
    [LM.nose]: { x: 0.30, y: 0.38 },
  },
  crunch: {
    [LM.left_shoulder]: { x: 0.40, y: 0.65 }, [LM.right_shoulder]: { x: 0.60, y: 0.65 },
    [LM.left_hip]: { x: 0.50, y: 0.75 }, [LM.right_hip]: { x: 0.50, y: 0.75 },
    [LM.left_knee]: { x: 0.45, y: 0.60 }, [LM.right_knee]: { x: 0.55, y: 0.60 },
  },
  plank: {
    [LM.left_shoulder]: { x: 0.30, y: 0.50 }, [LM.right_shoulder]: { x: 0.30, y: 0.50 },
    [LM.left_hip]: { x: 0.60, y: 0.52 }, [LM.right_hip]: { x: 0.60, y: 0.52 },
    [LM.left_ankle]: { x: 0.85, y: 0.58 }, [LM.right_ankle]: { x: 0.85, y: 0.58 },
  },
};

function getIdeal(exerciseId: string): IdealPose {
  return IDEAL_READY[exerciseId] ?? IDEAL_READY.squat;
}

// Connections for ghost silhouette
const GHOST_CONNECTIONS: Array<[number, number]> = [
  [LM.left_shoulder, LM.right_shoulder],
  [LM.left_shoulder, LM.left_elbow], [LM.left_elbow, LM.left_wrist],
  [LM.right_shoulder, LM.right_elbow], [LM.right_elbow, LM.right_wrist],
  [LM.left_shoulder, LM.left_hip], [LM.right_shoulder, LM.right_hip],
  [LM.left_hip, LM.right_hip],
  [LM.left_hip, LM.left_knee], [LM.left_knee, LM.left_ankle],
  [LM.right_hip, LM.right_knee], [LM.right_knee, LM.right_ankle],
];

interface Props {
  exerciseId: string;
  landmarks: PoseLandmarks | null;
  lang?: string;
  width?: number;
  height?: number;
}

export function alignmentScore(landmarks: PoseLandmarks | null, exerciseId: string): number {
  if (!landmarks) return 0;
  const ideal = getIdeal(exerciseId);
  let sum = 0, n = 0;
  for (const k in ideal) {
    const idx = Number(k);
    const iv = ideal[idx]!;
    const lm = landmarks[idx];
    if (!lm || (lm.visibility ?? 0) < 0.25) continue;
    // Mirror ghost is centered, user frontal: compare mirrored x (user mirrored)
    const ux = 1 - lm.x; // canvas is mirrored
    const dx = ux - iv.x, dy = lm.y - iv.y;
    const d = Math.hypot(dx, dy);
    // Gaussian falloff
    const s = Math.max(0, 1 - d * 3.2);
    sum += s; n++;
  }
  return n ? sum / n : 0;
}

export default function PositioningMask({ exerciseId, landmarks, lang = 'it', width = 640, height = 480 }: Props) {
  const ideal = getIdeal(exerciseId);
  const score = alignmentScore(landmarks, exerciseId);
  const ready = score > 0.72;
  const label = lang === 'de' ? 'Positioniere dich in der Silhouette' : lang === 'en' ? 'Align to silhouette' : 'Posizionati nella sagoma';
  const hint = lang === 'de' ? 'Ganzkörper im Bild · seitlich für Kniebeuge/Liegestütz' : lang === 'en' ? 'Full body in frame · side view for squat/pushup' : 'Corpo intero in camera · laterale per squat/piegamenti';

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {/* ghost connections */}
        {GHOST_CONNECTIONS.map(([a, b], i) => {
          const pa = ideal[a], pb = ideal[b];
          if (!pa || !pb) return null;
          return <line key={i} x1={pa.x * width} y1={pa.y * height} x2={pb.x * width} y2={pb.y * height} stroke={ready ? '#7FB069' : KHAKI} strokeWidth={ready ? 4 : 3} strokeDasharray={ready ? undefined : '8 6'} opacity={0.95} strokeLinecap="round" />;
        })}
        {/* ghost joints */}
        {Object.entries(ideal).map(([k, v]) => (
          <circle key={k} cx={v.x * width} cy={v.y * height} r={ready ? 7 : 5} fill={ready ? '#7FB069' : PAPER} stroke={ready ? '#7FB069' : KHAKI} strokeWidth={2} opacity={0.95} />
        ))}
      </svg>
      <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', background: ready ? '#7FB069' : BLAZE, color: PAPER, fontSize: 11, fontWeight: 700, padding: '6px 12px', borderRadius: 20, border: `1px solid ${ready ? '#7FB069' : BLAZE}`, boxShadow: '0 4px 12px rgba(0,0,0,0.35)', textAlign: 'center', minWidth: 180 }}>
        {ready ? (lang === 'de' ? '✓ Position OK — los!' : lang === 'en' ? '✓ Aligned — go!' : '✓ Posizione OK — via!') : label}
        <div style={{ fontSize: 9, fontWeight: 400, opacity: 0.9, marginTop: 2 }}>{hint}</div>
        <div style={{ height: 4, background: 'rgba(0,0,0,0.25)', borderRadius: 2, marginTop: 6, overflow: 'hidden' }}>
          <div style={{ width: `${Math.round(score * 100)}%`, height: '100%', background: PAPER, transition: 'width 0.2s' }} />
        </div>
      </div>
    </div>
  );
}
