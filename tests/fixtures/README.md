# Fixtures landmarks.json

Formato `LandmarkRecorder.exportJson()` — quello che scarichi con ◯ REC → ↓ JSON nell'app (nessun video, solo 33 landmark x/y/visibility per frame).

```
{ version: 1, created: "...", exercise: "squat-front", frames: [{t, landmarks:[33]}] }
```

## File attuali (32 sintetici, per CI — v2.14.2 QA)

Top-5 instabili con 3 varianti ciascuna (roadmap Giorno 1-2, vedi `docs/BENCHMARK.md`):
- `squat-front.json` — 2 rep pulite + 1 shallow bounce prefix (regressione 9f76c3a)
- `squat-side.json` — side-view, lato destro occluso vis 0.18 (bilateralJointAngle)
- `squat-shallow.json` — solo bounce shallow 128° → NON deve contare (tuning 124)
- `squat-deep.json` — 2 deep rep con hipYDelta 0.002 per frame
- `pushup.json` — 1 rep pushup base
- `pushup-side.json` — side-view occluso destro
- `pushup-shallow.json` — shallow 118° → non deve contare
- `burpee.json` — 1 rep con jump
- `burpee-nojump.json` — 7 frame no-jump (over-40)
- `legRaise.json` — base
- `legraise-bent.json` — knee 135° (penalità form ma conta)
- `legraise-fast.json` — 40ms/frame fast
- `russianTwist.json` — base
- `russiantwist-slow.json` — slow full ROM 0.9 ×8 frame
- `russiantwist-shallow.json` — shallow 0.55 ×6 frame → non deve contare
- + 17 altri (affondo, bicycleCrunch, crunch, deadBug, flutterKick, ginocchiaAlte, heelTap, jumpingJack, mountainClimber, plank, plankJack, ponte, sideplank, skater, superman, vUp, wallsit)

## Come aggiungere un file reale
1. In app: Home → Missione → Sessione → ◯ REC (angolo debug HUD) → fai l'esercizio → ■ STOP → ↓ JSON
2. Rinomina `landmarks-<esercizio>-<condizione>.json` (es. `landmarks-squat-side-iphone14.json`)
3. Metti in `tests/fixtures/` e aggiungi aspettativa in `src/ai/exercises/analyzers.test.ts` (describe fixtures)
4. `npm run test` → deve passare; `npm run build` non tocca i fixtures (gitignored? no, committati)

## CI
`.github/workflows/ci.yml` esegue `verify + test + build` su ogni push main/deploy-tmp e PR. Se `dist/` non è ricostruito, warning (non bloccante).
