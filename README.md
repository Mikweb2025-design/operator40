# Operator 40

Fitness coach for people over 40. A 15-minutes-a-day training camp to lose belly fat and tone up, built for **Mac (web/PWA)**, **iOS (native)**, **Android (native)** and any modern browser.

Dark, military-themed UI with **18 local MP4 clips + WebP**, full exercise library, adaptive weekly programs, dedicated **belly missions**, session tracking, statistics, offline **motivational music** (royalty-free MP3 shipped locally), and **PWA push notifications** (works with app closed).

> **Try it live:** <https://mikweb.eu/operator40/> — installable as PWA on iPhone/Mac/Android, or as native iOS/Android app.

---

## Screenshots (v2.6 — belly 2.0 + pose + push)

| Home — mission + belly + adherence | Library — smart tips + clips |
|:---:|:---:|
| ![Home](docs/screenshots/01-home.png) | ![Library](docs/screenshots/02-libreria.png) |

| Exercise detail (MP4) | Live session |
|:---:|:---:|
| ![Exercise detail](docs/screenshots/03-esercizio-superman.png) | ![Workout session](docs/screenshots/04-sessione-allenamento.png) |

| Statistics — 8-week adherence + streak risk + avg pace |
|:---:|
| ![Statistics](docs/screenshots/05-statistiche.png) |
| _Full scroll:_ [`05-statistiche-full.png`](docs/screenshots/05-statistiche-full.png) |

---

## Features

- **Enrollment** — age, weight, waist and weekly goal calibrate calories and training zones.
- **Daily missions — 18 programs (A–M + N,O,P + Quick Burst)** — work/rest + levels Recruit/Fighter/Elite and 30-day Camp cycle (20-day `DAY_CYCLE` with belly every 2 days), adaptive on RPE.
- **Belly 2.0 (NEW v2.6)** — initial test **plank max (sec) + crunch in 30s → auto level** (`src/utils/bellyTest.js` `getBellyLevelForTest`), **progression every 7 days** if 3/3 belly (`shouldProgressBellyLevel`), **Before/After slider** for progress photos (`src/components/BeforeAfterSlider.jsx`), enhanced waist chart. Home **BELLY • 3 DEDICATED MISSIONS** now shows *Test Belly 2.0* button, current level badge, and *→ NEXT?* progression.
- **Pose real-time (NEW v2.6)** — on-device **MediaPipe Tasks Vision** (`src/components/PoseCounter.jsx`, `vision_bundle 154k`) counts **squat** (knee <80° → >160°) and **push-up** (elbow <90° → >160°) via camera, offline, no video sent. Trigger: *Home → Count squat (camera)* or during session preview.
- **Exercise library — 18 MP4 local** — `public/clips/` 18 videos (bicyclecrunch, russiantwist, wallsit, superman, bridge, highknees, crunch, burpee, sideplank, **legraise, flutterkick, deadbug, vup, plankjack, skater, heeltap, squat, flessioni/push-up**) + WebP fallback (`src/media.js` 1.7 MB) + `src/clips.js` `CLIP_FILES` + smart recommendations.
- **Live session** — voice guidance, countdown, kcal/HR/RPE, progress ring and wake-lock.
- **Progress & Adherence** — `getWeeklyProgress`, `getConsistencyScore(8w)`, `getAveragePace`, `getStreakRisk` → **Adherence** card in Home and **8-week Adherence** in Statistics.
- **Statistics** — streak/best, heatmap 35d + year, kcal 7d & monthly trend, BMI/WhtR/BF + TDEE, progress photos with **Before/After slider**, calendar, export CSV/JSON.
- **Motivational push — 1/day, personalized, per-language & per-user** — `src/utils/motivation.js` (`getMotivationalMessage` 6 types: comeback if missed ≥2d, streak ≥3/7, at-risk, start, stress tip 1/3 days, generic) with name `Ciao {name}, …` and `it/en/de`. **PWA push works with app closed** (`public/sw.js` `push` + `notificationclick`), **VAPID** `BHwro8…`, backend `public/api/push-*.php` (`subscriptions.json` + `push-stats.json` per endpoint `{n,missed,lang,name}`), cron `0 9 * * * php push-cron.php` (09:00 Europe/Rome, idempotent `lastSent`), local 09:00 fallback if push off. Test button per-language.
- **Music** — 12 royalty-free tracks (NEFFEX, CC BY 3.0) local, offline, volume adaptive per phase.
- **Storage optimized** — web/PWA now **IndexedDB** (`idb 8.0.3`, DB `operator40` store `kv`) for large keys (`o40_sessions`, `o40_photos` etc.) with migration from `localStorage`, native still `Capacitor Preferences`. No more 5 MB quota or UI blocking. Photos: `loadPhotosAsync`/`savePhotosAsync`.
- **Offline** — service worker `o40-v<hash>` deterministic, **precache 6 critical clips** (`squat/flessioni/deadbug/ponte/wallsit/superman` ~14M) on `install` via `Promise.allSettled`, `Range` bypass for audio, cache-first for assets.
- **Privacy** — everything on-device (`IndexedDB` / `Capacitor Preferences`). Apple Health `export.xml` import 100% local. Push stats are minimal `{n,missed,lang,name}` per subscription, no full history.
- **Installable PWA** — standalone, offline, service worker cache `o40-v<hash>` deterministic (git hash, no drift).
- **Native apps** — **iOS** (Capacitor 6, `ios/App`) + **Android** (Capacitor 6, `android/`) — same `dist`, `npx cap sync` + `npx cap open`.
- **Deploy verified** — `npm run verify` + `npm run deploy` (`--local/--remote/--ios/--android`) deterministic, `dist` gitignored (only on `deploy-tmp`).

