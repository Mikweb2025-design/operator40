/**
 * Operator40 — FitnessEngine
 * Core loop: rAF + throttled MediaPipe inference → angles → velocity/direction → hysteresis FSM → rep + timer + quality 0..100 + cues
 * Optimized for low CPU/battery on Safari iOS & Android PWA (targetFps throttle, early exits, OneEuro smoothing).
 */
import type { EngineConfig, EngineMetrics, EnginePhase, FormMetrics, PoseLandmarks, PoseResult, RepEvent } from './types';
import { HysteresisStateMachine } from './stateMachine';
import { getDefinition, normalizeExerciseId } from './exercises/definitions';
import { PoseLandmarkerManager } from './PoseLandmarkerManager';
import { getAnalyzer } from '../ai/exercises/ExerciseRegistry';
import { evaluatePoseQuality } from '../ai/pose/PoseQuality';
import type { ExerciseAnalyzer } from '../ai/exercises/ExerciseAnalyzer';
import { MotionFusion } from '../ai/motion/MotionFusion';
import { LM, angleFromLandmarks, bilateralAngle, clamp } from './math';

export class FitnessEngine {
  private cfg: EngineConfig;
  private def: ReturnType<typeof getDefinition>;
  private analyzer: ExerciseAnalyzer | null = null;
  private sm: HysteresisStateMachine;
  private landmarker: PoseLandmarkerManager;
  private motionFusion: MotionFusion | null = null;

  // runtime
  private video: HTMLVideoElement | null = null;
  private running = false;
  private rafId: number | null = null;
  private lastInferenceAt = 0;
  private lastAngle = 180;
  private lastTs = 0;
  private velocity = 0;
  private velocityFiltered = 0;
  private lastRepAt = 0;
  private reps = 0;
  private startedAt: number | null = null; // motion start (first down)
  private elapsedActiveMs = 0;
  private lastTickAt = 0;
  private qualityWindow: number[] = [];
  private avgQuality = 0;
  private lastRepQuality: number | null = null;
  private lastRepConfidence: number | null = null;
  private repQualityHistory: number[] = [];
  private repDurationsMs: number[] = [];
  private currentPhase: EnginePhase = 'idle';
  private currentForm: FormMetrics | null = null;
  private troughInRep = 180;
  private peakInRep = 0;
  private fpsEma = 0;
  private frameCount = 0;
  private onRep: EngineConfig['onRep'];
  private onPhaseChange: EngineConfig['onPhaseChange'];
  private onMetrics: EngineConfig['onMetrics'];
  private angleHistory: Array<{ angle: number; ts: number }> = [];

  constructor(cfg: EngineConfig) {
    const nid = normalizeExerciseId(cfg.exerciseId) as any;
    const def = getDefinition(nid);
    if (!def) throw new Error(`Unknown exercise: ${cfg.exerciseId}`);
    this.cfg = { targetFps: 30, enableFiltering: true, ...cfg, exerciseId: nid as any };
    this.def = def;
    this.analyzer = getAnalyzer(nid as any);
    const thresholds = { ...def.thresholds, ...(cfg.thresholdsOverride ?? {}) };
    this.sm = new HysteresisStateMachine(thresholds);
    // Fase 1: auto model variant — heavy on capable devices, lite fallback
    const landmarkerOpts: any = { modelVariant: 'auto' };
    // allow override via cfg.thresholdsOverride?.modelVariant or localStorage already handled in manager
    this.landmarker = new PoseLandmarkerManager(landmarkerOpts, cfg.enableFiltering !== false);
    // Fase 1: refined smoother tuning per exercise — hold stable, dynamic permissive, strength balanced
    if (def.isHold) this.landmarker.setSmoothingTuning(0.85, 0.005);
    else if (['mountainclimber', 'jumpingjack', 'burpee', 'ginocchiaalte', 'skater'].includes(def.id)) this.landmarker.setSmoothingTuning(1.25, 0.010);
    else if (['pushup', 'squat', 'affondo', 'ponte'].includes(def.id)) this.landmarker.setSmoothingTuning(1.05, 0.006);
    else this.landmarker.setSmoothingTuning(1.15, 0.008);
    this.onRep = cfg.onRep;
    this.onPhaseChange = cfg.onPhaseChange;
    this.onMetrics = cfg.onMetrics;
    // Fase 1: MotionFusion for jumpingJack/highKnees/burpee (secondary sensor) — opt-in via cfg.enableMotionFusion
    if (cfg.enableMotionFusion && ['jumpingjack', 'burpee', 'ginocchiaalte', 'mountainclimber', 'skater'].includes(def.id)) {
      this.motionFusion = new MotionFusion();
    }
  }

