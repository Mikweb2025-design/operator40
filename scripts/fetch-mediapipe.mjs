#!/usr/bin/env node
// Operator 40 — fetch MediaPipe WASM + model for fully offline PWA
// Usage: npm run fetch:mediapipe  (or node scripts/fetch-mediapipe.mjs)
// Copies wasm from node_modules and downloads lite+heavy models.

import { mkdirSync, cpSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

const wasmSrc = 'node_modules/@mediapipe/tasks-vision/wasm';
const wasmDst = 'public/wasm';
const modelsDst = 'public/models';

mkdirSync(wasmDst, { recursive: true });
mkdirSync(modelsDst, { recursive: true });

if (existsSync(wasmSrc)) {
  try {
    cpSync(wasmSrc, wasmDst, { recursive: true, force: true });
    console.log(`[fetch:mediapipe] wasm copied: ${wasmSrc} → ${wasmDst} (${readdirSync(wasmDst).length} files)`);
  } catch (e) { console.warn('[fetch:mediapipe] wasm copy failed:', e.message); }
} else {
  console.warn('[fetch:mediapipe] wasm source not found — run npm install first');
}

const models = [
  { url: 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task', dst: join(modelsDst, 'pose_landmarker_lite.task') },
  { url: 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_heavy/float16/1/pose_landmarker_heavy.task', dst: join(modelsDst, 'pose_landmarker_heavy.task') },
];

for (const { url, dst } of models) {
  if (existsSync(dst)) { console.log(`[fetch:mediapipe] skip exists: ${dst}`); continue; }
  try {
    console.log(`[fetch:mediapipe] downloading ${url} → ${dst}`);
    execSync(`curl -L --fail -o "${dst}" "${url}"`, { stdio: 'inherit' });
    console.log(`[fetch:mediapipe] saved ${dst}`);
  } catch (e) { console.warn(`[fetch:mediapipe] download failed for ${url}:`, e.message); }
}
console.log('[fetch:mediapipe] done — verify with ls -lh public/wasm public/models');
