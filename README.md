# Operator 40

Fitness coach for people over 40. A 15-minutes-a-day training camp to lose belly fat and tone up, built for **Mac (web/PWA)**, **iOS (native)**, **Android (native)** and any modern browser.

Dark, military-themed UI with **16 local MP4 clips + WebP**, full exercise library, adaptive weekly programs, dedicated **belly missions**, session tracking, statistics and offline **motivational music** (royalty-free MP3 shipped locally).

> **Try it live:** <https://mikweb.eu/operator40/> — installable as PWA on iPhone/Mac/Android, or as native iOS/Android app.

---

## Screenshots (v2.4 — pancia dedicata + 16 clip)

| Home — missione + pancia + aderenza | Libreria — consigli smart + clip |
|:---:|:---:|
| ![Home](docs/screenshots/01-home.png) | ![Library](docs/screenshots/02-libreria.png) |

| Dettaglio esercizio (clip MP4) | Sessione live |
|:---:|:---:|
| ![Exercise detail](docs/screenshots/03-esercizio-superman.png) | ![Workout session](docs/screenshots/04-sessione-allenamento.png) |

| Statistiche — aderenza 8 sett. + streak risk + pace medio |
|:---:|
| ![Statistics](docs/screenshots/05-statistiche.png) |
| _Full scroll:_ [`05-statistiche-full.png`](docs/screenshots/05-statistiche-full.png) |

---

## Features

- **Enrollment** — age, weight, waist and weekly goal calibrate calories and training zones.
- **Daily missions — 16 programs (A–M + N,O,P + Quick Burst)** — work/rest + livelli Recluta/Combattente/Elite e ciclo Camp 30gg (20gg `DAY_CYCLE` con distribuzione pancia ogni 2gg), adattivi su RPE.
- **Pancia dedicata (NEW v2.4)** — 3 missioni **N OMBELICO PIATTO, O OBLIQUI GUERRIERO, P CINTURA D’ACCIAIO** (`belly:true`, 6 esercizi con clip) + utility `src/utils/belly.js` (`isBellyProgram`, `getBellyStreak`, `getBellyProgress 3/sett`, `getBellyInsight`) + sezione Home **PANCIA • 3 MISSIONI DEDICATE** con progress settimanale, streak pancia e booster se girovita fermo.
- **Exercise library — 16 MP4 locali** — `public/clips/` 16 video (bicyclecrunch, russiantwist, wallsit, superman, ponte, ginocchiaalte, crunch, burpeetattico, sideplank, **legraise, flutterkick, deadbug, vup, plankjack, skater, heeltap**) + WebP fallback (`src/media.js` 1,7 MB) + `src/clips.js` `CLIP_FILES` + raccomandazioni smart su consistenza & streak risk (`src/utils/progress.js`, `src/utils/missions.js` con `getBellyMissions`).
- **Live session** — guida vocale, countdown, kcal/HR/RPE, anello progresso e wake-lock.
- **Progress & Aderenza (v2.1)** — `getWeeklyProgress`, `getConsistencyScore(8w)`, `getAveragePace`, `getStreakRisk` → card **Aderenza** in Home e **Aderenza 8 settimane** in Statistiche.
- **Statistics** — streak/best, heatmap 35gg + year, kcal 7gg & trend mensile, BMI/WhtR/BF + TDEE, foto progressi, calendario, export CSV/JSON.
- **Music** — 12 tracce royalty-free (NEFFEX, CC BY 3.0) locali, offline, volume adaptive per fase.
- **Privacy** — tutto on-device (localStorage / Capacitor Preferences). Import `export.xml` Apple Health 100% locale.
- **Installable PWA** — standalone, offline, service worker cache `o40-v<hash>` deterministico (git hash, no drift locale/server).
- **Native apps** — **iOS** (Capacitor 6, `ios/App`) + **Android** (Capacitor 6, `android/`) — stesso `dist`, `npx cap sync` + `npx cap open`.
- **Deploy verificato** — `npm run verify` + `npm run deploy` (`--local/--remote/--ios/--android`) deterministico, `dist` gitignored (solo su `deploy-tmp`).

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
- Java 17, Gradle (`brew install gradle` già presente su questo Mac)

