import React, { useState, useEffect } from 'react';
import { useT } from '../context/LangContext.jsx';
import {
  INK,
  INK_2,
  PAPER,
  OLIVE,
  OLIVE_DARK,
  KHAKI,
  BLAZE,
  BLAZE_DEEP,
  STEEL,
} from '../constants/theme.js';
import { tr } from '../i18n.js';
import { LOCALES } from '../i18n.js';
import { EXERCISES } from '../data/exercises.js';
import { formatTime } from '../utils/date.js';
import { playBeep, vibrate, speak } from '../utils/audio.js';
import { getVocalMotivation } from '../utils/motivation.js';
import { requestWakeLock, releaseWakeLock } from '../utils/wakeLock.js';
import SessionAIOverlay from '../components/SessionAIOverlay.tsx';
import FitnessEngineView from '../components/FitnessEngineView.tsx';
import { ExerciseFigure } from '../components/ExerciseFigure.jsx';
import TopBar from '../components/layout/TopBar.jsx';
import {
  Play,
  Pause,
  SkipForward,
  X,
  Eye,
  Volume2,
  VolumeX,
  Music,
  Music2,
  HeadphoneOff,
  Wind,
  Lightbulb,
  Check,
  ChevronLeft,
} from 'lucide-react';
import ProgressRing from '../components/ui/ProgressRing.jsx';
import SegmentedProgress from '../components/ui/SegmentedProgress.jsx';
import { primaryBtn, secondaryBtn, btnIcon, iconCircle, pillBtn } from '../components/ui/styles.js';
let _mediaPromise = null;
function getMediaMap() {
  if (!_mediaPromise)
    _mediaPromise = import('../media.js').then((m) => ({ b64: m.VIDEO_B64, files: m.VIDEO_FILES }));
  return _mediaPromise;
}
function ExerciseMedia({ exerciseId, pose, color = BLAZE, size = '100%', rounded = 10 }) {
  const [src, setSrc] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let cancelled = false;
    setSrc(null);
    setVideoSrc(null);
    setFailed(false);
    getMediaMap()
      .then(({ b64, files }) => {
        if (cancelled) return;
        const clip = files[exerciseId] || files[pose] || null;
        setVideoSrc(clip);
        if (!clip) setSrc(b64[exerciseId] || b64[pose] || null);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [exerciseId]);
  if (videoSrc && !failed)
    return (
      <video
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onError={() => setFailed(true)}
        style={{
          width: size,
          height: size,
          objectFit: 'cover',
          borderRadius: rounded,
          display: 'block',
          background: INK,
        }}
      />
    );
  if (src && !failed)
    return (
      <img
        src={src}
        alt=""
        onError={() => setFailed(true)}
        style={{
          width: size,
          height: size,
          objectFit: 'cover',
          borderRadius: rounded,
          display: 'block',
          background: INK,
        }}
      />
    );
  return <ExerciseFigure pose={pose} color={color} size={size} />;
}
function EqBars({ tone = BLAZE, bars = 5, speed = 1, style }) {
  return (
    <div
      style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 14, ...style }}
      aria-hidden="true"
    >
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="o40-eqbar"
          style={{
            width: 3,
            background: tone,
            height: 8,
            animation: `eqPulse ${(0.55 + (i % 3) * 0.18) / speed}s ease-in-out ${i * 0.08}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ================= SESSION SCREEN ================= */
function SessionScreen({
  program,
  profile,
  seq,
  phaseIdx,
  secondsLeft,
  paused,
  setPaused,
  soundOn,
  setSoundOn,
  musicOn,
  onToggleMusic,
  aiEnabled,
  onToggleAi,
  vocalMotivation,
  lang: langProp,
  onSkip,
  onPrev,
  onAiPhaseComplete,
  exitConfirm,
  setExitConfirm,
  onExit,
}) {
  const { lang: ctxLang, t } = useT();
  const lang = langProp ?? ctxLang;
  const phase = seq[phaseIdx];
  const next = seq[phaseIdx + 1];
  const ex = phase.exerciseId ? EXERCISES[phase.exerciseId] : null;
  const nextEx = next && next.exerciseId ? EXERCISES[next.exerciseId] : null;
  const isRepsWork = phase.type === 'work' && phase.mode === 'reps';
  const isAiWork = aiEnabled && phase.type === 'work' && !!phase.exerciseId;
  const progress = isRepsWork ? 1 : phase.duration ? 1 - secondsLeft / phase.duration : 0;
  useEffect(() => {
    if (
      soundOn &&
      profile &&
      profile.voiceCountdown &&
      secondsLeft <= 3 &&
      secondsLeft > 0 &&
      phase.type === 'work' &&
      !isRepsWork
    )
      speak(String(secondsLeft), lang, LOCALES);
  }, [secondsLeft, phase.type, soundOn, profile, isRepsWork]);

  // Motivazioni vocali periodiche durante il lavoro (anche SENZA AI Coach).
  // Non si attiva quando l'AI Coach parla già, né sulle fasi reps manuali.
  // Intervallo = metà della durata della fase (default 40s → nudge a ~20s),
  // così la frase arriva davvero durante un esercizio a tempo standard.
  useEffect(() => {
    if (
      !soundOn ||
      !vocalMotivation ||
      paused ||
      phase.type !== 'work' ||
      isAiWork ||
      isRepsWork
    )
      return;
    const duration = phase.duration || 40;
    if (duration < 12) return;
    const interval = setInterval(() => {
      if (document.hidden) return;
      speak(getVocalMotivation(lang), lang, LOCALES);
    }, Math.round(duration / 2) * 1000);
    return () => clearInterval(interval);
  }, [soundOn, vocalMotivation, paused, phase.type, phase.duration, isAiWork, isRepsWork, lang]);
  useEffect(() => {
    requestWakeLock();
    function onVis() {
      if (!document.hidden) requestWakeLock();
    }
    document.addEventListener('visibilitychange', onVis);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      releaseWakeLock();
    };
  }, []);

  const phaseLabel =
    phase.type === 'warmup'
      ? t('ses.warmup')
      : phase.type === 'cooldown'
        ? t('ses.cooldown')
        : phase.type === 'rest'
          ? t('ses.rest')
          : t('ses.round', { r: phase.round, name: tr(ex.name, lang).toUpperCase() });

  const ringColor = phase.type === 'rest' ? OLIVE : phase.type === 'work' ? BLAZE : KHAKI;
  const doneWork = seq.slice(0, phaseIdx).filter((p) => p.type === 'work').length;
  const totalWork = seq.filter((p) => p.type === 'work').length;
  const elapsedSec =
    seq.slice(0, phaseIdx).reduce((a, p) => a + (p.duration || (p.reps ? p.reps * 3 : 0)), 0) +
    (phase.duration ? phase.duration - secondsLeft : 0);

  return (
    <div className="o40-screen-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar
        title={tr(program.name, lang)}
        onBack={() => setExitConfirm(true)}
        right={
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {musicOn && (
              <EqBars
                tone={ringColor}
                bars={4}
                speed={phase.type === 'work' ? 1.4 : phase.type === 'rest' ? 0.5 : 0.8}
                style={{ marginRight: 6, height: 12 }}
              />
            )}
            <button
              onClick={onToggleAi}
              title={aiEnabled ? 'AI Coach ON' : 'AI Coach OFF'}
              style={{
                ...btnIcon,
                border: `1px solid ${aiEnabled ? BLAZE : 'transparent'}`,
                borderRadius: 8,
                background: aiEnabled ? `${BLAZE}22` : 'transparent',
              }}
            >
              {aiEnabled ? <Eye size={16} color={BLAZE} /> : <Eye size={16} color={STEEL} />}
            </button>
            <button onClick={onToggleMusic} style={btnIcon} aria-label={t('ses.music')}>
              {musicOn ? (
                <Music2 size={18} color={BLAZE} />
              ) : (
                <HeadphoneOff size={18} color={STEEL} />
              )}
            </button>
            <button onClick={() => setSoundOn(!soundOn)} style={btnIcon}>
              {soundOn ? <Volume2 size={18} color={PAPER} /> : <VolumeX size={18} color={STEEL} />}
            </button>
          </div>
        }
      />

      <div style={{ padding: '10px 16px 0' }}>
        <SegmentedProgress
          total={seq.length}
          current={phaseIdx}
          currentProgress={progress}
          color={ringColor}
        />
        <div
          style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}
          className="o40-mono"
        >
          <span style={{ color: STEEL, fontSize: 11 }}>
            {t('ses.elapsed', { t: formatTime(elapsedSec) })}
          </span>
          <span style={{ color: STEEL, fontSize: 11 }}>
            {t('ses.ex', { a: doneWork, b: totalWork })}
          </span>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          padding: 16,
        }}
      >
        <div
          key={phaseIdx}
          className={`o40-mono o40-expand ${phase.type === 'work' ? 'o40-gradtext' : ''}`}
          style={{ color: ringColor, fontSize: 13, letterSpacing: '0.1em' }}
        >
          {phaseLabel}
        </div>

        {isAiWork ? (
          <div style={{ width: '100%', maxWidth: 420 }}>
            <SessionAIOverlay
              key={`${phase.exerciseId}-${phaseIdx}`}
              phase={phase}
              lang={lang}
              levelKey={profile?.level ?? 'combattente'}
              aiEnabled={aiEnabled}
              onCompletePhase={({ reps, avgQuality }) => {
                if (soundOn) playBeep(880);
                if (vibrate) vibrate([30]);
                onAiPhaseComplete?.({ exerciseId: phase.exerciseId, reps, avgQuality });
                onSkip();
              }}
              onRep={() => {}}
            />
            <div
              className="o40-mono"
              style={{ color: STEEL, fontSize: 9, textAlign: 'center', marginTop: 6 }}
            >
              {aiEnabled
                ? lang === 'it'
                  ? 'AI Coach attivo — conta automatico, voce nella tua lingua'
                  : 'AI Coach on — auto-count, voice in your language'
                : ''}
            </div>
          </div>
        ) : (
          <>
            <div className="o40-hud" style={{ position: 'relative', width: 240, height: 240 }}>
              <span className="o40-hud-corner" />
              <span className="o40-hud-corner bl" />
              <div
                style={{
                  position: 'absolute',
                  inset: -18,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${ringColor}30 0%, transparent 70%)`,
                  transition: 'background 0.3s ease',
                  animation:
                    phase.type === 'rest' ? 'restBreath 2.4s ease-in-out infinite' : 'none',
                }}
              />
              {phase.type === 'work' && (
                <div
                  style={{
                    position: 'absolute',
                    inset: -10,
                    borderRadius: '50%',
                    border: `2px solid ${ringColor}44`,
                    animation: 'ringPulse 1.5s ease-out infinite',
                  }}
                />
              )}
              <ProgressRing progress={progress} color={ringColor} />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {ex ? (
                  <div style={{ width: 150, height: 150 }}>
                    <ExerciseMedia
                      exerciseId={phase.exerciseId}
                      pose={ex.pose}
                      color={PAPER}
                      rounded={14}
                    />
                  </div>
                ) : (
                  <div className="o40-display" style={{ color: PAPER, fontSize: 44 }}>
                    {formatTime(secondsLeft)}
                  </div>
                )}
              </div>
            </div>
            {ex && (
              <div style={{ textAlign: 'center' }}>
                {isRepsWork ? (
                  <>
                    <div
                      className="o40-display"
                      style={{ color: PAPER, fontSize: 48, lineHeight: 1 }}
                    >
                      ×{phase.reps}
                    </div>
                    <div
                      className="o40-mono"
                      style={{ color: KHAKI, fontSize: 11, letterSpacing: '0.08em' }}
                    >
                      {lang === 'it' ? 'RIPETIZIONI' : 'REPS'}
                    </div>
                    <div style={{ marginTop: 8, color: BLAZE, fontSize: 11, fontWeight: 600 }}>
                      {lang === 'it' ? 'Tocca FATTO quando hai finito' : 'Tap DONE when finished'}
                    </div>
                  </>
                ) : (
                  <div className="o40-display" style={{ color: PAPER, fontSize: 40 }}>
                    {formatTime(secondsLeft)}
                  </div>
                )}
              </div>
            )}
          </>
        )}
        {ex && (
          <div style={{ textAlign: 'center', maxWidth: 330 }}>
            <div style={{ color: KHAKI, fontSize: 13 }}>
              {isRepsWork
                ? `${phase.reps}× ${tr(ex.name, lang)} — ${tr(ex.repGuide, lang)}`
                : tr(ex.repGuide, lang)}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                marginTop: 8,
                textAlign: 'left',
              }}
            >
              {ex.steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                  <span className="o40-mono" style={{ color: KHAKI, fontSize: 10.5, minWidth: 15 }}>
                    {i + 1}.
                  </span>
                  <span style={{ color: STEEL, fontSize: 12, lineHeight: 1.4 }}>{tr(s, lang)}</span>
                </div>
              ))}
            </div>
            {ex.breath && (
              <div
                style={{
                  display: 'flex',
                  gap: 7,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 9,
                  color: OLIVE,
                }}
              >
                <Wind size={13} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 11.5, fontStyle: 'italic', lineHeight: 1.4 }}>
                  {tr(ex.breath, lang)}
                </span>
              </div>
            )}
            {ex.tip40 && (
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  alignItems: 'flex-start',
                  marginTop: 10,
                  textAlign: 'left',
                  background: `${KHAKI}10`,
                  border: `1px solid ${KHAKI}44`,
                  borderRadius: 10,
                  padding: '8px 10px',
                }}
              >
                <Lightbulb size={14} color={KHAKI} style={{ flexShrink: 0, marginTop: 1 }} />
                <div style={{ color: KHAKI, fontSize: 11.5, lineHeight: 1.45 }}>
                  {tr(ex.tip40, lang)}
                </div>
              </div>
            )}
          </div>
        )}

        {phase.type === 'rest' && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              marginTop: 4,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: OLIVE,
                opacity: 0.9,
                animation: 'restBreath 3.2s ease-in-out infinite',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Wind size={16} color={PAPER} />
            </div>
            <span
              className="o40-mono"
              style={{ color: KHAKI, fontSize: 10, letterSpacing: '0.08em' }}
            >
              {lang === 'it'
                ? 'Respira — 4 sec in, 4 sec out'
                : lang === 'de'
                  ? 'Atmen — 4s ein, 4s aus'
                  : 'Breathe — 4s in, 4s out'}
            </span>
          </div>
        )}
        <div
          className="o40-card-glass"
          style={{
            color: STEEL,
            fontSize: 12,
            marginTop: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            borderRadius: 10,
            padding: '7px 12px',
          }}
        >
          {next ? (
            <>
              {next.exerciseId && (
                <div style={{ width: 26, height: 26, flexShrink: 0 }}>
                  <ExerciseFigure
                    pose={EXERCISES[next.exerciseId].pose}
                    color={KHAKI}
                    size="100%"
                  />
                </div>
              )}
              <span>
                {t('ses.next', {
                  name:
                    next.type === 'work'
                      ? tr(nextEx.name, lang)
                      : next.type === 'rest'
                        ? t('ses.next.rest')
                        : t('ses.next.cooldown'),
                })}
              </span>
            </>
          ) : (
            t('ses.last')
          )}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 12,
          padding: '10px 20px 8px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={() => setPaused(!paused)}
          style={{
            ...iconCircle,
            width: 74,
            height: 74,
            background: BLAZE,
            animation: paused ? 'glowPulse 1.6s ease-in-out infinite' : 'none',
          }}
          aria-label={paused ? t('ses.resume') : t('ses.pause')}
        >
          {paused ? <Play size={30} color={PAPER} /> : <Pause size={30} color={PAPER} />}
        </button>
      </div>
      <div style={{ display: 'flex', gap: 10, padding: '0 20px 20px' }}>
        <button
          onClick={onPrev}
          disabled={phaseIdx === 0}
          style={{ ...pillBtn, opacity: phaseIdx === 0 ? 0.4 : 1 }}
        >
          <ChevronLeft size={15} /> PREV
        </button>
        <button
          onClick={onSkip}
          style={{
            ...pillBtn,
            background: isAiWork ? `${OLIVE}88` : isRepsWork ? BLAZE : pillBtn.background,
            color: isAiWork ? KHAKI : isRepsWork ? PAPER : undefined,
            fontWeight: isRepsWork || isAiWork ? 700 : undefined,
            flex: isRepsWork || isAiWork ? 1.6 : 1,
            opacity: isAiWork ? 0.9 : 1,
          }}
          title={
            isAiWork
              ? lang === 'it'
                ? 'AI conta auto — puoi saltare manualmente'
                : 'AI auto-count — you can skip manually'
              : undefined
          }
        >
          {isAiWork
            ? lang === 'it'
              ? 'SALTA →'
              : 'SKIP →'
            : isRepsWork
              ? lang === 'it'
                ? 'FATTO ✓'
                : 'DONE ✓'
              : 'NEXT'}{' '}
          {isAiWork ? (
            <SkipForward size={15} />
          ) : isRepsWork ? (
            <Check size={16} />
          ) : (
            <SkipForward size={15} />
          )}
        </button>
      </div>
      {isAiWork && (
        <div
          className="o40-mono"
          style={{ color: STEEL, fontSize: 9, textAlign: 'center', paddingBottom: 8 }}
        >
          {lang === 'it'
            ? 'AI avanzerà da solo al target · disattiva con 👁️'
            : 'AI will auto-advance at target · disable with 👁️'}
        </div>
      )}

      {exitConfirm && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(27,29,22,0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <div
            style={{
              background: INK_2,
              border: `1px solid ${OLIVE}`,
              borderRadius: 14,
              padding: 22,
              maxWidth: 320,
              textAlign: 'center',
            }}
          >
            <div className="o40-display" style={{ color: PAPER, fontSize: 22, marginBottom: 8 }}>
              {t('ses.quit.title')}
            </div>
            <div style={{ color: STEEL, fontSize: 13, marginBottom: 18 }}>{t('ses.quit.body')}</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setExitConfirm(false)} style={{ ...secondaryBtn, flex: 1 }}>
                {t('ses.quit.continue')}
              </button>
              <button onClick={onExit} className="o40-cta" style={{ ...primaryBtn, flex: 1 }}>
                {t('ses.quit.exit')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default SessionScreen;
