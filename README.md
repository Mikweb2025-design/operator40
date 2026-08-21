# Operator 40

Fitness coach for people over 40. A 15-minutes-a-day training camp to lose belly fat and tone up, built for **Mac (web/PWA)**, **iOS (native)** and any modern browser.

Dark, military-themed UI with **animated SVG exercise figures**, a full exercise library, adaptive weekly programs, session tracking, statistics and offline **motivational music** (royalty-free MP3 files shipped locally).

> **Try it live:** <https://mikweb.eu/operator40/> — installable as a PWA on iPhone and Mac.

---

## Screenshots (v2.1 — nuove funzioni aderenza & progress)

| Home — missione + aderenza | Libreria — consigli smart |
|:---:|:---:|
| ![Home](docs/screenshots/01-home.png) | ![Library](docs/screenshots/02-libreria.png) |

| Dettaglio esercizio (clip) | Sessione live |
|:---:|:---:|
| ![Exercise detail](docs/screenshots/03-esercizio-superman.png) | ![Workout session](docs/screenshots/04-sessione-allenamento.png) |

| Statistiche — aderenza 8 sett. + streak risk + pace medio |
|:---:|
| ![Statistics](docs/screenshots/05-statistiche.png) |
| _Full scroll:_ [`05-statistiche-full.png`](docs/screenshots/05-statistiche-full.png) |

---

## Features

- **Enrollment** — age, weight, waist and weekly goal calibrate calories and training zones.
- **Daily missions** — 13 programs (A–M + Quick Burst) con work/rest + livelli Recluta/Combattente/Elite e ciclo Camp 30gg, adattivi su RPE.
- **Exercise library** — tutti gli esercizi con note over-40; **clip WebP** + raccomandazioni smart basate su **consistenza & streak risk** (`src/utils/progress.js`).
- **Live session** — guida vocale, countdown, kcal/HR/RPE, anello progresso e wake-lock.
- **Progress & Aderenza (NEW v2.1)** — `getWeeklyProgress`, `getConsistencyScore(8w)`, `getAveragePace`, `getStreakRisk` → nuova card **Aderenza** in Home e **Aderenza 8 settimane** in Statistiche (consistenza %, weekly %, pace medio, risk).
- **Statistics** — streak/best, heatmap 35gg + year, kcal 7gg & trend mensile, BMI/WhtR/BF + TDEE, foto progressi, calendario, export CSV/JSON.
- **Music** — 12 tracce royalty-free (NEFFEX, CC BY 3.0) locali, offline, volume adaptive per fase.
- **Privacy** — tutto on-device (localStorage / Capacitor Preferences). Import `export.xml` Apple Health 100% locale.
- **Installable PWA** — standalone, offline, service worker cache `o40-v<hash>` deterministico (git hash, no drift locale/server).
- **Deploy verificato** — `npm run verify` (check `sessions` ReferenceError) + `npm run deploy` (`--local/--remote/--ios`) deterministico.

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

---

## Project structure

- `src/App.jsx` — app principale (audio, date locali, safe-area, 100dvh) + badge `v<version> · <hash>` deterministico.
- `src/utils/progress.js` **(NEW)** — `getWeeklyProgress`, `getConsistencyScore`, `getAveragePace`, `formatDuration`, `getStreakRisk`.
- `src/utils/stats.js` — streak, heatmap, rank, badges, trend.
- `src/media.js` — WebP clip lazy (chunk ~1.7 MB).
- `src/music.js` — engine audio + 12 tracce locali.
- `src/storage.js` — adapter Capacitor Preferences / localStorage.
- `scripts/verify.mjs` **(NEW)** — check pre-deploy `sessions` ReferenceError.
- `scripts/deploy.mjs` **(NEW)** — deploy deterministico `--local/--remote/--ios`.
- `scripts/screenshots.mjs` **(NEW)** — genera screenshot Playwright (390×844 @2x) per README.
- `public/manifest.webmanifest` + `public/icons/` — PWA.
- `public/tracks/` — MP3 offline.

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

React 18 · Vite 5 · Capacitor 6 · lucide-react · recharts · Playwright (screenshots)