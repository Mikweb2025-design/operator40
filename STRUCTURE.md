# Operator40 — Complete Structure & Functions

> **Read this to understand everything in 5 minutes.** Updated **2026-08-25** — `main` @ `e773ee6→PRODUCTION-AI` (index-9ytO-Phc.js / o40-vade03eed) + `deploy-tmp` pending. Deterministic build `2.8.3 · <git-short>` + **Production AI Fitness Coach Engine**.

---

## 1. Overview

**Operator40** — fitness coach for over-40, 15′/day, no equipment, **PWA offline + iOS/Android native (Capacitor 6)**.  
Dark military UI (`INK`/`OLIVE`/`BLAZE`/`KHAKI`/`PAPER`), 18 programs (A–M + N,O,P + Q), 22 exercises with MP4/WebP local, streak/goal/medals, NEFFEX music offline, Apple Health import, **PWA push (works with app closed)**, **Belly 2.0 test**, **Production AI Fitness Coach Engine (22 exercise definitions, poseQuality 0-100, debug HUD)**.

- **Live:** https://mikweb.eu/operator40/ (PWA installable, `dist/` → `mikweb.eu/httpdocs/operator40/`)
- **Repo:** https://github.com/Mikweb2025-design/operator40 — `main` (no Huawei) + `operator40-Watch` (with Huawei)
 - **Tech:** React 18, Vite 5, Capacitor 6, `idb` 8, `@mediapipe/tasks-vision` 0.10 (lite/heavy/full + GPU→CPU + WASM offline), lucide-react, recharts, Playwright, Vitest 1, PHP 8.3 `web-push` 9.0

---

## 2. Folder Tree

