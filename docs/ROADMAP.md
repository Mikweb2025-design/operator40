# Operator40 — Roadmap prossimi giorni

> v2.14.1 · 28 Agosto 2026 · 40 iterazioni + Statistiche premium + Camp 2.0 + TEMPO + Coach 2.0
> Live: https://mikweb.eu/operator40/ · Repo: Mikweb2025-design/operator40

---

## ✅ Appena fatto (v2.14.1 — 40 ITERAZIONI)

**Grafica 40 iterazioni** — 101 test verdi, 23 loop OLED + 17 roadmap:
- 1-10 OLED (ink #0E100D, card 165°, typo, CTA blaze, nav, HUD, micro, skeleton, aura, tokens)
- 11-13 extra hero/card/micro + white-screen fix BLAZE_LIGHT (v2.11.1)
- 14-23 full-app: color #0B0D0A, card radius16 selected, typo, icon halo, nav safe-area, hero filter, HUD timer, viz tooltip, forms focus 3px, cohesion
- 24-34 onboarding 3-step + clip alias 22/22 + HR + NEFFEX + PWA + IMU + BeforeAfter (v2.12.1-v2.13.0)
- 35-40 Camp 2.0 (recovery/deload) + TEMPO + Coach 2.0 + Statistiche premium (DogTag accent + PR glass + Bar gradient + heatmap/calendar) (v2.14.0-v2.14.1)

+ bump 2.10.0→2.14.1, Changelog 10 gruppi, banner 40 iterazioni, deploy o40-v1d399171, HistoryScreen 110k

---

## 📋 Prossimi giorni — priorità

### Giorno 1-2 — Stabilità & QA (v2.14.2) — ✅ FATTO 29 Ago
- [x] Test su iPhone 14/15: front vs side-view, lite vs heavy FPS benchmark (documentato `auto` heuristic in `docs/BENCHMARK.md`)
- [x] Tune soglie analyzer su 5 esercizi più instabili (squat, pushup, burpee, legRaise, russianTwist) con `landmarks.json` replay — vedi `docs/BENCHMARK.md` tuning + `TemporalClassifier` defaults
- [x] Aggiungi fixtures `tests/fixtures/landmarks-*.json` per CI (almeno 3 per esercizio top-6) — 32 fixtures (era 23) + 119 test verdi
- [x] `verify.mjs` + `eslint --fix` su `src/ai/` (pulizia dead imports) — `verify OK`, eslint 8.57.1 su `src` (TS via tsc skipLibCheck)
- [ ] Screenshots Playwright `docs/screenshots/06-ai-debug.png` + rigenerare 01-05 a 390×844@2x — next

### Giorno 3-4 — UX & Accessibilità (v2.12.3) — ✅ FATTO 28 Ago
- [x] A11y: focus ring `2px BLAZE + 4px glow` su button/input + `aria-live` rep counter + `prefers-reduced-motion` + `@media print`
- [x] LargeText mode: fix overflow `DogTag` minHeight 84 + wordBreak + `Library` highlight
- [x] Search Library: debounce 180ms + highlight `<mark BLAZE33>` + empty state illustrato 🔍 + reset filtri
- [x] Export CSV: colonne `ai_quality` + `ai_reps` per exercise
- [x] Share QR: placeholder 72px in `shareImage.js` + footer `mikweb.eu/operator40`
- [x] Wire `MotionFusion` opt-in (IMU) — toggle Impostazioni + `enableMotionFusion` in FitnessEngine (v2.12.2)
- [x] Before/After slider: pinch-zoom 1-3× + wheel + double-tap + haptics (v2.12.2)
- [x] Apple Health HR avg last 20 + toast HR bpm (v2.12.3)
- [x] NEFFEX crossfade 1.2s + shuffle seed giornaliero (v2.12.3)
- [x] PWA install banner dopo 2 sessioni + dismissed flag (v2.12.3)

### Giorno 5-6 — Contenuti & Dati (v2.13.0) — ✅ FATTO 28 Ago
- [x] Onboarding tour 3 step con dots + Avanti/Salta/Inizia + tourStep state (v2.13.0)
- [x] Clip alias: plank→wallsit, jumpingjack→burpee, mountain→skater, affondo→squat (22/22 con video) (v2.13.0)
- [x] Offline models check + hasClip fallback polish (v2.13.0)
- [ ] 18 clip review: sostituisci 3 WebP placeholder con MP4 locali ottimizzati (2.0 MB target) — alias già copre 22/22

### Giorno 7 — Growth & PWA (v2.13.0) — ✅ FATTO parziale 28 Ago
- [x] PWA install banner: trigger dopo 2 sessioni, non su prima visita (v2.12.3 + v2.13.0)
- [x] Share stats image 1080×1350: aggiungi QR `mikweb.eu/operator40` (v2.12.1)
- [x] Onboarding tour: 3 step con `localStorage o40_seenTour` + skip + progress dots (v2.13.0)
- [x] Deploy full: `npm run build && npx cap sync && deploy --remote` + test su mikweb.eu (v2.13.0)
- [ ] Push cron: A/B test orario 08:00 vs 09:00 Europe/Rome (misura open rate) — next

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

*Aggiornato 29 Ago 2026 — v2.14.2 QA · 32 fixtures + 5 analyzer tuned + BENCHMARK.md — prossimo: v2.15 Social sfida + Watch HR + Offline lite.task*
