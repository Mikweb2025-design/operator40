# Operator40 — Struttura Completa & Funzioni

> **Leggi questo file per capire tutto in 5 minuti.** Aggiornato al **2026-08-21** — `main` @ `22315d7` (index-C2_576VQ.js / o40-vb33d1b60) + `operator40-Watch` con Huawei. Build deterministico `2.0.0 · <git-short>`.

---

## 1. Panoramica

**Operator40** — fitness coach over 40, 15′/giorno, senza attrezzi, **PWA offline + iOS nativo (Capacitor 6)**.  
UI militare scura (`INK`/`OLIVE`/`BLAZE`/`KHAKI`/`PAPER`), 13 programmi (A–M + Q), 20+ esercizi con clip WebP/MP4 locali, streak/goal/medaglie, musica NEFFEX offline, import Apple/Huawei Health.

- **Live:** https://mikweb.eu/operator40/ (PWA installabile, `dist/` → `mikweb.eu/httpdocs/operator40/`)
- **Repo:** https://github.com/Mikweb2025-design/operator40 — `main` (no Huawei) + `operator40-Watch` (con Huawei Health/Watch)
- **Tech:** React 18, Vite 5, Capacitor 6, lucide-react, recharts, Playwright (screenshots)

---

## 2. Albero Cartelle

```
operator40/
├── public/                 # copiato tal quale in dist/
│   ├── clips/              # 9 mp4 locali (2.3–2.6M): bicyclecrunch, russiantwist, wallsit, superman, ponte, ginocchiaalte, crunch, burpeetattico, sideplank
│   ├── icons/              # icon-180/192/512.png
│   ├── tracks/             # 12 mp3 NEFFEX (offline)
│   ├── manifest.webmanifest
│   └── sw.js               # template con __VERSION__ → o40-v<hash> deterministico
├── src/
│   ├── App.jsx             # ★ TUTTA L'APP (~3000 righe) — vedi §3
│   ├── main.jsx            # bootstrap React + window.storage + PWA install + SW reload defer
│   ├── storage.js          # adapter Capacitor Preferences ↔ localStorage
│   ├── media.js            # VIDEO_B64 (WebP base64) lazy chunk 1.7M
│   ├── clips.js            # CLIP_FILES { id: 'clips/*.mp4' } + hasClip()
│   ├── music.js            # playlist autoplay (vedi §3.3)
│   ├── i18n.js             # LANGS, LOCALES, detectLang, tr/translate, t('nav.*','setup.*','home.*','hist.*')
│   ├── data/
│   │   ├── exercises.js    # EXERCISES { ponte, sideplank, superman… } + EXERCISE_GROUPS
│   │   └── programs.js     # PROGRAMS 13, QUICK_PROGRAM, LEVELS, INTERVAL_PRESETS, pickNextProgram, campDay*
│   ├── utils/
│   │   ├── date.js         # formatTime, dayKey, sessionDayKey
│   │   ├── stats.js        # streak, rank, badges, heatmap (vedi §4.1)
│   │   ├── progress.js     # getWeeklyProgress, getConsistencyScore, getAveragePace, getStreakRisk
│   │   ├── goals.js        # getGoalProgress, getGoalHistory(8w), suggestNextGoal, formatGoal, estimateWeeklyCalories
│   │   ├── personalChallenge.js # getPersonalChallenge, getRecoveryTip (vs te stesso)
│   │   ├── achievements.js # ACHIEVEMENTS 8, getAchievementsProgress, getNextAchievements
│   │   ├── insights.js     # getDailyInsight, getWeeklyInsight
│   │   ├── missions.js     # getRecommendedMissions, getDailyChallenge
│   │   ├── workout.js      # buildSequence, kcalForSeconds, estimateProgramKcal, totalSeqSeconds
│   │   ├── audio.js        # getAudioCtx, unlockAudio, playBeep, playClick, vibrate, speak
│   │   ├── export.js       # exportCSV, buildCalendarGrid
│   │   ├── share.js        # shareResults (Web Share)
│   │   ├── shareImage.js   # shareStatsImage (1080×1350 canvas con rank/medaglie/smart/competition) + shareCompetitionImage
│   │   ├── bmi.js          # calcBMI, bmiCategory, estimateTDEE, simpleMealHint
│   │   ├── body.js         # estimateBodyFat, whtCategory
│   │   ├── favorites.js    # loadFavorites, toggleFavorite (localStorage)
│   │   ├── photos.js       # loadPhotos, savePhotos, fileToDataUrl (max 4M)
│   │   ├── wakeLock.js     # requestWakeLock, releaseWakeLock
│   │   ├── notifications.js# requestNotificationPermission, scheduleDailyReminder, checkAndFireReminder
│   │   ├── huawei.js       # (solo su Watch) parseHuaweiHealthExport (JSON/TCX/CSV)
│   │   ├── huaweiApi.js    # (solo Watch) Health Kit REST OAuth2 + mock
│   │   └── huaweiWatch.js  # (solo Watch) Web Bluetooth HR 0x180D + mock
│   ├── components/
│   │   ├── ExerciseFigure.jsx # SVG pose stilizzata (fallback se no clip)
│   │   ├── WeeklyChallenge.jsx# cerchio % settimanale
│   │   ├── GoalRing.jsx    # GoalRing + MiniGoalBar (8w)
│   │   └── ErrorBoundary.jsx # OPERAZIONE INTERROTTA + RICARICA
│   ├── constants/theme.js  # INK, INK_2, PAPER, OLIVE, OLIVE_DARK, KHAKI, BLAZE, BLAZE_DEEP, STEEL
│   └── styles/appStyles.js # STYLES (aura, ticker, camo, etc.)
├── scripts/
│   ├── version-sw.mjs      # post-build: hash dist/assets → o40-v<8hex> in sw.js (deterministico)
│   ├── verify.mjs          # check ReferenceError sessions prima del build
│   ├── deploy.mjs          # deploy deterministico --local/--remote/--ios (--skip-build)
│   └── screenshots.mjs     # Playwright 390×844 @2x → docs/screenshots/ 5 viste
├── docs/screenshots/       # 01-home, 02-libreria, 03-esercizio, 04-sessione, 05-statistiche (+full)
├── ios/                    # Capacitor iOS (App/App.xcodeproj, App/App/public ← dist)
├── vite.config.js          # define __APP_VERSION__/__BUILD_ID__ = "2.0.0 · <git-short>" deterministico
├── capacitor.config.json   # webDir: dist, appId: com.operator40.app
└── STRUCTURE.md            # ← questo file
```

