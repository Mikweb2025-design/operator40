# Tracking 2.10 — Fase 1 + 2

> 28 Agosto 2026 — `2.10.0 (ee49d98)` + estensione a 22 analyzer (`o40-v21356d1e`)

## Obiettivo
Fix conteggio rep instabile in side-view / luce bassa su iPhone, false positive da jitter, e motion mancante per jumpingJack/burpee.

## Fase 1 — Immediate fix (0 dipendenze)

| Area | Prima | Dopo | Dove |
|---|---|---|---|
| Modello | `lite` fisso | `auto`: heavy se `deviceMemory>=4 && cores>=4 && !oldIOS`, lite fallback. Override `localStorage o40_modelVariant` | `PoseLandmarkerManager.ts:70` |
| Smoother | `1.15/0.008` unico | `heavy 1.05/0.006`, `lite 1.15/0.008`, `hold 0.85/0.005` | `PoseLandmarkerManager.ts:25`, `FitnessEngine.ts:130` |
| WorldLandmarks | ignorati | `worldLandmarks` smoothed (`worldSmoother`) + passati a analyzer via `setWorldLandmarks()` per correzione depth | `PoseLandmarkerManager.ts:130`, `FitnessEngine.ts:345` |
| MotionFusion | scaffold ma mai avviato | `MotionFusion.enable()` su 5 esercizi dinamici, boost `repConf +12` se `rhythm 0.8-2.5Hz` | `FitnessEngine.ts:165,345` |
| Debounce | `pushup 320/65`, `squat 340/70` | `pushup 360/85`, `squat 380/90` | `analyzers/*.ts` |

## Fase 2 — Classificatore temporale (30 frame)

```
src/ai/classifier/
  FeatureExtractor.ts  8-dim [knee,hipFlex,trunk,elbow,legSpread,hipY,vel,sym] normalizzati 0..1
  TemporalBuffer.ts    circolare 30f / 1200ms, ROM, velocityProfile, detectDownUpPattern()
  TemporalClassifier.ts GRU-light: pattern*0.45 + vel*0.22 + sym*0.12 + romScore + dwellBonus -> 0..100
```

Integrato in `ExerciseAnalyzer.ts` base: `temporalBuffer`, `pushTemporalFrame()`, `evaluateTemporalConfidence()`.

6 analyzer con gate completo (`classic*0.55 + temporal*0.45`):
- `squat`, `pushup`, `crunch`, `jumpingJack` (+ motion gate), `burpee`, `affondo`

16 restanti con warming (push + `temporalROM` in `secondaryAngles`) — pronti per training con `landmarks.json` reali senza cambiare logica conteggio.

## Benchmark atteso (stima su iPhone 14/15, Vite preview)

| Modello | FPS medio | Init | Memoria | Consigliato |
|---|---|---|---|---|
| lite | 28-30 | ~800ms | ~6 MB wasm | vecchi iPhone, low RAM |
| heavy | 22-26 | ~1.8s | ~18 MB wasm | iPhone 14+ con auto |
| heavy slow (>3.8s init) | auto throttle a 22fps | — | — | `FitnessEngine.ts:259` |

Misura reale: `npm run build && npm run preview` → `?debug=1` HUD mostra `FPS / POSE / MODEL` (via `getModelVariant()`).

## Test
- `npm run test` 94/94 — `analyzers.test.ts` copre 6 analyzer core + `fixtures.test.ts` 23 fixtures
- `tests/fixtures/*.json` synthetic 23 file per tutti i 22 esercizi (synthetic ma deterministici)
- Per calibrazione reale: `FitnessEngineView ◯ REC` → `↓ JSON` → drop in `tests/fixtures/real-*.json` → `npm test` rigenera expected reps

## Uso

```js
// override manuale modello per test
localStorage.setItem('o40_modelVariant','heavy'); // lite | heavy | full
localStorage.removeItem('o40_modelVariant'); // torna auto

// in HUD debug appare temporalROM
// secondary: { temporalROM: 42, trunk, hipY, motionImpact, motionRhythm }
```

## Prossimi step
- [ ] Sostituire synthetic fixtures con `landmarks.json` reali registrati su iPhone laterale/frontale
- [ ] Addestrare `TemporalClassifier` con dataset reale per soglie per-esercizio (minROM/minConfidence)
- [ ] Benchmark FPS reale su device + documentare in questa pagina
- [ ] Rigenerare screenshots `docs/screenshots/06-ai-debug.png` con `screenshots.mjs --debug`

## Fix segnale temporale (2.10.x)
Il `TemporalClassifier` validava il pattern su `kneeRaw` per TUTTI gli esercizi, ma per il
**pushup il segnale primario è il gomito** (il ginocchio resta quasi fermo nei pushup) → il gate
temporale misurava un giunto irrilevante e poteva contare/rifiutare rep fantasma. Fix:

- `FeatureExtractor`: aggiunti `elbowRaw`/`trunkRaw` raw accanto a `kneeRaw`/`hipFlexRaw`.
- `TemporalBuffer`: `detectDownUpPattern(key)` e `getROM(key)` ora sono segnale-aware (`RomSignal`),
  non più hardcoded su `kneeRaw`.
- `TemporalClassifier`: `primaryKey` per-esercizio corretto — `pushup → elbowRaw` (era `kneeRaw` via
  hack "bilateral"), + DEFAULTS estesi a tutti e 6 i gated (squat/pushup/crunch/affondo/ponte/
  jumpingJack/burpee) con `idealVel` e `minInterval` per-esercizio (jumpingJack più rapido, burpee
  più lento).
- Nuovi test `src/ai/classifier/classifier.test.ts` (5): ROM segnale-aware, pattern sul gomito per
  pushup, e regressione che un pattern solo sul ginocchio NON conta per pushup.
- Tot suite: 99/99.

