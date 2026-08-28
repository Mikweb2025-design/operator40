# Operator 40

**Fitness coach for over-40. 15 minutes a day to lose belly fat and tone up — PWA + iOS + Android.**

Military dark UI (`INK`/`OLIVE`/`BLAZE`/`KHAKI`/`PAPER`), 18 programs (A–M + N,O,P belly + Q), **22 AI-tracked exercises**, adaptive camp, Apple Health import, NEFFEX offline music, **on-device AI coach** with camera, **push notifications that work with the app closed**.

> **Live:** https://mikweb.eu/operator40/ — install as PWA on iPhone/Mac/Android, or as native Capacitor app (`com.operator40.app`).
> Repo: https://github.com/Mikweb2025-design/operator40 — `main` + `deploy-tmp` (dist for hosting)

---

## Screenshots (v2.14.1 — 40 iterazioni · Statistiche premium)

| Home — mission + belly + adherence | Library — 18 clips + AI tips |
|:---:|:---:|
| ![Home](docs/screenshots/01-home.png) | ![Library](docs/screenshots/02-libreria.png) |

| Exercise detail (MP4) | Live AI Session — poseQuality + repConfidence + debug HUD |
|:---:|:---:|
| ![Exercise detail](docs/screenshots/03-esercizio-superman.png) | ![AI Session](docs/screenshots/04-sessione-allenamento.png) |

| Statistics — 8-week adherence | Full scroll |
|:---:|:---:|
| ![Statistics](docs/screenshots/05-statistiche.png) | [`05-statistiche-full.png`](docs/screenshots/05-statistiche-full.png) |

> **New in v2.14.1:** 40 iterazioni — `Statistiche premium` (DogTag accent + PR glass + Bar gradient + heatmap 6px + calendar 8px) + `Camp 2.0` (recovery ogni 7 + deload) + `TEMPO 50 BPM` + `Coach 2.0` + `Onboarding 3-step` + `Clip alias 22/22` + `HR crossfade + PWA gate`. Debug HUD `◇ DEBUG` + `landmarks.json`. Generate: `npm run build && npm run preview` then `node scripts/screenshots.mjs` (390×844 @2x).

---

## Features (v2.14.1 — 40 iterazioni)

- **Onboarding** — age, weight, waist, height, weekly goal → TDEE / BMI / kcal zones. Stays on device.
- **18 programs + 22 exercises** — `A–M` + `N,O,P` belly + `Q` Quick Burst, 30-day Camp (`DAY_CYCLE` 20, belly every 2 days), adaptive via RPE, levels `Recruit / Fighter / Elite`.
- **Belly 2.0** — plank max + crunch 30s → auto level `getBellyLevelForTest`, 7-day progression `shouldProgressBellyLevel`, Before/After slider.
- **AI Fitness Coach — 22 exercise-specific analyzers (NEW v2.8)** — `src/ai/exercises/analyzers/{pushup,squat,crunch,plank,legRaise,flutterKick,deadBug,vUp,mountainClimber,jumpingJack,bicycleCrunch,heelTap,burpee,affondo,skater,ginocchiaAlte,superman,ponte,russianTwist,wallsit,sideplank,plankJack}.ts`
  - `src/ai/pose/Geometry.ts` 11 utilities (`calculateAngle/Distance/Midpoint/Velocity/Acceleration/BodyLine/TorsoAngle/LegAngle/ArmAngle/RangeOfMotion/Symmetry`) normalized by torso length
  - `src/ai/pose/PoseQuality.ts` — `poseConfidence / landmarkConfidence / exerciseConfidence 0-100`, pause if required landmarks `<42`
  - `OneEuro` smoothing (`LandmarkSmoother 1.15/0.008`, hold `0.75/0.004`) — no raw jitter
  - Per-exercise `ExerciseAnalyzer` with phases (`READY/DESCENDING/BOTTOM/ASCENDING/TOP` etc.), hysteresis, `minDown/Ms`, `minRepsInterval`, `ROM`, `velocity`, `phase history`
  - `repConfidence 0-100` gating (`>70-78`) — prefers not counting uncertain rep over false positive
  - `formScore 0-100` from `ROM / alignment / control / symmetry` per exercise
  - `src/ai/motion/MotionFusion.ts` placeholder for Capacitor motion sensors (jumpingJack/highKnees/burpee) — PWA works without
