// Post-build step: version the service worker cache key so every content
// change produces a byte-different sw.js (browsers then detect an update,
// install it, and the app reloads to the new version). Runs after `vite build`.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

const assets = ['dist/index.html', ...readdirSync('dist/assets').map(f => `dist/assets/${f}`)];
const h = createHash('sha1');
for (const f of assets) {
  try { h.update(readFileSync(f)); } catch { h.update(f); }
}
const version = h.digest('hex').slice(0, 8);

const swPath = 'dist/sw.js';
mkdirSync('dist', { recursive: true });
let sw = readFileSync(swPath, 'utf8');
// Supporta sia __VERSION__ (prima build) che o40-vXXXXXXXX (build successive se public/sw.js non viene ricopiato)
if (sw.includes('__VERSION__')) {
  sw = sw.replace('__VERSION__', version);
} else {
  sw = sw.replace(/o40-v[0-9a-f]{8}/, `o40-v${version}`);
}
writeFileSync(swPath, sw);
console.log(`[sw] cache versioned: o40-v${version}`);