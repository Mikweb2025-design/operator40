# Fix tracking movimenti — 2026-08-26

> Sessione di lavoro su `src/ai/` (motore AI tracking esercizi), richiesta: migliorare robustezza pose (occlusioni/side-view/luce scarsa) + ridurre duplicazione codice nei 22 analyzer.

## Problema trovato

16 dei 22 exercise analyzer (`src/ai/exercises/analyzers/*.ts`) calcolavano gli angoli bilaterali (ginocchio, gomito, linea tronco, flessione anca) come **media semplice sinistra+destra**:

```ts
const trunk = (angleFromLandmarks(lm, L.shoulder, L.hip, L.ankle)
             + angleFromLandmarks(lm, R.shoulder, R.hip, R.ankle)) / 2;
```

Nessun controllo sulla visibilità dei landmark. In side-view (molto comune: telefono appoggiato di lato durante l'esercizio) MediaPipe continua a restituire una stima anche per il lato occluso, ma con visibilità bassa e spesso geometricamente sbagliata (landmark "indovinato", non osservato). Quella stima veniva mediata con il lato buono, distorcendo l'angolo usato per:
- decidere le transizioni di fase (READY/DESCENDING/BOTTOM/...)
- contare le rep (`repConfidence`)
- calcolare il `formScore`

Solo `squat.ts` e `pushup.ts` avevano già una selezione lato-per-lato basata sulla visibilità, ma senza smoothing né isteresi: quando la visibilità del lato occluso oscillava vicino alla soglia (rumore, tipico in scarsa luce), l'angolo scattava avanti e indietro tra "solo lato A" e "media A+B" — falsi positivi/negativi nel conteggio.

## Soluzione

Aggiunto un metodo condiviso sulla classe base ([`src/ai/exercises/ExerciseAnalyzer.ts`](../src/ai/exercises/ExerciseAnalyzer.ts)):

```ts
protected bilateralJointAngle(key, lm, leftTriplet, rightTriplet, opts?)
```

- **EMA sulla visibilità** (α 0.35) — smussa il rumore dei valori di `visibility` frame-per-frame, utile in scarsa luce dove il modello di pose oscilla di più.
- **Isteresi sul cambio lato** — serve un margine (0.12) perché il lato scelto cambi; altrimenti resta quello già "committed". Elimina lo scatto dell'angolo a cavallo della soglia di visibilità (0.4).
- **Hold sull'ultimo lato buono** — se in un frame entrambi i lati scendono sotto soglia (occlusione totale momentanea), l'angolo resta ancorato all'ultimo lato affidabile invece di ricadere su una media di due stime spazzatura.

Stato (EMA + lato scelto) tenuto per-`key` (es. `'knee'`, `'trunk'`, `'hipFlex'`) così più metriche nello stesso analyzer non si sporcano a vicenda; azzerato in `reset()` a ogni nuovo esercizio/sessione.

### Dove applicato (16 file)
`squat`, `pushup`, `affondo`, `crunch`, `deadBug`, `ginocchiaAlte`, `jumpingJack`, `legRaise`, `mountainClimber`, `plank`, `plankJack`, `ponte`, `sideplank`, `skater`, `superman`, `vUp`, `wallsit`.

### Dove NON applicato (di proposito)
Esercizi dove sinistra≠destra è il **segnale stesso**, non un errore da correggere: `flutterKick`, `mountainClimber` (gamba guida), `ginocchiaAlte` (gamba guida), `russianTwist`, `heelTap`, `bicycleCrunch` — questi confrontano i due lati per rilevare l'alternanza, mediarli distruggerebbe l'informazione. `russianTwist`/`heelTap`/`bicycleCrunch` usano comunque distanze fra landmark, non angoli — fuori scope di questo fix.

### Pulizia collaterale
- Rimosse le funzioni locali duplicate `knee()`/`elbow()`/`trunk()`/`bodyLine()` in `squat.ts`/`pushup.ts` (ora usano l'helper condiviso).
- In `legRaise.ts`/`vUp.ts` l'angolo ginocchio (`kneeExt`) veniva ricalcolato due volte nello stesso frame — ora calcolato una volta e riusato.

## Verifica

- `npm run test` → 24/24 test passati (incl. `analyzers.test.ts`)
- `npm run build` → OK
- `npm run verify` → OK (nessun ReferenceError)
- Non testato su device reale con webcam — solo verifica statica/unit. Da confermare in side-view reale.

## Commit

| Branch | Commit | Contenuto |
|---|---|---|
| `main` | [`ce2bf14`](https://github.com/Mikweb2025-design/operator40/commit/ce2bf14) | fix sorgente (18 file `src/ai/`) |
| `deploy-tmp` | [`c126e6a`](https://github.com/Mikweb2025-design/operator40/commit/c126e6a) | dist rebuilt `o40-vbea71ea9` |

`deploy-tmp` è stato pushato su GitHub ma **non** sincronizzato sul server live mikweb.eu (richiede accesso SSH non disponibile in questa sessione — vedi istruzioni `curl raw` in `scripts/deploy.mjs`).

## Prossimi passi (non fatti, proposti in sessione)

- Test su device reale (iPhone/Android) in side-view con occlusione volontaria di un lato, per confermare che il conteggio rep non scatti più.
- Eventuale estensione dello stesso principio (visibility-aware + isteresi) alle metriche a distanza di `russianTwist.ts`/`heelTap.ts`/`bicycleCrunch.ts` — richiede un helper diverso (non angolo, distanza normalizzata).
- Sync del dist aggiornato sul server live (`curl raw` da `deploy-tmp`, vedi `scripts/deploy.mjs --remote`).

## Aggiornamento — framing troppo largo (fotocamera frontale, stesso giorno)

**Problema segnalato dall'utente:** per far entrare tutto il corpo nell'inquadratura della fotocamera frontale (FOV stretta) bisogna allontanarsi troppo dal telefono.

**Causa:** `requiredLandmarks` di `squat`/`affondo`/`wallsit`/`pushup` includeva le caviglie (27/28). `PoseQuality.evaluatePoseQuality` usa quell'elenco per decidere se mettere in pausa il tracking (`shouldPauseAnalysis`/`requiredVisible`) — se i piedi escono anche di poco dall'inquadratura (framing testa-a-stinco, tipico con la selfie-camera), la visibilità delle caviglie crolla e l'app blocca/segnala malposizionamento, spingendo l'utente ad allontanarsi.

**Fix:** rimosse le caviglie da `requiredLandmarks` in questi 4 analyzer (rimangono comunque usate nel calcolo dell'angolo ginocchio/linea corpo quando visibili — MediaPipe stima comunque una posizione plausibile anche quando il piede è appena fuori dal crop, grazie al prior full-body del modello; qui si è tolto solo il *gate* che bloccava la sessione, non la geometria). Lasciati invariati `skater`/`jumpingJack`/`burpee`, dove la posizione della caviglia è il segnale primario (spread laterale dei piedi) e non un semplice "nice to have" — lì il vincolo di framing è reale e non eliminabile via gating.

Non toccato: nessuna soglia di fase/conteggio rep, nessun cambio di fotocamera (restava `facingMode: 'user'`, front-camera).

Verifica: `npm run test` 24/24, `npm run build`, `npm run verify` OK.