---

## 3. `src/App.jsx` — Cuore (≈3000 righe)

### 3.1 Stato globale (useState)
```
profile, sessions, customPrograms, waistHistory, weightHistory, photos
screen: loading | setup | home | library | builder | preview | countdown | session | summary | history
seq, phaseIdx, secondsLeft, paused, activeProgram, lastStats
form*: formName/Age/Weight/Waist/Height/CustomWork/CustomRest, reminderHour/Minute
UI: installPrompt, showTour, largeText, previewProgram, editingCustom, toast, exitConfirm
Health: healthImportStatus/WeightSuggestion, huaweiImportStatus/WeightSuggestion, huaweiWatchStatus/Info (solo Watch), huaweiApiStatus/Cfg (solo Watch)
HR: hrInput, waistInput, rpe, notes, weightInput
Audio: soundOn, vibrationOn, musicOn, musicTrack, musicVolume, musicAutoPlay, musicShuffle
```

### 3.2 Funzioni chiave
| Funzione | Cosa fa |
|---|---|
| `load persisted data` useEffect | `window.storage.get('o40_profile/sessions/custom_programs/waist/weight')` → setState, `screen` |
| `saveProfile()` | valida age/weight/height/customWork/Rest, salva `o40_profile`, `recordWaist` |
| `startSession(program)` | `buildSequence(program, skipWarmup, work, rest)` → `seq`, `phaseIdx 0`, `secondsLeft`, `playBeep` |
| `advancePhase()` / `goPrev()` | beep + vibrate + `announcePhase` + next/prev `seq` |
| `finishSession()` | `estimateProgramKcal` → `lastStats`, `screen='summary'` |
| `saveSession()` | crea `record {date, programId, kcal, durationSec, peakHR, rpe, notes}`, `computeBestStreak` + badge check → `o40_sessions` |
| `importAppleHealth(file)` | `parseAppleHealthExport(xml)` → `workouts` + peso → dedup su `date` |
| `importHuaweiHealth(file)` *(Watch)* | `parseHuaweiHealthExport` (JSON/TCX/CSV) → stesso flusso |
| `handleConnectHuaweiWatch` *(Watch)* | `isBluetoothAvailable` ? `connectHuaweiWatch` (HR 0x180D) : `mockHuaweiWatchSync` |
| `handleHuaweiApi*` *(Watch)* | `buildHuaweiAuthUrl` → redirect → `exchangeHuaweiCodeForToken` → `fetchHuaweiWorkoutsViaApi` / mock |
| `toggleMusic/selectMusicTrack/changeMusicVolume` + `toggleMusicAutoPlay/Shuffle` + `next/prevMusicTrack` | persist su `profile`, `musicSet*` |
| `exportData` / `exportCSV` / `shareStatsImage` / `shareCompetitionImage` | backup JSON, CSV, PNG 1080×1350 |