```
operator40/
├── public/                 # copied as-is to dist/
│   ├── clips/              # 18 mp4 local (2.3–2.6M): bicyclecrunch, russiantwist, wallsit, superman, bridge, highknees, crunch, burpee, sideplank, legraise, flutterkick, deadbug, vup, plankjack, skater, heeltap, squat, flessioni/push-up
│   ├── wasm/               # NEW offline MediaPipe WASM (fetched via npm run fetch:mediapipe, gitignored *.wasm/*.js)
│   ├── models/             # NEW pose_landmarker_{lite,heavy}.task (fetched via npm run fetch:mediapipe, gitignored *.task)
│   ├── icons/              # icon-180/192/512.png
│   ├── tracks/             # 12 mp3 NEFFEX (offline)
│   ├── api/                # push backend (VAPID) — push-subscribe/unsubscribe/update-stats/send/cron + vapid.json + subscriptions.json/push-stats.json (gitignored)
│   ├── manifest.webmanifest
│   └── sw.js               # offline + push (push/notificationclick) + precache 6 clips + WASM/models if present, __VERSION__ → o40-v<hash>
├── src/
│   ├── App.jsx             # ★ ENTIRE APP (~3300 lines) — see §3 (now with isAiWork gated SessionAIOverlay)
│   ├── main.jsx            # bootstrap React + window.storage (IDB/Preferences) + PWA install + SW reload defer
│   ├── storage.js          # IndexedDB (idb) for web + Capacitor Preferences for native, migration from localStorage
│   ├── media.js            # VIDEO_B64 (WebP base64) lazy chunk 1.7M
│   ├── clips.js            # CLIP_FILES 18 MP4 local (public/clips/) + hasClip()
│   ├── music.js            # playlist autoplay (see §3.3)
│   ├── i18n.js             # LANGS, LOCALES, detectLang, tr/translate, t('nav.*','setup.*','home.*','hist.*')
│   ├── data/
│   │   ├── exercises.js    # EXERCISES 22 { squat, flessioni/pushup, deadbug… } + EXERCISE_GROUPS
│   │   └── programs.js     # PROGRAMS 18, QUICK_PROGRAM, LEVELS, INTERVAL_PRESETS, pickNextProgram, campDay*
│   ├── engine/             # ★ PRODUCTION AI FITNESS COACH ENGINE (prompt vincolante §3)
│   │   ├── FitnessEngine.ts # rAF 28fps + OneEuro + hysteresis FSM + poseQuality 0-100 + auto-start timer
│   │   ├── PoseLandmarkerManager.ts # MediaPipe Tasks Vision lite/heavy/auto + GPU→CPU + ./wasm fallback
│   │   ├── MissionManager.ts # buildMissionPlan + exerciseFromPhase + trackingSupported false (no fake fallback)
│   │   ├── LocalizationManager.ts # COACH_I18N it/en/de/fr + moveBack/poseQuality
│   │   ├── CoachEngine.ts  # priority 1 safety → 4 motivation + cooldown + speech queue
│   │   ├── math.ts         # LM 0-32, angleDeg, bilateralAngle, visibilityScore, clamp, velocity
│   │   ├── stateMachine.ts # Hysteresis  idle→ready→down→bottom→up→rep_completed + minDown/minUp/minInterval
│   │   ├── types.ts        # ExerciseId 27, ExerciseDefinition + requiredLandmarks/movementPattern/safetyRules
│   │   ├── exercises/definitions.ts # 22 definitions + thresholds + evaluateForm + customTransition + requiredLandmarks
│   │   ├── filters/LandmarkSmoother.ts + OneEuroFilter.ts # jitter-free 1.15/0.008 (+hold 0.75)
│   │   ├── coach/SpeechCoach.ts # Web Speech queue + per-lang rate
│   │   ├── overlay/poseConnections.ts # drawSkeleton + angle badge
│   │   └── hooks/useFitnessEngine.ts
│   ├── utils/
│   │   ├── date.js         # formatTime, dayKey, sessionDayKey
│   │   ├── stats.js        # streak, rank, badges, heatmap (see §4.1)
│   │   ├── progress.js     # getWeeklyProgress, getConsistencyScore, getAveragePace, getStreakRisk
│   │   ├── goals.js        # getGoalProgress, getGoalHistory(8w), suggestNextGoal, formatGoal, estimateWeeklyCalories
│   │   ├── personalChallenge.js # getPersonalChallenge, getRecoveryTip
│   │   ├── achievements.js # ACHIEVEMENTS 8, getAchievementsProgress, getNextAchievements
│   │   ├── insights.js     # getDailyInsight, getWeeklyInsight
│   │   ├── missions.js     # getRecommendedMissions, getDailyChallenge
│   │   ├── motivation.js   # getMotivationalMessage 6 types per it/en/de + personalize(name), buildPushPayload
│   │   ├── push.js         # VAPID, subscribePush, unsubscribePush, updatePushStats, testPushViaSW(lang), isPushSupported
│   │   ├── belly.js        # isBellyProgram, getBellySessions, getBellyCount, getBellyStreak, getBellyProgress, pickBellyNext, getBellyInsight
│   │   ├── bellyTest.js    # BELLY_LEVELS, getBellyLevelForTest({plankSec,crunchReps}), shouldProgressBellyLevel 7d
│   │   ├── workout.js      # buildSequence, kcalForSeconds, estimateProgramKcal, totalSeqSeconds
│   │   ├── audio.js        # getAudioCtx, unlockAudio, playBeep, playClick, vibrate, speak
│   │   ├── export.js       # exportCSV, buildCalendarGrid
│   │   ├── share.js        # shareResults (Web Share)
│   │   ├── shareImage.js   # shareStatsImage (1080×1350 canvas)
│   │   ├── bmi.js          # calcBMI, bmiCategory, estimateTDEE, simpleMealHint
│   │   ├── body.js         # estimateBodyFat, whtCategory
│   │   ├── favorites.js    # loadFavoritesAsync (IDB) + sync fallback, toggleFavorite
│   │   ├── photos.js       # loadPhotosAsync (IDB) + sync fallback, savePhotos, fileToDataUrl (max 4M)
│   │   ├── wakeLock.js     # requestWakeLock, releaseWakeLock
│   │   ├── notifications.js# requestNotificationPermission, scheduleDailyReminder, checkAndFireReminder (local 09:00 fallback)
│   │   └── huawei*         # (only Watch branch)
│   ├── components/
│   │   ├── ExerciseFigure.jsx # stylized SVG pose (fallback if no clip)
│   │   ├── WeeklyChallenge.jsx# weekly % circle
│   │   ├── GoalRing.jsx    # GoalRing + MiniGoalBar (8w)
│   │   ├── BellyTest.jsx   # plank timer + crunch 30s counter → auto level
│   │   ├── BeforeAfterSlider.jsx # before/after photo slider
│   │   ├── FitnessEngineView.tsx # AI view 22 esercizi + poseQuality 0-100 + debug HUD + heavy model
│   │   ├── SessionAIOverlay.tsx  # mission→exercise auto, trackingSupported gate, voice it/en/de/fr
│   │   ├── PoseCounter.jsx # DEPRECATED → delega a FitnessEngineView (compat)
│   │   ├── PositioningMask.tsx # sagoma posizionamento + alignmentScore
│   │   └── ErrorBoundary.jsx # OPERATION INTERRUPTED + RELOAD
│   ├── constants/theme.js  # INK, INK_2, PAPER, OLIVE, OLIVE_DARK, KHAKI, BLAZE, BLAZE_DEEP, STEEL
│   └── styles/appStyles.js # STYLES (aura, ticker, camo, etc.)
├── scripts/
│   ├── version-sw.mjs      # post-build: hash dist/assets → o40-v<8hex> in sw.js (deterministic)
│   ├── fetch-mediapipe.mjs # NEW: fetch WASM + pose_landmarker_{lite,heavy}.task → public/wasm,models
│   ├── verify.mjs          # check ReferenceError sessions before build
│   ├── deploy.mjs          # deterministic deploy --local/--remote/--ios (--skip-build)
│   └── screenshots.mjs     # Playwright 390×844 @2x → docs/screenshots/ 5 views
├── docs/screenshots/       # 01-home, 02-libreria, 03-esercizio, 04-sessione, 05-statistiche (+full)
├── ios/                    # Capacitor iOS (App/App.xcodeproj, App/App/public ← dist)
├── android/                # Capacitor Android (app/src/main/assets/public ← dist)
├── vite.config.js          # define __APP_VERSION__/__BUILD_ID__ = "2.0.0 · <git-short>" deterministic
├── capacitor.config.json   # webDir: dist, appId: com.operator40.app
└── STRUCTURE.md            # ← this file
```

