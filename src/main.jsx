import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { get, set } from './storage.js';

// NB: no StrictMode — its dev-only double-effect invocation would fire
// the countdown/beep side effects twice on this timer-heavy app.

// Expose the storage bridge the app expects (Capacitor on iOS,
// localStorage on web/macOS).
window.storage = { get, set };

const root = createRoot(document.getElementById('root'));
root.render(<App />);