### 3.3 Musica (`src/music.js`)
`TRACKS` 12 NEFFEX, `DEFAULT_TRACK`. `audio.loop=false`, `ended` → `getNextTrackId` o `getRandomTrackId` se `shuffle`, `onTrackChange` → `setMusicTrack` + `profile.musicTrack` persist. `musicSetShouldPlay/AutoPlay/Shuffle` + `musicNext/Prev` + `musicGetQueue`. Volume adattivo: `session` warmup 0.75, rest/cooldown 0.45, paused 0.25, altrimenti 0.45.

### 3.4 Scherm initial-scale
`HomeScreen` (miss. giorno + sfida giorno + altre missioni **in alto**, informative in basso), `LibraryScreen`, `BuilderScreen`, `PreviewScreen`, `CountdownScreen` (3-2-1), `SessionScreen` (anello + EqBars + prev/skip), `SummaryScreen` (RPE + notes + waist/weight/HR + `WeeklyChallenge` + `saveSession`), `HistoryScreen` (streak, heatmap, grafici, `MedalGrid`, `Goal` + `MiniGoalBar`), `SetupScreen` (form + toggle + musica con autoplay/shuffle + Health import + Watch).

### 3.5 VersionBadge
`const BUILD_VERSION = __APP_VERSION__` (`vite.config` → `2.0.0 · <git-short>` deterministico). Componente `VersionBadge()` con dots `#7FB069`/`BLAZE`, **solo globale** sotto `BottomNav` (`App.jsx:1084`) — unico alla base, sempre visibile, corretta.

---

## 4. Utils Dettaglio

### 4.1 `stats.js`
`WEEKLY_GOAL 3`, `STREAK_BADGES [3,7,14,30,60,90]`, `SESSION_BADGES [5,10,25,50,75,100,150]`, `KCAL_BADGES`, `CONSISTENCY_BADGES`, `PERFECT_WEEK_BADGES`, `MEDAL_DEFS`, `RPE_LABELS/COLORS`, `RANKS [RECLUTA→VETERANO]`.  
`computeBestStreak`, `computeStreak`, `computeStreakWithFreeze` (1 freeze), `getRank`, `nextBadge`, `getMedalProgress` (all/unlocked/locked + `progress`), `getNextMedals(3)`, `buildHeatmap(35)`, `buildYearHeatmap`, `getPersonalRecords`, `getMonthlyTrend`.

### 4.2 `progress.js`
`getWeeklyProgress(done/total/pct/remain/isDone)`, `getConsistencyScore(weeks=8)` → 0-100, `getAveragePace`, `formatDuration`, `getStreakRisk` → ok/at-risk/break.

### 4.3 `goals.js`
`getGoalProgress`, `getGoalHistory(weeks=8)` → array, `suggestNextGoal` (±1 se cons≥80 o <35), `formatGoal`, `estimateWeeklyCalories`, `getStreakWeeks`.