---

## 3. `src/App.jsx` — Core (~3300 lines)

### 3.1 Global state (useState)
```
profile, sessions, customPrograms, waistHistory, weightHistory, photos
screen: loading | setup | home | library | builder | preview | countdown | session | summary | history
seq, phaseIdx, secondsLeft, paused, activeProgram, lastStats
form*: formName/Age/Weight/Waist/Height/CustomWork/CustomRest, reminderHour/Minute
UI: installPrompt, showTour, largeText, previewProgram, editingCustom, toast, exitConfirm, showBellyTest, showPose
Health: healthImportStatus/WeightSuggestion
HR: hrInput, waistInput, rpe, notes, weightInput
Audio: soundOn, vibrationOn, musicOn, musicTrack, musicVolume, musicAutoPlay, musicShuffle
Push: pushEnabled, pushSupported, pushBusy
```

### 3.2 Key functions
| Function | What it does |
|---|---|
| `load persisted data` useEffect | `window.storage.get('o40_profile/sessions/...')` via IDB/Preferences → setState |
| `saveProfile()` | validates, saves `o40_profile`, `recordWaist` |
| `saveBellyTest()` | saves `profile.bellyTest` + `bellyLevel` + `bellyLevelUpdated`, toast, sync push stats |
| `togglePush()` / `handleTestPush()` | `subscribePush`/`unsubscribePush`/`testPushViaSW(lang)` + `updatePushStats` |
| `startSession(program)` | `buildSequence(...)` → `seq` |
| `finishSession()` / `saveSession()` | `estimateProgramKcal` → `o40_sessions` (IDB) |
| `checkMotivational` useEffect | local 09:00 daily if push off → `getMotivationalMessage` → `showNotification` |
| `sync push stats` useEffect | `updatePushStats(sessions,profile,lang)` on change if pushEnabled |

### 3.3 Screens
`HomeScreen` (today mission + belly 3 with Test + Before/After + Pose), `LibraryScreen`, `BuilderScreen`, `PreviewScreen`, `CountdownScreen`, `SessionScreen` (ring + EqBars), `SummaryScreen` (RPE + photos), `HistoryScreen` (heatmap + BeforeAfterSlider), `SetupScreen` (form + Push PWA card + BellyTest trigger).

