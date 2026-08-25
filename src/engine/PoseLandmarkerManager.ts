/**
 * Operator40 — PoseLandmarkerManager
 * Wraps @mediapipe/tasks-vision PoseLandmarker for Safari/iOS PWA + Android.
 * - GPU delegate with CPU fallback
 * - Fully client-side, no video uploads
 * - Handles wasm fileset loading with offline cache hint
 * - Single pose, VIDEO mode, low-latency
 */
import type { LandmarkerOptions, PoseResult } from './types';
import type { PoseLandmarks } from './types';
import { visibilityScore } from './math';
import { LandmarkSmoother } from './filters/LandmarkSmoother';

type MPVision = typeof import('@mediapipe/tasks-vision');

const DEFAULT_WASM_BASE = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm';
const DEFAULT_MODEL = 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task';
// For offline PWA, also try local copy if CDN fails (add to public/ if you want fully offline)
const FALLBACK_WASM_BASES = [
  DEFAULT_WASM_BASE,
  './wasm', // if you bundle wasm locally
];
const FALLBACK_MODELS = [
  DEFAULT_MODEL,
  './models/pose_landmarker_lite.task',
];

export class PoseLandmarkerManager {
  private landmarker: any | null = null;
  private fileset: any | null = null;
  private smoother: LandmarkSmoother | null = null;
  private ready = false;
  private delegate: 'GPU' | 'CPU' = 'GPU';

  constructor(
    private opts: LandmarkerOptions = {},
    private enableSmoothing = true
  ) {
    this.delegate = opts.delegate ?? 'GPU';
    // For over-40 partial ROM at 25-30 FPS, a slightly higher cutoff (1.15) keeps motion responsive
    // while beta 0.008 compensates derivative drift on shaky iPhone handheld camera.
    if (enableSmoothing) this.smoother = new LandmarkSmoother(33, 1.15, 0.008);
  }
  setSmoothingTuning(minCutoff: number, beta: number): void {
    this.smoother?.setTuning(minCutoff, beta);
  }

  isReady(): boolean { return this.ready && !!this.landmarker; }

  async init(onProgress?: (msg: string) => void): Promise<void> {
    if (this.ready) return;
    const vision: MPVision = await import('@mediapipe/tasks-vision');
    const { PoseLandmarker, FilesetResolver } = vision as any;

    let lastErr: any = null;
    // Try wasm bases
    for (const wasmBase of FALLBACK_WASM_BASES) {
      try {
        onProgress?.(`wasm:${wasmBase}`);
        this.fileset = await FilesetResolver.forVisionTasks(wasmBase);
        break;
      } catch (e) { lastErr = e; }
    }
    if (!this.fileset) throw new Error(`Fileset failed: ${String(lastErr)}`);

    // Try model paths with GPU then CPU fallback
    for (const delegate of [this.delegate, 'CPU' as const]) {
      for (const modelPath of FALLBACK_MODELS) {
        try {
          onProgress?.(`model:${delegate}:${modelPath}`);
          this.landmarker = await PoseLandmarker.createFromOptions(this.fileset, {
            baseOptions: { modelAssetPath: modelPath, delegate },
            runningMode: 'VIDEO',
            numPoses: this.opts.numPoses ?? 1,
            minPoseDetectionConfidence: this.opts.minPoseDetectionConfidence ?? 0.45,
            minPosePresenceConfidence: this.opts.minPosePresenceConfidence ?? 0.45,
            minTrackingConfidence: this.opts.minTrackingConfidence ?? 0.5,
            outputSegmentationMasks: false,
          });
          this.delegate = delegate;
          this.ready = true;
          return;
        } catch (e) { lastErr = e; }
      }
    }
    throw new Error(`PoseLandmarker init failed: ${String(lastErr)}`);
  }

  /** Detect for video element at given timestamp (performance.now). Returns smoothed landmarks. */
  detect(video: HTMLVideoElement, timestampMs: number): PoseResult {
    if (!this.landmarker || !this.ready) {
      return { landmarks: null, timestampMs, visibilityScore: 0 };
    }
    try {
      const result = this.landmarker.detectForVideo(video, timestampMs);
      const raw: PoseLandmarks | null = result?.landmarks?.[0] ?? null;
      const world: PoseLandmarks | null = result?.worldLandmarks?.[0] ?? null;
      if (!raw) return { landmarks: null, worldLandmarks: world, timestampMs, visibilityScore: 0 };

      let lm: PoseLandmarks = raw;
      if (this.enableSmoothing && this.smoother) {
        lm = this.smoother.smooth(raw, timestampMs);
      }
      // visibility of key joints
      const vis = visibilityScore(lm, [11, 12, 23, 24, 25, 26, 13, 14, 15, 16]);
      return { landmarks: lm, worldLandmarks: world, timestampMs, visibilityScore: vis };
    } catch {
      return { landmarks: null, timestampMs, visibilityScore: 0 };
    }
  }

  resetSmoother(): void { this.smoother?.reset(); }

  close(): void {
    try { this.landmarker?.close?.(); } catch {}
    this.landmarker = null;
    this.fileset = null;
    this.ready = false;
  }
}
