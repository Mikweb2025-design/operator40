# Fixtures landmarks.json

Formato `LandmarkRecorder.exportJson()` — quello che scarichi con ◯ REC → ↓ JSON nell'app (nessun video, solo 33 landmark x/y/visibility per frame).

```
{ version: 1, created: "...", exercise: "squat-front", frames: [{t, landmarks:[33]}] }
```

## File attuali (sintetici, per CI)
- `squat-front.json` — 2 rep pulite + 1 shallow bounce prefix (testa regressione 9f76c3a: non deve bloccare)
- `squat-side.json` — side-view, lato destro occluso vis 0.18 (testa bilateralJointAngle)
- `pushup.json` — 1 rep pushup

## Come aggiungere un file reale
1. In app: Home → Missione → Sessione → ◯ REC (angolo debug HUD) → fai l'esercizio → ■ STOP → ↓ JSON
2. Rinomina `landmarks-<esercizio>-<condizione>.json` (es. `landmarks-squat-side-iphone14.json`)
3. Metti in `tests/fixtures/` e aggiungi aspettativa in `src/ai/exercises/analyzers.test.ts` (describe fixtures)
4. `npm run test` → deve passare; `npm run build` non tocca i fixtures (gitignored? no, committati)

## CI
`.github/workflows/ci.yml` esegue `verify + test + build` su ogni push main/deploy-tmp e PR. Se `dist/` non è ricostruito, warning (non bloccante).
