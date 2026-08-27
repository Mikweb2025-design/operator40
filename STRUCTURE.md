# Operator40 — Complete Structure & Functions

> **Read this to continue tomorrow without re-discovering the repo.** Updated **2026-08-27** — `main @ 5f40511` (`index-BgW1cw35.js / o40-va068d42f`) + `deploy-tmp @ 8c20bdd` (live `o40-va068d42f`). Build `2.9.0 · <git-short>` + **22 AI analyzers + audit 5 aree**.

---

## 1. Overview

**Operator40** — over-40 fitness coach, 15′/day, no equipment, **PWA offline + iOS/Android Capacitor 6**.  
Dark military UI (`INK`/`OLIVE`/`BLAZE`/`KHAKI`/`PAPER`), 18 programs (A–M + N,O,P + Q) for 30-day Camp, 22 exercises with local MP4, streak/goal/medals, NEFFEX offline music, Apple Health import, **push when closed**, **22 exercise-specific AI analyzers**.

- **Live:** https://mikweb.eu/operator40/ (PWA installable, `dist/` → `mikweb.eu/httpdocs/operator40/`)
- **Repo:** https://github.com/Mikweb2025-design/operator40
  - `main` — source (no `dist` history drift, deterministic build)
  - `deploy-tmp` — `dist` for hosting (force-pushed, `curl raw` to server)
  - `operator40-Watch` — with Huawei (separate branch)
- **Stack:** React 18, Vite 5, Capacitor 6 (`idb 8`, `@mediapipe/tasks-vision 0.10` lite/heavy/auto + GPU→CPU + WASM offline `fetch-mediapipe.mjs`), `lucide-react`, `recharts`, Vitest 1, Playwright, PHP 8.3 `web-push` 9.0

**v2.9 what changed:** audit 5 aree — `src/components/ui/*` dedup, `i18n` 15+ chiavi, `audit.test.js` 21 test (30→51), `App.jsx` 9 screens `React.lazy` 749k→444k, `sw.js` SWR + `SKIP_WAITING`, `backup.js` + `STORAGE_SCHEMA_VERSION=2` (già in 2.8.3), changelog 2.9.0.

---

## 2. Folder Tree (for tomorrow)

