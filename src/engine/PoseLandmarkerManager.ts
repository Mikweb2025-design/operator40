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
const LITE_MODEL = 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task';
const HEAVY_MODEL = 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_heavy/float16/1/pose_landmarker_heavy.task';
const FULL_MODEL = 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task';
// For offline PWA: local copies in public/wasm + public/models (see scripts/fetch-mediapipe.mjs)
// Local first -> instant + offline, CDN fallback se file locali mancanti (es. installazione senza fetch:mediapipe)
const FALLBACK_WASM_BASES = [
  './wasm',
  DEFAULT_WASM_BASE,
];
function modelUrlsForVariant(variant: string): string[] {
  const localMap: Record<string, string> = {
    lite: './models/pose_landmarker_lite.task',
    heavy: './models/pose_landmarker_heavy.task',
    full: './models/pose_landmarker_full.task',
  };
  const cdnMap: Record<string, string> = { lite: LITE_MODEL, heavy: HEAVY_MODEL, full: FULL_MODEL };
  if (variant === 'auto') {
    // try heavy locally then CDN heavy, then lite fallback
    return [localMap.heavy, HEAVY_MODEL, localMap.lite, LITE_MODEL];
  }
  const v = variant as keyof typeof cdnMap;
  const cdn = cdnMap[v] ?? LITE_MODEL;
  const local = localMap[v] ?? localMap.lite;
  return [cdn, local];
}
const DEFAULT_MODEL = LITE_MODEL;

export class PoseLandmarkerManager {
  private landmarker: any | null = null;
  private fileset: any | null = null;
  private smoother: LandmarkSmoother | null = null;
  private worldSmoother: LandmarkSmoother | null = null;
  private ready = false;
  private delegate: 'GPU' | 'CPU' = 'GPU';

  constructor(
    private opts: LandmarkerOptions = {},
    private enableSmoothing = true
  ) {
    this.delegate = opts.delegate ?? 'GPU';
    // Fase 1 Tuning: OneEuro slightly higher cutoff for heavy model stability
    // lite 1.15/0.008, heavy needs tighter beta to avoid jitter with more precise landmarks
    const isHeavy = (opts.modelVariant === 'heavy' || opts.modelVariant === 'auto');
    const cutoff = isHeavy ? 1.05 : 1.15;
    const beta = isHeavy ? 0.006 : 0.008;
    if (enableSmoothing) {
      this.smoother = new LandmarkSmoother(33, cutoff, beta);
      this.worldSmoother = new LandmarkSmoother(33, cutoff, beta);
    }
  }
  setSmoothingTuning(minCutoff: number, beta: number): void {
    this.smoother?.setTuning(minCutoff, beta);
    this.worldSmoother?.setTuning(minCutoff, beta);
  }

  isReady(): boolean { return this.ready && !!this.landmarker; }

  private modelVariant: string = 'auto';