  private lastPoseQuality = 0;
  // Live repConfidence from the most recent analyzer frame, updated whether or not it
  // crossed the counting threshold — lets the UI explain "why didn't that rep count" instead
  // of only ever showing the confidence of reps that already succeeded.
  private liveRepConfidence = 0;

  get metrics(): EngineMetrics {
    const now = performance.now();
    const elapsedMs = this.startedAt ? now - this.startedAt : 0;
    return {
      reps: this.reps,
      elapsedMs,
      elapsedActiveMs: this.elapsedActiveMs,
      avgQuality: this.avgQuality,
      lastRepQuality: this.lastRepQuality,
      lastRepConfidence: this.lastRepConfidence,
      liveRepConfidence: Math.round(this.liveRepConfidence),
      repQualityHistory: this.repQualityHistory.slice(),
      repDurationsMs: this.repDurationsMs.slice(),
      currentPhase: this.currentPhase,
      currentForm: this.currentForm,
      fps: Math.round(this.fpsEma),
      poseQuality: Math.round(this.lastPoseQuality),
      trackingSupported: this.def?.trackingSupported !== false,
    };
  }

  private computePoseQuality(lm: PoseLandmarks | null, visibilityScore: number): number {
    if (!lm) return 0;
    const req = this.def?.requiredLandmarks ?? [11,12,23,24,25,26,27,28];
    let minVis = 1;
    let sumVis = 0;
    let n = 0;
    for (const idx of req) {
      const v = lm[idx]?.visibility ?? 0;
      sumVis += v; n++;
      minVis = Math.min(minVis, v);
    }
    const avgReq = n ? sumVis / n : visibilityScore;
    // composite: avg required 60% + overall visibility 20% + worst joint penalty 20%
    const quality = avgReq * 60 + visibilityScore * 20 + minVis * 20;
    // clamp 0-100
    return Math.max(0, Math.min(100, Math.round(quality * 100) / 100 * 100));
  }

  async init(video: HTMLVideoElement, onProgress?: (s: string) => void): Promise<void> {
    this.video = video;
    await this.landmarker.init(onProgress);
    // Fase 1: enable motion fusion after camera permission (requires user gesture already done)
    if (this.motionFusion) {
      try { this.motionFusion.enable(); } catch {}
    }
  }

  /** Attach a different video element (e.g. after remount) without re-init model. */
  attachVideo(video: HTMLVideoElement): void { this.video = video; }

