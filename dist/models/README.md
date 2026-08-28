# Offline model — Operator 40

Place `pose_landmarker_lite.task` (and optionally `pose_landmarker_heavy.task`) here.

```bash
npm run fetch:mediapipe
curl -L https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task -o public/models/pose_landmarker_lite.task
# heavy (better accuracy on modern iPhone, heavier):
curl -L https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_heavy/float16/1/pose_landmarker_heavy.task -o public/models/pose_landmarker_heavy.task
```

Both are gitignored (large binaries). `npm run build` will copy whatever is in `public/` to `dist/`.
