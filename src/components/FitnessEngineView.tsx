/**
 * Operator40 — FitnessEngineView
 * Production PWA view: video + skeleton overlay + HUD (reps/timer/quality/coaching).
 * - Fully client-side (no uploads), rAF + throttled inference (28fps default)
 * - iOS Safari friendly: playsInline, no fullscreen, user gesture to start camera
 * - Speech coach optional, skeleton overlay toggle, exercise switcher
 */
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { INK, OLIVE, KHAKI, PAPER, STEEL, BLAZE } from '../constants/theme.js';
import { FitnessEngine } from '../engine/FitnessEngine';
import { SpeechCoach } from '../engine/coach/SpeechCoach';
import { drawSkeleton, drawAngleBadge } from '../engine/overlay/poseConnections';
import { EXERCISE_DEFINITIONS, normalizeExerciseId, getDefinition } from '../engine/exercises/definitions';
import { localizedCue } from '../engine/exercises/definitions';
import type { EngineMetrics, RepEvent, FormMetrics } from '../engine/types';

type Lang = 'it' | 'en' | 'de';

interface Props {
  exercise?: string; // e.g. 'squat' | 'flessioni'
  lang?: Lang;
  onClose?: () => void;
  onRep?: (e: RepEvent, total: number) => void;
  onDone?: (summary: { reps: number; elapsedMs: number; avgQuality: number }) => void;
  autoStart?: boolean;
}

const EXERCISE_OPTIONS: Array<{ id: string; label: string }> = Object.values(EXERCISE_DEFINITIONS as any).map((d: any) => ({
  id: d.id,
  label: (d.label.it as string) + (d.id !== (d.label.it as string).toLowerCase() ? ` · ${d.label.en}` : ''),
})).sort((a, b) => a.label.localeCompare(b.label));

