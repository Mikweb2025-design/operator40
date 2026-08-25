/**
 * Operator40 — AI Fitness Engine — Types
 * Production-ready, fully client-side, Safari/iOS PWA optimized.
 */

export type ExerciseId =
  | 'squat'
  | 'pushup'
  | 'flessioni' // alias pushup
  | 'crunch'
  | 'crunchbici' // alias bicyclecrunch
  | 'plank'
  | 'mountainclimber'
  | 'jumpingjack'
  | 'flutterkick'
  | 'bicyclecrunch'
  | 'legraise'
  | 'deadbug'
  | 'heeltap'
  | 'vup'
  | 'burpee'
  | 'burpeetattico' // alias burpee
  | 'affondo'
  | 'lunge' // alias affondo
  | 'skater'
  | 'ginocchiaalte'
  | 'highknees' // alias ginocchiaalte
  | 'superman'
  | 'ponte'
  | 'bridge' // alias ponte
  | 'russiantwist'
  | 'wallsit'
  | 'sideplank'
  | 'plankjack';

export type NormalizedExerciseId = Exclude<ExerciseId, 'flessioni' | 'crunchbici' | 'burpeetattico' | 'lunge' | 'highknees' | 'bridge'>;

export interface Landmark {
  x: number; // 0..1
  y: number; // 0..1
  z?: number;
  visibility?: number;
}

export type PoseLandmarks = Landmark[]; // 33 points MediaPipe

export interface PoseResult {
  landmarks: PoseLandmarks | null;
  worldLandmarks?: PoseLandmarks | null;
  timestampMs: number;
  visibilityScore: number; // 0..1 mean visibility of key points
}

// State machine — configurable with hysteresis
export type EnginePhase =
  | 'idle'        // not started, waiting for user in frame
  | 'ready'       // user visible, waiting for first motion
  | 'down'        // descending / loading phase
  | 'bottom'      // bottom hold (for hysteresis)
  | 'up'          // ascending / returning
  | 'rep_completed'; // just finished a rep (transient, goes to ready/up)

export interface StateMachineConfig {
  downThreshold: number;  // angle below this => down
  upThreshold: number;    // angle above this => up
  hysteresis?: number;    // degrees, default 5, avoids flicker near thresholds
  minDownMs?: number;     // minimum time in down/bottom before counting up (debounce)
  minUpMs?: number;
  minRepsIntervalMs?: number; // debounce double count
}

export interface RepEvent {
  repIndex: number; // 1-based
  timestampMs: number;
  durationMs: number; // time since last rep or since start for first
  peakAngle: number;
  troughAngle: number;
  quality: number; // 0..100
  cues: string[];
  velocity: number; // deg/s avg
}

export interface FormMetrics {
  primaryAngle: number;
  secondaryAngles: Record<string, number>;
  velocity: number; // deg/s instantaneous (filtered)
  direction: 'down' | 'up' | 'hold' | 'idle';
  quality: number; // 0..100 instantaneous
  cues: string[]; // e.g. 'keep your back straight'
  visibility: number;
  poseQuality?: number; // 0-100 aggregate required-landmarks visibility (prompt §7)
}

export interface EngineMetrics {
  reps: number;
  elapsedMs: number; // since motion start (first down)
  elapsedActiveMs: number; // total time in motion (excludes idle)
  avgQuality: number; // 0..100
  lastRepQuality: number | null;
  currentPhase: EnginePhase;
  currentForm: FormMetrics | null;
  caloriesEst?: number;
  fps: number;
  poseQuality?: number; // 0-100 (prompt §7)
  trackingSupported?: boolean;
}

export interface EngineConfig {
  exerciseId: NormalizedExerciseId;
  lang?: 'it' | 'en' | 'de';
  targetFps?: number; // inference throttle, default 30 (Safari battery)
  enableFiltering?: boolean; // OneEuro on landmarks, default true
  enableSpeech?: boolean;
  mirror?: boolean;
  qualitySmoothingWindow?: number; // default 5 reps moving avg
  onRep?: (e: RepEvent) => void;
  onPhaseChange?: (phase: EnginePhase, metrics: FormMetrics | null) => void;
  onMetrics?: (m: EngineMetrics) => void;
  // thresholds override per exercise
  thresholdsOverride?: Partial<StateMachineConfig>;
}

export interface ExerciseDefinition {
  id: NormalizedExerciseId;
  aliases?: ExerciseId[];
  label: Record<string, string>;
  trackingSupported: boolean; // false => exercise recognized but AI tracking not yet implemented (prompt §36)
  requiredLandmarks: number[]; // MediaPipe indices required to be visible for valid tracking
  primaryAngle: { a: number; b: number; c: number; name: string }; // landmark indices
  secondaryAngles?: Array<{ a: number; b: number; c: number; name: string; ideal?: [number, number] }>;
  thresholds: StateMachineConfig;
  movementPattern?: string; // e.g. 'squat_down_up', 'plank_hold', 'alternating'
  safetyRules?: string[]; // cue keys that are safety-critical (priority 1)
  // Quality evaluation
  evaluateForm: (
    landmarks: PoseLandmarks,
    angles: Record<string, number>,
    phase: EnginePhase,
    ctx: { velocity: number; direction: string; visibility: number; repCount: number }
  ) => { quality: number; cues: string[] };
  // Optional custom state machine override (for complex exercises like burpee, jumpingjack)
  customTransition?: (
    angle: number,
    velocity: number,
    prevPhase: EnginePhase,
    ctx: { landmarks: PoseLandmarks; timestampMs: number }
  ) => EnginePhase | null;
  // For hold exercises (plank) — rep counting disabled, timer based
  isHold?: boolean;
}

export type ModelVariant = 'lite' | 'heavy' | 'full' | 'auto';

export interface LandmarkerOptions {
  modelAssetPath?: string;
  modelVariant?: ModelVariant; // 'lite' default (mobile), 'heavy'/'full' for modern iPhone, 'auto' picks heavy if device high-end
  delegate?: 'GPU' | 'CPU';
  numPoses?: number;
  minPoseDetectionConfidence?: number;
  minPosePresenceConfidence?: number;
  minTrackingConfidence?: number;
}
