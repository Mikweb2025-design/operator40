import React from 'react';
import { Flame, ShieldCheck, Zap } from 'lucide-react';
import { INK, INK_2, PAPER, OLIVE, KHAKI, BLAZE, STEEL } from '../constants/theme.js';

export function WeeklyChallenge({ sessions, weeklyGoal = 3 }) {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay() + 1); // Monday
  start.setHours(0,0,0,0);
  const weekSessions = sessions.filter(s => new Date(s.date) >= start);
  const done = weekSessions.length;
  const pct = Math.min(1, done / weeklyGoal);
  const remain = Math.max(0, weeklyGoal - done);
  const isDone = done >= weeklyGoal;
  return (
    <div className="o40-card-glass" style={{ borderRadius: 14, padding: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: `conic-gradient(${BLAZE} ${pct * 360}deg, ${OLIVE} 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: INK_2, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${OLIVE}` }}>
          {isDone ? <ShieldCheck size={20} color={BLAZE} /> : <Flame size={20} color={KHAKI} />}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div className="o40-mono" style={{ color: KHAKI, fontSize: 10, letterSpacing: '0.07em' }}>SFIDA SETTIMANALE</div>
        <div style={{ color: PAPER, fontWeight: 800, fontSize: 14 }}>{isDone ? 'Completata!' : `${done}/${weeklyGoal} missioni`}</div>
        <div style={{ color: STEEL, fontSize: 12 }}>{isDone ? 'Obiettivo raggiunto, mantieni il fuoco' : `Mancano ${remain} per chiudere la settimana`}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div className="o40-display" style={{ color: BLAZE, fontSize: 22 }}>{Math.round(pct * 100)}%</div>
        <div style={{ color: STEEL, fontSize: 10, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}><Zap size={10} /> Lun-Dom</div>
      </div>
    </div>
  );
}
