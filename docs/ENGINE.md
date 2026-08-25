# Operator40 — AI Fitness Engine

Production-ready, fully client-side pose engine for PWA (iPhone Safari + Android Chrome).

## Stack
- **MediaPipe Tasks Vision 0.10.14 — Pose Landmarker Lite** (`@mediapipe/tasks-vision`, 154 kB wasm bundle)
- **OneEuroFilter + LandmarkSmoother** — jitter reduction, no Kalman overhead, low CPU/battery
- **Hysteresis State Machine** — `idle → ready → down → bottom → up → rep_completed`, with hysteresis band + dwell times to avoid double counts
- **TypeScript**, `requestAnimationFrame` + throttled inference (28 fps default, auto-drops to 22 fps if heavy), no video uploads

## Architecture
```
src/engine/
  types.ts                  # ExerciseId, PoseResult, EnginePhase, RepEvent, FormMetrics, EngineMetrics, ExerciseDefinition
  math.ts                   # angleDeg, bilateralAngle, visibilityScore, velocity
  filters/OneEuroFilter.ts  # adaptive low-pass (β drift)
  filters/LandmarkSmoother.ts # 33 × (x,y) OneEuro, per-landmark smoothing
  stateMachine.ts           # HysteresisStateMachine (down/up thresholds, minDownMs/minUpMs, rep debounce)
  exercises/definitions.ts  # 13 exercises: pushup/squat/crunch/plank/mountainclimber/jumpingjack/flutterkick/bicyclecrunch/legraise/deadbug/heeltap/vup/burpee
  PoseLandmarkerManager.ts  # GPU→CPU fallback, VIDEO mode, lite model, CDN + local fallback, FilesetResolver
  FitnessEngine.ts          # rAF loop, angles, velocity/direction, FSM, rep counting, timer, quality 0..100, cues
  coach/SpeechCoach.ts      # Web Speech API, throttled (3 s), lang-aware (it/en/de)
  overlay/poseConnections.ts# skeleton + badge canvas helpers
  hooks/useFitnessEngine.ts # React lifecycle (camera + engine)
  index.ts                  # barrel
src/components/FitnessEngineView.tsx # PWA view: video, canvas overlay, HUD (reps/time/quality), exercise switcher, voice toggle
```

## Exercises (13)
| id | primary angle | down | up | notes |
|---|---|---|---|---|
| squat | knee hip-knee-ankle | 85 | 155 | trunk straight, knee sym |
| pushup | elbow shoulder-elbow-wrist | 90 | 155 | plank line, elbow 45° |
| crunch | hip shoulder-hip-knee | 95 | 125 | neck neutral |
| plank | hipLine shoulder-hip-knee | 150 | 160 | hold, quality = hip line |
| mountainclimber | leftHipFlex (min both) | 65 | 120 | plank line, alternating |
| jumpingjack | composite arms+legs | 60 | 140 | custom: ankleDist + shoulderAbd |
| flutterkick | hipFlex asymmetry | 145 | 165 | custom: asymmetry 14° |
| bicyclecrunch | elbow↔knee distance | 0.16m contact | 0.28m apart | custom distance |
| legraise | hipFlex | 90 | 155 | knees extended |
| deadbug | opposite arm/leg | 95 | 155 | XOR extension |
| heeltap | wrist↔heel distance | 0.14m tap | 0.28m center | lateral |
| vup | pike | 60 | 155 | legs straight |
| burpee | knee + elbow + leap | 85 | 155 | squat→plank→jump composite |

All thresholds configurable via `EngineConfig.thresholdsOverride`.

## Rep Logic
- Smoothed landmarks → primary angle → velocity (ema) → direction (`down/up/hold`)
- FSM: hysteresis band (`hysteresis` deg) prevents flicker. `minDownMs`/`minUpMs` enforce dwell. `minRepsIntervalMs` debounces.
- Rep completed when: `bottom → up` with ROM `peak - trough > ~70% expected` and velocity not excessive
- Quality per rep: `formQuality*0.55 + romCompleteness*0.30 + velocityControl*0.15` → 0..100, moving avg 5 reps = `avgQuality`
- Timer: `elapsedMs` starts at first `down`; `elapsedActiveMs` counts only when not `idle`

## Form & Cues
Each definition's `evaluateForm(lm, angles, phase, {velocity, direction})` returns `{quality, cues[]}`.
Cues localized (`it/en/de`): `keep your back straight`, `knees over toes`, `elbows at 45°`, `core tight`, `controlled motion`, etc.

## Client-Side & PWA
- No `fetch` upload — `detectForVideo(video, timestamp)` on-device only
- Safari iOS: `playsInline + muted + webkit-playsinline`, user-gesture `getUserMedia({facingMode:'user', 640x480, 30fps})`, HTTPS required
- Battery: inference throttled (`targetFps` 28), canvas overlay throttled 45 fps, early exit if `visibility<0.30`, OneEuro cheap, `vision` chunk split (154 kB gz 46 kB)
- Offline: `dist/assets/vision-*.js` same-origin → SW cache-first. Wasm/model from CDN on first run; for 100% offline, copy `wasm/` + `pose_landmarker_lite.task` to `public/wasm` & `public/models` — manager auto-falls-back to `./wasm`, `./models/...` (already in SW precache if added to `PRECACHE_CLIPS`).
- SW: `public/sw.js` already precaches 6 critical clips; vision chunk is cached as same-origin asset after first load.

## Usage
```tsx
import FitnessEngineView from '@/components/FitnessEngineView';

<FitnessEngineView
  exercise="squat" // or "pushup" | "plank" | ...
  lang="it"
  onRep={(e)=> console.log(e.repIndex, e.quality)}
  onDone={({reps, elapsedMs, avgQuality})=> saveSession(...)}
  onClose={()=> setShowPose(null)}
/>
```
Low-level:
```ts
import { FitnessEngine } from '@/engine';
const eng = new FitnessEngine({
  exerciseId: 'squat',
  lang: 'it',
  onRep: e=>{},
  onMetrics: m=>{},
});
await eng.init(videoEl);
eng.start();
// ...
eng.updateExercise('pushup');
eng.destroy();
```

## Performance
- Model: `pose_landmarker_lite` float16, Lite variant — ~15 ms iPhone 14 Safari, ~22 ms low-end Android
- If inference >42 ms, `targetFps` auto-drops to 22
- `chunkSizeWarningLimit` 2000, `sourcemap: false`, manualChunks `vision` isolates mediapipe

## Next (optional)
- Local `public/wasm` bundling for fully offline PWA (copy from `node_modules/@mediapipe/tasks-vision/wasm`)
- Per-exercise calibration (auto-tune thresholds via first 2 reps)
- Pose-based hold validation (plank timer pauses if form <40)