---

## 4. Utils Detail

### 4.1 `stats.js` / `progress.js` / `belly.js` / `bellyTest.js` / `motivation.js` / `push.js`
- `stats`: `computeBestStreak`, `computeStreakWithFreeze`, `getRank`, `getMedalProgress`, `buildHeatmap(35)`
- `progress`: `getWeeklyProgress`, `getConsistencyScore`, `getStreakRisk`
- `belly`: `isBellyProgram`, `getBellyProgress(3/w)`, `getBellyStreak`, `getBellyInsight`
- `bellyTest`: `getBellyLevelForTest` (<30/<10 recluta, 30-60/10-20 combattente, >60/>20 elite, takes min), `shouldProgressBellyLevel` every 7d if 3/3
- `motivation`: `getMotivationalMessage` 6 types per `it/en/de` with `personalize(name)` (Ciao/Hey), `buildPushPayload`
- `push`: `VAPID_PUBLIC_KEY`, `subscribePush`, `updatePushStats({n,missed,lang,name})`, `testPushViaSW(lang)` per-language fallback
- `storage`: IDB `operator40/kv` for large keys, migration from LS, native `Preferences`

### 4.2 Other
`workout` → `buildSequence` with warmup/cooldown + levels, `photos` → IDB async + LS sync fallback, `favorites` → IDB, `notifications` → local 09:00 fallback, `bmi/body` → BMI/TDEE/BF.

---

## 5. Storage & i18n

- `window.storage = {get,set,remove,clear}` → `Capacitor Preferences` (native) / `IndexedDB` (web, `idb`) + `localStorage` fallback — keys `o40_profile`, `o40_sessions`, `o40_waist`, `o40_weight`, `o40_custom_programs`, `o40_photos` (IDB), `o40_favs`
- `push` backend: `public/api/` → `subscriptions.json` (endpoints), `push-stats.json` (per endpoint `{n,missed,lang,name,lastSent}`), `vapid-private.json` (not in repo), `push-cron.php` 09:00 daily per-user, per-language, with name, idempotent
- `i18n.js` → `LANGS [it,en,de]`, `detectLang`, `tr/translate`, `t('setup.*','home.*')` — push respects `profile.lang`

---

## 6. Build & Deploy (deterministic)

```bash
npm run verify   # check sessions ReferenceError
npm run build    # vite + scripts/version-sw.mjs → dist/index-<hash>.js + sw.js o40-v<8hex> (+ vision_bundle 154k)
npm run deploy:local  # verify + build + info
npm run deploy -- --remote --ios # push dist to GitHub branch deploy-tmp + curl raw to mikweb.eu + npx cap sync
```

- `vite.config.js` → `__APP_VERSION__ = "2.0.0 · <git rev-parse --short HEAD>"`
- `scripts/version-sw.mjs` → `o40-v<hash>` in `sw.js`
- `public/sw.js` → offline + push + precache 6 clips (`squat/flessioni/deadbug/ponte/wallsit/superman`) on install
- `mikweb.eu` deploy: `git push -f deploy-tmp` → `curl raw` to `/var/www/vhosts/mikweb.eu/httpdocs/operator40/` + `chown 501:staff` + `composer install` for `web-push`
- iOS/Android: `npx cap sync` → `ios/App/App/public` + `android/app/src/main/assets/public` (now with `vision_bundle` + IDB + 18 clips)

---

## 7. Branch & Git

- `main` @ `5898c39` — no Huawei, with push/motivation/bellyTest/pose/IDB/precache
- `deploy-tmp` @ `deffecb` — dist for mikweb (gitignored on main)
- `origin/main` aligned, `dist` gitignored, `ios/App/App/public` ignored (regenerated via `cap sync`)

---

## 8. Checklist

1. `git checkout main && git pull`
2. `npm run verify && npm run build` → check `v2.0.0 · <hash>` in Home
3. `npx cap sync` if you touch `public`/`src`
4. For web deploy: `node scripts/deploy.mjs --remote` or manual `deploy-tmp` + `curl` to mikweb + `composer install` if api changed
5. For push test: Setup → Push → Test (per-language), or `curl -X POST https://mikweb.eu/operator40/api/push-send.php -d '{"test":true,"lang":"de"}'`

All set — good work!