- **Exercise library — 18 MP4 local** `public/clips/` (2.3 MB each) + WebP `src/media.js` + `hasClip()` fallback to `ExerciseFigure` SVG.
- **Live session** — `SessionAIOverlay` auto-loads analyzer from `phase.exerciseId` (mission → registry), `READY` check, auto-start timer on first `DOWN`, `poseQuality` bar + voice `it/en/de/fr`, wake-lock, haptics.
- **Debug HUD** — `FitnessEngineView ◇ DEBUG` shows `EXERCISE / PHASE / REPS / REP CONF / POSE / FORM / FPS / ANGLE / VEL / DIR / VIS / REQ / DET` + `landmarks.json` recorder (developer-only, no video uploaded).
- **Progress & Adherence** — `getWeeklyProgress / getConsistencyScore(8w) / getAveragePace / getStreakRisk` → Home Adherence + Statistics 8-week.
- **Statistics** — streak/best, heatmap 35d + year, kcal 7d/monthly, BMI/WhtR/BF + TDEE, photos Before/After, calendar, `exportCSV` + `shareStatsImage` 1080×1350.
- **Push 1/day personalized** — `getMotivationalMessage` 6 types + `VAPID BHwro8…`, `public/api/push-*.php` + `push-cron 09:00 Europe/Rome` + local 09:00 fallback. Works with PWA closed (`sw.js push/notificationclick`).
- **Music** — 12 NEFFEX CC BY 3.0 local, adaptive volume per phase.
- **Storage** — `idb 8.0.3` (`operator40/kv`) web + `Capacitor Preferences` native, migration `v2` + `exportBackup`/`importBackup` JSON versionato. No 5 MB limit.
- **Backup & Restore** — `src/utils/backup.js` JSON `BACKUP_VERSION=2` (profile/sessions/waist/weight/customPrograms/photos+favs) — Setup → Backup & Ripristino.
- **Dedup UI** — `src/components/ui/DogTag/ProgressRing/SegmentedProgress` + `styles.js` (inputStyle/primaryBtn) — Home 65 righe → shared.
- **i18n** — 15+ hardcoded IT → `I18N` (`home.section.*`, `setup.backup.*`) — Setup/Home ora via `t()`.
- **Offline** — `sw.js o40-v<hash>` stale-while-revalidate + `SKIP_WAITING`, `PRECACHE_SHELL`, `Range` bypass, precache 6 clips + `wasm/models` if bundled. `PoseLandmarkerManager` CDN → `./wasm`/`./models` `lite/heavy/auto` + `GPU→CPU`.
- **Privacy** — 100% on-device (`IndexedDB` / `Preferences`). Health `export.xml` parsed locally. MediaPipe never uploads video. Minimal push stats `{n,missed,lang,name}`.
- **PWA** — standalone, offline, deterministic `o40-v<hash>` via `git rev-parse --short HEAD`, 9 screens `React.lazy` (index 749k→444k).
- **Native** — iOS + Android Capacitor 6, same `dist`, `npx cap sync`.
- **Camp 2.0** — recovery `D` ogni 7gg + deload week 22-28 (`D/K/H/I`) + badge `RECUPERO/DELOAD` in Home.
- **TEMPO** — metronomo 40-60 BPM (toggle + slider in Impostazioni) + `playBeep 900` in Session.
- **Coach 2.0** — TTS cue `form<60` via `SpeechCoach` ogni 4s in `FitnessEngineView`.
- **Statistics premium (v2.14.1)** — Hero `DogTag accent` + PR `glass 16px` + Bar `gradient BLAZE→DEEP + tooltip blur` + Heatmap `6px glow` + Calendar `8px gradient`.
- **Onboarding 3-step** — dots + `Avanti/Salta` + `tourStep` state, `clip alias 22/22` (`plank→wallsit` ecc.), `HR avg` + `NEFFEX crossfade 1.2s` + `PWA dopo 2 sessioni`.

---

## Quick start (Mac)

```bash
npm install          # node >=18
npm run dev          # http://localhost:5173
npm run build        # dist/ + sw.js o40-v<hash>
npm run preview      # http://localhost:4173 (for phone on same Wi-Fi)
npm run verify       # ReferenceError check
npm run test         # vitest 101 tests (stateMachine + definitions + MissionManager + 22 analyzers + audit 21 + classifier + fixtures)
npm run fetch:mediapipe # optional: copy wasm + download pose_landmarker_{lite,heavy}.task → public/wasm,models
```

**Phone on Wi-Fi:** `ipconfig getifaddr en0` → open `http://<ip>:4173` (Vite preview) on iPhone.

---

## Install PWA

Open **with trailing slash**: https://mikweb.eu/operator40/

- **iPhone (Safari):** Share → Add to Home Screen → `Op40` icon, full-screen offline
- **Mac Chrome:** address bar `+` → Install Operator 40 → Dock/Applications
- **Mac Safari 15.2+:** Share → Add to Dock

---

## Native builds

**iOS**
```bash
npx cap add ios      # already done
npx cap sync         # copy dist + pod install
npx cap open ios     # Xcode → Run on device (needs iOS 26.5 component)
# after web change: npm run build && npx cap sync
```

**Android**
```bash
npx cap add android  # already done @capacitor/android 6.2.1
npx cap sync
npx cap open android # Android Studio → Run (emulator TestAVD API 37.1 ps16k on /Volumes/USB)
./android/gradlew -p android assembleDebug   # APK
./android/gradlew -p android bundleRelease   # AAB
```