  async init(onProgress?: (msg: string) => void): Promise<void> {
    if (this.ready) return;
    let vision: MPVision;
    try {
      // Vite gestisce questo come chunk separato `vision` (siehe vite.config manualChunks).
      // Non usare @vite-ignore/webpackIgnore: serve il bundling per PWA offline + hash deterministico.
      vision = await import('@mediapipe/tasks-vision');
    } catch (e: any) {
      const msg = String(e?.message ?? e);
      // Chunk 404 dopo deploy PWA -> il guard globale in main.jsx fa reload, ma qui forniamo errore leggibile
      if (msg.includes('Failed to fetch') || msg.includes('module script failed') || msg.includes('ChunkLoadError') || msg.includes('dynamically imported')) {
        throw new Error(`AI module non caricato (aggiornamento in corso) — ricarica la pagina. Dettaglio: ${msg}`);
      }
      throw new Error(`Impossibile caricare AI (tasks-vision): ${msg}. Verifica connessione o ricarica.`);
    }
    const { PoseLandmarker, FilesetResolver } = vision as any;
    if (!PoseLandmarker || !FilesetResolver) throw new Error('tasks-vision incompleto: PoseLandmarker/FilesetResolver mancanti');

    // Fase 1: auto-heuristic improved — heavy if deviceMemory>=4 && not low-end iPhone && not low battery
    // Defaults to 'auto' for best accuracy/performance tradeoff
    const requested = (this.opts as any).modelVariant ?? 'auto';
    if (requested === 'auto') {
      try {
        const mem = (navigator as any).deviceMemory ?? 4;
        const ua = navigator.userAgent ?? '';
        const isOldIOS = /iPhone OS 1[0-4]_/.test(ua);
        const cores = navigator.hardwareConcurrency ?? 4;
        // heavy only on modern devices (4GB+ RAM, 4+ cores, not old iOS)
        this.modelVariant = (mem >= 4 && cores >= 4 && !isOldIOS) ? 'heavy' : 'lite';
        // Override via localStorage for testing: o40_modelVariant
        try {
          const override = localStorage.getItem('o40_modelVariant');
          if (override === 'lite' || override === 'heavy' || override === 'full') this.modelVariant = override;
        } catch {}
      } catch { this.modelVariant = 'lite'; }
    } else {
      this.modelVariant = requested;
    }

    let lastErr: any = null;
    // Try wasm bases (local first, CDN fallback)
    for (const wasmBase of FALLBACK_WASM_BASES) {
      try {
        onProgress?.(`wasm:${wasmBase}`);
        this.fileset = await FilesetResolver.forVisionTasks(wasmBase);
        break;
      } catch (e) { lastErr = e; onProgress?.(`wasm fail:${wasmBase}`); }
    }
    if (!this.fileset) {
      const hint = String(lastErr ?? '').includes('404') ? ' (file wasm mancanti: esegui npm run fetch:mediapipe e ricompila)' : '';
      throw new Error(`WASM non caricato${hint}: ${String(lastErr)}`);
    }

    const candidateModels = modelUrlsForVariant(this.modelVariant);
    // Try model paths with GPU then CPU fallback, with heavy->lite fallback on failure
    for (const delegate of [this.delegate, 'CPU' as const]) {
      for (const modelPath of candidateModels) {
        try {
          onProgress?.(`model:${delegate}:${modelPath}`);
          const t0 = performance.now();
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
          // Heavy model performance guard: if init >4s, will auto-throttle fps in FitnessEngine
          const dt = performance.now() - t0;
          if (dt > 3800) onProgress?.('heavy_slow');
          return;
        } catch (e) { lastErr = e; onProgress?.(`model fail:${delegate}:${modelPath}`); }
      }
    }
    // Messaggio finale più utile per UI
    const isNetworkErr = String(lastErr ?? '').toLowerCase().includes('fetch') || String(lastErr ?? '').includes('404') || String(lastErr ?? '').includes('network');
    const hint = isNetworkErr ? ' — verifica connessione o usa modello locale (npm run fetch:mediapipe)' : '';
    throw new Error(`PoseLandmarker non inizializzato${hint}: ${String(lastErr)}`);
  }

  /** Detect for video element at given timestamp (performance.now). Returns smoothed landmarks + worldLandmarks. */
  detect(video: HTMLVideoElement, timestampMs: number): PoseResult {
    if (!this.landmarker || !this.ready) {
      return { landmarks: null, timestampMs, visibilityScore: 0 };
    }
    try {
      const result = this.landmarker.detectForVideo(video, timestampMs);
      const raw: PoseLandmarks | null = result?.landmarks?.[0] ?? null;
      const worldRaw: PoseLandmarks | null = result?.worldLandmarks?.[0] ?? null;
      if (!raw) return { landmarks: null, worldLandmarks: worldRaw, timestampMs, visibilityScore: 0 };

      let lm: PoseLandmarks = raw;
      let world: PoseLandmarks | null = worldRaw;
      if (this.enableSmoothing && this.smoother) {
        lm = this.smoother.smooth(raw, timestampMs);
        if (worldRaw && this.worldSmoother) {
          world = this.worldSmoother.smooth(worldRaw, timestampMs);
        }
      }
      // visibility of key joints — Fase 1: include world depth confidence
      const vis = visibilityScore(lm, [11, 12, 23, 24, 25, 26, 13, 14, 15, 16]);
      return { landmarks: lm, worldLandmarks: world, timestampMs, visibilityScore: vis };
    } catch {
      return { landmarks: null, timestampMs, visibilityScore: 0 };
    }
  }

  getModelVariant(): string { return this.modelVariant; }
  getDelegate(): string { return this.delegate; }

  resetSmoother(): void { this.smoother?.reset(); this.worldSmoother?.reset(); }

  close(): void {
    try { this.landmarker?.close?.(); } catch {}
    this.landmarker = null;
    this.fileset = null;
    this.ready = false;
  }
}
