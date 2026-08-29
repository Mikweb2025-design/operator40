import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { get, set, remove, clear } from './storage.js';
import { ErrorBoundary } from './components/ErrorBoundary.jsx';

// NB: no StrictMode — its dev-only double-effect invocation would fire
// the countdown/beep side effects twice on this timer-heavy app.

// Expose the storage bridge the app expects (Capacitor on iOS,
// localStorage on web/macOS).
window.storage = { get, set, remove, clear };

// PWA install prompt capture
window.__o40DeferPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.__o40DeferPrompt = e;
  window.dispatchEvent(new CustomEvent('o40:installReady'));
});

// Global chunk-load guard: "Importing a module script failed" after PWA deploy → auto-reload once
(function setupChunkErrorGuard(){
  let retried = false;
  function isChunkErr(msg){
    const s = String(msg||'').toLowerCase();
    return s.includes('importing a module script failed') || s.includes('failed to fetch dynamically imported module') || s.includes('loading chunk') || s.includes('chunkloaderror');
  }
  function tryReload(reason){
    if (retried) return;
    try {
      const key = 'o40_chunk_global_retry';
      const last = Number(sessionStorage.getItem(key)||0);
      if (Date.now() - last < 8000) return;
      sessionStorage.setItem(key, String(Date.now()));
    } catch {}
    retried = true;
    console.warn('[o40] chunk load failed → reload', reason);
    setTimeout(()=> window.location.reload(), 700);
  }
  window.addEventListener('error', (e)=>{
    const msg = e?.message || e?.error?.message || '';
    if (isChunkErr(msg) || isChunkErr(e?.error)) tryReload(msg);
  }, true);
  window.addEventListener('unhandledrejection', (e)=>{
    const msg = e?.reason?.message || String(e?.reason||'');
    if (isChunkErr(msg)) tryReload(msg);
  });
})();

// Register the PWA service worker (offline-first + Chrome installability) and
// keep an installed PWA current: check for updates on load/foreground and, when
// a newer build's service worker takes control, reload to the fresh version.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    let refreshing = false;

    const checkUpdate = () => {
      navigator.serviceWorker
        .getRegistration()
        .then((reg) => reg && reg.update())
        .catch(() => {});
    };

    navigator.serviceWorker
      .register('./sw.js')
      .then(() => {
        checkUpdate();
        window.addEventListener('focus', checkUpdate);
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') checkUpdate();
        });
      })
      .catch(() => {});

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      if (window.__o40Busy) {
        // never reload mid-workout
        window.__o40ReloadAfter = true;
        return;
      }
      refreshing = true;
      window.location.reload();
    });
  });
}

const root = createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