`appId com.operator40.app`, `webDir dist`, `androidScheme https`.

---

## Project structure (v2.14.1 — 40 iterazioni)

- `src/App.jsx` ~2330 lines — router + 9 screens `React.lazy` + `tourStep 3-step` + `motionFusion/tempo` profile + `isAiWork` gated `SessionAIOverlay`
- `src/data/programs.js` 18 programs + `DAY_CYCLE` + `isRecoveryDay/isDeloadWeek` + `pickNextProgram` Camp 2.0 (recovery ogni 7 + deload 22-28) + `BELLY_IDS` + `CAMP_DAYS 30`
- `src/data/exercises.js` 22 exercises + `EXERCISE_GROUPS`
- `src/clips.js` + `src/media.js` 18 MP4 + 5 alias (`plank→wallsit` ecc. per 22/22) + WebP fallback
- `src/ai/` **NEW — modular AI engine (spec §3)**
  - `pose/Geometry.ts` 11 utils, `PoseQuality.ts`, `LandmarkSmoother.ts`
  - `motion/MotionFeatures.ts` + `MotionFusion.ts` (secondary sensors)
  - `exercises/ExerciseAnalyzer.ts` base + `ExerciseRegistry.ts` 22 + `analyzers/{22}.ts` per exercise
  - `coaching/` (FormScore via analyzers), `debug/LandmarkRecorder.ts` (landmarks.json), `session/ExerciseSession.ts` placeholder
- `src/engine/` — legacy engine kept for compat: `FitnessEngine.ts` now delegates to `src/ai` when analyzer exists, fallback blocked if `trackingSupported=false`; `PoseLandmarkerManager.ts` lite/heavy/auto + `./wasm` fallback; `stateMachine.ts` hysteresis; `types.ts` 27 `ExerciseId` + `repConfidence`
- `src/utils/` — `stats.js / progress.js / belly.js / bellyTest.js / motivation.js / push.js / workout.js / bmi.js / body.js / audit.test.js (21) / backup.js / ...`
- `src/components/` — `FitnessEngineView.tsx` (22 switcher + Coach 2.0 TTS), `SessionAIOverlay.tsx` (IMU), `BeforeAfterSlider.jsx` (pinch-zoom), `ui/DogTag/ProgressRing/SegmentedProgress` + `ui/styles.js`, `ChangelogModal.tsx` v2.14.1 (10 gruppi)
- `public/{clips,icons,tracks,wasm,models,api,sw.js,manifest.webmanifest}` — `wasm/models` gitignored `*.task/*.wasm`
- `ios/ + android/` — Capacitor shells (public ← dist, gitignored)
- `scripts/{version-sw.mjs,fetch-mediapipe.mjs,verify.mjs,deploy.mjs,screenshots.mjs}` + `vite.config.js` `__APP_VERSION__` deterministic + `vitest`
- `docs/screenshots/` — `01-home … 05-statistiche` (+ `06-ai-debug` after `screenshots.mjs`)

---

## Deploy & Screenshots

```bash
npm run verify && npm run build    # o40-v<8hex> in sw.js
npm run test                       # 51 tests
npm run deploy:local               # info only
npm run deploy -- --remote --ios   # push deploy-tmp + curl raw to mikweb.eu + cap sync
node scripts/screenshots.mjs       # Playwright 390×844 @2x → docs/screenshots/ (needs preview on :4173)
```

Deterministic: `vite.config.js` `git rev-parse --short HEAD` → same commit = same hash asset.

---

## Tech stack

React 18 · Vite 5 · Capacitor 6 · `idb 8` · `@mediapipe/tasks-vision 0.10` · OneEuro · `lucide-react` · `recharts` · Vitest 1 · Playwright · Gradle 8 · PHP 8.3 `web-push 9.0` · Composer

---

## Roadmap — next (v2.15)

- [ ] Tune 5 analyzer più instabili (squat/pushup/burpee/legRaise/russianTwist) con `landmarks.json` replay
- [ ] Fixtures `tests/fixtures/landmarks-*.json` per CI (almeno 3 per top-6)
- [ ] Benchmark `lite vs heavy` FPS su iPhone 14/15, documenta `auto` heuristic
- [x] Camp 2.0 + TEMPO + Coach 2.0 + Onboarding 3-step + Clip alias 22/22 — DONE v2.13.0-v2.14.1
- [x] Statistiche premium (DogTag accent + charts gradient + heatmap/calendar) — DONE v2.14.1
- [ ] `Social` sfida settimanale + `Watch` HR + `Offline lite.task` bundle + `Electron` menu bar — backlog settimana 2

Local: `git checkout main && git pull && npm run dev` — continua su `src/screens/HistoryScreen.jsx` e `src/ai/exercises/analyzers/*`.
GitHub: `main` (source) + `deploy-tmp` (dist) — vedi `STRUCTURE.md §7` + `docs/ROADMAP.md` per dettaglio.
