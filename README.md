# Operator 40

Fitness coach for people over 40. A 15-minutes-a-day training camp to lose belly fat and tone up, built for **Mac (web/PWA)**, **iOS (native)** and any modern browser.

Dark, military-themed UI with **animated SVG exercise figures**, a full exercise library, adaptive weekly programs, session tracking, statistics and offline **motivational music** (royalty-free MP3 files shipped locally).

> **Try it live:** <https://mikweb.eu/operator40/> — installable as a PWA on iPhone and Mac.

---

## Screenshots

| Home / daily mission | Exercise library |
|:---:|:---:|
| ![Home](docs/screenshots/01-home.png) | ![Library](docs/screenshots/02-libreria.png) |

| Exercise detail (animated cartoon clip) | Live workout session |
|:---:|:---:|
| ![Exercise detail](docs/screenshots/03-esercizio-superman.png) | ![Workout session](docs/screenshots/04-sessione-allenamento.png) |

| Statistics & history |
|:---:|
| ![Statistics](docs/screenshots/05-statistiche.png) |

---

## Features

- **Enrollment** — age, weight, waist and weekly goal calibrate calories and training zones.
- **Daily missions** — 5 adaptive programs (Assault on the Belly, Fat Burner, Total Strength, Active Recovery, Quick Burst) with work/rest intervals and difficulty levels.
- **Exercise library** — all exercises with technical notes for the over-40 body; animated **cartoon WebP clips** for every movement (the app's own SVG figures rendered as seamless loops).
- **Live session** — voice-style guidance, countdowns, tracking of elapsed time, estimated kcal, HR (entered manually from a smartwatch) and RPE.
- **Statistics** — streaks, session history, kcal totals, waist/weight trends, ranks (Recruit → Veteran).
- **Music** — 12 royalty-free tracks (NEFFEX CC BY 3.0, public-domain marches, Bella ciao CC BY-SA 4.0), shipped as **local files** — works fully offline, no streaming.
- **Privacy** — all data stays on the device (localStorage / Capacitor Preferences). Optional Apple Health `export.xml` import runs entirely on-device.
- **Installable PWA** — full screen, no browser chrome.

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

- `src/App.jsx` — the whole app (iOS audio unlocks, local dates, safe-area, 100dvh).
- `src/media.js` — base64 WebP clips, loaded **lazy** (separate ~1.7 MB chunk) to keep the initial bundle small.
- `src/music.js` — audio engine + the 12 royalty-free track list (relative `tracks/…` paths, works under any base path).
- `src/storage.js` — storage adapter: Capacitor Preferences (native) / localStorage (web).
- `public/manifest.webmanifest` + `public/icons/` — installable PWA.
- `public/tracks/` — the offline MP3 files (copied verbatim into `dist/tracks/`).

---

## Tech stack

React 18 · Vite 5 · Capacitor 6 · lucide-react · recharts