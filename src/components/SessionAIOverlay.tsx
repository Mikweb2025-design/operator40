/**
 * Operator40 — SessionAIOverlay
 * Real-time AI Coach for one work phase (mission exercise).
 * - Automatic exercise recognition from phase.exerciseId via MissionManager
 * - 33 landmarks, OneEuro smoothing, hysteresis FSM, 25-30 FPS, no uploads
 * - Auto start: READY until correct position, then timer starts on first movement
 * - Rep counting + form 0-100 + localized coaching (it/en/de/fr) + voice
 * - Time-based (plank) auto hold detection
 *
 * Used inside SessionScreen when AI Coach is enabled.
 */
import React, { useEffect, useRef, useState } from 'react';
import { INK, INK_2, OLIVE, KHAKI, PAPER, STEEL, BLAZE } from '../constants/theme.js';
import { FitnessEngine } from '../engine/FitnessEngine';
import { CoachEngine } from '../engine/CoachEngine';
import { drawSkeleton } from '../engine/overlay/poseConnections';
import { exerciseFromPhase } from '../engine/MissionManager';
import { tCoach, normalizeLang } from '../engine/LocalizationManager';
import type { EngineMetrics } from '../engine/types';

type Lang = 'it' | 'en' | 'de' | 'fr';

interface Props {
  phase: any; // work phase: { exerciseId, reps?, duration?, round? }
  lang?: Lang;
  levelKey?: string;
  onRep?: (repIndex: number, evt: any) => void;
  onCompletePhase?: (summary: { reps: number; elapsedMs: number; avgQuality: number }) => void;
  onFormUpdate?: (form: number, status: string) => void;
  aiEnabled?: boolean;
  // compact vs full
  compact?: boolean;
}

