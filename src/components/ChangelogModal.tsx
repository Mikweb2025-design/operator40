/**
 * Operator40 — Changelog Modal (v2.7 · AI Fitness Engine)
 * Popup that shows all new features added in this release.
 * - Auto-opens once per version (localStorage o40_changelog_<version>)
 * - Manual open via VersionBadge click
 * - iOS Safari / PWA friendly, military dark theme
 */
import React from 'react';
import { INK, INK_2, PAPER, OLIVE, OLIVE_DARK, KHAKI, BLAZE, BLAZE_DEEP, STEEL } from '../constants/theme.js';
import { Sparkles, X, Zap, Eye, Mic, Timer, Target, Activity, Layers, Cpu, Smartphone } from 'lucide-react';

export const CHANGELOG_VERSION = '2.7.2';
export const CHANGELOG_STORAGE_KEY = `o40_changelog_${CHANGELOG_VERSION}`;

type Lang = 'it' | 'en' | 'de';

interface Props {
  lang?: Lang;
  onClose: () => void;
  onTry?: () => void;
}

const COPY: Record<Lang, any> = {
  it: {
    badge: 'FIX v2.7.2',
    title: 'AI Fitness Engine · Rilevamento stabilizzato',
    subtitle: 'v2.7.2 · 25-30 FPS · Auto-calibrazione · 100% offline',
    intro: 'Fix rilevamento: ora conta anche mezze ripetizioni over-40, riconosce inizio/fine esercizio automatico, feedback “Scendi ancora / Braccia completamente distese” in tempo reale — nessun video sul server.',
    groups: [
      {
        icon: '🔧',
        title: 'Fix rilevamento (NUOVO v2.7.2)',
        items: [
          'Soglie più permissive + auto-calibrazione ROM nei primi 1.2s (impara la tua escursione reale)',
          'Scelta lato migliore (visibility) per camera laterale + OneEuro per-esercizio (0.75 hold / 1.35 burpee)',
          'Gate visibility 0.38 + timestamp video*1000 per Safari + isteresi calibrata — zero doppi conteggi',
        ],
      },
      {
        icon: '🧠',
        title: 'Motore AI client-side',
        items: [
          'Google MediaPipe Tasks Vision — Pose Landmarker Lite (GPU su iPhone, fallback CPU) — 33 landmark',
          'Nessun upload video (privacy 100%), soglie detection 0.45 per luce bassa iPhone',
          'PWA 25-30 FPS garantiti: rAF + inferenza throttled 28→22 fps, nessuna immagine al server',
        ],
      },
      {
        icon: '🏋️',
        title: '13 esercizi con analisi articolare',
        items: [
          'Push-up, squat, crunch, plank, mountain climber, jumping jack, flutter kicks, bicycle crunch, leg raise, dead bug, heel taps, V-up, burpee',
          'Angoli in tempo reale: ginocchio (hip-knee-ankle), gomito (shoulder-elbow-wrist), anca, busto',
          'Calcolo direzione e velocità (°/s) per distinguere controllo vs. slancio',
        ],
      },
      {
        icon: '🔁',
        title: 'Conteggio ripetizioni + timer intelligente',
        items: [
          'State machine configurabile: idle → ready → down → bottom → up → rep_completed',
          'Isteresi anti-rimbalzo (banda 5-12°) + dwell times (120-340 ms) — zero doppi conteggi',
          'Timer parte al primo movimento, traccia tempo totale e tempo attivo (esclude idle)',
        ],
      },
      {
        icon: '⭐',
        title: 'Quality Score 0-100 & coaching',
        items: [
          'Score per rep: forma 55% + ROM 30% + controllo velocità 15% → media mobile 5 rep',
          'Feedback live: “Schiena dritta”, “Ginocchia sopra le punte”, “Gomiti a 45°”, “Addome contratto”',
          'Cues localizzati it / en / de, con vibrazione aptica al completamento rep',
        ],
      },
      {
        icon: '〰️',
        title: 'Filtri e performance',
        items: [
          'One Euro Filter per landmark (x,y) → jitter eliminato senza lag — alternativa Kalman, più leggera',
          'requestAnimationFrame + inferenza throttled 28 fps (auto 22 fps se CPU calda) → batteria risparmiata',
          'Codice TypeScript modulare: FitnessEngine, PoseLandmarkerManager, LandmarkSmoother, SpeechCoach',
        ],
      },
      {
        icon: '🎤',
        title: 'Coach vocale + overlay scheletro',
        items: [
          'Sintesi vocale opzionale (Web Speech API) throttled 3 s — annuncia reps e correzioni',
          'Skeleton overlay su canvas (specchio) + badge angolo + barra qualità + FPS',
          'Pannello HUD: REPS / TIME / QUALITY + selezione esercizio live senza ricaricare il modello',
        ],
      },
    ],
    cta: 'PROVALO',
    ctaHint: 'Home → Conta squat (camera) · o da qualsiasi missione',
    dismiss: 'Non mostrare più',
    close: 'Chiudi',
    footer: 'Tutto gira sul dispositivo. Se vuoi offline 100%, copia wasm + modello in public/wasm (vedi docs/ENGINE.md).',
  },
  en: {
    badge: 'NEW',
    title: 'AI Fitness Engine',
    subtitle: 'v2.7 · On-device MediaPipe · 100% offline',
    intro: 'Your personal coach now sees you, counts and corrects — all on your phone, no video uploaded.',
    groups: [
      {
        icon: '🧠',
        title: 'On-device AI engine',
        items: [
          'Google MediaPipe Tasks Vision — Pose Landmarker Lite (GPU on iPhone, CPU fallback)',
          '33 landmarks in real time, no video upload (100% private)',
          'PWA optimized: iOS Safari 16.4+ & Android Chrome, works offline after first load',
        ],
      },
      {
        icon: '🏋️',
        title: '13 exercises with joint analysis',
        items: [
          'Push-up, squat, crunch, plank, mountain climber, jumping jack, flutter kicks, bicycle crunch, leg raise, dead bug, heel taps, V-up, burpee',
          'Real-time angles: knee, elbow, hip, trunk',
          'Direction & velocity (°/s) to tell control from momentum',
        ],
      },
      {
        icon: '🔁',
        title: 'Rep counting + smart timer',
        items: [
          'Configurable state machine: idle → ready → down → bottom → up → rep_completed',
          'Hysteresis band (5-12°) + dwell times (120-340 ms) — zero double counts',
          'Timer starts on first motion, tracks total & active time (excludes idle)',
        ],
      },
      {
        icon: '⭐',
        title: 'Quality Score 0-100 & coaching',
        items: [
          'Per-rep: form 55% + ROM 30% + velocity 15% → 5-rep moving avg',
          'Live cues: “Keep your back straight”, “Knees over toes”, “Elbows at 45°”, “Core tight”',
          'Localized it / en / de + haptic buzz on rep',
        ],
      },
      {
        icon: '〰️',
        title: 'Filters & performance',
        items: [
          'One Euro Filter per landmark (x,y) — jitter gone without lag (lighter than Kalman)',
          'requestAnimationFrame + throttled inference 28 fps (auto 22 if hot) → battery saved',
          'Clean TypeScript: FitnessEngine, PoseLandmarkerManager, LandmarkSmoother, SpeechCoach',
        ],
      },
      {
        icon: '🎤',
        title: 'Voice coach + skeleton overlay',
        items: [
          'Optional speech synthesis throttled 3 s — announces reps & fixes',
          'Mirrored canvas skeleton + angle badge + quality bar + FPS',
          'HUD: REPS / TIME / QUALITY + live exercise switcher',
        ],
      },
    ],
    cta: 'TRY IT',
    ctaHint: 'Home → Count squat (camera) · or from any mission',
    dismiss: "Don't show again",
    close: 'Close',
    footer: 'Everything runs on-device. For 100% offline, copy wasm + model to public/wasm (see docs/ENGINE.md).',
  },
  de: {
    badge: 'NEU',
    title: 'AI Fitness Engine',
    subtitle: 'v2.7 · MediaPipe on-device · 100% offline',
    intro: 'Dein persönlicher Coach sieht dich jetzt, zählt und korrigiert — alles auf dem Handy, kein Video-Upload.',
    groups: [
      {
        icon: '🧠',
        title: 'On-Device KI-Engine',
        items: [
          'Google MediaPipe Tasks Vision — Pose Landmarker Lite (GPU auf dem iPhone, CPU-Fallback)',
          '33 Landmarks in Echtzeit, kein Video-Upload (100% privat)',
          'PWA-optimiert: iOS Safari 16.4+ & Android Chrome, offline nach dem ersten Laden',
        ],
      },
      {
        icon: '🏋️',
        title: '13 Übungen mit Gelenkanalyse',
        items: [
          'Liegestütz, Kniebeuge, Crunch, Plank, Mountain Climber, Jumping Jack, Flutter Kicks, Bicycle Crunch, Beinheben, Dead Bug, Heel Taps, V-Up, Burpee',
          'Echtzeit-Winkel: Knie, Ellbogen, Hüfte, Rumpf',
          'Richtung & Geschwindigkeit (°/s) für Kontrolle vs. Schwung',
        ],
      },
      {
        icon: '🔁',
        title: 'Wiederholungszählung + Smart-Timer',
        items: [
          'Konfigurierbare State Machine: idle → ready → down → bottom → up → rep_completed',
          'Hysterese (5-12°) + Verweilzeiten (120-340 ms) — keine Doppelzählungen',
          'Timer startet bei erster Bewegung, trackt Gesamt- & Aktivzeit',
        ],
      },
      {
        icon: '⭐',
        title: 'Quality Score 0-100 & Coaching',
        items: [
          'Pro Rep: Form 55% + ROM 30% + Geschwindigkeit 15% → 5-Rep-Durchschnitt',
          'Live-Hinweise: „Rücken gerade halten“, „Knie über Fußspitzen“, „Ellbogen 45°“',
          'Lokalisiert it / en / de + Vibration bei Rep',
        ],
      },
      {
        icon: '〰️',
        title: 'Filter & Performance',
        items: [
          'One Euro Filter pro Landmark (x,y) — Zittern weg ohne Lag (leichter als Kalman)',
          'requestAnimationFrame + gedrosselte Inferenz 28 fps (auto 22 bei Hitze) → Akku gespart',
          'Sauberes TypeScript: FitnessEngine, PoseLandmarkerManager, LandmarkSmoother',
        ],
      },
      {
        icon: '🎤',
        title: 'Voice-Coach + Skelett-Overlay',
        items: [
          'Optionale Sprachsynthese gedrosselt 3 s — sagt Reps & Korrekturen an',
          'Gespiegeltes Skelett + Winkel-Badge + Qualitätsbalken + FPS',
          'HUD: REPS / TIME / QUALITY + Live-Übungswechsel',
        ],
      },
    ],
    cta: 'TESTEN',
    ctaHint: 'Home → Squat zählen (Kamera)',
    dismiss: 'Nicht mehr anzeigen',
    close: 'Schließen',
    footer: 'Alles läuft on-device. Für 100% offline: wasm + Modell nach public/wasm kopieren (docs/ENGINE.md).',
  },
};

