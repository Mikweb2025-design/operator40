# Operator 40

App fitness "Operator 40" (React + Vite + Capacitor). Funziona su **Mac** (web/PWA), **iOS** (nativo) e browser.

## Avvio rapido (Mac)

```bash
npm install
npm run dev        # dev server su http://localhost:5173
npm run build      # build di produzione in dist/
npm run preview    # server della build di produzione
```

### Installazione come PWA (Mac/iOS Safari)
1. Avvia `npm run preview` (o `npm run dev`) e apri la pagina.
2. Mac (Safari/Chrome): pulsante di installazione nella barra, oppure menu → Aggiungi al Dock / Installa.
3. iPhone/iPad: apri `http://192.168.1.84:4173` (IP locale) → Condividi → Aggiungi a Home.

## iOS (nativo)

Prerequisiti (una tantum):
- Xcode con il componente **"iOS 26.5"** installato (Xcode → Settings → Components). Senza questo la compilazione fallisce con `iOS 26.5 Platform Not Installed`.
- CocoaPods (installabile con `brew install cocoapods`).

```bash
npx cap add ios       # crea ios/App (già fatto)
npx cap sync          # copia la build web + pod install
npx cap open ios      # apre Xcode; seleziona il tuo iPhone e premi Run
```

Dopo un cambio del codice web: `npm run build && npx cap sync`.

## Struttura
- `src/App.jsx` — app completa (collegamenti audio iOS, date locali, safe-area, 100dvh).
- `src/media.js` — clip WebP base64, caricati **lazy** (chunk separato ~1,7 MB) per tenere piccolo il bundle iniziale.
- `src/storage.js` — adattatore storage: Capacitor Preferences (nativo) / localStorage (web).
- `public/manifest.webmanifest` + `public/icons/` — PWA installabile.