```
operator40/
├── public/                 # copied as-is to dist/
│   ├── clips/              # 18 MP4 (2.3 MB): bicyclecrunch, russiantwist, wallsit, superman, bridge, highknees, crunch, burpee, sideplank, legraise, flutterkick, deadbug, vup, plankjack, skater, heeltap, squat, flessioni/push-up
│   ├── wasm/               # offline MediaPipe WASM (npm run fetch:mediapipe, gitignored *.wasm/*.js)
│   ├── models/             # pose_landmarker_{lite,heavy}.task (gitignored *.task)
│   ├── icons/              # icon-180/192/512
│   ├── tracks/             # 12 MP3 NEFFEX offline
│   ├── api/                # push backend VAPID — push-subscribe/unsubscribe/update-stats/send/cron + vapid.json (not in repo)
│   ├── manifest.webmanifest
│   └── sw.js               # offline cache-first + push + precache 6 clips + wasm/models if present, CACHE o40-v<hash>
├── src/
│   ├── App.jsx             # ★ ROUTER ~1240 lines — 9 screens React.lazy + Suspense + isAiWork gated SessionAIOverlay
│   ├── main.jsx            # bootstrap React + window.storage (IDB/Preferences) + PWA install defer
│   ├── storage.js          # IndexedDB (idb) v2 + Preferences native, STORAGE_SCHEMA_VERSION=2 + migrateStoredDataIfNeeded + backup.js
│   ├── media.js            # VIDEO_B64 WebP lazy 1.7M (già lazy via dynamic import in Session/Preview)
│   ├── clips.js            # CLIP_FILES 18 MP4 + hasClip()
│   ├── music.js            # playlist autoplay
│   ├── i18n.js             # LANGS [it,en,de] + 15+ nuove chiavi home.section.* / setup.backup.* (audit/7)
│   ├── data/
│   │   ├── exercises.js    # EXERCISES 22 + EXERCISE_GROUPS (standing/ground/core)
│   │   └── programs.js     # PROGRAMS 18, QUICK_PROGRAM, LEVELS, INTERVAL_PRESETS, DAY_CYCLE 20, BELLY_IDS, CAMP_DAYS 30, pickNextProgram
│   ├── ai/                 # ★ NEW modular AI (spec §3) — continue here tomorrow
│   │   ├── pose/
│   │   │   ├── Geometry.ts          # 11 utils: Angle/Distance/Midpoint/Velocity/Acceleration/BodyLine/Torso/Leg/Arm/ROM/Symmetry (torso-normalized)
│   │   │   ├── PoseQuality.ts       # poseConfidence / landmarkConfidence / exerciseConfidence 0-100, pause if <42
│   │   │   └── LandmarkSmoother.ts  # re-export OneEuro
│   │   ├── motion/
│   │   │   ├── MotionFeatures.ts    # history 900ms, velocity/direction/ROM
│   │   │   ├── Geometry.ts          # re-export
│   │   │   └── MotionFusion.ts      # secondary sensor (jumpingJack/highKnees/burpee), PWA works without
│   │   ├── exercises/
│   │   │   ├── ExerciseAnalyzer.ts  # base: phase, repConfidence, formScore, requiredLandmarks
│   │   │   ├── ExerciseRegistry.ts  # 22/22 — getAnalyzer(id) from mission
│   │   │   ├── analyzers.test.ts    # 5 tests
│   │   │   └── analyzers/           # 22 dedicated: pushup, squat, crunch, plank, legRaise, flutterKick, deadBug, vUp, mountainClimber, jumpingJack, bicycleCrunch, heelTap, burpee, affondo, skater, ginocchiaAlte, superman, ponte, russianTwist, wallsit, sideplank, plankJack
│   │   ├── debug/
│   │   │   └── LandmarkRecorder.ts  # record/replay landmarks.json (no video, dev-only)
│   │   └── session/                 # placeholder ExerciseSession
│   ├── engine/             # legacy core kept for compat, now delegates to src/ai when analyzer exists
│   │   ├── FitnessEngine.ts         # rAF 28fps + OneEuro + delegates to analyzer + repConfidence gating + poseQuality
│   │   ├── PoseLandmarkerManager.ts # lite/heavy/auto + GPU→CPU + ./wasm fallback
│   │   ├── MissionManager.ts        # buildMissionPlan + exerciseFromPhase (22 true)
│   │   ├── LocalizationManager.ts   # COACH_I18N it/en/de/fr
│   │   ├── CoachEngine.ts           # priority 1 safety →5 motivation
│   │   ├── math.ts                  # LM 0-32, angleDeg, bilateralAngle, visibilityScore
│   │   ├── stateMachine.ts          # hysteresis idle→ready→down→bottom→up→rep_completed
│   │   ├── types.ts                 # ExerciseId 27 + repConfidence
│   │   ├── exercises/definitions.ts # 22 definitions (now all true) + thresholds + evaluateForm (kept for fallback)
│   │   ├── filters/LandmarkSmoother.ts + OneEuroFilter.ts
│   │   ├── coach/SpeechCoach.ts
│   │   ├── overlay/poseConnections.ts
│   │   └── hooks/useFitnessEngine.ts
│   ├── utils/
│   │   ├── stats.js, progress.js, goals.js, missions.js, motivation.js, push.js, belly.js, bellyTest.js, workout.js, audio.js, export.js, share*.js, bmi.js, body.js, audit.test.js (21), backup.js (BACKUP_VERSION=2), favorites.js, photos.js, wakeLock.js, notifications.js
│   │   └── ...
│   ├── components/
│   │   ├── ui/ DogTag.jsx, ProgressRing.jsx, SegmentedProgress.jsx, styles.js (dedup audit/3)
│   │   ├── FitnessEngineView.tsx    # AI view 22 switcher + poseQuality bar + DEBUG HUD
│   │   ├── SessionAIOverlay.tsx     # mission→exercise auto, trackingSupported gate, voice it/en/de/fr
│   │   ├── PoseCounter.jsx          # DEPRECATED → FitnessEngineView
│   │   ├── PositioningMask.tsx      # alignmentScore
│   │   ├── BellyTest.jsx, BeforeAfterSlider.jsx, ExerciseFigure.jsx, etc.
│   │   ├── ChangelogModal.tsx   # v2.9.0 — 6 gruppi audit
│   │   └── ErrorBoundary.jsx
│   ├── constants/theme.js
│   └── styles/appStyles.js
├── scripts/
│   ├── version-sw.mjs
│   ├── fetch-mediapipe.mjs  # WASM + task download
│   ├── verify.mjs
│   ├── deploy.mjs           # --local/--remote/--ios
│   └── screenshots.mjs      # Playwright 390×844 @2x → docs/screenshots/
├── docs/screenshots/        # 01-home, 02-libreria, 03-esercizio, 04-sessione (AI debug), 05-statistiche (+06-ai-debug next)
├── ios/ + android/          # Capacitor shells (public ← dist)
├── vite.config.js           # __APP_VERSION__ + vitest
└── STRUCTURE.md             # ← this file
```