export default function ChangelogModal({ lang = 'it', onClose, onTry }: Props) {
  const l = (['it', 'en', 'de'].includes(lang) ? lang : 'it') as Lang;
  const c = COPY[l];

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') handleClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function handleDismissForever() {
    try { localStorage.setItem(CHANGELOG_STORAGE_KEY, 'dismissed'); } catch {}
    onClose();
  }
  function handleClose() {
    try { localStorage.setItem(CHANGELOG_STORAGE_KEY, 'seen'); } catch {}
    onClose();
  }

  return (
    <div
      className="o40-changelog-mask"
      onClick={handleClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        background: 'rgba(5,6,8,0.78)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(560px, 96vw)', maxHeight: '90vh', overflow: 'hidden',
          background: `linear-gradient(180deg, ${INK_2} 0%, ${INK} 100%)`,
          border: `1px solid ${OLIVE}`, borderRadius: 18,
          boxShadow: '0 20px 60px rgba(0,0,0,0.65), 0 0 0 1px rgba(193,68,14,0.14) inset',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* header */}
        <div style={{ padding: '18px 18px 12px', borderBottom: `1px solid ${OLIVE}33`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.08, background: `repeating-linear-gradient(90deg, ${OLIVE} 0 1px, transparent 1px 14px)` }} />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`, display: 'grid', placeItems: 'center', boxShadow: `0 6px 18px ${BLAZE}66`, flexShrink: 0 }}>
                <Sparkles size={22} color={PAPER} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="o40-mono" style={{ background: BLAZE, color: PAPER, fontSize: 9, fontWeight: 800, letterSpacing: '0.08em', padding: '2px 6px', borderRadius: 6 }}>{c.badge}</span>
                  <span className="o40-mono" style={{ color: STEEL, fontSize: 10 }}>{CHANGELOG_VERSION} · AI ENGINE</span>
                </div>
                <div className="o40-display" style={{ color: PAPER, fontSize: 22, lineHeight: 1, marginTop: 4 }}>{c.title}</div>
                <div className="o40-mono" style={{ color: KHAKI, fontSize: 10, letterSpacing: '0.06em', marginTop: 2 }}>{c.subtitle}</div>
              </div>
            </div>
            <button onClick={handleClose} aria-label="Close" style={{ width: 32, height: 32, borderRadius: '50%', border: `1px solid ${OLIVE}`, background: INK, color: STEEL, display: 'grid', placeItems: 'center', cursor: 'pointer', flexShrink: 0 }}>
              <X size={16} />
            </button>
          </div>
          <div style={{ position: 'relative', marginTop: 10, color: KHAKI, fontSize: 12.5, lineHeight: 1.5, background: `${INK}AA`, border: `1px solid ${OLIVE}44`, borderRadius: 10, padding: '8px 10px' }}>
            {c.intro}
          </div>
        </div>

        {/* scrollable body */}
        <div style={{ overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          {c.groups.map((g: any, i: number) => (
            <div key={i} style={{ background: INK, border: `1px solid ${OLIVE}55`, borderRadius: 12, padding: '12px 12px', display: 'flex', gap: 10 }}>
              <div style={{ fontSize: 18, lineHeight: 1, flexShrink: 0, marginTop: 1 }}>{g.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="o40-mono" style={{ color: PAPER, fontSize: 11, fontWeight: 700, letterSpacing: '0.04em' }}>{g.title}</div>
                <ul style={{ margin: '6px 0 0', paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {g.items.map((it: string, j: number) => (
                    <li key={j} style={{ color: KHAKI, fontSize: 11.5, lineHeight: 1.45 }}>{it}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <div style={{ background: `${BLAZE}12`, border: `1px dashed ${BLAZE}55`, borderRadius: 10, padding: '10px 12px', color: STEEL, fontSize: 10.5, lineHeight: 1.4 }}>
            {c.footer}
          </div>
        </div>

        {/* footer CTAs */}
        <div style={{ padding: '12px 14px', borderTop: `1px solid ${OLIVE}33`, background: INK_2, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => { handleClose(); if (onTry) setTimeout(onTry, 150); }}
              style={{
                flex: 1, background: `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`, color: PAPER, border: 'none', borderRadius: 12,
                padding: '12px 14px', fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: '0.06em', cursor: 'pointer',
                boxShadow: `0 6px 18px ${BLAZE}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              <Zap size={16} /> {c.cta} <span style={{ opacity: 0.9 }}>→</span>
            </button>
          </div>
          <div className="o40-mono" style={{ color: STEEL, fontSize: 9, textAlign: 'center' }}>{c.ctaHint}</div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <button onClick={handleDismissForever} style={{ background: 'transparent', border: `1px solid ${OLIVE}`, color: STEEL, borderRadius: 20, padding: '6px 12px', fontSize: 11, cursor: 'pointer' }}>
              {c.dismiss}
            </button>
            <button onClick={handleClose} style={{ background: INK, border: `1px solid ${OLIVE}`, color: KHAKI, borderRadius: 20, padding: '6px 14px', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
              {c.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
