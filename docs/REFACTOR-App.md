# Refactor App.jsx — Piano 2026-08-26

> `src/App.jsx` 3563 righe → obiettivo <400 righe router + 7 screen modulari + 3 hook

## Perché ora
App.jsx contiene 9 screen + 40 stati + logica storage/music/push/session in un unico file. Ogni fix tracking di oggi ha toccato 3 punti del file. Con 22 analyzer + banner release, il rischio regressione sale.
Il replay landmarks (Task 2) è già sbloccato — serve base stabile per iterare soglie.

## Stato attuale (linee)
- `CountdownScreen` 1427-1444 (17 righe, 0 dipendenze esterne oltre theme/i18n)
- `SetupScreen` 1447-1752 (~305 righe, form + push/music/level)
- `HomeScreen` 1753-2291 (~538 righe, dashboard + streak/goal/mission)
- `LibraryScreen` 2292-2427 (~135 righe)
- `BuilderScreen` 2428-2546 (~118 righe)
- `PreviewScreen` 2547-2670 (~123 righe)
- `SessionScreen` 2671-2862 (~191 righe, countdown + AI overlay)
- `SummaryScreen` 2863-3080 (~217 righe, RPE/waist/weight save)
- `HistoryScreen` 3081-3563 (~482 righe, stats/heatmap/photos)

Plus:
- `VersionBadge` 52-72, `TopBar` 293-311, `BottomNav` 315-350 (già estraibili in `src/components/layout/`)
- Logica `useEffect` hydratation 441-668 (storage/music/push/lang) → `src/hooks/useAppBootstrap.js`
- `saveProfile/recordWaist/recordWeight/applyLevel` 742-830 → `src/hooks/useProfile.js`
- `startSession/advancePhase/finishSession/saveSession` 714-1052 → `src/hooks/useSession.js`

## Target structure
```
src/
  App.jsx              # router <400 righe: state top-level + screen switch + BottomNav + VersionBadge
  hooks/
    useStorage.js      # wrapper window.storage (idb/Preferences) + migration
    useProfile.js      # profile CRUD, level, intervalPreset, music, push prefs
    useSession.js      # seq/phaseIdx/secondsLeft/paused + AI gating
    useAppBootstrap.js # hydratation, PWA update checker, motivational, installPrompt
  screens/
    CountdownScreen.jsx
    SetupScreen.jsx
    HomeScreen.jsx
    LibraryScreen.jsx
    BuilderScreen.jsx
    PreviewScreen.jsx
    SessionScreen.jsx
    SummaryScreen.jsx
    HistoryScreen.jsx
  components/layout/
    TopBar.jsx, BottomNav.jsx, VersionBadge.jsx
```

## Passi (incrementali, senza breaking)
1. **Oggi (2026-08-26) — scaffolding + 1° estratto**
   - Creato `tests/fixtures/` + `analyzers.test.ts` fixture replay (Task 2 DONE)
   - Creato `.github/workflows/ci.yml` (verify/test/build)
   - Creato `src/screens/CountdownScreen.jsx` (estratto, importato in App.jsx) — prova che pipeline funziona
   - Creati hook vuoti `src/hooks/*` con TODO e signature
   - Questo doc come handoff

2. **2026-08-27 — Setup + Home (DONE)**
   - ✅ `SetupScreen` 322 righe estratto → `src/screens/SetupScreen.jsx` (ToggleRow/Field/inputStyle locali)
   - ✅ `HomeScreen` 626 righe estratto → `src/screens/HomeScreen.jsx` (DogTag/ProgressRing/SegmentedProgress locali)
   - ✅ `npm run verify && npm run test && npm run build` `o40-vbcf3eb8d` — OK

3. **Giorno 3 — Session/Summary/History**
   - Estrarre `SessionScreen` (dipende da `aiCoachEnabled`, `seq`, `FitnessEngineView` — già props)
   - Estrarre `SummaryScreen` + `HistoryScreen` (usano `utils/*` — import diretti)
   - Spostare `TopBar/BottomNav/VersionBadge` in `components/layout/`

4. **Giorno 4 — hook**
   - Spostare hydratation `useEffect` in `useAppBootstrap`, `useProfile`, `useSession`
   - `App.jsx` diventa: `const {profile, sessions} = useProfile(); const session = useSession(profile); return <>{screen==='home' && <HomeScreen/>} ...`

## Regole per ogni estrazione
- Copia funzione identica, aggiungi in testa `import {...} from '../...'` (presi da App.jsx header)
- In App.jsx sostituisci definizione con `import CountdownScreen from './screens/CountdownScreen.jsx'`
- Mai cambiare props: gli screen restano controlled (ricevono state/setter dal router)
- Dopo ogni file: `npm run verify && npm run test && npm run build` — se OK commit

## Verifica odierna (2026-08-27 — continuazione)
- `src/App.jsx` 3563 → **3202** (Countdown 27 + Setup 322 + Home 626 estratti) — TopBar/BottomNav già fuori
- `npm run verify` ✅ — nessun ReferenceError
- `npm run test` 30/30 ✅
- `npm run build` `o40-vbcf3eb8d` (`index-dZA_-HUy.js`) ✅ — deterministico
- `SetupScreen` + `HomeScreen` estratti con props identici, `DogTag/ProgressRing/SegmentedProgress` duplicati locali per Home (deduplica prevista a fine refactor)
- Prossimo: `Library/Builder/Preview/Session/Summary/History` + hook `useAppBootstrap/useProfile/useSession` → target `App.jsx` <400

## Rischi evitati
- Non toccare `dist/` (deterministico), non rinominare `o40_storage` keys, non introdurre context nuovi — i screen restano props-driven finché tutti non sono estratti.
