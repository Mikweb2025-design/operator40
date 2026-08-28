# Offline WASM bundle — Operator 40

This folder is gitignored except for this README.

To make pose tracking work fully offline (PWA installed, no internet), bundle the MediaPipe Tasks Vision WASM + model locally:

```bash
npm run fetch:mediapipe
# or manually:
# copy node_modules/@mediapipe/tasks-vision/wasm/* → public/wasm/
# download pose_landmarker_lite.task → public/models/
```

`PoseLandmarkerManager` tries CDN first, then falls back to `./wasm` / `./models`.
`sw.js` precaches `./wasm/*` and `./models/*` if present (via `Promise.allSettled` — never blocks install).
