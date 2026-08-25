/**
 * Operator40 — Exercise Definitions
 * 13 exercises: pushup/squat/crunch/plank/mountainclimber/jumpingjack/flutterkick/bicyclecrunch/legraise/deadbug/heeltap/vup/burpee
 * Each defines primary joint, thresholds (hysteresis), form evaluation & cues.
 * Angles computed from MediaPipe 33 landmarks (bilateral where useful).
 */
import type { ExerciseDefinition, PoseLandmarks, EnginePhase } from '../types';
import { LM, angleFromLandmarks, bilateralAngle, clamp, qualityFromDeviation } from '../math';

// Localized cue helpers — real-time coaching strings (es. scendi ancora, braccia completamente distese)
type Lang = 'it' | 'en' | 'de';
const CUE = {
  backStraight: { it: 'Schiena dritta', en: 'Keep your back straight', de: 'Rücken gerade halten' },
  kneesOverToes: { it: 'Ginocchia sopra le punte', en: 'Knees over toes', de: 'Knie über Fußspitzen' },
  fullRange: { it: 'Completa il movimento', en: 'Complete the range', de: 'Volle Bewegung' },
  elbows45: { it: 'Gomiti a 45°', en: 'Elbows at 45°', de: 'Ellbogen 45°' },
  coreTight: { it: 'Addome contratto', en: 'Core tight', de: 'Bauch anspannen' },
  breathe: { it: 'Respira', en: 'Breathe', de: 'Atmen' },
  hipsUp: { it: 'Bacino alto', en: 'Hips up', de: 'Becken hoch' },
  control: { it: 'Movimento controllato', en: 'Controlled motion', de: 'Kontrollierte Bewegung' },
  kneesToChest: { it: 'Ginocchio al petto', en: 'Knee to chest', de: 'Knie zur Brust' },
  steady: { it: 'Ritmo costante', en: 'Steady rhythm', de: 'Gleichmäßiges Tempo' },
  scendiAncora: { it: 'Scendi ancora', en: 'Lower still', de: 'Noch tiefer' },
  distendiBraccia: { it: 'Braccia completamente distese', en: 'Fully extend arms', de: 'Arme ganz strecken' },
  distendiGambe: { it: 'Distendi le gambe', en: 'Fully extend legs', de: 'Beine ganz strecken' },
  pettoATerra: { it: 'Petto a terra', en: 'Chest to floor', de: 'Brust zum Boden' },
  schienaDritta: { it: 'Schiena dritta', en: 'Keep back straight', de: 'Rücken gerade halten' },
  addomeStretto: { it: 'Addome stretto', en: 'Tighten core', de: 'Core anspannen' },
} as const;

function tr(cue: Record<string,string>, lang: Lang): string {
  return cue[lang] ?? cue.en;
}