---

## 3. App.jsx Core

**State:** `profile, sessions, customPrograms, waistHistory, weightHistory, photos, screen (loading/setup/home/library/builder/preview/countdown/session/summary/history), seq, phaseIdx, secondsLeft, paused, activeProgram, lastStats, form*, reminderHour/Minute, installPrompt, showTour, largeText, previewProgram, editingCustom, toast, exitConfirm, showBellyTest, showPose, healthImport, hrInput/waistInput/rpe/notes, sound/vibration/music*, push*, aiCoachEnabled`

**Key functions:** `load persisted data (IDB/Preferences) → saveProfile → saveBellyTest → togglePush → startSession(buildSequence) → finishSession/saveSession (kcal) → checkMotivational (09:00) → sync push stats`. `SessionScreen` uses `isAiWork = aiEnabled && phase.type==='work'` → `SessionAIOverlay` else `ProgressRing`.

---

## 4. AI Engine Detail (tomorrow start here)

- `Geometry.ts` 11 functions torso-normalized
- `PoseQuality.ts` `evaluatePoseQuality(lm, required)` → `pose 20% + avgReq 60% + minReq 20%`
- `ExerciseAnalyzer` base: `analyze(lm, ts, dt, quality) → {phase, enginePhase, repIncrement, repConfidence, formScore, cues}`
- 22 analyzers: `pushup` elbow + bodyLine, `squat` knee + hipY, `crunch` hipFlex, `plank` hold, `legRaise` hipFlex + kneeExt, `flutterKick` asym, `deadBug` XOR, `vUp` pike, `mountainClimber` knee-to-chest alternate, `jumpingJack` CLOSED→OPEN→CLOSED, `bicycleCrunch` elbow-knee contact, `heelTap` wrist-heel, `burpee` 7-phase, `affondo` knee, `skater` lateral, `ginocchiaAlte` highKnee, `superman` hip, `ponte` hip elevation, `russianTwist` wrist-midHip, `wallsit/sideplank` hold, `plankJack` spread
- `FitnessEngine` delegates if analyzer exists, else fallback with `trackingSupported` check; `repConfidence` gating `>65-78`; `landmarkRecorder` pushed each frame when `debug REC` on
- `MissionManager` `buildMissionPlan` → `exerciseId` → `Registry` auto-load, no manual picker

---

## 5. Storage & i18n & Build

- `window.storage` IDB `operator40/kv` + Preferences fallback, keys `o40_profile/sessions/waist/weight/custom_programs/photos/favs`
- `push` backend `public/api/` `subscriptions.json` etc., cron `0 9 * * * php push-cron.php` Europe/Rome
- `i18n.js` `LANGS [it,en,de]` + `detectLang` + `LocalizationManager` `it/en/de/fr` for coach
- Build: `npm run verify → build → version-sw.mjs → o40-v<8hex>` deterministic via `git rev-parse --short HEAD`; `sw.js` cache-first + `Range` bypass; `npx cap sync` → `ios/App/App/public` + `android/app/src/main/assets/public`

---

## 6. Git Strategy (for tomorrow)

- `git checkout main && git pull` — work here, `npm run verify && npm run build && npm run test` (51 tests)
- `git add src/ai/... && git commit -m "feat(ai): ..."` + `git push origin main`
- For live: `git checkout deploy-tmp && git merge main && npm run build && git add -f dist && git commit -m "deploy: <hash>" && git push origin deploy-tmp -f` then `curl raw` to `/var/www/vhosts/mikweb.eu/httpdocs/operator40/` (or `node scripts/deploy.mjs --remote`)
- Screenshots: `npm run preview` on `:4173` + `node scripts/screenshots.mjs` → `docs/screenshots/06-ai-debug.png` (commit with `git add docs/screenshots`)
- Continue tomorrow: tune thresholds in `src/ai/exercises/analyzers/*.ts` using `landmarks.json` replay, add fixtures to `tests/fixtures/` — 2.9.0 già bumpato, prossimo 2.9.1

**Current:** `main 5f40511` (`index-BgW1cw35.js / o40-va068d42f`) + `deploy-tmp 8c20bdd` live `o40-va068d42f` — audit 5 aree + changelog 2.9.0.

All set — continue tomorrow from `src/ai/exercises/analyzers/` with device testing.