### 4.4 `personalChallenge.js` / `achievements.js` / `insights.js` / `missions.js`
- `personalChallenge` → 6 livelli (Prime 3, Settimana perfetta, Consistenza 70%, 10/25/100, 4 sett. perfette) + `getRecoveryTip`
- `achievements` → 8 achievement (first, streak3/7, s5/25, k5000, cons70, perfect4) + progress
- `insights` → `getDailyInsight`/`getWeeklyInsight` (streak, cons, waist, RPE)
- `missions` → `getRecommendedMissions` (ordina `others` per RPE/cons/uso) + `getDailyChallenge` (bonus)

### 4.5 Altri
`workout` → `buildSequence` con warmup/cooldown + rounds, `export` → CSV con waist/weight by day, `shareImage` → canvas 1080×1350 con rank/medaglie/smart/competition (ora smart+medaglie), `bmi/body` → BMI/TDEE/BF/WHtR, `huawei*` solo su Watch branch.

---

## 5. Storage & i18n

- `window.storage = {get,set,remove,clear}` → `Capacitor Preferences` (iOS) / `localStorage` (web) — chiavi `o40_profile`, `o40_sessions`, `o40_waist`, `o40_weight`, `o40_custom_programs`, `o40_huawei_api` (solo Watch)
- `i18n.js` → `LANGS [it,en,de]`, `LOCALES`, `detectLang`, `tr/translate` con fallback, `t('nav.home','setup.*','home.*','hist.*')`

---

## 6. Build & Deploy (deterministico, no drift)

```bash
npm run verify   # check sessions ReferenceError
npm run build    # vite + scripts/version-sw.mjs → dist/index-<hash>.js + sw.js o40-v<8hex> (hash da dist/assets)
npm run deploy:local  # verify + build + info
npm run deploy -- --remote --ios # push dist su GitHub branch deploy-tmp + curl raw su mikweb.eu + npx cap sync
```

- `vite.config.js` → `__APP_VERSION__ = "2.0.0 · <git rev-parse --short HEAD>"` → stesso commit = stesso hash asset → locale e `mikweb.eu/operator40` allineati (fix drift timestamp)
- `scripts/version-sw.mjs` → `o40-v<hash>` in `sw.js` (supporta `__VERSION__` e `o40-vXXXXXXXX`)
- `mikweb.eu` deploy: `git checkout -b deploy-tmp && git add -f dist && git push -f` → `curl raw.githubusercontent.com/.../dist` su `/var/www/vhosts/mikweb.eu/httpdocs/operator40/{index.html,sw.js,assets/*,clips/*}` + `chown 501:staff` + `comm -23` cleanup vecchi hash
- iOS: `npx cap sync` → `ios/App/App/public` (9 clip, `index-*.js`) → `npx cap open ios` → Xcode 26.5 / iOS 26.5

---

## 7. Branch & Git

- `main` @ `22315d7` (attuale) — **no Huawei**, con medaglie/share smart/goal/missions/musica autoplay/silhouette rimossa (mission card solo `music-bg.jpg` + overlay scuro, no `ExerciseFigure`)
- `operator40-Watch` @ `6e2d9a9` — con Huawei Health (file JSON/TCX/CSV + Health Kit REST OAuth2 + Watch BT HR 0x180D + mock)
- `origin/main` allineato, `dist` gitignored, `ios/App/App/public` ignorato (rigenerato via `cap sync`)

---

## 8. Checklist Domani

1. `git checkout main && git pull`
2. `npm run verify && npm run build` → controlla `v2.0.0 · <hash>` in Home alla base
3. `npx cap sync` se tocchi `public`/`src`
4. Per deploy web: `node scripts/deploy.mjs --remote` o manuale `deploy-tmp` + `curl` su mikweb
5. Per screenshot: `npm run preview -- --host 127.0.0.1 --port 4173` + `node scripts/screenshots.mjs` (Playwright 390×844 @2x)

Tutto qui — buon lavoro domani!
