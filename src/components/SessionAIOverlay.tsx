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
import { localizedCue } from '../engine/exercises/definitions';
import PositioningMask, { alignmentScore } from './PositioningMask';
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
  enableMotionFusion?: boolean;
  // compact vs full
  compact?: boolean;
}

function fmtMs(ms: number): string {
  const s = Math.floor(ms / 1000);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

function qColor(q: number): string {
  return q > 70 ? '#7FB069' : q > 50 ? '#D4A017' : BLAZE;
}

export default function SessionAIOverlay({ phase, lang = 'it', levelKey = 'combattente', onRep, onCompletePhase, onFormUpdate, aiEnabled = true, enableMotionFusion = false, compact = false }: Props) {
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
  const [alignOkSince, setAlignOkSince] = useState<number | null>(null);

  const missionEx = exerciseFromPhase(phase, lang as any, levelKey);
  const trackingSupported = missionEx?.trackingSupported !== false && (missionEx?.definition as any)?.trackingSupported !== false;
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
          enableMotionFusion,
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
  }, [exerciseId, phase?.exerciseId, phase?.reps, phase?.duration, aiEnabled, enableMotionFusion, lang, levelKey, isHold]);

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
      // alignment stable tracking for mask fade
      if (res && reps === 0 && (metrics?.currentPhase === 'ready' || metrics?.currentPhase === 'idle')) {
        const s = alignmentScore(res, exerciseId);
        if (s > 0.68) {
          if (alignOkSince == null) setAlignOkSince(performance.now());
        } else {
          if (alignOkSince != null) setAlignOkSince(null);
        }
      }
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [reps, metrics?.currentPhase, exerciseId, alignOkSince]);

  const normLang = normalizeLang(lang as any);
  const formVal = Math.round(metrics?.avgQuality ?? metrics?.currentForm?.quality ?? 0);
  const poseQuality = Math.round(metrics?.poseQuality ?? metrics?.currentForm?.poseQuality ?? 0);
  const activeCues = (metrics?.currentForm?.cues ?? []).slice(0, 2);
  const repDurs = metrics?.repDurationsMs ?? [];
  const avgRepSec = repDurs.length ? repDurs.reduce((a, b) => a + b, 0) / repDurs.length / 1000 : null;
  const statusText = !metrics ? tCoach('coach.moveIntoFrame', normLang) : formVal > 68 ? tCoach('coach.status.good', normLang) : tCoach('coach.status.fix', normLang);

  if (!aiEnabled) return null;
  if (!trackingSupported) {
    return (
      <div style={{ width: '100%', background: INK, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 14, textAlign: 'center' }}>
        <div className="o40-mono" style={{ color: KHAKI, fontSize: 10 }}>AI TRACKING</div>
        <div style={{ color: PAPER, fontSize: 13, marginTop: 6 }}>{lang === 'it' ? 'Tracciamento AI non ancora calibrato per questo esercizio — usa timer standard.' : 'AI tracking not yet calibrated for this exercise — using standard timer.'}</div>
        <div style={{ color: STEEL, fontSize: 11, marginTop: 8 }}>{exerciseId}</div>
      </div>
    );
  }

  const progressPct = targetReps ? Math.min(1, reps / targetReps) : (metrics?.elapsedMs && phase?.duration ? Math.min(1, metrics.elapsedMs / (phase.duration * 1000)) : 0);

  return (
    <div style={{ width: '100%', background: INK, border: `1px solid ${OLIVE}`, borderRadius: 14, overflow: 'hidden' }}>
      {/* HUD */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, padding: 8, background: `linear-gradient(180deg, ${INK_2} 0%, ${INK} 100%)`, borderBottom: `1px solid ${OLIVE}33` }}>
        <div className="o40-glass" style={{ borderRadius: 10, padding: '6px 8px', textAlign: 'center' }}>
          <div className="o40-mono" style={{ color: STEEL, fontSize: 8 }}>{tCoach('coach.time', normLang)}</div>
          <div className="o40-display" style={{ color: PAPER, fontSize: 16, lineHeight: 1 }}>{fmtMs(metrics?.elapsedMs ?? 0)}</div>
        </div>
        <div className="o40-glass" style={{ borderRadius: 10, padding: '6px 8px', textAlign: 'center' }}>
          <div className="o40-mono" style={{ color: STEEL, fontSize: 8 }}>{tCoach('coach.rep', normLang)}</div>
          <div key={reps} className="o40-display o40-pop" style={{ color: BLAZE, fontSize: 16, lineHeight: 1 }}>{reps}{targetReps ? ` / ${targetReps}` : ''}</div>
          {targetReps ? (
            <div style={{ display: 'flex', gap: 2, marginTop: 4, height: 5 }}>
              {Array.from({ length: targetReps }).map((_, i) => (
                <div key={i} style={{ flex: 1, borderRadius: 2, overflow: 'hidden', background: OLIVE + '55' }}>
                  <div style={{ width: '100%', height: '100%', background: i < reps ? BLAZE : 'transparent', transition: 'background 0.25s ease' }} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ height: 4, background: OLIVE + '55', borderRadius: 2, marginTop: 4, overflow: 'hidden' }}>
              <div style={{ width: `${Math.round(progressPct * 100)}%`, height: '100%', background: BLAZE, transition: 'width 0.3s' }} />
            </div>
          )}
        </div>
        <div className="o40-glass" style={{ borderRadius: 10, padding: '6px 8px', textAlign: 'center' }}>
          <div className="o40-mono" style={{ color: STEEL, fontSize: 8 }}>{tCoach('coach.form', normLang)}</div>
          <div style={{ position: 'relative', width: 40, height: 40, margin: '2px auto 0' }}>
            <svg viewBox="0 0 40 40" width={40} height={40}>
              <circle cx="20" cy="20" r="16" fill="none" stroke={OLIVE} strokeOpacity="0.4" strokeWidth="3.5" />
              <circle
                cx="20" cy="20" r="16" fill="none"
                stroke={qColor(formVal)} strokeWidth="3.5" strokeLinecap="round"
                strokeDasharray={`${(formVal / 100) * (2 * Math.PI * 16)} ${2 * Math.PI * 16}`}
                transform="rotate(-90 20 20)"
                style={{ transition: 'stroke-dasharray 0.4s ease, stroke 0.3s ease' }}
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
              <span className="o40-display" style={{ color: qColor(formVal), fontSize: 13, lineHeight: 1 }}>{formVal}</span>
            </div>
          </div>
          <div className="o40-mono" style={{ color: formVal > 68 ? '#7FB069' : BLAZE, fontSize: 7 }}>{statusText}</div>
        </div>
      </div>

      {!isHold && (metrics?.repQualityHistory?.length ?? 0) > 0 && (
        <div style={{ padding: '6px 8px', borderBottom: `1px solid ${OLIVE}22`, background: `${INK_2}88` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
            <span className="o40-mono" style={{ color: STEEL, fontSize: 8 }}>{tCoach('coach.perRep', normLang)}</span>
            <span className="o40-mono" style={{ color: KHAKI, fontSize: 8 }}>{tCoach('coach.trend', normLang)}</span>
          </div>
          <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 22 }}>
            {metrics!.repQualityHistory!.slice(-14).map((q, i) => (
              <div
                key={`${reps}-${i}`}
                title={`${q}%`}
                className="o40-eqbar"
                style={{ height: `${Math.max(14, (q / 100) * 100)}%`, backgroundColor: qColor(q), opacity: 0.85, flex: 1, boxShadow: i === metrics!.repQualityHistory!.length - 1 ? `0 0 6px ${qColor(q)}88` : 'none' }}
              />
            ))}
          </div>
        </div>
      )}

      {metrics && poseQuality < 42 && (
        <div style={{ margin: '8px 8px 0', padding: '6px 8px', borderRadius: 8, background: `${BLAZE}1A`, border: `1px solid ${BLAZE}55`, color: PAPER, fontSize: 11, textAlign: 'center' }}>
          {lang === 'it' ? 'Allontanati così vedo tutto il corpo.' : lang === 'de' ? 'Geh zurück, damit ich deinen ganzen Körper sehe.' : 'Move back so I can see your whole body.'}
        </div>
      )}
      {metrics && activeCues.length > 0 && formVal < 68 && (
        <div style={{ margin: '8px 8px 0', padding: '6px 8px', borderRadius: 8, background: `${BLAZE}10`, border: `1px solid ${BLAZE}44` }}>
          <div className="o40-mono" style={{ color: BLAZE, fontSize: 8, marginBottom: 4 }}>{tCoach('coach.correct', normLang)}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {activeCues.map(cue => (
              <span key={cue} className="o40-mono" style={{ background: `${BLAZE}22`, color: PAPER, fontSize: 9, padding: '3px 7px', borderRadius: 20, border: `1px solid ${BLAZE}55` }}>
                {localizedCue(cue, normLang as any)}
              </span>
            ))}
          </div>
        </div>
      )}
      {coachingText && (
        <div key={coachingText} className="o40-pop" style={{ margin: '8px 8px 0', padding: '8px 10px', borderRadius: 10, background: `${BLAZE}14`, border: `1px solid ${BLAZE}55`, color: PAPER, fontSize: 12, textAlign: 'center' }}>
          {coachingText}
        </div>
      )}

      <div className="o40-ai-stage" style={{ position: 'relative', width: '100%', aspectRatio: '4/3', background: '#050608', marginTop: coachingText ? 8 : 0 }}>
        <video ref={videoRef} autoPlay muted playsInline webkit-playsinline="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)', background: '#000' }} />
        <canvas ref={canvasRef} width={640} height={480} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)', pointerEvents: 'none' }} />
        {reps === 0 && status === 'running' && (metrics?.currentPhase === 'ready' || metrics?.currentPhase === 'idle' || !metrics) && (
          <PositioningMask exerciseId={exerciseId} landmarks={engineRef.current?.getLastResult()?.landmarks ?? null} lang={lang} width={640} height={480} />
        )}
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
          <span className="o40-mono" style={{ background: `${INK}DD`, color: poseQuality > 60 ? '#7FB069' : poseQuality > 40 ? '#D4A017' : BLAZE, fontSize: 9, padding: '3px 7px', borderRadius: 20, border: `1px solid ${OLIVE}55` }}>POSE {poseQuality}%</span>
          <span className={`o40-mono ${status === 'running' && (metrics?.currentPhase === 'idle' || metrics?.currentPhase === 'ready') ? 'o40-blink' : ''}`} style={{ background: formVal > 68 ? '#7FB069DD' : `${BLAZE}DD`, color: PAPER, fontSize: 9, padding: '3px 8px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{metrics?.currentPhase ?? 'idle'}</span>
        </div>
      </div>
      <div style={{ padding: '6px 8px', background: INK_2, borderTop: `1px solid ${OLIVE}22`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="o40-mono" style={{ color: STEEL, fontSize: 9 }}>{isHold ? tCoach('coach.holdPosition', normLang) : `${tCoach('coach.rep', normLang)} ${reps}${targetReps ? `/${targetReps}` : ''} · ${formVal}/100`}</span>
        {!isHold && avgRepSec != null && reps > 0 && (
          <span className="o40-mono" style={{ color: KHAKI, fontSize: 8 }} title="Ritmo medio per ripetizione">⌁ {avgRepSec < 10 ? avgRepSec.toFixed(1) : Math.round(avgRepSec)}s</span>
        )}
        {!isHold && (
          <span className="o40-mono" title="Confidenza dell'ultimo movimento rilevato — sotto ~62 la rep non viene contata" style={{ color: (metrics?.liveRepConfidence ?? 0) > 62 ? '#7FB069' : STEEL, fontSize: 8 }}>CONF {metrics?.liveRepConfidence ?? 0}</span>
        )}
        <span className="o40-mono" style={{ color: KHAKI, fontSize: 8 }}>AI · {exerciseId} · {fmtMs(metrics?.elapsedActiveMs ?? 0)} active</span>
      </div>
    </div>
  );
}
