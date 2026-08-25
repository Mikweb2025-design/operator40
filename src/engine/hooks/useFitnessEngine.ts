/**
 * Operator40 — useFitnessEngine hook
 * Manages camera + FitnessEngine lifecycle for React.
 * Safari/iOS notes: playsInline + muted required; getUserMedia must be from user gesture.
 */
import { useEffect, useRef, useState, useCallback } from 'react';
import { FitnessEngine } from '../FitnessEngine';
import type { EngineConfig, EngineMetrics, RepEvent, NormalizedExerciseId } from '../types';

export type EngineStatus = 'idle'|'camera'|'loading-model'|'ready'|'running'|'error';

export function useFitnessEngine(
  videoRef: React.RefObject<HTMLVideoElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  exerciseId: string,
  opts: Partial<EngineConfig> = {}
) {
  const engineRef = useRef<FitnessEngine | null>(null);
  const [status, setStatus] = useState<EngineStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<EngineMetrics | null>(null);
  const [reps, setReps] = useState(0);
  const streamRef = useRef<MediaStream | null>(null);

  const lang = (opts.lang ?? 'it') as any;

  // create engine
  const create = useCallback(async () => {
    if (!videoRef.current) return;
    const nid = (exerciseId === 'flessioni' ? 'pushup' : exerciseId) as NormalizedExerciseId;
    const engine = new FitnessEngine({
      exerciseId: nid as any,
      lang,
      targetFps: 28,
      enableFiltering: true,
      enableSpeech: !!opts.enableSpeech,
      mirror: true,
      onRep: (e: RepEvent) => {
        setReps(e.repIndex);
        opts.onRep?.(e);
      },
      onMetrics: (m) => { setMetrics(m); opts.onMetrics?.(m); },
      onPhaseChange: opts.onPhaseChange,
      thresholdsOverride: opts.thresholdsOverride,
    });
    engineRef.current = engine;
    setStatus('loading-model');
    try {
      await engine.init(videoRef.current, (msg) => { /* progress */ });
      setStatus('ready');
    } catch (e: any) {
      setError(e?.message ?? String(e));
      setStatus('error');
    }
  }, [exerciseId, lang, opts.enableSpeech]);

  const startCamera = useCallback(async () => {
    setError(null);
    setStatus('camera');
    try {
      // Safari iOS: must be triggered by user gesture; facingMode user, 640x480 for low CPU
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: 'user',
          width: { ideal: 640, max: 640 },
          height: { ideal: 480, max: 480 },
          frameRate: { ideal: 30, max: 30 },
        },
        audio: false,
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // Safari: play must be awaited; muted+playsInline already set on element
        await videoRef.current.play().catch(()=>{});
      }
      await create();
    } catch (e: any) {
      const msg = e?.message ?? String(e);
      setError(msg.includes('NotAllowed') ? 'Camera permission denied — allow camera and retry (HTTPS required).' : msg);
      setStatus('error');
    }
  }, [create, videoRef]);

  const start = useCallback(() => {
    if (engineRef.current && status === 'ready') {
      engineRef.current.start();
      setStatus('running');
    } else if (!engineRef.current && videoRef.current) {
      // if not initialized, do full chain
      startCamera().then(() => {
        setTimeout(()=> engineRef.current?.start(), 200);
        setStatus('running');
      });
    } else {
      engineRef.current?.start();
      setStatus('running');
    }
  }, [status, startCamera, videoRef]);

  const stop = useCallback(() => {
    engineRef.current?.stop();
    setStatus('ready');
  }, []);

  const destroy = useCallback(() => {
    try { engineRef.current?.destroy(); } catch {}
    engineRef.current = null;
    if (streamRef.current) {
      try { streamRef.current.getTracks().forEach(t=> t.stop()); } catch {}
      streamRef.current = null;
    }
    setStatus('idle');
  }, []);

  // sync exercise change
  useEffect(() => { engineRef.current?.updateExercise(exerciseId); }, [exerciseId]);
  useEffect(() => { engineRef.current?.updateConfig({ enableSpeech: !!opts.enableSpeech, lang: opts.lang as any }); }, [opts.enableSpeech, opts.lang]);
  useEffect(()=> { return () => { destroy(); }; }, [destroy]);

  return { engineRef, status, error, metrics, reps, startCamera, start, stop, destroy, streamRef, setStatus };
}
