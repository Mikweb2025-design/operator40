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

export const CHANGELOG_VERSION = '2.8.4';
export const CHANGELOG_STORAGE_KEY = `o40_changelog_${CHANGELOG_VERSION}`;

type Lang = 'it' | 'en' | 'de';

interface Props {
  lang?: Lang;
  onClose: () => void;
  onTry?: () => void;
}

const COPY: Record<Lang, any> = {
  it: {
    badge: 'NUOVO v2.8.4',
    title: 'Sessione tracking — 7 fix in 1 giorno',
    subtitle: 'v2.8.4 · 26 Agosto 2026 · Framing + pose + conteggio — 100% offline',
    intro: 'Giornata intera di debug col replay dei tuoi landmarks reali: framing frontale che non blocca più, angoli stabili in side-view, blocco “idle” eliminato e bug root del conteggio risolto. Tutto verificato con i tuoi file landmarks-squat-*.json (0→7 rep).',
    groups: [
      {
        icon: '📐',
        title: '1. Framing frontale — caviglie non bloccano più',
        items: [
          'Problema: con la selfie-camera (FOV stretta) dovevi allontanarti troppo; se i piedi uscivano dal frame, il tracking si metteva in pausa per “pose bassa”.',
          'Fix: rimosso gate caviglie (27/28) da requiredLandmarks in 10 esercizi: squat, affondo, wallsit, pushup, legRaise, deadBug, flutterKick, mountainClimber, vUp, ponte',
          'Geometria invariata: l’angolo ginocchio/tronco usa ancora le caviglie quando visibili — tolto solo il blocco',
        ],
      },
      {
        icon: '👁️',
        title: '2. Side-view stabile — angolo bilaterale visibility-aware',
        items: [
          'Problema: 16/22 analyzer mediavano (sx+dx)/2 senza guardare la visibilità → in side-view il lato occluso (vis. bassa, stima “indovinata”) distorceva l’angolo',
          'Fix: nuovo helper bilateralJointAngle() — EMA visibilità α0.35 + isteresi 0.12 per cambio lato + hold ultimo lato buono',
          'Applicato a 16 esercizi, pulizia duplicate knee()/trunk() in squat/pushup + ricalcolo unico in legRaise/vUp',
        ],
      },
      {
        icon: '🔓',
        title: '3. “Resta in idle” — badge e hint corretti',
        items: [
          'Causa: FitnessEngine calcolava POSE% con lista generica (con caviglie) anche quando l’analyzer ne usava una ridotta + banner “Allontanati” nascosto proprio in idle (condizione invertita)',
          'Fix: POSE% ora usa analyzer.requiredLandmarks; rimossa condizione currentPhase!=idle in SessionAIOverlay + FitnessEngineView',
          'Estese le caviglie rimosse ad altri 6 a terra (vedi sopra) — risolto lo stesso gate anche lì',
        ],
      },
      {
        icon: '🐛',
        title: '4. Bug root: STANDING/TOP senza uscita → conteggio bloccato',
        items: [
          'Trovato col replay landmarks reali (1200 frame): un colpo a vuoto iniziale lasciava phase=STANDING per sempre — reset a READY solo su rep riuscita',
          'Stesso schema in 7 analyzer: squat(STANDING), pushup(TOP), crunch(EXTENDED), legRaise(DOWN), vUp(EXTENDED), ponte(DOWN), affondo(STANDING)',
          'Fix: reset a READY + azimuth trough/peak anche su rep non contata — prima 0 rep, dopo 7 rep sugli stessi dati + test regressione',
        ],
      },
      {
        icon: '📏',
        title: '5. Squat — hipY calibrato per sessione',
        items: [
          'Problema: soglia fissa hipY 0.55 per “sei abbastanza vicino” non adatta a tutte le altezze/distances',
          'Fix: calibrazione hipY nei primi 300ms della sessione (media dei frame iniziali) invece di soglia fissa',
          'Elimina flicker di fase spurio a inizio sessione',
        ],
      },
      {
        icon: '🔍',
        title: '6. Diagnostica + fix DEBUG',
        items: [
          'Nuovo badge CONF live nell’HUD (repConfidence) per capire al volo se la rep è “scarsa” o “bloccata”',
          'Fix crash pannello ◇ DEBUG: ReferenceError INK_2 (colore non importato) → app non crasha più aprendo AI ENGINE',
          'LandmarkRecorder ◯ REC → landmarks-*.json: il replay offline è il modo più rapido per replicare un bug reale',
        ],
      },
      {
        icon: '⚡',
        title: '7. Affinamento 22 esercizi (mattina)',
        items: [
          'Loop 10 giri perfezionamento: squat/pushup/affondo soglie shallow, PoseQuality 38 side-view, hold grace 500ms, normalizzazione torsoLength',
          'Burpee/jumpingJack adaptive + jitter 28fps stabilizzato — harness 7/7 PASS, 22/22 smoke OK',
        ],
      },
    ],
    cta: 'PROVA ORA',
    ctaHint: 'Home → Missione → Avvia · verifica su https://mikweb.eu/operator40/ con iPhone frontale',
    dismiss: 'Non mostrare più',
    close: 'Chiudi',
    footer: 'Tutto on-device (IndexedDB, MediaPipe mai su server). Per replay: ◯ REC durante sessione → ↓ JSON → test analyzer. Docs completi in docs/FIX-tracking-2026-08-26.md',
  },
  en: {
    badge: 'NEW v2.8.4',
    title: 'Tracking session — 7 fixes in one day',
    subtitle: 'v2.8.4 · Aug 26 2026 · Framing + pose + counting — 100% offline',
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
    badge: 'NEU v2.8.4',
    title: 'Tracking-Session — 7 Fixes an einem Tag',
    subtitle: 'v2.8.4 · 26. Aug 2026 · Framing + Pose + Zählung — 100% offline',
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