function fmtMs(ms: number): string {
  const s = Math.floor(ms / 1000);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

export default function SessionAIOverlay({ phase, lang = 'it', levelKey = 'combattente', onRep, onCompletePhase, onFormUpdate, aiEnabled = true, compact = false }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<FitnessEngine | null>(null);
  const coachRef = useRef<CoachEngine | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [status, setStatus] = useState<'idle'|'camera'|'loading'|'ready'|'running'|'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<EngineMetrics | null>(null);
  const [coachingText, setCoachingText] = useState<string>('');
  const [reps, setReps] = useState(0);

  const missionEx = exerciseFromPhase(phase, lang as any, levelKey);
  const targetReps = missionEx?.targetReps ?? phase?.reps ?? null;
  const isHold = !!missionEx?.isHold;
  const exerciseId = missionEx?.exerciseId ?? phase?.exerciseId ?? 'squat';

  // init coach
  if (!coachRef.current) coachRef.current = new CoachEngine({ lang: lang as any, enableVoice: true, cooldownMs: 2600 });
  useEffect(() => { coachRef.current?.setLang(lang as any); }, [lang]);

  // start camera + engine when phase changes
  useEffect(() => {
    let cancelled = false;
    async function start() {
      if (!aiEnabled) return;
      setStatus('camera'); setError(null); setReps(0); setMetrics(null); setCoachingText('');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 640, max: 640 }, height: { ideal: 480, max: 480 }, frameRate: { ideal: 30, max: 30 } },
          audio: false,
        });
        if (cancelled) { stream.getTracks().forEach(t => t.stop()); return; }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
        }
        if (cancelled) return;
        setStatus('loading');
        const eng = new FitnessEngine({
          exerciseId: exerciseId as any,
          lang: lang as any,
          targetFps: 28,
          enableFiltering: true,
          enableSpeech: false, // we handle speech via CoachEngine
          onRep: (evt) => {
            setReps(evt.repIndex);
            onRep?.(evt.repIndex, evt);
            // motivation check
            const mot = coachRef.current?.motivationForRep(evt.repIndex, targetReps, evt.quality);
            if (mot) {
              setCoachingText(mot);
              coachRef.current?.speak(mot, { key: `mot-${evt.repIndex}`, rate: 1.05 });
            } else if (evt.quality > 80) {
              const praise = tCoach('coach.good', lang);
              setCoachingText(praise);
            }
            // auto-complete for rep-based
            if (targetReps && evt.repIndex >= targetReps) {
              const m = eng.metrics;
              setTimeout(() => onCompletePhase?.({ reps: evt.repIndex, elapsedMs: m.elapsedMs, avgQuality: m.avgQuality }), 650);
              coachRef.current?.speak(tCoach('coach.missionComplete', lang), { key: 'missionComplete', rate: 0.95 });
            }
          },
          onPhaseChange: (ph, form) => {
            if (!form) return;
            onFormUpdate?.(form.quality, form.quality > 68 ? tCoach('coach.status.good', lang) : tCoach('coach.status.fix', lang));
            // decide feedback via CoachEngine priority
            const fb = coachRef.current?.decideFeedback({
              phase: ph,
              formQuality: form.quality,
              cues: form.cues,
              velocity: form.velocity,
              reps,
              targetReps,
              elapsedMs: eng.metrics.elapsedMs,
              isHold,
            });
            if (fb?.text) {
              setCoachingText(fb.text);
              if (fb.priority <= 2) coachRef.current?.speak(fb.text, { key: fb.cueKey ?? 'form', rate: 1.0 });
            }
          },
          onMetrics: (m) => {
            setMetrics(m);
            // hold time-based auto-complete
            if (isHold && targetReps == null && phase?.duration) {
              const targetMs = phase.duration * 1000;
              if (m.elapsedMs >= targetMs && m.elapsedMs > 0) {
                onCompletePhase?.({ reps: 0, elapsedMs: m.elapsedMs, avgQuality: m.avgQuality });
              }
            }
          },
        });
        if (cancelled) { eng.destroy(); return; }
        engineRef.current = eng;
        await eng.init(videoRef.current!, () => {});
        if (cancelled) { eng.destroy(); return; }
        eng.start();
        setStatus('running');
      } catch (e: any) {
        setError(e?.message ?? String(e));
        setStatus('error');
      }
    }
    start();
    return () => {
      cancelled = true;
      try { engineRef.current?.destroy(); } catch {}
      engineRef.current = null;
      if (streamRef.current) { try { streamRef.current.getTracks().forEach(t => t.stop()); } catch {} streamRef.current = null; }
      coachRef.current?.cancelSpeech();
    };
  }, [exerciseId, phase?.exerciseId, phase?.reps, phase?.duration, aiEnabled, lang, levelKey, isHold]);

  // overlay draw
  useEffect(() => {
    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      const canvas = canvasRef.current, video = videoRef.current, eng = engineRef.current;
      if (!canvas || !video || !eng) return;
      const ctx = canvas.getContext('2d'); if (!ctx) return;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      try { if (video.readyState >= 2) ctx.drawImage(video, 0, 0, W, H); } catch {}
      const res = eng.getLastResult()?.landmarks;
      if (res) drawSkeleton(ctx, res, W, H, { mirror: true, color: BLAZE, jointColor: PAPER });
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  const normLang = normalizeLang(lang as any);
  const formVal = Math.round(metrics?.avgQuality ?? metrics?.currentForm?.quality ?? 0);
  const statusText = !metrics ? tCoach('coach.moveIntoFrame', normLang) : formVal > 68 ? tCoach('coach.status.good', normLang) : tCoach('coach.status.fix', normLang);

  if (!aiEnabled) return null;

  const progressPct = targetReps ? Math.min(1, reps / targetReps) : (metrics?.elapsedMs && phase?.duration ? Math.min(1, metrics.elapsedMs / (phase.duration * 1000)) : 0);

  return (
    <div style={{ width: '100%', background: INK, border: `1px solid ${OLIVE}`, borderRadius: 14, overflow: 'hidden' }}>
      {/* HUD */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, padding: 8, background: INK_2, borderBottom: `1px solid ${OLIVE}33` }}>
        <div style={{ background: INK, border: `1px solid ${OLIVE}`, borderRadius: 10, padding: '6px 8px', textAlign: 'center' }}>
          <div className="o40-mono" style={{ color: STEEL, fontSize: 8 }}>{tCoach('coach.time', normLang)}</div>
          <div className="o40-display" style={{ color: PAPER, fontSize: 16, lineHeight: 1 }}>{fmtMs(metrics?.elapsedMs ?? 0)}</div>
        </div>
        <div style={{ background: INK, border: `1px solid ${OLIVE}`, borderRadius: 10, padding: '6px 8px', textAlign: 'center' }}>
          <div className="o40-mono" style={{ color: STEEL, fontSize: 8 }}>{tCoach('coach.rep', normLang)}</div>
          <div className="o40-display" style={{ color: BLAZE, fontSize: 16, lineHeight: 1 }}>{reps}{targetReps ? ` / ${targetReps}` : ''}</div>
          <div style={{ height: 4, background: OLIVE + '55', borderRadius: 2, marginTop: 4, overflow: 'hidden' }}>
            <div style={{ width: `${Math.round(progressPct * 100)}%`, height: '100%', background: BLAZE, transition: 'width 0.3s' }} />
          </div>
        </div>
        <div style={{ background: INK, border: `1px solid ${OLIVE}`, borderRadius: 10, padding: '6px 8px', textAlign: 'center' }}>
          <div className="o40-mono" style={{ color: STEEL, fontSize: 8 }}>{tCoach('coach.form', normLang)}</div>
          <div className="o40-display" style={{ color: formVal > 70 ? '#7FB069' : formVal > 50 ? '#D4A017' : BLAZE, fontSize: 16, lineHeight: 1 }}>{formVal}<span style={{ fontSize: 10, color: STEEL }}>/100</span></div>
          <div className="o40-mono" style={{ color: formVal > 68 ? '#7FB069' : BLAZE, fontSize: 7 }}>{statusText}</div>
        </div>
      </div>

      {coachingText && (
        <div style={{ margin: '8px 8px 0', padding: '8px 10px', borderRadius: 10, background: `${BLAZE}14`, border: `1px solid ${BLAZE}55`, color: PAPER, fontSize: 12, textAlign: 'center' }}>
          {coachingText}
        </div>
      )}

      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', background: '#050608', marginTop: coachingText ? 8 : 0 }}>
        <video ref={videoRef} autoPlay muted playsInline webkit-playsinline="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)', background: '#000' }} />
        <canvas ref={canvasRef} width={640} height={480} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)', pointerEvents: 'none' }} />
        {status === 'loading' && (
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.45)', color: PAPER }}>
            <div className="o40-mono" style={{ fontSize: 10, color: KHAKI }}>AI Coach loading…</div>
          </div>
        )}
        {status === 'error' && error && (
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.7)', padding: 16, textAlign: 'center' }}>
            <div style={{ color: BLAZE, fontSize: 12 }}>{error}<br /><span style={{ color: STEEL, fontSize: 10 }}>HTTPS + camera permission required.</span></div>
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 6, left: 6, right: 6, display: 'flex', justifyContent: 'space-between', pointerEvents: 'none' }}>
          <span className="o40-mono" style={{ background: `${INK}DD`, color: KHAKI, fontSize: 9, padding: '3px 7px', borderRadius: 20, border: `1px solid ${OLIVE}55` }}>{exerciseId} · {status === 'running' ? 'AI' : status}</span>
          <span className="o40-mono" style={{ background: formVal > 68 ? '#7FB069DD' : `${BLAZE}DD`, color: PAPER, fontSize: 9, padding: '3px 8px', borderRadius: 20 }}>{metrics?.currentPhase ?? 'idle'}</span>
        </div>
      </div>
      <div style={{ padding: '6px 8px', background: INK_2, borderTop: `1px solid ${OLIVE}22`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="o40-mono" style={{ color: STEEL, fontSize: 9 }}>{isHold ? tCoach('coach.holdPosition', normLang) : `${tCoach('coach.rep', normLang)} ${reps}${targetReps ? `/${targetReps}` : ''} · ${formVal}/100`}</span>
        <span className="o40-mono" style={{ color: KHAKI, fontSize: 8 }}>AI · {exerciseId} · {fmtMs(metrics?.elapsedActiveMs ?? 0)} active</span>
      </div>
    </div>
  );
}
