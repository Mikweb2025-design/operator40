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

export const CHANGELOG_VERSION = '2.9.0';
export const CHANGELOG_STORAGE_KEY = `o40_changelog_${CHANGELOG_VERSION}`;

type Lang = 'it' | 'en' | 'de';

interface Props {
  lang?: Lang;
  onClose: () => void;
  onTry?: () => void;
}

const COPY: Record<Lang, any> = {
  it: {
    badge: 'NUOVO v2.9.0',
    title: 'Audit completo — 5 aree + backup + PWA',
    subtitle: 'v2.9.0 · 27 Agosto 2026 · Codice, dati, UX, performance — 100% offline',
    intro: 'Audit completo come da tua richiesta (Fase 1 struttura/dati/performance/qualità/UX/privacy). 5 PR incrementali su branch separati, merge su main e deploy live. Nessuna logica kcal/streak toccata.',
    groups: [
      {
        icon: '📐',
        title: '1. Struttura — dedup UI (audit/3)',
        items: [
          'DogTag ×4, ProgressRing ×2, SegmentedProgress ×2, inputStyle/primaryBtn ×6 → src/components/ui/*',
          'TopBar + App dead code rimossi — Home 65 righe → shared, Session 19 righe → import',
          'Build 749k→444k base, chunk separati verificati',
        ],
      },
      {
        icon: '🌍',
        title: '2. i18n — 15+ hardcoded IT → I18N (audit/7)',
        items: [
          'Home: OGGI/PROGRESSI/MISSIONI/ACHIEVEMENTS/MISURAZIONI + streak break/risk + SETTIMANA/CONSISTENZA/MEDIA/PANCIA/SFIDA → t()',
          'Setup: Backup & Ripristino 5 ternari → t(setup.backup.*)',
          'Nuove chiavi: home.section.*, home.streak.*, home.week, setup.backup.*',
        ],
      },
      {
        icon: '🧪',
        title: '3. Qualità — test 30→51 (audit/5)',
        items: [
          'Nuovo src/utils/audit.test.js: belly (4), progress (5), bmi (4), body (3), backup (5) — 21 test',
          '30 → 51 test, coverage kcal/streak/belly prima non coperta',
          'CI verify/test/build già presenti, ora con più guard',
        ],
      },
      {
        icon: '⚡',
        title: '4. Performance — lazy 9 screens (audit/4)',
        items: [
          'App.jsx: 9 screen → React.lazy + Suspense + ScreenFallback',
          'Rimosso import recharts da App (History lazy) — index 749k→444k',
          'Chunk: History 73k, Home 71k, Session 48k, vite manualChunks invariato',
        ],
      },
      {
        icon: '📡',
        title: '5. PWA robust — SWR + SKIP_WAITING (audit/9)',
        items: [
          'sw.js: PRECACHE_SHELL (index+manifest+icons), message SKIP_WAITING, stale-while-revalidate',
          'Navigations network-first con fallback shell, asset cache-first con update background',
          'Push/notificationclick invariati, ownership 501:psaserv',
        ],
      },
      {
        icon: '📦',
        title: '6. Dati — backup & schema v2 (audit/1+2, già live)',
        items: [
          'exportBackup 6 chiavi + BACKUP_VERSION=STORAGE_SCHEMA_VERSION, downloadBackup, importBackup con migrate',
          'storage.js STORAGE_SCHEMA_VERSION=2, migrateStoredDataIfNeeded() su App start',
          'Già live da v2.8.4 → v2.9.0 eredita',
        ],
      },
    ],
    cta: 'PROVA ORA',
    ctaHint: 'Home → Missione → Avvia · verifica su https://mikweb.eu/operator40/ con iPhone frontale',
    dismiss: 'Non mostrare più',
    close: 'Chiudi',
    footer: 'Tutto on-device (IndexedDB, MediaPipe mai su server). Per replay: ◯ REC durante sessione → ↓ JSON → test analyzer. Docs in docs/FIX-tracking-2026-08-26.md',
  },
  en: {
    badge: 'NEW v2.9.0',
    title: 'Full audit — 5 areas + backup + PWA',
    subtitle: 'v2.9.0 · Aug 27 2026 · Code, data, UX, performance — 100% offline',
    intro: 'Full audit as requested (Phase 1 structure/data/performance/quality/UX/privacy). 5 incremental PRs on separate branches, merged to main and deployed live. No kcal/streak logic touched.',
    groups: [
      {
        icon: '📐',
        title: '1. Structure — dedup UI (audit/3)',
        items: [
          'DogTag ×4, ProgressRing ×2, SegmentedProgress ×2, shared styles → src/components/ui/*',
          'TopBar + App dead code removed',
          'Build 749k→444k',
        ],
      },
      {
        icon: '🌍',
        title: '2. i18n — 15+ hardcoded → I18N (audit/7)',
        items: [
          'Home sections + streak + backup ternaries → t()',
          'New keys: home.section.*, setup.backup.*',
        ],
      },
      {
        icon: '🧪',
        title: '3. Quality — tests 30→51 (audit/5)',
        items: [
          'New src/utils/audit.test.js: 21 tests (belly, progress, bmi, body, backup)',
          'Coverage for kcal/streak/belly',
        ],
      },
      {
        icon: '⚡',
        title: '4. Performance — lazy 9 screens (audit/4)',
        items: [
          'App.jsx: 9 screens → React.lazy + Suspense',
          'Removed recharts from App — index 749k→444k',
        ],
      },
      {
        icon: '📡',
        title: '5. PWA robust — SWR + SKIP_WAITING (audit/9)',
        items: [
          'sw.js: stale-while-revalidate, PRECACHE_SHELL, message handler',
          'Network-first navigations, cache-first assets',
        ],
      },
    ],
    cta: 'TRY IT',
    ctaHint: 'Home → Mission → Start · https://mikweb.eu/operator40/',
    dismiss: "Don't show again",
    close: 'Close',
    footer: 'Everything on-device. For replay: ◯ REC → ↓ JSON → analyzer test.',
  },
  de: {
    badge: 'NEU v2.9.0',
    title: 'Vollständiges Audit — 5 Bereiche + Backup + PWA',
    subtitle: 'v2.9.0 · 27. Aug 2026 · Code, Daten, UX, Performance — 100% offline',
    intro: 'Vollständiges Audit wie angefordert. 5 inkrementelle PRs auf separaten Branches, gemerged und live deployed. Keine kcal/streak-Logik geändert.',
    groups: [
      {
        icon: '📐',
        title: '1. Struktur — dedup UI (audit/3)',
        items: [
          'DogTag ×4, ProgressRing ×2, gemeinsame Styles → src/components/ui/*',
        ],
      },
      {
        icon: '🌍',
        title: '2. i18n — 15+ hardcoded → I18N (audit/7)',
        items: [
          'Home/Setup hardcodiert → t()',
        ],
      },
      {
        icon: '🧪',
        title: '3. Qualität — Tests 30→51 (audit/5)',
        items: [
          'Neue Tests: belly, progress, bmi, body, backup',
        ],
      },
      {
        icon: '⚡',
        title: '4. Performance — lazy 9 Screens (audit/4)',
        items: [
          'App.jsx: 9 Screens → React.lazy + Suspense',
        ],
      },
      {
        icon: '📡',
        title: '5. PWA robust — SWR + SKIP_WAITING (audit/9)',
        items: [
          'sw.js: stale-while-revalidate, PRECACHE_SHELL',
        ],
      },
    ],
    cta: 'TESTEN',
    ctaHint: 'Home → Mission → Start',
    dismiss: 'Nicht mehr anzeigen',
    close: 'Schließen',
    footer: 'Alles on-device.',
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