  updateExercise(exerciseId: string): void {
    const nid = normalizeExerciseId(exerciseId) as any;
    const def = getDefinition(nid);
    if (!def) return;
    this.def = def;
    this.analyzer = getAnalyzer(nid as any);
    this.cfg.exerciseId = nid as any;
    const thresholds = { ...def.thresholds, ...(this.cfg.thresholdsOverride ?? {}) };
    this.sm = new HysteresisStateMachine(thresholds);
    this.resetCounters();
    // Fase 1: refined smoother tuning
    if (def.isHold) this.landmarker.setSmoothingTuning(0.85, 0.005);
    else if (['mountainclimber', 'jumpingjack', 'burpee', 'ginocchiaalte', 'skater'].includes(def.id)) this.landmarker.setSmoothingTuning(1.25, 0.010);
    else if (['pushup', 'squat', 'affondo', 'ponte'].includes(def.id)) this.landmarker.setSmoothingTuning(1.05, 0.006);
    else this.landmarker.setSmoothingTuning(1.15, 0.008);
    // Fase 1: update motion fusion for new exercise — respect opt-in
    if (this.cfg.enableMotionFusion && ['jumpingjack', 'burpee', 'ginocchiaalte', 'mountainclimber', 'skater'].includes(def.id)) {
      if (!this.motionFusion) this.motionFusion = new MotionFusion();
      try { this.motionFusion.enable(); } catch {}
    } else {
      try { this.motionFusion?.disable(); } catch {}
      if (!this.cfg.enableMotionFusion) this.motionFusion = null;
      else if (!['jumpingjack', 'burpee', 'ginocchiaalte', 'mountainclimber', 'skater'].includes(def.id)) this.motionFusion = null;
    }
  }

  updateConfig(patch: Partial<EngineConfig>): void {
    this.cfg = { ...this.cfg, ...patch };
    if (patch.thresholdsOverride) {
      this.sm.updateConfig(patch.thresholdsOverride);
    }
    if (patch.onRep !== undefined) this.onRep = patch.onRep;
    if (patch.onPhaseChange !== undefined) this.onPhaseChange = patch.onPhaseChange;
    if (patch.onMetrics !== undefined) this.onMetrics = patch.onMetrics;
  }

  private resetCounters(): void {
    this.reps = 0; this.startedAt = null; this.elapsedActiveMs = 0; this.lastRepAt = 0;
    this.qualityWindow = []; this.avgQuality = 0; this.lastRepQuality = null; this.lastRepConfidence = null;
    this.repQualityHistory = []; this.repDurationsMs = [];
    this.currentPhase = 'idle'; this.currentForm = null;
    this.troughInRep = 180; this.peakInRep = 0;
    this.sm.reset(); this.landmarker.resetSmoother();
    this.lastAngle = 180; this.velocity = 0; this.velocityFiltered = 0;
    this.angleHistory = [];
    this.calibSamples = []; this.calibDone = false;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastTickAt = performance.now();
    this.lastInferenceAt = 0;
    this.loop(performance.now());
  }

