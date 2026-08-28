# Operator40 — Roadmap prossimi giorni

> v2.11.0 · 28 Agosto 2026 · 10 loop grafica OLED completati
> Live: https://mikweb.eu/operator40/ · Repo: Mikweb2025-design/operator40

---

## ✅ Appena fatto (v2.11.0 — 10 GIR LOOP GRAFICA)

**Tema grafico OLED 10 loop** — zero logica toccata, 103 test verdi:
1. **OLED depth** — INK #0E100D vignette + phone gradient 130%
2. **Card system** — o40-card unified 165° + hairline + gloss
3. **Tipografia** — Bebas/Inter sharpened + num-glow halo BLAZE
4. **CTA** — BLAZE_LIGHT→DEEP + inset highlight + press 0.97
5. **Nav OLED** — blur 14px, pill 46×28 con glow
6. **HUD tactical** — 4 angoli + AI scanline 0.62
7. **Micro** — stagger 20/60/100ms, ticker 28s
8. **Skeleton** — shimmer 1.4s, loadbar 5px
9. **Lift** — hover -3px, aura 28s
10. **Cohesion** — grid 0.42, camo 5px, tokens INK_3/PAPER_SOFT/OLIVE_LIGHT

+ bump 2.10.0→2.11.0, ChangelogModal 5 gruppi IT/EN/DE, banner o40_release_2.11.0

---

## 📋 Prossimi giorni — priorità

### Giorno 1-2 — Stabilità & QA (v2.11.1)
- [ ] Test su iPhone 14/15: front vs side-view, lite vs heavy FPS benchmark (documentare `auto` heuristic)
- [ ] Tune soglie analyzer su 5 esercizi più instabili (squat, pushup, burpee, legRaise, russianTwist) con `landmarks.json` replay
- [ ] Aggiungi fixtures `tests/fixtures/landmarks-*.json` per CI (almeno 3 per esercizio top-6)
- [ ] `verify.mjs` + `eslint --fix` su `src/ai/` (pulizia dead imports)
- [ ] Screenshots Playwright `docs/screenshots/06-ai-debug.png` + rigenerare 01-05 a 390×844@2x

### Giorno 3-4 — UX & Accessibilità (v2.12.0)
- [ ] Wire `MotionFusion` a Capacitor `Motion` plugin (opt-in setting) — boost jumpingJack/highKnees/burpee
- [ ] A11y: focus ring visibile su tutti i button, `aria-live` su rep counter, `prefers-reduced-motion` audit completo
- [ ] LargeText mode: fix overflow su Home `DogTag` + Library card (test 18px base)
- [ ] Search Library: debounce 180ms + highlight match + empty state illustrato
- [ ] Before/After slider: pinch-zoom + haptics su confronto

### Giorno 5-6 — Contenuti & Dati (v2.12.1)
- [ ] Apple Health: importa anche HR + sleep se presenti in export.xml (oggi solo weight/workout)
- [ ] Export CSV: aggiungi colonna `aiQuality overall` + `reps per exercise`
- [ ] Stampa programma: `window.print` stylesheet per scheda allenamento A4
- [ ] 18 clip review: sostituisci 3 WebP placeholder con MP4 locali ottimizzati (2.0 MB target)
- [ ] NEFFEX playlist: shuffle seed + crossfade 1.2s

### Giorno 7 — Growth & PWA (v2.13.0)
- [ ] Push cron: A/B test orario 08:00 vs 09:00 Europe/Rome (misura open rate)
- [ ] Onboarding tour: 3 step con `localStorage o40_seenTour` + skip + progress dots
- [ ] PWA install banner: trigger dopo 2 sessioni, non su prima visita
- [ ] Share stats image 1080×1350: aggiungi QR `mikweb.eu/operator40`
- [ ] Deploy full: `npm run build && npx cap sync && deploy --remote` + test su mikweb.eu + iOS TestFlight

---

## 🔮 Backlog (settimana 2+)

- [ ] **Camp 2.0** — giorno libero programmato ogni 7 (active recovery) + deload week 4
- [ ] **Coach vocale 2.0** — TTS on-device per cue esercizio (es: “schiena dritta”, “ginocchio 90°”) da formScore <60
- [ ] **Watch** — sync Huawei / Apple Watch HR live durante sessione (branch `operator40-Watch`)
- [ ] **TEMPO mode** — metronomo 40-60 BPM per esecuzione controllata (ROM/velocity feedback)
- [ ] **Social** — sfida settimanale amici (codice invito, classifica kcal, no backend — link share + local compare)
- [ ] **Offline models** — bundle `pose_landmarker_lite.task` in `public/models/` per primo avvio senza rete
- [ ] **Electron Mac** — menu bar app (Capacitor @capacitor-community/electron già in package.json)

---

## 🛠 Tecnica

- Build deterministico: `vite.config.js` → `__APP_VERSION__` = `pkg.version · git short` → `sw.js o40-v<hash>`
- Branch: `main` (source) + `deploy-tmp` (dist per hosting) — `deploy.mjs --remote` fa checkout, add -f dist, push -f
- Test: `npm run verify && npm run test` (103 test) + `scripts/screenshots.mjs` con preview :4173
- Storage: `idb operator40/kv` v2 + `Capacitor Preferences` native, `BACKUP_VERSION=2`

---

*Aggiornato manualmente — prossimo bump: v2.11.1 o v2.12.0 a seconda del batch.*
