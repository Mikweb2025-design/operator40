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

## Aggiornamento 2 — "resta ancora in idle" dopo il deploy (stesso giorno)

Sincronizzato il server live via SSH (utente/operatore) allo stato `af20ab0` — verificato lato client (`sw.js` → `CACHE = 'o40-v90615e0b'`). L'utente segnala che il problema persiste identico.

**Causa reale, più a monte del fix precedente:**

1. [`FitnessEngine.ts`](../src/engine/FitnessEngine.ts) calcolava il `poseQuality` mostrato in UI (badge POSE%, messaggio "allontanati") usando **sempre** la lista generica `def.requiredLandmarks` (piena, con caviglie) invece della lista specifica — già ridotta — dell'analyzer attivo. Il gate che conta le rep era stato corretto, ma il numero mostrato all'utente no: restava basso e fuorviante anche quando il tracking funzionava.
2. In [`SessionAIOverlay.tsx`](../src/components/SessionAIOverlay.tsx) e [`FitnessEngineView.tsx`](../src/components/FitnessEngineView.tsx) il banner con l'istruzione ("Allontanati così vedo tutto il corpo") aveva la condizione **invertita**: `poseQuality < 42 && currentPhase !== 'idle'` — si nascondeva esattamente quando `currentPhase === 'idle'`, cioè nello stato in cui l'utente più aveva bisogno di sapere cosa fare. Restava a guardare un badge "idle" senza alcuna spiegazione.
3. Altri 6 analyzer a terra (`legRaise`, `deadBug`, `flutterKick`, `mountainClimber`, `vUp`, `ponte`) avevano ancora le caviglie in `requiredLandmarks` pur usandole solo in un check di form secondario (mai nel segnale principale della rep) — stesso meccanismo di blocco già risolto ieri per gli esercizi in piedi, ma non estesso a questi. `flutterKick` in particolare richiedeva le caviglie senza usarle in nessuna formula — puro overhead di gating.

**Fix:**
- `FitnessEngine.ts`: il calcolo di `poseQuality`/badge ora usa `this.analyzer.requiredLandmarks` quando esiste un analyzer dedicato (sempre il caso per i 22 esercizi), coerente col gate reale.
- Rimossa la condizione `currentPhase !== 'idle'` dal banner guida in entrambe le view.
- Rimosse le caviglie da `requiredLandmarks` in `legRaise`/`deadBug`/`flutterKick`/`mountainClimber`/`vUp`/`ponte`. Lasciati invariati `plank`/`sideplank` (la linea spalla-anca-caviglia È il controllo, non rimovibile) e `plankJack`/`skater`/`jumpingJack`/`burpee` (lo spread caviglie È il segnale primario).

Verifica: `npm run test` 24/24, `npm run build`, `npm run verify` OK.

Commit: [`134cc49`](https://github.com/Mikweb2025-design/operator40/commit/134cc49) su `main`, [`730dd0f`](https://github.com/Mikweb2025-design/operator40/commit/730dd0f) su `deploy-tmp` (dist `o40-vb241e378`). **Non ancora sincronizzato sul server live** — richiede lo stesso passaggio SSH di prima.

## Aggiornamento 3 — la causa root, trovata col replay di dati reali

Aggiunto un badge diagnostico `CONF` (repConfidence live) in `SessionAIOverlay.tsx` ([`3deb475`](https://github.com/Mikweb2025-design/operator40/commit/3deb475)) per avere numeri reali invece di continuare a ipotizzare. Nel frattempo, provando ad aprire il pannello `◇ DEBUG` di `FitnessEngineView.tsx` (la schermata "AI ENGINE" usata per testare i singoli analyzer), l'app crashava con `Can't find variable: INK_2` — colore definito in `constants/theme.js` ma mai importato nel file, usato solo nello sfondo del pannello debug (motivo per cui l'errore scattava solo premendo quel pulsante). Fix in [`e8c22df`](https://github.com/Mikweb2025-design/operator40/commit/e8c22df).

Una volta riparato il pannello debug, l'utente ha usato la funzione **`◯ REC landmarks`** già presente nell'app (registra i 33 landmark grezzi per replay offline, nessun video) e mi ha passato il file `landmarks-squat-*.json` di una sessione reale. Ho fatto il replay di quei 1200 frame attraverso `SquatAnalyzer` fuori dall'app (script Node/vitest), loggando ogni transizione di fase:

**Trovato il bug root di tutta la giornata**: nei primi ~200ms di registrazione, l'utente è molto vicino alla camera (hipY ≈ 0.82, framing ravvicinato) — questo fa scattare l'OR-condition su `hipY` in `squat.ts` e produce un ciclo completo `READY→DESCENDING→BOTTOM→ASCENDING→STANDING` **senza che il ginocchio si pieghi quasi per niente** (175°→173°). La rep, giustamente, non supera la soglia di confidenza (23.8 < 62) e non viene contata. Ma da quel momento **`phase` resta bloccato su `STANDING` per il resto della sessione**: nessuna delle condizioni in `squat.ts` gestisce `this.phase==='STANDING'` come stato di partenza — è un vicolo cieco. Il reset a `READY` (e di `trough`/`peak`) avveniva **solo** dentro il ramo "rep contata con successo", mai nel ramo "rep tentata ma non abbastanza sicura". Un solo colpo a vuoto — anche solo dovuto a un aggiustamento della posizione a inizio sessione — disattiva il conteggio per sempre, anche se dopo fai squat perfetti.

Lo stesso identico schema (stato terminale con nome diverso da READY, reset solo sul successo) era presente in **7 analyzer**: `squat` (STANDING), `pushup` (TOP), `crunch` (EXTENDED), `legRaise` (DOWN), `vUp` (EXTENDED), `ponte` (DOWN), `affondo` (STANDING). `burpee.ts` aveva già un fallback a timeout per lo stesso rischio (introdotto nei loop di rifinitura precedenti) — non era mai stato esteso agli altri.

**Fix**: in tutti e 7, al termine di un ciclo completo si torna sempre a `READY` (e si azzerano `trough`/`peak`), indipendentemente dal fatto che la rep abbia superato o meno la soglia di confidenza.

**Verifica con dati reali**: rieseguendo lo stesso file `landmarks-squat-*.json` attraverso l'analyzer corretto → **0 rep prima del fix, 7 rep dopo**, sugli stessi identici dati. Aggiunto anche un test di regressione permanente in `analyzers.test.ts` (simula un colpo a vuoto seguito da uno squat pulito, verifica che il secondo venga comunque contato).

Commit: [`e8c22df`](https://github.com/Mikweb2025-design/operator40/commit/e8c22df) (fix DEBUG panel) + [`9f76c3a`](https://github.com/Mikweb2025-design/operator40/commit/9f76c3a) (fix root) su `main`, [`1102460`](https://github.com/Mikweb2025-design/operator40/commit/1102460) + [`3033715`](https://github.com/Mikweb2025-design/operator40/commit/3033715) su `deploy-tmp` (dist finale `o40-v3ac04ba5`). 25/25 test, build, verify OK. **Serve un nuovo sync SSH** verso `3033715`.

### Lezione per il prossimo giro
Il replay offline via `LandmarkRecorder` (`◯ REC landmarks` → `↓ JSON`) è enormemente più efficace del guardare screen recording o ipotizzare sui log — con dati reali si trova in minuti quello che altrimenti richiede ore di tentativi. Vale la pena chiedere subito un file `landmarks-*.json` quando si segnala un problema di tracciamento, invece di partire da screenshot o descrizioni.
