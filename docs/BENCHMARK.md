# Operator40 — Benchmark lite vs heavy

> v2.14.2 QA · 29 Ago 2026 · auto heuristic documentata da 32 fixtures replay

## Heuristic `auto` in `src/engine/PoseLandmarkerManager.ts:80`

```
requested = modelVariant ?? 'auto'
if auto:
  mem = navigator.deviceMemory ?? 4
  cores = navigator.hardwareConcurrency ?? 4
  isOldIOS = /iPhone OS 1[0-4]_/.test(ua)
  variant = (mem>=4 && cores>=4 && !isOldIOS) ? 'heavy' : 'lite'
  override = localStorage.getItem('o40_modelVariant') // lite|heavy|full per test
```

Fallbacks: `wasm` CDN → `./wasm`, model `CDN → ./models` (offline dopo `fetch:mediapipe`), delegate `GPU → CPU` automatico.

## Misure attese (iPhone 14/15, Vite preview, 28fps FitnessEngine)

| device | model | FPS medio | Init | Note |
|---|---|---|---|---|
| iPhone 15 Pro (6GB, A17) | heavy | 26–28 | ~1.8s | consigliato, landmarks più stabili side-view |
| iPhone 15 Pro | lite | 28 | ~0.9s | fallback se `heavy_slow >3.8s` → throttle |
| iPhone 14 (6GB, A15) | heavy | 22–26 | ~2.4s | ok, OneEuro 1.05/0.006 per heavy |
| iPhone 14 | lite | 28 | ~1.0s | default su deviceMemory<4 o cores<4 |
| Mac Chrome M1 | heavy | 28 | ~1.2s | GPU delegate |
| Mac Chrome M1 | lite | 28 | ~0.7s | - |

> Numeri da confermare con `npm run preview` + debug HUD `FPS` su device reale. Se `init >3.8s` logga `heavy_slow` e FitnessEngine throttla.

## Cómo testare

1. `npm run build && npm run preview` → apri `http://<ip>:4173` su iPhone
2. Impostazioni → `localStorage.setItem('o40_modelVariant','heavy')` o `lite` poi reload
3. Session → Debug HUD → leggi `FPS` + `REQ`/`DET` + `POSE`
4. Registra `◇ DEBUG → ◯ REC → ↓ JSON` 10s per esercizio, salva in `tests/fixtures/`

## Fixtures copertura QA (32 totali, v2.14.2)

Top-5 instabili ora con 3 varianti ciascuna (requisito roadmap top-6):
- **squat**: front, side (occluso vis 0.18), shallow (non deve contare), deep (2 rep)
- **pushup**: base, side (occluso), shallow (non deve contare)
- **burpee**: base, nojump (over-40 senza salto)
- **legRaise**: base, bent (ginocchio 135°), fast (40ms)
- **russianTwist**: base, slow (full ROM 0.9), shallow (0.55, non deve contare)

Tutti validati via `npm test` → 119 tests (era 101) + `analyzers.test.ts` full replay.

## Tuning v2.14.2 (5 analyzer)

- **squat**: READY 122→124, BOTTOM 113→111, ASCENDING 146→144, depthOk 122→124, extOk 142→140, gate 58→55, exConf 38→36, temporal 52→50
- **pushup**: 120/110/125/142 → 122/112/123/140, gate 58→55, exConf 38→36, temporal 50→48
- **burpee**: standing 142/0.62 → 138/0.65, squat 108→112, handsDown 0.58→0.56, plank 145/135→142/132, jump hipY 0.52→0.54, gate 60→58, exConf 38→36
- **legRaise**: READY 145→147, TOP 105→108, LOWERING 118→115, DOWN 148→145, topOk 108→110, downOk 148→145, gate 60→58
- **russianTwist**: centered 0.52→0.55, twisted 0.72→0.66, gate 58→55
- **TemporalClassifier**: squat 58→55/18→17, pushup 60→56/20→18, burpee 62→58/18→16, legraise/ twist nuovi defaults
