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

// Register the PWA service worker (offline-first + Chrome installability) and
// keep an installed PWA current: check for updates on load/foreground and, when
// a newer build's service worker takes control, reload to the fresh version.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    let refreshing = false;

    const checkUpdate = () => {
      navigator.serviceWorker.getRegistration()
        .then((reg) => reg && reg.update())
        .catch(() => {});
    };

    navigator.serviceWorker.register('./sw.js')
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
      if (window.__o40Busy) {          // never reload mid-workout
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