---

## Run locally (Mac)

```bash
npm install
npm run dev        # dev server on http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build
```

### Reach it from your phone on the same Wi-Fi

Find your Mac's local IP, then open it on the phone browser:

```bash
ipconfig getifaddr en0    # e.g. 192.168.1.84
```

Open `http://192.168.1.84:4173` (Vite preview) on the phone → works just like the hosted version.

---

## Install as a PWA

The live app is already set up as an installable PWA (manifest + icons + offline service worker, relative paths so it also works under a sub-path). Always open the URL **with the trailing slash**: <https://mikweb.eu/operator40/>

- **iPhone/iPad (Safari):** open <https://mikweb.eu/operator40/> → **Share** → **Add to Home Screen** → the "Op40" icon appears on the home screen, full-screen, offline.
- **Mac — Chrome:** open <https://mikweb.eu/operator40/> → click the **install icon** (monitor with a `+`) at the right end of the address bar → **Install Operator 40**. A standalone app window is added to the Dock/Applications. If you don't see the icon, reload the page once (the service worker must finish registering) and try again.
- **Mac — Safari (macOS 15.2+):** open the page → **Share** → **Add to Dock** → the app runs in its own window with the Op40 icon.

---

## iOS native build

Prerequisites (one-time):
- Xcode with the **"iOS 26.5"** component installed (Xcode → Settings → Components). Without it the build fails with `iOS 26.5 Platform Not Installed`.
- CocoaPods (`brew install cocoapods`).

```bash
npx cap add ios       # creates ios/App (already done)
npx cap sync          # copies the web build + pod install
npx cap open ios      # opens Xcode; pick your iPhone and press Run
```

After a web code change: `npm run build && npx cap sync`.

## Android native build

Prerequisites (one-time):
- Android Studio + SDK 34/35 + Platform-Tools (via `sdkmanager` or Android Studio → SDK Manager)
- Java 17, Gradle (`brew install gradle` already on this Mac)

```bash
npx cap add android   # creates android/ (already done, @capacitor/android 6.2.1)
npx cap sync          # copies the web build to android/app/src/main/assets/public
npx cap open android  # opens Android Studio; Run on emulator or USB device
# or via CLI:
./android/gradlew -p android assembleDebug   # APK in android/app/build/outputs/apk/debug/app-debug.apk
./android/gradlew -p android bundleRelease   # AAB for Play Store
```

After a web code change: `npm run build && npx cap sync` (updates both iOS and Android). The appId is `com.operator40.app` (`capacitor.config.json`), `webDir: dist`.

Test on Mac emulator: `emulator -avd TestAVD` (API 37.1 ps16k arm64 already created on `/Volumes/USB`) or start an AVD from Android Studio → Run.

---

## Project structure