function fmtMs(ms: number): string {
  const s = Math.floor(ms / 1000);
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

export default function FitnessEngineView({ exercise = 'squat', lang = 'it', onClose, onRep, onDone }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<FitnessEngine | null>(null);
  const speechRef = useRef<SpeechCoach | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [status, setStatus] = useState<'idle' | 'camera' | 'loading-model' | 'ready' | 'running' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [exId, setExId] = useState(() => normalizeExerciseId(exercise));
  const [metrics, setMetrics] = useState<EngineMetrics | null>(null);
  const [lastForm, setLastForm] = useState<FormMetrics | null>(null);
  const [reps, setReps] = useState(0);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [speechOn, setSpeechOn] = useState(false);
  const [coachingText, setCoachingText] = useState<string>('');

  // init speech
  useEffect(() => {
    speechRef.current = new SpeechCoach(speechOn, lang as any, 3000);
    return () => speechRef.current?.cancel();
  }, []);
  useEffect(() => { speechRef.current?.setLang(lang as any); }, [lang]);
  useEffect(() => { speechRef.current?.setEnabled(speechOn); }, [speechOn]);

  // draw overlay loop (independent of inference; 60fps canvas draw)
  useEffect(() => {
    let raf = 0;
    let lastDrawAt = 0;
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const engine = engineRef.current;
      if (!canvas || !video || !engine) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      // throttle overlay draw to ~45fps to save battery
      if (now - lastDrawAt < 22) return;
      lastDrawAt = now;

      const W = canvas.width, H = canvas.height;
      // clear + draw video frame
      ctx.clearRect(0, 0, W, H);
      try {
        if (video.readyState >= 2) ctx.drawImage(video, 0, 0, W, H);
      } catch {}

      const res = engine.getLastResult();
      const lm = res?.landmarks ?? null;
      if (showSkeleton && lm) {
        drawSkeleton(ctx, lm, W, H, { mirror: true, color: BLAZE, jointColor: PAPER });
      }
      // HUD badges: angle + phase
      if (lastForm) {
        const ang = Math.round(lastForm.primaryAngle);
        drawAngleBadge(ctx, `${ang}° · ${metrics?.currentPhase ?? ''}`, 8, 10);
        // quality bar mini
        const q = Math.round(lastForm.quality);
        const col = q > 75 ? '#7FB069' : q > 50 ? '#D4A017' : BLAZE;
        ctx.fillStyle = 'rgba(0,0,0,0.55)';
        ctx.fillRect(W - 92, 10, 84, 10);
        ctx.fillStyle = col;
        ctx.fillRect(W - 92, 10, Math.round(84 * (q / 100)), 10);
        ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1;
        ctx.strokeRect(W - 92, 10, 84, 10);
      }
      // visibility warning
      if (res && res.visibilityScore < 0.35) {
        ctx.fillStyle = 'rgba(193,68,14,0.92)';
        ctx.font = '11px ui-monospace, monospace';
        ctx.fillText('Move into frame', 10, H - 14);
      }
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [showSkeleton, lastForm, metrics]);

  const startCamera = useCallback(async () => {
    setError(null);
    setStatus('camera');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640, max: 640 }, height: { ideal: 480, max: 480 }, frameRate: { ideal: 30, max: 30 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
      // init engine after video is flowing
      const nid = normalizeExerciseId(exId) as any;
      const eng = new FitnessEngine({
        exerciseId: nid,
        lang: lang as any,
        targetFps: 28,
        enableFiltering: true,
        enableSpeech: speechOn,
        onRep: (e) => {
          setReps(e.repIndex);
          onRep?.(e, e.repIndex);
          // speech rep count
          if (speechOn) speechRef.current?.speakCount(e.repIndex);
          // immediate cue burst if quality dip (<60) else subtle
          if (e.quality < 58 && e.cues[0]) {
            const txt = localizedCue(e.cues[0], lang as any);
            setCoachingText(txt);
            if (speechOn) speechRef.current?.speakCue(e.cues[0] as any);
          }
        },
        onPhaseChange: (phase, form) => {
          if (form) setLastForm(form);
          // coaching throttle: speak top cue only when phase changes to bottom/up and quality low
          if (form && form.cues[0] && form.quality < 62) {
            const txt = localizedCue(form.cues[0], lang as any);
            setCoachingText(txt);
          } else if (form && form.quality > 80) {
            setCoachingText('');
          }
        },
        onMetrics: (m) => setMetrics(m),
      });
      engineRef.current = eng;
      setStatus('loading-model');
      await eng.init(videoRef.current!);
      setStatus('ready');
      // auto-run inference loop
      eng.start();
      setStatus('running');
    } catch (e: any) {
      const msg = e?.message ?? String(e);
      const friendly = msg.includes('NotAllowedError') || msg.includes('Permission')
        ? (lang === 'it' ? 'Permesso camera negato — consenti la camera e riprova (serve HTTPS).' : 'Camera permission denied — allow camera and retry (HTTPS required).')
        : msg;
      setError(friendly);
      setStatus('error');
    }
  }, [exId, lang, speechOn, onRep]);

  // switch exercise live
  useEffect(() => {
    if (engineRef.current && status === 'running') {
      const nid = normalizeExerciseId(exId) as any;
      engineRef.current.updateExercise(nid);
      setReps(0);
    }
  }, [exId, status]);

  const stopAndCleanup = useCallback(() => {
    try { engineRef.current?.destroy(); } catch {}
    engineRef.current = null;
    if (streamRef.current) {
      try { streamRef.current.getTracks().forEach((t) => t.stop()); } catch {}
      streamRef.current = null;
    }
    try { speechRef.current?.cancel(); } catch {}
  }, []);

  useEffect(() => () => { stopAndCleanup(); }, [stopAndCleanup]);

  // close handler collects summary
  const handleClose = useCallback(() => {
    const m = metrics;
    const summary = { reps, elapsedMs: m?.elapsedMs ?? 0, avgQuality: m?.avgQuality ?? 0 };
    if (reps > 0 || (m?.elapsedMs ?? 0) > 2000) onDone?.(summary);
    stopAndCleanup();
    onClose?.();
  }, [metrics, reps, onDone, onClose, stopAndCleanup]);

  const def = getDefinition(exId) ?? getDefinition('squat');

  return (
    <div style={{ background: INK, border: `1px solid ${OLIVE}`, borderRadius: 14, overflow: 'hidden', boxShadow: '0 10px 36px rgba(0,0,0,0.55)' }}>
      {/* header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: INK, borderBottom: `1px solid ${OLIVE}55` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="o40-mono" style={{ color: KHAKI, fontSize: 10, letterSpacing: '0.08em' }}>
            AI ENGINE · <span style={{ color: PAPER }}>{exId.toUpperCase()}</span> · <span style={{ color: status === 'running' ? '#7FB069' : status === 'error' ? BLAZE : STEEL }}>{status}</span>
          </div>
          {metrics?.fps ? <span className="o40-mono" style={{ color: STEEL, fontSize: 9 }}>{Math.round(metrics.fps)} FPS</span> : null}
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <button
            onClick={() => setSpeechOn((v) => !v)}
            title={speechOn ? 'Voice coach ON' : 'Voice coach OFF'}
            style={{ padding: '6px 8px', borderRadius: 20, border: `1px solid ${speechOn ? BLAZE : OLIVE}`, background: speechOn ? `${BLAZE}22` : INK, color: speechOn ? BLAZE : STEEL, fontSize: 11, cursor: 'pointer' }}
          >
            {speechOn ? '🔊' : '🔈'} Coach
          </button>
          <button
            onClick={() => setShowSkeleton((v) => !v)}
            style={{ padding: '6px 8px', borderRadius: 20, border: `1px solid ${OLIVE}`, background: showSkeleton ? `${OLIVE}33` : INK, color: showSkeleton ? KHAKI : STEEL, fontSize: 11, cursor: 'pointer' }}
          >
            {showSkeleton ? '◉ Skeleton' : '◎ Skeleton'}
          </button>
          <button
            onClick={handleClose}
            style={{ padding: '6px 10px', borderRadius: 20, border: `1px solid ${OLIVE}`, background: INK, color: STEEL, fontSize: 11, cursor: 'pointer' }}
          >
            ✕ Chiudi
          </button>
        </div>
      </div>

      {/* exercise switcher */}
      <div style={{ display: 'flex', gap: 6, padding: '8px 10px', overflowX: 'auto', background: `${INK}F0`, borderBottom: `1px solid ${OLIVE}22` }}>
        {(["squat", "pushup", "crunch", "plank", "mountainclimber", "jumpingjack", "flutterkick", "bicyclecrunch", "legraise", "deadbug", "heeltap", "vup", "burpee"] as const).map((id) => (
          <button
            key={id}
            onClick={() => setExId(id)}
            style={{
              flex: '0 0 auto', padding: '6px 10px', borderRadius: 20, fontSize: 11, cursor: 'pointer',
              border: `1px solid ${exId === id ? BLAZE : OLIVE}`,
              background: exId === id ? BLAZE : INK,
              color: exId === id ? PAPER : STEEL,
            }}
          >
            {id}
          </button>
        ))}
      </div>

      {/* HUD */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, padding: '10px 12px', background: INK }}>
        <div style={{ background: `${INK}CC`, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: '10px 12px', textAlign: 'center' }}>
          <div className="o40-mono" style={{ color: STEEL, fontSize: 9 }}>REPS</div>
          <div className="o40-display" style={{ color: BLAZE, fontSize: 28, lineHeight: 1 }}>{reps}</div>
          <div className="o40-mono" style={{ color: KHAKI, fontSize: 9 }}>{metrics?.currentPhase ?? '—'}</div>
        </div>
        <div style={{ background: `${INK}CC`, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: '10px 12px', textAlign: 'center' }}>
          <div className="o40-mono" style={{ color: STEEL, fontSize: 9 }}>TIME</div>
          <div className="o40-display" style={{ color: PAPER, fontSize: 22, lineHeight: 1 }}>{fmtMs(metrics?.elapsedMs ?? 0)}</div>
          <div className="o40-mono" style={{ color: STEEL, fontSize: 9 }}>active {fmtMs(metrics?.elapsedActiveMs ?? 0)}</div>
        </div>
        <div style={{ background: `${INK}CC`, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: '10px 12px', textAlign: 'center' }}>
          <div className="o40-mono" style={{ color: STEEL, fontSize: 9 }}>QUALITY</div>
          <div className="o40-display" style={{ color: (metrics?.avgQuality ?? 0) > 70 ? '#7FB069' : (metrics?.avgQuality ?? 0) > 50 ? '#D4A017' : BLAZE, fontSize: 22, lineHeight: 1 }}>{Math.round(metrics?.avgQuality ?? lastForm?.quality ?? 0)}</div>
          <div className="o40-mono" style={{ color: KHAKI, fontSize: 9 }}>/100</div>
        </div>
      </div>

      {coachingText ? (
        <div style={{ margin: '0 12px', padding: '8px 10px', borderRadius: 10, background: `${BLAZE}1A`, border: `1px solid ${BLAZE}55`, color: PAPER, fontSize: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14 }}>💡</span> {coachingText}
        </div>
      ) : null}

      {/* video stage */}
      {error ? (
        <div style={{ margin: 12, padding: 14, borderRadius: 12, background: `${BLAZE}14`, border: `1px solid ${BLAZE}55`, color: BLAZE, fontSize: 12, lineHeight: 1.5 }}>
          {error}<br /><span style={{ color: STEEL, fontSize: 11 }}>Apri con HTTPS (richiesto da iOS per la camera). Consenti la camera quando il browser lo chiede.</span>
          <div style={{ marginTop: 10 }}><button onClick={() => { setError(null); setStatus('idle'); }} style={{ padding: '8px 14px', borderRadius: 10, border: `1px solid ${OLIVE}`, background: INK, color: PAPER, cursor: 'pointer' }}>Riprova</button></div>
        </div>
      ) : (
        <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', background: '#050608', overflow: 'hidden' }}>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            // @ts-ignore webkit-playsinline for iOS
            webkit-playsinline="true"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)', background: '#000' }}
          />
          <canvas
            ref={canvasRef}
            width={640}
            height={480}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)', pointerEvents: 'none' }}
          />
          {/* bottom chips */}
          <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8, display: 'flex', justifyContent: 'space-between', gap: 6, pointerEvents: 'none' }}>
            <span style={{ background: `${INK}DD`, color: KHAKI, fontSize: 10, padding: '4px 8px', borderRadius: 20, border: `1px solid ${OLIVE}55` }}>
              {lastForm ? `∠ ${Math.round(lastForm.primaryAngle)}° · v ${Math.round(lastForm.velocity)}°/s` : '—'}
            </span>
            <span className="o40-mono" style={{ background: `${BLAZE}DD`, color: PAPER, fontSize: 10, padding: '4px 10px', borderRadius: 20 }}>
              {metrics?.currentPhase ?? 'idle'} {metrics?.currentForm?.direction ? `· ${metrics.currentForm.direction}` : ''}
            </span>
          </div>
          {status === 'idle' && (
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(2px)' }}>
              <button
                onClick={startCamera}
                style={{ padding: '16px 22px', borderRadius: 999, border: `2px solid ${PAPER}`, background: BLAZE, color: PAPER, fontWeight: 800, fontSize: 14, cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.45)' }}
              >
                ▶︎ Avvia camera · {exId}
              </button>
            </div>
          )}
          {(status === 'camera' || status === 'loading-model') && (
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.55)', color: PAPER }}>
              <div style={{ textAlign: 'center' }}>
                <div className="o40-loadbar" style={{ width: 160, height: 6, margin: '0 auto 10px' }}><span /></div>
                <div className="o40-mono" style={{ fontSize: 11, color: KHAKI }}>{status === 'camera' ? 'Avvio camera…' : 'Carico modello AI (offline dopo il primo avvio)…'}</div>
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{ padding: '8px 12px', color: STEEL, fontSize: 11, lineHeight: 1.45, borderTop: `1px solid ${OLIVE}22` }}>
        <span style={{ color: KHAKI }}>● Client-side:</span> nessun video caricato sul server. Modello MediaPipe su dispositivo, offline dopo cache PWA. {' '}
        <span style={{ color: STEEL }}>Inquadra tutto il corpo. Per squat/push-up: ripresa laterale. Plank: laterale. Crunch/V-up: laterale a terra.</span>
      </div>
    </div>
  );
}