// Helpers reading angles
function kneeAngle(lm: PoseLandmarks): number {
  return bilateralAngle(lm, [LM.left_hip, LM.left_knee, LM.left_ankle], [LM.right_hip, LM.right_knee, LM.right_ankle]);
}
function hipAngle(lm: PoseLandmarks): number {
  return bilateralAngle(lm, [LM.left_shoulder, LM.left_hip, LM.left_knee], [LM.right_shoulder, LM.right_hip, LM.right_knee]);
}
function elbowAngle(lm: PoseLandmarks): number {
  return bilateralAngle(lm, [LM.left_shoulder, LM.left_elbow, LM.left_wrist], [LM.right_shoulder, LM.right_elbow, LM.right_wrist]);
}
function shoulderAbduction(lm: PoseLandmarks): number {
  // angle at shoulder: hip-shoulder-elbow in frontal plane approximation
  return bilateralAngle(lm, [LM.left_hip, LM.left_shoulder, LM.left_elbow], [LM.right_hip, LM.right_shoulder, LM.right_elbow]);
}
function trunkLean(lm: PoseLandmarks): number {
  // shoulder-hip-ankle collinearity: 180 = straight standing
  return bilateralAngle(lm, [LM.left_shoulder, LM.left_hip, LM.left_ankle], [LM.right_shoulder, LM.right_hip, LM.right_ankle]);
}
function ankleDistance(lm: PoseLandmarks): number {
  const a = lm[LM.left_ankle], b = lm[LM.right_ankle];
  if (!a || !b) return 0;
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function bestSideAngle(lm: PoseLandmarks, left: [number, number, number], right: [number, number, number]): number {
  const al = angleFromLandmarks(lm, left[0], left[1], left[2]);
  const ar = angleFromLandmarks(lm, right[0], right[1], right[2]);
  const vl = Math.min(lm[left[0]]?.visibility ?? 0, lm[left[1]]?.visibility ?? 0, lm[left[2]]?.visibility ?? 0);
  const vr = Math.min(lm[right[0]]?.visibility ?? 0, lm[right[1]]?.visibility ?? 0, lm[right[2]]?.visibility ?? 0);
  // pick most visible side, not average — more stable on lateral camera
  if (vl > vr + 0.12) return al;
  if (vr > vl + 0.12) return ar;
  return (al + ar) / 2;
}
function kneeAngleBest(lm: PoseLandmarks): number { return bestSideAngle(lm, [LM.left_hip, LM.left_knee, LM.left_ankle], [LM.right_hip, LM.right_knee, LM.right_ankle]); }
function hipAngleBest(lm: PoseLandmarks): number { return bestSideAngle(lm, [LM.left_shoulder, LM.left_hip, LM.left_knee], [LM.right_shoulder, LM.right_hip, LM.right_knee]); }
function elbowAngleBest(lm: PoseLandmarks): number { return bestSideAngle(lm, [LM.left_shoulder, LM.left_elbow, LM.left_wrist], [LM.right_shoulder, LM.right_elbow, LM.right_wrist]); }

function makeQualityLogger() {
  // placeholder for future per-rep smoothing
  return (scores: number[]) => clamp(scores.reduce((s,v)=>s+v,0)/(scores.length||1), 0, 100);
}

// ---- Definitions ----
// Thresholds tuned for over-40 partial ROM (permits shallower reps with quality penalty, not dropped counts)

export const EXERCISE_DEFINITIONS: Record<string, ExerciseDefinition> = {
  // 1. SQUAT — permissive: down 92 (was 85), up 150 (was 155). Real-time cues scendi ancora / distendi gambe.
  squat: {
    id: 'squat',
    aliases: [],
    label: { it: 'Squat', en: 'Squat', de: 'Kniebeuge' },
    primaryAngle: { a: LM.left_hip, b: LM.left_knee, c: LM.left_ankle, name: 'knee' },
    secondaryAngles: [
      { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_knee, name: 'hipFlex', ideal: [40, 90] },
      { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_ankle, name: 'trunk', ideal: [160, 180] },
    ],
    thresholds: { downThreshold: 108, upThreshold: 148, hysteresis: 5, minDownMs: 160, minUpMs: 110, minRepsIntervalMs: 380 },
    customTransition(angle, _vel, prev, ctx) {
      const lm = ctx.landmarks as PoseLandmarks;
      const knee = angle;
      const hipY = ((lm[LM.left_hip]?.y ?? 0.5) + (lm[LM.right_hip]?.y ?? 0.5)) / 2;
      const kneeDown = knee < 115; // più sensibile: basta 115° (prima 108°)
      const hipDown = hipY > 0.61; // più sensibile: prima 0.64
      const kneeUp = knee > 145;
      const hipUp = hipY < 0.60;
      if (prev === 'ready' && (kneeDown || hipDown)) return 'down';
      if (prev === 'down' && (knee < 105 || hipY > 0.65)) return 'bottom';
      if ((prev === 'down' || prev === 'bottom') && (kneeUp && hipUp)) return 'up';
      return null;
    },
    evaluateForm(lm, angles, phase, ctx) {
      const cues: string[] = [];
      let quality = 92;
      const trunk = trunkLean(lm);
      const knee = (angles['primary'] ?? angles['knee'] ?? kneeAngleBest(lm));
      // Real-time coaching: scendi ancora / distendi
      if ((phase === 'down' || phase === 'ready') && knee > 105 && knee < 135 && ctx.direction === 'down') {
        cues.push('scendiAncora');
      } else if ((phase === 'up' || phase === 'bottom') && knee > 125 && knee < 148 && ctx.direction === 'up') {
        cues.push('distendiGambe');
      }
      if (trunk < 148) { quality -= 18; cues.unshift('backStraight'); }
      else if (trunk < 162) { quality -= 7; cues.unshift('backStraight'); }
      const leftK = angleFromLandmarks(lm, LM.left_hip, LM.left_knee, LM.left_ankle);
      const rightK = angleFromLandmarks(lm, LM.right_hip, LM.right_knee, LM.right_ankle);
      if (Math.abs(leftK - rightK) > 20) { quality -= 9; cues.push('kneesOverToes'); }
      if (Math.abs(ctx.velocity) > 430) { quality -= 9; cues.push('control'); }
      return { quality: clamp(quality, 0, 100), cues };
    },
  },

  // 2. PUSHUP — permissive down 88→95 (was 90), up 148 (was 155). Cues scendi ancora / braccia distese.
  pushup: {
    id: 'pushup',
    aliases: ['flessioni'],
    label: { it: 'Piegamenti', en: 'Push-up', de: 'Liegestütz' },
    primaryAngle: { a: LM.left_shoulder, b: LM.left_elbow, c: LM.left_wrist, name: 'elbow' },
    secondaryAngles: [
      { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_ankle, name: 'plankLine', ideal: [160, 185] },
      { a: LM.left_hip, b: LM.left_shoulder, c: LM.left_elbow, name: 'shoulder', ideal: [20, 70] },
    ],
    thresholds: { downThreshold: 102, upThreshold: 145, hysteresis: 6, minDownMs: 160, minUpMs: 110, minRepsIntervalMs: 340 },
    evaluateForm(lm, angles, phase, ctx) {
      const cues: string[] = [];
      let q = 90;
      const elbow = (angles['primary'] ?? angles['elbow'] ?? elbowAngleBest(lm));
      if ((phase === 'down' || phase === 'ready') && elbow > 102 && elbow < 132 && ctx.direction === 'down') cues.push('scendiAncora');
      else if ((phase === 'up' || phase === 'bottom') && elbow > 128 && elbow < 147 && ctx.direction === 'up') cues.push('distendiBraccia');
      const line = trunkLean(lm);
      if (line < 152) { q -= 20; cues.unshift('coreTight'); }
      else if (line < 164) { q -= 8; cues.unshift('coreTight'); }
      const shoulderL = angleFromLandmarks(lm, LM.left_hip, LM.left_shoulder, LM.left_elbow);
      if (shoulderL > 84) { q -= 10; cues.push('elbows45'); }
      if (Math.abs(ctx.velocity) > 520) { q -= 8; cues.push('control'); }
      return { quality: clamp(q, 0, 100), cues };
    },
  },

  // 3. CRUNCH
  crunch: {
    id: 'crunch',
    aliases: [],
    label: { it: 'Crunch', en: 'Crunch', de: 'Crunch' },
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_knee, name: 'hipFlex' },
    secondaryAngles: [{ a: LM.left_hip, b: LM.left_shoulder, c: LM.left_ear, name: 'neck', ideal: [70, 110] }],
    thresholds: { downThreshold: 95, upThreshold: 125, hysteresis: 6, minDownMs: 180, minUpMs: 140 },
    evaluateForm(lm, _angles, _phase, ctx) {
      const cues: string[] = [];
      let q = 88;
      // Neck: don't pull — head should stay neutral, ear-shoulder-hip ~90
      const neck = angleFromLandmarks(lm, LM.left_hip, LM.left_shoulder, LM.left_ear);
      if (neck < 60 || neck > 120) { q -= 10; cues.push('backStraight'); }
      if (Math.abs(ctx.velocity) > 380) { q -= 8; cues.push('control'); }
      return { quality: clamp(q, 0, 100), cues };
    },
  },

  // 4. PLANK (hold)
  plank: {
    id: 'plank',
    aliases: [],
    label: { it: 'Plank', en: 'Plank', de: 'Plank' },
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_knee, name: 'hipLine' },
    secondaryAngles: [{ a: LM.left_shoulder, b: LM.left_hip, c: LM.left_ankle, name: 'fullLine', ideal: [160, 180] }],
    thresholds: { downThreshold: 150, upThreshold: 160, hysteresis: 5, minDownMs: 300, minUpMs: 300 },
    isHold: true,
    evaluateForm(lm) {
      const cues: string[] = [];
      const line = trunkLean(lm);
      const hip = hipAngle(lm);
      let q = 95;
      if (line < 155) { q = 55; cues.push('hipsUp'); } // sagging hips
      else if (line < 165) { q -= 12; cues.push('coreTight'); }
      if (hip < 150) { q -= 10; cues.push('hipsUp'); }
      return { quality: clamp(q, 0, 100), cues };
    },
  },

  // 5. MOUNTAIN CLIMBER — alternating knee drive, count each knee touch as half-rep or full cycle
  mountainclimber: {
    id: 'mountainclimber',
    aliases: [],
    label: { it: 'Mountain climber', en: 'Mountain climber', de: 'Mountain Climber' },
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_knee, name: 'leftHipFlex' },
    secondaryAngles: [{ a: LM.right_shoulder, b: LM.right_hip, c: LM.right_knee, name: 'rightHipFlex' }],
    thresholds: { downThreshold: 65, upThreshold: 120, hysteresis: 8, minDownMs: 120, minUpMs: 100 },
    customTransition(angle, _vel, prev, ctx) {
      // Use whichever leg is driving: pick smaller hip angle (more flexed)
      const lm = ctx.landmarks;
      const l = hipAngle(lm) - 20; // bilateral avg already
      const left = angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_knee);
      const right = angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_knee);
      const driving = Math.min(left, right);
      // Map driving angle onto thresholds
      if (prev === 'ready' && driving < 75) return 'down';
      if (prev === 'down' && driving > 115) return 'up';
      if (prev === 'bottom' && driving > 115) return 'up';
      // bottom refinement
      if (prev === 'down' && driving < 60) return 'bottom';
      return null;
    },
    evaluateForm(lm, _angles, _phase, ctx) {
      const cues: string[] = [];
      let q = 88;
      // Keep plank line
      if (trunkLean(lm) < 155) { q -= 15; cues.push('coreTight'); }
      if (Math.abs(ctx.velocity) > 700) { q -= 8; cues.push('steady'); }
      return { quality: clamp(q, 0, 100), cues };
    },
  },

  // 6. JUMPING JACK — legs wide + arms overhead
  jumpingjack: {
    id: 'jumpingjack',
    aliases: [],
    label: { it: 'Jumping jack', en: 'Jumping jack', de: 'Jumping Jack' },
    primaryAngle: { a: LM.left_shoulder, b: LM.left_elbow, c: LM.left_wrist, name: 'arms' },
    secondaryAngles: [{ a: LM.left_hip, b: LM.left_knee, c: LM.left_ankle, name: 'legs' }],
    thresholds: { downThreshold: 60, upThreshold: 140, hysteresis: 12, minDownMs: 160, minUpMs: 120 },
    customTransition(angle, _vel, prev, ctx) {
      const lm = ctx.landmarks;
      const legSpread = ankleDistance(lm); // 0..~0.6
      const armsUp = shoulderAbduction(lm); // ~30 closed, ~160 open overhead
      const combined = armsUp * 0.6 + legSpread * 200; // heuristic composite 0..~180
      if (prev === 'ready' && combined < 55) return 'down'; // closed
      if (prev === 'down' && combined > 125) return 'up';
      if (prev === 'bottom' && combined > 125) return 'up';
      if (prev === 'down' && combined < 35) return 'bottom';
      return null;
    },
    evaluateForm(_lm, _angles, _phase, ctx) {
      let q = 90;
      const cues: string[] = [];
      if (Math.abs(ctx.velocity) > 600) { q -= 6; cues.push('steady'); }
      return { quality: clamp(q, 0, 100), cues };
    },
  },

  // 7. FLUTTER KICKS — alternating hip flexion small amplitude bilateral
  flutterkick: {
    id: 'flutterkick',
    aliases: ['flutterkicks'],
    label: { it: 'Forbici', en: 'Flutter kicks', de: 'Flutter Kicks' },
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_knee, name: 'hipFlex' },
    thresholds: { downThreshold: 145, upThreshold: 165, hysteresis: 5, minDownMs: 140, minUpMs: 120 },
    customTransition(_angle, _vel, prev, ctx) {
      const lm = ctx.landmarks;
      const lHip = angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_knee);
      const rHip = angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_knee);
      // flutter: one leg up (flexed ~140) other down (extended ~175) alternating
      const asymmetry = Math.abs(lHip - rHip);
      const mean = (lHip + rHip) / 2;
      if (prev === 'ready' && asymmetry > 14 && mean < 168) return 'down';
      if ((prev === 'down' || prev === 'bottom') && asymmetry < 6) return 'up';
      if (prev === 'down' && asymmetry > 22) return 'bottom';
      return null;
    },
    evaluateForm(lm, _angles, _phase, _ctx) {
      let q = 88;
      const cues: string[] = [];
      // Keep lower back on floor proxy: hip line should not arch >180 strongly
      const trunk = hipAngle(lm);
      if (trunk > 185) { q -= 10; cues.push('coreTight'); }
      return { quality: clamp(q, 0, 100), cues };
    },
  },

  // 8. BICYCLE CRUNCH — opposite elbow to knee
  bicyclecrunch: {
    id: 'bicyclecrunch',
    aliases: ['crunchbici'],
    label: { it: 'Bicycle crunch', en: 'Bicycle crunch', de: 'Bicycle Crunch' },
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.right_knee, name: 'crossA' },
    thresholds: { downThreshold: 45, upThreshold: 95, hysteresis: 10, minDownMs: 160, minUpMs: 120 },
    customTransition(_a, _vel, prev, ctx) {
      const lm = ctx.landmarks;
      // distance elbow to opposite knee
      const le = lm[LM.left_elbow], rk = lm[LM.right_knee], re = lm[LM.right_elbow], lk = lm[LM.left_knee];
      if (!le || !rk || !re || !lk) return null;
      const d1 = Math.hypot(le.x - rk.x, le.y - rk.y);
      const d2 = Math.hypot(re.x - lk.x, re.y - lk.y);
      const best = Math.min(d1, d2); // ~0.05 when touching, ~0.4 when apart
      const contact = best < 0.16;
      const apart = best > 0.28;
      if (prev === 'ready' && apart) return 'down';
      if (prev === 'down' && contact) return 'bottom';
      if ((prev === 'down' || prev === 'bottom') && apart) return 'up';
      return null;
    },
    evaluateForm(_lm, _a, _p, ctx) {
      let q = 87;
      if (Math.abs(ctx.velocity) > 500) { q -= 8; }
      return { quality: clamp(q, 0, 100), cues: [] as string[] };
    },
  },

  // 9. LEG RAISE — hip 180->80
  legraise: {
    id: 'legraise',
    aliases: [],
    label: { it: 'Leg raise', en: 'Leg raise', de: 'Beinheben' },
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_knee, name: 'hipFlex' },
    thresholds: { downThreshold: 90, upThreshold: 155, hysteresis: 8, minDownMs: 260, minUpMs: 160 },
    evaluateForm(lm, _angles, _phase, _ctx) {
      let q = 90;
      const cues: string[] = [];
      // Knees should stay extended (~170)
      const lk = angleFromLandmarks(lm, LM.left_hip, LM.left_knee, LM.left_ankle);
      const rk = angleFromLandmarks(lm, LM.right_hip, LM.right_knee, LM.right_ankle);
      const kneeExt = (lk + rk) / 2;
      if (kneeExt < 155) { q -= 12; cues.push('control'); }
      return { quality: clamp(q, 0, 100), cues };
    },
  },

  // 10. DEAD BUG — opposite arm/leg extension
  deadbug: {
    id: 'deadbug',
    aliases: [],
    label: { it: 'Dead bug', en: 'Dead bug', de: 'Dead Bug' },
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_knee, name: 'hipFlex' },
    thresholds: { downThreshold: 95, upThreshold: 155, hysteresis: 10, minDownMs: 220, minUpMs: 160 },
    customTransition(_a, _vel, prev, ctx) {
      const lm = ctx.landmarks;
      // one side extended: hip ~170 + shoulder 150, other flexed 90
      const lHip = angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_knee);
      const rHip = angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_knee);
      const lShoulder = angleFromLandmarks(lm, LM.left_hip, LM.left_shoulder, LM.left_elbow);
      const rShoulder = angleFromLandmarks(lm, LM.right_hip, LM.right_shoulder, LM.right_elbow);
      const extendedLeft = lHip > 150 && lShoulder > 130;
      const extendedRight = rHip > 150 && rShoulder > 130;
      const oneExtended = extendedLeft !== extendedRight; // XOR alternating
      if (prev === 'ready' && !oneExtended) return 'down'; // both tucked = down
      if (prev === 'down' && oneExtended) return 'bottom';
      if ((prev === 'down' || prev === 'bottom') && !oneExtended) return 'up';
      return null;
    },
    evaluateForm(lm, _a, _p, _ctx) {
      let q = 90;
      const cues: string[] = [];
      // lower back should stay flat: hip-shoulder line not arching
      if (trunkLean(lm) < 160) { q -= 10; cues.push('coreTight'); }
      return { quality: clamp(q, 0, 100), cues };
    },
  },

  // 11. HEEL TAP — lateral crunch touching heel
  heeltap: {
    id: 'heeltap',
    aliases: [],
    label: { it: 'Heel tap', en: 'Heel tap', de: 'Heel Tap' },
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_knee, name: 'lateral' },
    thresholds: { downThreshold: 28, upThreshold: 65, hysteresis: 8, minDownMs: 180, minUpMs: 120 },
    customTransition(_a, _vel, prev, ctx) {
      const lm = ctx.landmarks;
      const lw = lm[LM.left_wrist], lh = lm[LM.left_heel], rw = lm[LM.right_wrist], rh = lm[LM.right_heel];
      if (!lw || !lh || !rw || !rh) return null;
      const dL = Math.hypot(lw.x - lh.x, lw.y - lh.y);
      const dR = Math.hypot(rw.x - rh.x, rw.y - rh.y);
      const best = Math.min(dL, dR); // ~0.05 when tapping
      const tap = best < 0.14;
      const centered = best > 0.28;
      if (prev === 'ready' && centered) return 'down';
      if (prev === 'down' && tap) return 'bottom';
      if ((prev === 'down' || prev === 'bottom') && centered) return 'up';
      return null;
    },
    evaluateForm(_lm, _a, _p, _ctx) { return { quality: 88, cues: [] as string[] }; },
  },

  // 12. V-UP — pike, hip ~45 at top
  vup: {
    id: 'vup',
    aliases: [],
    label: { it: 'V-up', en: 'V-up', de: 'V-Up' },
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_knee, name: 'pike' },
    thresholds: { downThreshold: 60, upThreshold: 155, hysteresis: 10, minDownMs: 260, minUpMs: 180 },
    evaluateForm(lm, _a, _p, ctx) {
      const cues: string[] = [];
      let q = 88;
      // Legs straight proxy
      const lk = angleFromLandmarks(lm, LM.left_hip, LM.left_knee, LM.left_ankle);
      if (lk < 150) { q -= 10; cues.push('control'); }
      if (Math.abs(ctx.velocity) > 550) { q -= 8; cues.push('control'); }
      return { quality: clamp(q, 0, 100), cues };
    },
  },

  // 13. BURPEE — full body down→up via squat/plank/jump phases; we count completion as return to standing + jump
  burpee: {
    id: 'burpee',
    aliases: ['burpeetattico'],
    label: { it: 'Burpee', en: 'Burpee', de: 'Burpee' },
    primaryAngle: { a: LM.left_hip, b: LM.left_knee, c: LM.left_ankle, name: 'knee' },
    thresholds: { downThreshold: 85, upThreshold: 155, hysteresis: 9, minDownMs: 340, minUpMs: 240 },
    customTransition(_a, _vel, prev, ctx) {
      const lm = ctx.landmarks;
      const knee = kneeAngle(lm);
      const elbow = elbowAngle(lm);
      const standing = knee > 150;
      const squatDown = knee < 95;
      const inPlank = elbow > 150 && knee > 140;
      if (prev === 'ready' && squatDown) return 'down';
      if (prev === 'down' && (inPlank || knee < 80)) return 'bottom';
      if ((prev === 'down' || prev === 'bottom') && standing) return 'up';
      return null;
    },
    evaluateForm(lm, _a, _p, ctx) {
      let q = 86;
      const cues: string[] = [];
      if (Math.abs(ctx.velocity) > 650) { q -= 6; cues.push('control'); }
      if (trunkLean(lm) < 145) { cues.push('backStraight'); }
      return { quality: clamp(q, 0, 100), cues };
    },
  },

  // 14. AFFONDO — lunge, knee 160->80, usare lato migliore, scendi ancora / distendi
  affondo: {
    id: 'affondo' as any,
    aliases: ['lunge'],
    label: { it: 'Affondo', en: 'Lunge', de: 'Ausfallschritt' },
    primaryAngle: { a: LM.left_hip, b: LM.left_knee, c: LM.left_ankle, name: 'knee' },
    thresholds: { downThreshold: 92, upThreshold: 150, hysteresis: 6, minDownMs: 220, minUpMs: 140, minRepsIntervalMs: 450 },
    evaluateForm(lm, angles, phase, ctx) {
      const cues: string[] = [];
      let q = 90;
      const knee = (angles['primary'] ?? kneeAngleBest(lm));
      if ((phase === 'down' || phase === 'ready') && knee > 108 && knee < 138 && ctx.direction === 'down') cues.push('scendiAncora');
      else if ((phase === 'up' || phase === 'bottom') && knee > 130 && knee < 149 && ctx.direction === 'up') cues.push('distendiGambe');
      if (trunkLean(lm) < 150) { q -= 14; cues.unshift('backStraight'); }
      if (Math.abs(ctx.velocity) > 450) { q -= 8; cues.push('control'); }
      return { quality: clamp(q, 0, 100), cues };
    },
  },

  // 15. SKATER — hop laterale, usare ankle distance + knee, ritmo costante
  skater: {
    id: 'skater' as any,
    label: { it: 'Skater', en: 'Skater', de: 'Skater' },
    primaryAngle: { a: LM.left_hip, b: LM.left_knee, c: LM.left_ankle, name: 'knee' },
    thresholds: { downThreshold: 95, upThreshold: 155, hysteresis: 8, minDownMs: 180, minUpMs: 140, minRepsIntervalMs: 380 },
    customTransition(_a, _vel, prev, ctx) {
      const lm = ctx.landmarks;
      const spread = ankleDistance(lm); // 0.05 chiuso, 0.45 aperto
      const knee = kneeAngleBest(lm);
      const bent = knee < 125;
      const wide = spread > 0.28;
      if (prev === 'ready' && bent && wide) return 'down';
      if (prev === 'down' && spread < 0.14) return 'up';
      if (prev === 'bottom' && spread < 0.14) return 'up';
      if (prev === 'down' && knee < 105) return 'bottom';
      return null;
    },
    evaluateForm(_lm, _a, _p, ctx) {
      let q = 88;
      if (Math.abs(ctx.velocity) > 600) { q -= 7; }
      return { quality: clamp(q, 0, 100), cues: [] };
    },
  },

  // 16. GINOCCHIA ALTE — high knees, hipFlex alternato, ginocchio al petto — permissivo 75/125
  ginocchiaalte: {
    id: 'ginocchiaalte' as any,
    aliases: ['highknees'],
    label: { it: 'Ginocchia alte', en: 'High knees', de: 'Knie hoch' },
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_knee, name: 'hipFlex' },
    thresholds: { downThreshold: 78, upThreshold: 125, hysteresis: 8, minDownMs: 130, minUpMs: 110, minRepsIntervalMs: 280 },
    customTransition(_a, _vel, prev, ctx) {
      const lm = ctx.landmarks;
      const l = angleFromLandmarks(lm, LM.left_shoulder, LM.left_hip, LM.left_knee);
      const r = angleFromLandmarks(lm, LM.right_shoulder, LM.right_hip, LM.right_knee);
      const driving = Math.min(l, r); // più flesso = ginocchio alto
      if (prev === 'ready' && driving < 78) return 'down';
      if (prev === 'down' && driving > 115) return 'up';
      if (prev === 'bottom' && driving > 115) return 'up';
      if (prev === 'down' && driving < 62) return 'bottom';
      return null;
    },
    evaluateForm(lm, _a, _p, ctx) {
      let q = 87;
      if (trunkLean(lm) < 152) { q -= 10; }
      if (Math.abs(ctx.velocity) > 650) { q -= 7; }
      return { quality: clamp(q, 0, 100), cues: q < 72 ? ['kneesToChest'] : [] };
    },
  },

  // 17. SUPERMAN — sdraiato prono, braccia+gambe su, angolo shoulder-hip-knee esteso
  superman: {
    id: 'superman' as any,
    label: { it: 'Superman', en: 'Superman', de: 'Superman' },
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_knee, name: 'hipFlex' },
    thresholds: { downThreshold: 155, upThreshold: 170, hysteresis: 5, minDownMs: 300, minUpMs: 220, minRepsIntervalMs: 500 },
    customTransition(_a, _vel, prev, ctx) {
      const lm = ctx.landmarks;
      // prono: hip ~170 riposo, ~155 sollevato (leggero), ma usiamo distanza spalle-terra proxy: y di shoulder vs hip
      const hip = hipAngleBest(lm);
      const up = hip < 162; // sollevato
      const down = hip > 170;
      if (prev === 'ready' && down) return 'down';
      if (prev === 'down' && up) return 'bottom';
      if ((prev === 'down' || prev === 'bottom') && down) return 'up';
      return null;
    },
    evaluateForm(_lm, _a, _p, _ctx) { return { quality: 88, cues: [] }; },
    isHold: false,
  },

  // 18. PONTE — bridge glutei, hip 95->170, bacino alto
  ponte: {
    id: 'ponte' as any,
    aliases: ['bridge'],
    label: { it: 'Ponte glutei', en: 'Glute bridge', de: 'Glute Bridge' },
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_knee, name: 'hipFlex' },
    thresholds: { downThreshold: 100, upThreshold: 160, hysteresis: 8, minDownMs: 250, minUpMs: 180, minRepsIntervalMs: 500 },
    evaluateForm(lm, angles, phase, ctx) {
      const cues: string[] = [];
      let q = 90;
      const hip = (angles['primary'] ?? hipAngleBest(lm));
      if ((phase === 'down' || phase === 'ready') && hip < 135 && hip > 105 && ctx.direction === 'up') cues.push('hipsUp');
      if (trunkLean(lm) < 150) { q -= 12; cues.push('coreTight'); }
      return { quality: clamp(q, 0, 100), cues };
    },
  },

  // 19. RUSSIAN TWIST — rotazione busto, shoulder-hip alternato, distanza mano-ginocchio
  russiantwist: {
    id: 'russiantwist' as any,
    label: { it: 'Russian twist', en: 'Russian twist', de: 'Russian Twist' },
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.right_knee, name: 'twist' },
    thresholds: { downThreshold: 30, upThreshold: 70, hysteresis: 10, minDownMs: 180, minUpMs: 140, minRepsIntervalMs: 350 },
    customTransition(_a, _vel, prev, ctx) {
      const lm = ctx.landmarks;
      const lw = lm[LM.left_wrist], rw = lm[LM.right_wrist];
      if (!lw || !rw) return null;
      // twist: wrists move lateralmente rispetto a hip center
      const midHip = { x: (lm[LM.left_hip].x + lm[LM.right_hip].x) / 2, y: (lm[LM.left_hip].y + lm[LM.right_hip].y) / 2 } as any;
      const left = Math.abs(lw.x - midHip.x), right = Math.abs(rw.x - midHip.x);
      const maxLateral = Math.max(left, right); // ~0.18 centro, ~0.38 lato
      const centered = maxLateral < 0.20;
      const twisted = maxLateral > 0.30;
      if (prev === 'ready' && centered) return 'down';
      if (prev === 'down' && twisted) return 'bottom';
      if ((prev === 'down' || prev === 'bottom') && centered) return 'up';
      return null;
    },
    evaluateForm(_lm, _a, _p, _ctx) { return { quality: 86, cues: [] }; },
  },

  // 20. WALLSIT — hold, knee 90°, schiena al muro
  wallsit: {
    id: 'wallsit' as any,
    label: { it: 'Wall sit', en: 'Wall sit', de: 'Wandsitz' },
    primaryAngle: { a: LM.left_hip, b: LM.left_knee, c: LM.left_ankle, name: 'knee' },
    thresholds: { downThreshold: 80, upThreshold: 110, hysteresis: 6, minDownMs: 400, minUpMs: 300 },
    isHold: true,
    evaluateForm(lm) {
      const k = kneeAngleBest(lm);
      let q = 95;
      const cues: string[] = [];
      if (k < 75 || k > 115) { q -= 22; cues.push('control'); }
      else if (k < 82 || k > 105) { q -= 10; cues.push('control'); }
      if (trunkLean(lm) < 155) { q -= 10; cues.push('backStraight'); }
      return { quality: clamp(q, 0, 100), cues };
    },
  },

  // 21. SIDEPLANK — hold laterale
  sideplank: {
    id: 'sideplank' as any,
    label: { it: 'Plank laterale', en: 'Side plank', de: 'Seitstütz' },
    primaryAngle: { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_ankle, name: 'fullLine' },
    thresholds: { downThreshold: 155, upThreshold: 168, hysteresis: 5, minDownMs: 350, minUpMs: 300 },
    isHold: true,
    evaluateForm(lm) {
      const line = trunkLean(lm);
      let q = 94;
      const cues: string[] = [];
      if (line < 150) { q = 52; cues.push('hipsUp'); }
      else if (line < 162) { q -= 12; cues.push('coreTight'); }
      return { quality: clamp(q, 0, 100), cues };
    },
  },

  // 22. PLANKJACK — plank + gambe che si aprono, ankle distance
  plankjack: {
    id: 'plankjack' as any,
    label: { it: 'Plank jack', en: 'Plank jack', de: 'Plank Jack' },
    primaryAngle: { a: LM.left_hip, b: LM.left_knee, c: LM.left_ankle, name: 'knee' },
    thresholds: { downThreshold: 40, upThreshold: 120, hysteresis: 10, minDownMs: 150, minUpMs: 120, minRepsIntervalMs: 300 },
    customTransition(_a, _vel, prev, ctx) {
      const spread = ankleDistance(ctx.landmarks);
      const closed = spread < 0.12;
      const open = spread > 0.30;
      if (prev === 'ready' && closed) return 'down';
      if (prev === 'down' && open) return 'bottom';
      if ((prev === 'down' || prev === 'bottom') && closed) return 'up';
      return null;
    },
    evaluateForm(lm, _a, _p, ctx) {
      let q = 88;
      if (trunkLean(lm) < 153) { q -= 14; }
      if (Math.abs(ctx.velocity) > 700) { q -= 7; }
      return { quality: clamp(q, 0, 100), cues: [] };
    },
  },
};

export function normalizeExerciseId(id: string): string {
  if (id === 'flessioni') return 'pushup';
  if (id === 'crunchbici') return 'bicyclecrunch';
  if (id === 'burpeetattico') return 'burpee';
  return id;
}

export function getDefinition(id: string): ExerciseDefinition | null {
  const nid = normalizeExerciseId(id);
  return (EXERCISE_DEFINITIONS as any)[nid] ?? null;
}

export function localizedCue(cueKey: string, lang: Lang): string {
  const c = (CUE as any)[cueKey];
  return c ? tr(c, lang) : cueKey;
}
