/**
 * Operator40 — Exercise Definitions
 * 13 exercises: pushup/squat/crunch/plank/mountainclimber/jumpingjack/flutterkick/bicyclecrunch/legraise/deadbug/heeltap/vup/burpee
 * Each defines primary joint, thresholds (hysteresis), form evaluation & cues.
 * Angles computed from MediaPipe 33 landmarks (bilateral where useful).
 */
import type { ExerciseDefinition, PoseLandmarks, EnginePhase } from '../types';
import { LM, angleFromLandmarks, bilateralAngle, clamp, qualityFromDeviation } from '../math';

// Localized cue helpers
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

function makeQualityLogger() {
  // placeholder for future per-rep smoothing
  return (scores: number[]) => clamp(scores.reduce((s,v)=>s+v,0)/(scores.length||1), 0, 100);
}

// ---- Definitions ----

export const EXERCISE_DEFINITIONS: Record<string, ExerciseDefinition> = {
  // 1. SQUAT — knee 160->75, trunk quality
  squat: {
    id: 'squat',
    aliases: [],
    label: { it: 'Squat', en: 'Squat', de: 'Kniebeuge' },
    primaryAngle: { a: LM.left_hip, b: LM.left_knee, c: LM.left_ankle, name: 'knee' },
    secondaryAngles: [
      { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_knee, name: 'hipFlex', ideal: [40, 90] },
      { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_ankle, name: 'trunk', ideal: [160, 180] },
    ],
    thresholds: { downThreshold: 85, upThreshold: 155, hysteresis: 7, minDownMs: 220, minUpMs: 140 },
    evaluateForm(lm, angles, phase, ctx) {
      const cues: string[] = [];
      let quality = 92;
      const trunk = trunkLean(lm);
      const hipF = hipAngle(lm);
      // Back straight: trunk ~170-180 when standing, ~150-170 at bottom acceptable leaning
      if (trunk < 150) { quality -= 18; cues.push('backStraight'); }
      else if (trunk < 160) { quality -= 8; cues.push('backStraight'); }
      // Knee tracking proxy: hip angle symmetry (if one knee collapses, angles diverge)
      const leftK = angleFromLandmarks(lm, LM.left_hip, LM.left_knee, LM.left_ankle);
      const rightK = angleFromLandmarks(lm, LM.right_hip, LM.right_knee, LM.right_ankle);
      if (Math.abs(leftK - rightK) > 18) { quality -= 10; cues.push('kneesOverToes'); }
      // Velocity too fast → less control
      if (Math.abs(ctx.velocity) > 420) { quality -= 10; cues.push('control'); }
      // Depth: if never goes below 95 deg, flag partial
      if (ctx.repCount === 0 && phase === 'up' && (angles['knee'] ?? 180) > 100) {
        // not yet penalize, just hint
      }
      return { quality: clamp(quality, 0, 100), cues };
    },
  },

  // 2. PUSHUP
  pushup: {
    id: 'pushup',
    aliases: ['flessioni'],
    label: { it: 'Piegamenti', en: 'Push-up', de: 'Liegestütz' },
    primaryAngle: { a: LM.left_shoulder, b: LM.left_elbow, c: LM.left_wrist, name: 'elbow' },
    secondaryAngles: [
      { a: LM.left_shoulder, b: LM.left_hip, c: LM.left_ankle, name: 'plankLine', ideal: [160, 185] },
      { a: LM.left_hip, b: LM.left_shoulder, c: LM.left_elbow, name: 'shoulder', ideal: [20, 70] },
    ],
    thresholds: { downThreshold: 90, upThreshold: 155, hysteresis: 8, minDownMs: 200, minUpMs: 130 },
    evaluateForm(lm, angles, phase, ctx) {
      const cues: string[] = [];
      let q = 90;
      const line = trunkLean(lm); // shoulder-hip-ankle straight
      if (line < 155) { q -= 20; cues.push('coreTight'); }
      else if (line < 165) { q -= 8; cues.push('coreTight'); }
      // Elbow flare proxy: shoulder angle > 80 at bottom = flared
      const shoulderL = angleFromLandmarks(lm, LM.left_hip, LM.left_shoulder, LM.left_elbow);
      if (shoulderL > 85) { q -= 10; cues.push('elbows45'); }
      if (Math.abs(ctx.velocity) > 500) { q -= 8; cues.push('control'); }
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
      const leap = lm[LM.left_ankle]?.y ?? 0.5; // normalized y: smaller = higher jump (y origin top)
      const standing = knee > 150;
      const squatDown = knee < 95;
      const inPlank = elbow > 150 && knee > 140; // roughly straight in plank
      // Burpee cycle: ready(standing) -> down(squat) -> bottom(plank/pushup) -> up(jump apex = standing + feet off ground slight)
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
