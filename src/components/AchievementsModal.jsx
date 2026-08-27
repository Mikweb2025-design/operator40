import React from 'react';
import { X, Medal, Sparkles } from 'lucide-react';
import { INK, INK_2, OLIVE, KHAKI, BLAZE, PAPER, STEEL } from '../constants/theme.js';
import { getAchievementsProgress, getNextAchievements } from '../utils/achievements.js';
import { getMedalProgress } from '../utils/stats.js';

function Badge({ label, unlocked, value, color = BLAZE, icon = 'trophy', progress = 1 }) {
  const IconMap = { fire: Sparkles, zap: Sparkles, star: StarFallback, target: Medal };
  function StarFallback(props) { return <span style={{ fontSize: 16 }}>{unlocked ? '★' : '☆'}</span>; }
  const Icon = icon === 'fire' ? Sparkles : icon === 'zap' ? Sparkles : Medal;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1, minWidth: 72, opacity: unlocked ? 1 : 0.55 }}>
      <div style={{ width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: unlocked ? `radial-gradient(circle at 30% 30%, ${color}, ${INK})` : INK_2, border: `1px solid ${unlocked ? color : OLIVE}`, position: 'relative' }}>
        <Medal size={18} color={unlocked ? PAPER : STEEL} />
      </div>
      <div className="o40-mono" style={{ color: unlocked ? PAPER : STEEL, fontSize: 10, fontWeight: unlocked ? 700 : 400 }}>{value}</div>
      <div style={{ color: unlocked ? KHAKI : STEEL, fontSize: 8.5, textAlign: 'center', lineHeight: 1.2, minHeight: 20 }}>{label}</div>
      {!unlocked && <div style={{ width: '100%', height: 3, borderRadius: 2, background: OLIVE, marginTop: 2 }}><div style={{ width: `${Math.round(progress*100)}%`, height: '100%', background: color }} /></div>}
    </div>
  );
}

export default function AchievementsModal({ sessions, onClose }) {
  const ach = getAchievementsProgress(sessions);
  const nextAch = getNextAchievements(sessions, 3);
  const unlocked = ach.filter(a => a.unlocked).length;
  const medals = getMedalProgress(sessions);

  return (
    <div className="o40-tour-mask" onClick={onClose} style={{ zIndex: 30 }}>
      <div className="o40-tour-card" onClick={e => e.stopPropagation()} style={{ maxHeight: '90vh', overflowY: 'auto', maxWidth: 520, width: '96vw', padding: 0, border: `1px solid ${OLIVE}`, borderRadius: 18, background: INK_2 }}>
        <div style={{ position: 'sticky', top: 0, zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: INK_2, borderBottom: `1px solid ${OLIVE}`, borderRadius: '18px 18px 0 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Medal size={18} color={KHAKI} />
            <span className="o40-mono" style={{ color: KHAKI, fontSize: 11, letterSpacing: '0.08em' }}>ACHIEVEMENTS • {unlocked}/{ach.length}</span>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', background: INK, border: `1px solid ${OLIVE}`, display: 'grid', placeItems: 'center', cursor: 'pointer' }}><X size={16} color={STEEL} /></button>
        </div>
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {ach.map(a => (
              <div key={a.id} style={{ minWidth: 80, background: a.unlocked ? `${a.color}22` : INK, border: `1px solid ${a.unlocked ? a.color : OLIVE}`, borderRadius: 12, padding: '10px 8px', textAlign: 'center', flexShrink: 0 }}>
                <div style={{ fontSize: 20 }}>{a.icon}</div>
                <div style={{ color: a.unlocked ? PAPER : STEEL, fontSize: 10, fontWeight: 700, lineHeight: 1.2, marginTop: 4 }}>{a.title.it}</div>
                <div className="o40-mono" style={{ color: a.unlocked ? KHAKI : STEEL, fontSize: 9, marginTop: 2 }}>{a.unlocked ? 'Sbloccato' : `${Math.round(a.progress*100)}%`}</div>
                <div style={{ height: 3, borderRadius: 2, background: OLIVE, marginTop: 6 }}><div style={{ width: `${Math.round(a.progress*100)}%`, height: '100%', background: a.color }} /></div>
              </div>
            ))}
          </div>
          {nextAch.length > 0 && (
            <div style={{ background: `${KHAKI}10`, border: `1px solid ${KHAKI}33`, borderRadius: 12, padding: 12 }}>
              <div className="o40-mono" style={{ color: KHAKI, fontSize: 10, letterSpacing: '0.06em', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}><Sparkles size={12} /> PROSSIMI • {nextAch.length}</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {nextAch.map(a => (
                  <span key={a.id} style={{ background: `${a.color}22`, border: `1px solid ${a.color}55`, color: PAPER, fontSize: 11, padding: '4px 8px', borderRadius: 20 }}>{a.icon} {a.title.it} {Math.round(a.progress*100)}%</span>
                ))}
              </div>
            </div>
          )}
          <div style={{ background: INK, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: 12 }}>
            <div className="o40-mono" style={{ color: STEEL, fontSize: 10, letterSpacing: '0.06em', marginBottom: 8 }}>MEDAGLIE • {medals.unlocked.length}/{medals.all.length}</div>
            <div style={{ display: 'flex', gap: 6, overflowX: 'auto' }}>
              {medals.all.slice(0, 8).map(m => (
                <div key={`${m.type}-${m.n}`} style={{ minWidth: 56, textAlign: 'center', opacity: m.unlocked ? 1 : 0.5 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', margin: '0 auto', display: 'grid', placeItems: 'center', background: m.unlocked ? BLAZE : INK_2, border: `1px solid ${m.unlocked ? BLAZE : OLIVE}` }}><Medal size={14} color={m.unlocked ? PAPER : STEEL} /></div>
                  <div style={{ color: m.unlocked ? PAPER : STEEL, fontSize: 9, marginTop: 4 }}>{m.n}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