```bash
npx cap add android   # creates android/ (già fatto, @capacitor/android 6.2.1)
npx cap sync          # copies the web build to android/app/src/main/assets/public
npx cap open android  # opens Android Studio; Run su emulatore o device USB
# oppure da CLI:
./android/gradlew -p android assembleDebug   # APK in android/app/build/outputs/apk/debug/app-debug.apk
./android/gradlew -p android bundleRelease   # AAB per Play Store
```

After a web code change: `npm run build && npx cap sync` (aggiorna sia iOS che Android). L’appId è `com.operator40.app` (`capacitor.config.json`), `webDir: dist`.

Test su emulatore Mac: `emulator -avd TestAVD` (API 37.1 ps16k arm64 già creato su `/Volumes/USB`) oppure avvia un AVD da Android Studio → Run.

---

## Project structure

- `src/App.jsx` — app principale (audio, date locali, safe-area, 100dvh) + badge `v<version> · <hash>` deterministico + sezione **PANCIA** in Home.
- `src/data/programs.js` — 16 programmi (A–M + N,O,P belly + Q) + `DAY_CYCLE` 20gg + `BELLY_IDS`/`BELLY_PROGRAMS` + `CAMP_DAYS` 30.
- `src/data/exercises.js` — 20+ esercizi + `EXERCISE_GROUPS` (standing/ground/core).
- `src/clips.js` + `src/media.js` — `CLIP_FILES` 16 MP4 locali (`public/clips/`) + `VIDEO_B64` WebP lazy (chunk ~1,7 MB) + `hasClip()`.
- `src/utils/belly.js` **(NEW v2.4)** — `isBellyProgram`, `getBellySessions`, `getBellyCount`, `getBellyStreak`, `getBellyProgress`, `pickBellyNext`, `getBellyInsight`.
- `src/utils/missions.js` — `getRecommendedMissions`, `getDailyChallenge` + **NEW** `getBellyMissions`, `getBellyBooster`.
- `src/utils/progress.js` — `getWeeklyProgress`, `getConsistencyScore`, `getAveragePace`, `formatDuration`, `getStreakRisk`.
- `src/utils/stats.js` — streak, heatmap, rank, badges, trend.
- `src/music.js` — engine audio + 12 tracce locali.
- `src/storage.js` — adapter Capacitor Preferences / localStorage.
- `scripts/verify.mjs` — check pre-deploy `sessions` ReferenceError.
- `scripts/deploy.mjs` — deploy deterministico `--local/--remote/--ios/--android`.
- `scripts/screenshots.mjs` — genera screenshot Playwright (390×844 @2x) per README.
- `public/manifest.webmanifest` + `public/icons/` — PWA.
- `public/clips/` — 16 MP4 (2,3–2,6 MB ciascuno) locali.
- `public/tracks/` — 12 MP3 NEFFEX offline.
- `ios/` — Capacitor iOS (App/App.xcodeproj, `ios/App/App/public` ← dist, gitignored).
- `android/` — Capacitor Android (app/src/main/assets/public ← dist, gitignored, `appId com.operator40.app`).

---

## Deploy & Screenshots

```bash
npm run verify              # check ReferenceError sessions
npm run build               # vite build + SW version o40-v<hash> deterministico
npm run deploy:local        # verifica + build + info asset
npm run deploy -- --remote --ios  # + push mikweb.eu via GitHub raw + cap sync
node scripts/screenshots.mjs # Playwright 390×844 @2x → docs/screenshots/ (richiede preview su :4173)
```

Build deterministico: `vite.config.js` usa `git rev-parse --short HEAD` → stesso commit = stesso hash asset → locale e `mikweb.eu` restano allineati (fix drift timestamp).

---

## Tech stack

React 18 · Vite 5 · Capacitor 6 (iOS + Android) · lucide-react · recharts · Playwright (screenshots) · Gradle 8 + Android SDK 34/35/36