  stop(): void {
    this.running = false;
    if (this.rafId != null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }

  destroy(): void {
    this.stop();
    this.landmarker.close();
    try { this.motionFusion?.disable(); } catch {}
  }

  getMotionFusion(): MotionFusion | null { return this.motionFusion; }

  /** Expose latest PoseResult for overlay. Called via callback in loop. */
  private lastResult: PoseResult | null = null;
  getLastResult(): PoseResult | null { return this.lastResult; }

  // calibration for adaptive ROM
  private calibSamples: number[] = [];
  private calibDone = false;

  private bestSideAngle(lm: PoseLandmarks, left: [number, number, number], right: [number, number, number]): number {
    const al = angleFromLandmarks(lm, left[0], left[1], left[2]);
    const ar = angleFromLandmarks(lm, right[0], right[1], right[2]);
    const vl = Math.min(lm[left[0]]?.visibility ?? 0, lm[left[1]]?.visibility ?? 0, lm[left[2]]?.visibility ?? 0);
    const vr = Math.min(lm[right[0]]?.visibility ?? 0, lm[right[1]]?.visibility ?? 0, lm[right[2]]?.visibility ?? 0);
    if (vl > vr + 0.12) return al;
    if (vr > vl + 0.12) return ar;
    return (al + ar) / 2;
  }

  private getPrimaryAngle(lm: PoseLandmarks): number {
    const d = this.def!;
    const pa = d.primaryAngle;
    const name = pa.name;
    if (name === 'knee') return this.bestSideAngle(lm, [LM.left_hip, LM.left_knee, LM.left_ankle], [LM.right_hip, LM.right_knee, LM.right_ankle]);
    if (name === 'hipFlex' || name === 'pike' || name === 'hipLine') return this.bestSideAngle(lm, [LM.left_shoulder, LM.left_hip, LM.left_knee], [LM.right_shoulder, LM.right_hip, LM.right_knee]);
    if (name === 'elbow') return this.bestSideAngle(lm, [LM.left_shoulder, LM.left_elbow, LM.left_wrist], [LM.right_shoulder, LM.right_elbow, LM.right_wrist]);
    // generic single angle
    return angleFromLandmarks(lm, pa.a, pa.b, pa.c);
  }

  private primaryVisibility(lm: PoseLandmarks): number {
    const d = this.def!;
    const pa = d.primaryAngle;
    const name = pa.name;
    // return best side visibility for primary joint triple
    if (name === 'knee') {
      const vl = Math.min(lm[LM.left_hip]?.visibility ?? 0, lm[LM.left_knee]?.visibility ?? 0, lm[LM.left_ankle]?.visibility ?? 0);
      const vr = Math.min(lm[LM.right_hip]?.visibility ?? 0, lm[LM.right_knee]?.visibility ?? 0, lm[LM.right_ankle]?.visibility ?? 0);
      return Math.max(vl, vr);
    }
    if (name === 'elbow') {
      const vl = Math.min(lm[LM.left_shoulder]?.visibility ?? 0, lm[LM.left_elbow]?.visibility ?? 0, lm[LM.left_wrist]?.visibility ?? 0);
      const vr = Math.min(lm[LM.right_shoulder]?.visibility ?? 0, lm[LM.right_elbow]?.visibility ?? 0, lm[LM.right_wrist]?.visibility ?? 0);
      return Math.max(vl, vr);
    }
    // hipFlex etc
    const v = Math.min(lm[pa.a]?.visibility ?? 0, lm[pa.b]?.visibility ?? 0, lm[pa.c]?.visibility ?? 0);
    return v;
  }

  private computeSecondaryAngles(lm: PoseLandmarks): Record<string, number> {
    const out: Record<string, number> = {};
    for (const sa of this.def?.secondaryAngles ?? []) {
      out[sa.name] = angleFromLandmarks(lm, sa.a, sa.b, sa.c);
    }
    return out;
  }

  private loop = (now: number): void => {
    this.rafId = requestAnimationFrame(this.loop);
    if (!this.running || !this.video) return;

    const fpsTarget = this.cfg.targetFps ?? 30;
    const minInterval = 1000 / fpsTarget;
    if (now - this.lastInferenceAt < minInterval) {
      // still update elapsed/active timers at ~60fps even if we skip inference
      this.updateTimers(now);
      return;
    }
    // Safari: ensure video ready
    if (this.video.readyState < 2 || this.video.videoWidth === 0) {
      this.updateTimers(now);
      return;
    }

    // Safari: use video time as pose timestamp when possible (more stable than perf.now for rAF)
    const videoTs = this.video.currentTime ? Math.round(this.video.currentTime * 1000) : now;
    const ts = videoTs || now;
    const t0 = performance.now();
    const result = this.landmarker.detect(this.video, ts);
    const dtInfer = performance.now() - t0;

    // Adaptive throttle if inference is heavy (> 40ms) — drop to 20fps to save battery
    if (dtInfer > 42 && fpsTarget > 22) {
      this.cfg.targetFps = Math.max(22, (this.cfg.targetFps ?? 30) - 2);
    }

    this.lastInferenceAt = now;
    this.lastResult = result;

    // FPS EMA
    const instFps = 1000 / Math.max(1, now - (this.lastTs || now - 16));
    this.fpsEma = this.fpsEma ? this.fpsEma * 0.9 + instFps * 0.1 : instFps;
    this.frameCount++;
    // Pose quality via dedicated module (spec §6) + fallback
    // Use the analyzer's own (often trimmed) requiredLandmarks when available, so the displayed
    // POSE% / "move back" hint matches what's actually gating rep counting below — not a stale,
    // always-full-body generic list that nags the user even when tracking is working fine.
    const pq = evaluatePoseQuality(result.landmarks ?? null, this.analyzer?.requiredLandmarks ?? this.def?.requiredLandmarks ?? [11,12,23,24,25,26,27,28]);
    this.lastPoseQuality = pq.exerciseConfidence; // exerciseConfidence is the gated one

    if (!result.landmarks) {
      // No person — idle, but keep timers
      if (this.currentPhase !== 'idle') {
        this.currentPhase = 'idle';
        this.currentForm = { primaryAngle: this.lastAngle, secondaryAngles: {}, velocity: 0, direction: 'idle', quality: 0, cues: ['moveIntoFrame'], visibility: 0, poseQuality: this.lastPoseQuality } as any;
        this.onPhaseChange?.('idle', this.currentForm);
      }
      this.updateTimers(now);
      this.lastTs = now;
      this.emitMetrics();
      return;
    }

    const lm = result.landmarks;
    const vis = result.visibilityScore;
    const primVis = this.primaryVisibility(lm);
    // Permissivo: side view / luce bassa su iPhone abbassa visibility MediaPipe a 0.20-0.35
    // Prima bloccava in idle se primVis<0.38 — ora lasciamo passare con quality degradata
    const visEffective = Math.max(vis, primVis);
    const lowVis = primVis < 0.22 && vis < 0.28; // quasi invisibile -> resta idle ma non bloccare transizione READY
    if (lowVis) {
      this.updateTimers(now);
      this.lastTs = now;
      if (this.currentForm) {
        this.currentForm = { ...this.currentForm, visibility: visEffective, cues: ['move into frame'] };
      }
      // non fare return duro: lascia comunque SM tentare READY se qualche landmark c'è
    }
    // se primVis basso ma non bassissimo, degrada quality ma continua

    // If dedicated analyzer exists, delegate (spec §10 priority path)
    if (this.analyzer) {
      const dtAna = now - (this.lastTs || now - 16);
      const pqForAna = evaluatePoseQuality(lm, this.analyzer.requiredLandmarks);
      // Pause analysis if essential landmarks unreliable (spec §6) — 38 for squat/peripheral ankles (was 42 too strict on side-view/cropped feet)
      if (pqForAna.exerciseConfidence < 38) {
        this.updateTimers(now);
        this.lastTs = now;
        this.lastAngle = this.getPrimaryAngle(lm); // keep angle for fallback
        this.emitMetrics();
        return;
      }
      // Fase 1+2: pass worldLandmarks + motion context to analyzer if it supports it
      const worldLm = result.worldLandmarks ?? null;
      // Attach motion context to analyzer via optional property (analyzers can opt-in)
      if (this.motionFusion && (this.analyzer as any).setMotionContext) {
        (this.analyzer as any).setMotionContext({
          impactScore: this.motionFusion.getImpactScore(),
          rhythmHz: this.motionFusion.getRhythmHz(),
          hasData: this.motionFusion.hasData(),
          enabled: this.motionFusion.isEnabled(),
        });
      }
      if (worldLm && (this.analyzer as any).setWorldLandmarks) {
        (this.analyzer as any).setWorldLandmarks(worldLm);
      }
      const aRes = this.analyzer.analyze(lm, now, dtAna, pqForAna);
      // Fase 1: motion boost for dynamic exercises — if IMU shows rhythm, increase confidence slightly
      if (this.motionFusion?.hasData() && ['jumpingjack', 'burpee', 'ginocchiaalte', 'mountainclimber', 'skater'].includes(this.def.id)) {
        const impact = this.motionFusion.getImpactScore();
        const rhythm = this.motionFusion.getRhythmHz();
        // boost repConfidence by up to +12 if rhythm matches expected tempo 0.8-2.5Hz
        if (rhythm > 0.5 && rhythm < 3.5 && impact > 45) {
          aRes.repConfidence = Math.min(100, aRes.repConfidence + Math.round((impact - 45) * 0.15));
        }
        // also expose as secondary for HUD debug
        aRes.secondaryAngles = { ...aRes.secondaryAngles, motionImpact: Math.round(impact), motionRhythm: Math.round(rhythm * 10) / 10 };
      }
      this.liveRepConfidence = aRes.repConfidence;
      // Map analyzer result to engine metrics
      this.currentPhase = aRes.enginePhase as any;
      this.currentForm = {
        primaryAngle: aRes.primaryAngle,
        secondaryAngles: aRes.secondaryAngles,
        velocity: aRes.velocity,
        direction: aRes.direction,
        quality: aRes.formScore,
        cues: aRes.cues,
        visibility: pqForAna.exerciseConfidence/100,
        poseQuality: pqForAna.exerciseConfidence,
      } as any;
      // Timer start on first movement
      if (!this.startedAt && (aRes.phase==='DESCENDING' || aRes.phase==='FLEXING' || aRes.phase==='BOTTOM' || aRes.phase==='HOLD_GOOD')){
        this.startedAt = now; this.lastRepAt = now;
      }
      if (aRes.phase !== this.currentPhase) this.onPhaseChange?.(aRes.enginePhase as any, this.currentForm);
      if (aRes.repIncrement){
        const repDuration = this.lastRepAt ? now - this.lastRepAt : (this.startedAt ? now - this.startedAt : 0);
        this.reps += 1; this.lastRepAt = now; this.lastRepQuality = aRes.formScore; this.lastRepConfidence = aRes.repConfidence;
        this.qualityWindow.push(aRes.formScore); if (this.qualityWindow.length > (this.cfg.qualitySmoothingWindow ?? 5)) this.qualityWindow.shift();
        this.repQualityHistory.push(aRes.formScore); this.repDurationsMs.push(repDuration);
        if (this.repQualityHistory.length > 30) { this.repQualityHistory.shift(); this.repDurationsMs.shift(); }
        this.avgQuality = this.qualityWindow.reduce((a,b)=>a+b,0)/this.qualityWindow.length;
        const evt = { repIndex: this.reps, timestampMs: now, durationMs: repDuration, peakAngle: this.peakInRep, troughAngle: this.troughInRep, quality: aRes.formScore, cues: aRes.cues, velocity: aRes.velocity, confidence: aRes.repConfidence } as any;
        this.onRep?.(evt);
        try { navigator.vibrate?.(28); } catch {}
        this.troughInRep = aRes.primaryAngle; this.peakInRep = aRes.primaryAngle;
        this.sm.consumeRep(now, aRes.primaryAngle);
        this.currentPhase = 'ready'; this.onPhaseChange?.('ready', this.currentForm);
      }
      // Hold handling
      if (this.def?.isHold) {
        this.qualityWindow.push(aRes.formScore); if (this.qualityWindow.length > 8) this.qualityWindow.shift();
        this.avgQuality = this.qualityWindow.reduce((a,b)=>a+b,0)/this.qualityWindow.length;
        if (!this.startedAt && pqForAna.exerciseConfidence >= 50) this.startedAt = this.startedAt ?? now;
      }
      this.lastAngle = aRes.primaryAngle; this.lastTs = now; this.updateTimers(now); this.emitMetrics(); return;
    }
    // If exercise marked trackingSupported false, do not attempt generic counting (spec §24)
    if (this.def && this.def.trackingSupported === false) {
      // Still compute form for display but never rep
      const pqTmp = evaluatePoseQuality(lm, this.def.requiredLandmarks ?? []);
      const formEvalTmp = this.def?.evaluateForm(lm, {}, this.currentPhase as any, { velocity: 0, direction: 'hold', visibility: pqTmp.exerciseConfidence/100, repCount: this.reps }) ?? { quality: 0, cues: [] };
      this.currentForm = { primaryAngle: 0, secondaryAngles: {}, velocity: 0, direction: 'hold', quality: formEvalTmp.quality, cues: ['tracking not supported'], visibility: pqTmp.exerciseConfidence/100, poseQuality: pqTmp.exerciseConfidence } as any;
      this.updateTimers(now); this.lastTs = now; this.emitMetrics(); return;
    }
    const primaryAngle = this.getPrimaryAngle(lm);
    const secondary = this.computeSecondaryAngles(lm);

    // Velocity (deg/s) with simple exponential smoothing
    const dtMs = now - (this.lastTs || now - 16);
    const rawVel = dtMs > 0 ? (primaryAngle - this.lastAngle) / (dtMs / 1000) : 0;
    this.velocity = rawVel;
    this.velocityFiltered = this.velocityFiltered * 0.75 + rawVel * 0.25;
    const direction: FormMetrics['direction'] = Math.abs(this.velocityFiltered) < 18 ? 'hold' : this.velocityFiltered < 0 ? 'down' : 'up';

    // Maintain angle history for quality (last 600ms window)
    this.angleHistory.push({ angle: primaryAngle, ts: now });
    const cutoff = now - 900;
    while (this.angleHistory.length && this.angleHistory[0].ts < cutoff) this.angleHistory.shift();

    // Track ROM within current rep
    this.troughInRep = Math.min(this.troughInRep, primaryAngle);
    this.peakInRep = Math.max(this.peakInRep, primaryAngle);

    // State machine: check custom transition first for complex exercises
    let phase: EnginePhase = this.currentPhase;

    // --- Adaptive calibration: learn user's ROM in first ~1.2s of ready ---
    if (!this.calibDone && (phase === 'ready' || phase === 'idle')) {
      this.calibSamples.push(primaryAngle);
      if (this.calibSamples.length >= 32) {
        const sorted = [...this.calibSamples].sort((a, b) => a - b);
        const minObs = sorted[Math.floor(sorted.length * 0.08)];
        const maxObs = sorted[Math.floor(sorted.length * 0.92)];
        const span = maxObs - minObs;
        if (span > 22) {
          const origDown = this.def.thresholds.downThreshold;
          const origUp = this.def.thresholds.upThreshold;
          const adaptDown = clamp(minObs + span * 0.18, origDown - 12, origDown + 10);
          const adaptUp = clamp(maxObs - span * 0.12, origUp - 10, origUp + 14);
          this.sm.updateConfig({ downThreshold: adaptDown, upThreshold: adaptUp });
        }
        this.calibDone = true;
      }
    }
    let didRep = false;
    if (this.def?.customTransition) {
      const custom = this.def.customTransition(primaryAngle, this.velocityFiltered, phase, { landmarks: lm, timestampMs: now });
      if (custom) {
        const wasDownLike = phase === 'down' || phase === 'bottom';
        if (wasDownLike && custom === 'up') {
          const timeOk = this.lastRepAt === 0 || (now - this.lastRepAt) > (this.def.thresholds.minRepsIntervalMs ?? 300);
          const romOk = this.troughInRep < ((this.def.thresholds.downThreshold + 10));
          if (timeOk && romOk) didRep = true;
        }
        phase = custom;
        if (phase === 'down' || phase === 'bottom') (this.sm as any).state.phase = phase as any;
        else if (phase === 'up') (this.sm as any).state.phase = 'up' as any;
        else if (phase === 'ready') (this.sm as any).state.phase = 'ready' as any;
      } else {
        const step = this.sm.step(primaryAngle, now, visEffective);
        phase = step.nextPhase;
        didRep = step.didRep;
      }
    } else {
      const step = this.sm.step(primaryAngle, now, visEffective);
      phase = step.nextPhase;
      didRep = step.didRep;
    }

    // Timer: start on first down/bottom — auto riconoscimento inizio esercizio
    // Also auto-arm when person holds ready stable 500ms and then moves -> start
    if (!this.startedAt && (phase === 'down' || phase === 'bottom')) {
      this.startedAt = now;
      this.lastRepAt = now;
    }
    // Auto-end: if idle for 4s while we had reps, keep timer but don't reset (exercise fine)

    // Form evaluation
    const formEval = this.def?.evaluateForm(lm, { ...secondary, knee: primaryAngle, primary: primaryAngle }, phase, {
      velocity: this.velocityFiltered,
      direction,
      visibility: vis,
      repCount: this.reps,
    }) ?? { quality: 75, cues: [] };

    const form: FormMetrics = {
      primaryAngle,
      secondaryAngles: secondary,
      velocity: this.velocityFiltered,
      direction,
      quality: clamp(formEval.quality, 0, 100),
      cues: formEval.cues,
      visibility: vis,
    };
    this.currentForm = form;

    // Phase change callback
    if (phase !== this.currentPhase) {
      this.currentPhase = phase;
      this.onPhaseChange?.(phase, form);
    }

    // Rep completed
    if (didRep) {
      const repDuration = this.lastRepAt ? now - this.lastRepAt : (this.startedAt ? now - this.startedAt : 0);
      // Rep quality = weighted blend of instantaneous quality + ROM completeness + velocity control
      const rom = this.peakInRep - this.troughInRep;
      const expectedRom = (this.def!.thresholds.upThreshold - this.def!.thresholds.downThreshold);
      const romScore = clamp(100 * (rom / Math.max(30, expectedRom)), 0, 100);
      const velocityScore = clamp(100 - Math.abs(this.velocityFiltered) * 0.06, 0, 100); // penalize too fast
      const repQuality = clamp(form.quality * 0.55 + romScore * 0.30 + velocityScore * 0.15, 0, 100);

      this.reps += 1;
      this.lastRepAt = now;
      this.lastRepQuality = repQuality; this.lastRepConfidence = (evt as any).confidence ?? repQuality;
      this.qualityWindow.push(repQuality);
      if (this.qualityWindow.length > (this.cfg.qualitySmoothingWindow ?? 5)) this.qualityWindow.shift();
      this.repQualityHistory.push(repQuality); this.repDurationsMs.push(repDuration);
      if (this.repQualityHistory.length > 30) { this.repQualityHistory.shift(); this.repDurationsMs.shift(); }
      this.avgQuality = this.qualityWindow.reduce((a, b) => a + b, 0) / this.qualityWindow.length;

      const evt: RepEvent = {
        repIndex: this.reps,
        timestampMs: now,
        durationMs: repDuration,
        peakAngle: this.peakInRep,
        troughAngle: this.troughInRep,
        quality: repQuality,
        cues: form.cues,
        velocity: this.velocityFiltered,
      };
      this.onRep?.(evt);

      // haptics
      try { navigator.vibrate?.(28); } catch {}

      // reset per-rep ROM trackers and SM consume
      this.troughInRep = primaryAngle;
      this.peakInRep = primaryAngle;
      this.sm.consumeRep(now, primaryAngle);
      this.currentPhase = 'ready';
      this.onPhaseChange?.('ready', form);
    }

    // Hold exercise (plank) — no reps, quality is hold quality, timer is hold duration
    if (this.def?.isHold) {
      // Smooth quality into avg
      this.qualityWindow.push(form.quality);
      if (this.qualityWindow.length > 8) this.qualityWindow.shift();
      this.avgQuality = this.qualityWindow.reduce((a, b) => a + b, 0) / this.qualityWindow.length;
      if (!this.startedAt && vis >= 0.35) this.startedAt = this.startedAt ?? now;
    }

    this.lastAngle = primaryAngle;
    this.lastTs = now;
    this.updateTimers(now);
    this.emitMetrics();

    // Low-CPU guard: if avg inference > 35ms, already throttled above; also skip next frame if video element is hidden?
  };

  private updateTimers(now: number): void {
    const dt = now - (this.lastTickAt || now);
    this.lastTickAt = now;
    if (this.startedAt) {
      // count active time only when not idle
      if (this.currentPhase !== 'idle') this.elapsedActiveMs += dt;
    }
  }

  private emitMetrics(): void {
    this.onMetrics?.(this.metrics);
  }
}