- `src/App.jsx` — main app (~3300 lines, audio, local dates, safe-area, 100dvh) + `v<version> · <hash>` badge + **BELLY** + **PoseCounter** modals + **Push PWA** + **BellyTest** + **BeforeAfterSlider`.
- `src/data/programs.js` — 18 programs (A–M + N,O,P belly + Q) + `DAY_CYCLE` 20d + `BELLY_IDS`/`BELLY_PROGRAMS` + `CAMP_DAYS` 30.
- `src/data/exercises.js` — 20+ exercises + `EXERCISE_GROUPS` (standing/ground/core).
- `src/clips.js` + `src/media.js` — `CLIP_FILES` 18 MP4 local (`public/clips/`) + `VIDEO_B64` WebP lazy (chunk ~1.7 MB) + `hasClip()`.
- `src/utils/belly.js` — `isBellyProgram`, `getBellySessions`, `getBellyCount`, `getBellyStreak`, `getBellyProgress`, `pickBellyNext`, `getBellyInsight`.
- `src/utils/bellyTest.js` **(NEW v2.6)** — `BELLY_LEVELS`, `getBellyLevelForTest({plankSec, crunchReps})`, `shouldProgressBellyLevel` (7-day), `formatBellyTestResult`.
- `src/utils/motivation.js` **(NEW)** — `getMotivationalMessage` 6 types per `it/en/de` with `personalize(name)`, `buildPushPayload`.
- `src/utils/push.js` **(NEW)** — `VAPID_PUBLIC_KEY`, `subscribePush`, `unsubscribePush`, `updatePushStats`, `testPushViaSW(lang)`, `isPushSupported`.
- `src/utils/missions.js` — `getRecommendedMissions`, `getDailyChallenge` + `getBellyMissions`, `getBellyBooster`.
- `src/utils/progress.js` — `getWeeklyProgress`, `getConsistencyScore`, `getAveragePace`, `formatDuration`, `getStreakRisk`.
- `src/utils/stats.js` — streak, heatmap, rank, badges, trend.
- `src/music.js` — audio engine + 12 local tracks.
- `src/storage.js` — **IndexedDB** (`idb`) for web + `Capacitor Preferences` for native, migration from `localStorage`.
- `src/components/BellyTest.jsx` **(NEW)** — plank timer + crunch 30″ counter → auto level.
- `src/components/BeforeAfterSlider.jsx` **(NEW)** — before/after photo slider.
- `src/components/PoseCounter.jsx` **(NEW)** — MediaPipe Pose real-time squat/push-up counting, offline, no video sent.
- `src/components/ExerciseFigure.jsx` — stylized SVG pose (fallback if no clip).
- `public/sw.js` — offline-first + **push** (`push`/`notificationclick`) + **precache 6 critical clips** on install.
- `public/api/` **(NEW)** — `push-subscribe.php`, `push-unsubscribe.php`, `push-update-stats.php`, `push-send.php`, `push-cron.php` (09:00 daily, per-user, per-language, with name), `vapid.json` + `vapid-private.json` (not in repo) + `subscriptions.json`/`push-stats.json`.
- `public/manifest.webmanifest` + `public/icons/` — PWA.
- `public/clips/` — 18 MP4 (2.3–2.6 MB each) local.
- `public/tracks/` — 12 MP3 NEFFEX offline.
- `ios/` — Capacitor iOS (App/App.xcodeproj, `ios/App/App/public` ← dist, gitignored).
- `android/` — Capacitor Android (app/src/main/assets/public ← dist, gitignored, `appId com.operator40.app`).

---

## Deploy & Screenshots

```bash
npm run verify              # check ReferenceError sessions
npm run build               # vite build + SW version o40-v<hash> deterministic
npm run deploy:local        # verify + build + info asset
npm run deploy -- --remote --ios  # + push mikweb.eu via GitHub raw + cap sync
node scripts/screenshots.mjs # Playwright 390×844 @2x → docs/screenshots/ (requires preview on :4173)
```

Build deterministic: `vite.config.js` uses `git rev-parse --short HEAD` → same commit = same hash asset → local and `mikweb.eu` stay aligned.

---

## Tech stack

React 18 · Vite 5 · Capacitor 6 (iOS + Android) · `idb` 8 · `@mediapipe/tasks-vision` 0.10 · lucide-react · recharts · Playwright (screenshots) · Gradle 8 + Android SDK 34/35/36 · PHP 8.3 + `minishlink/web-push` 9.0 (VAPID) · `composer`
