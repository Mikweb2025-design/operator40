import React, { useState, useEffect } from 'react';
import { Trophy, Timer, RotateCcw, Check, ChevronRight } from 'lucide-react';
import { getBellyLevelForTest, BELLY_LEVELS } from '../utils/bellyTest.js';
import { INK, INK_2, OLIVE, OLIVE_DARK, KHAKI, BLAZE, BLAZE_DEEP, PAPER, STEEL } from '../constants/theme.js';

export default function BellyTest({ onSave, onClose, lang = 'it', initial = null }) {
  const [plankSec, setPlankSec] = useState(initial?.plankSec ? String(initial.plankSec) : '');
  const [crunchReps, setCrunchReps] = useState(initial?.crunchReps ? String(initial.crunchReps) : '');
  const [running, setRunning] = useState(null); // 'plank' | 'crunch' | null
  const [seconds, setSeconds] = useState(0);
  const [crunchCount, setCrunchCount] = useState(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      if (running === 'plank') setSeconds(s => s + 1);
      if (running === 'crunch') setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (running === 'crunch' && seconds >= 30) {
      setRunning(null);
      setCrunchReps(String(crunchCount));
      setSeconds(0);
    }
  }, [seconds, running, crunchCount]);

  const p = parseInt(plankSec, 10) || 0;
  const c = parseInt(crunchReps, 10) || 0;
  const hasInput = p > 0 || c > 0;
  const suggested = hasInput ? getBellyLevelForTest({ plankSec: p, crunchReps: c }) : null;

  const t = (it, en, de) => (lang === 'en' ? en : lang === 'de' ? de : it);

  return (
    <div style={{ background: INK_2, border: `1px solid ${BLAZE}66`, borderRadius: 14, padding: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <Trophy size={18} color={BLAZE} />
        <div className="o40-mono" style={{ color: BLAZE, fontSize: 11, letterSpacing: '0.08em' }}>
          {t('TEST PANCIA 2.0 — TROVA IL TUO LIVELLO', 'BELLY TEST 2.0 — FIND YOUR LEVEL', 'BAUCH-TEST 2.0')}
        </div>
      </div>
      <div style={{ color: STEEL, fontSize: 12, lineHeight: 1.5, marginBottom: 12 }}>
        {t(
          '2 test da 30-60s: tieni il plank più a lungo che puoi e conta i crunch in 30s. Ti assegno Recluta/Combattente/Elite automatico.',
          '2 quick tests: hold plank as long as you can and count crunches in 30s. You get auto level.',
          '2 Tests: Plank so lange wie möglich halten und Crunches in 30s zählen.'
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
        <div style={{ background: INK, border: `1px solid ${OLIVE}`, borderRadius: 10, padding: 10 }}>
          <div className="o40-mono" style={{ color: KHAKI, fontSize: 10, marginBottom: 6 }}>PLANK MAX (sec)</div>
          <input value={plankSec} onChange={e => setPlankSec(e.target.value.replace(/\D/g, '').slice(0, 3))} placeholder="es. 45" inputMode="numeric"
            style={{ width: '100%', background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 8, padding: '10px 12px', color: PAPER, fontSize: 16, outline: 'none' }} />
          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
            <button onClick={() => { setRunning(running === 'plank' ? null : 'plank'); if (running !== 'plank') setSeconds(0); }}
              style={{ flex: 1, padding: '6px 8px', borderRadius: 8, border: `1px solid ${running === 'plank' ? BLAZE : OLIVE}`, background: running === 'plank' ? `${BLAZE}22` : 'transparent', color: running === 'plank' ? BLAZE : STEEL, fontSize: 11, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <Timer size={12} /> {running === 'plank' ? `${seconds}″ STOP` : 'VIA PLANK'}
            </button>
            <button onClick={() => { setPlankSec(String(seconds)); setRunning(null); }}
              style={{ padding: '6px 10px', borderRadius: 8, border: `1px solid ${OLIVE}`, background: INK_2, color: KHAKI, fontSize: 11, cursor: 'pointer' }}>Usa {seconds}″</button>
          </div>
          <div style={{ color: STEEL, fontSize: 9, marginTop: 4 }}>&lt;30 Recluta · 30-60 Combattente · &gt;60 Elite</div>
        </div>

        <div style={{ background: INK, border: `1px solid ${OLIVE}`, borderRadius: 10, padding: 10 }}>
          <div className="o40-mono" style={{ color: KHAKI, fontSize: 10, marginBottom: 6 }}>CRUNCH 30″ (rep)</div>
          <input value={crunchReps} onChange={e => setCrunchReps(e.target.value.replace(/\D/g, '').slice(0, 2))} placeholder="es. 14" inputMode="numeric"
            style={{ width: '100%', background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 8, padding: '10px 12px', color: PAPER, fontSize: 16, outline: 'none' }} />
          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
            <button onClick={() => { if (running === 'crunch') { setRunning(null); setCrunchReps(String(crunchCount)); } else { setRunning('crunch'); setSeconds(0); setCrunchCount(0); } }}
              style={{ flex: 1, padding: '6px 8px', borderRadius: 8, border: `1px solid ${running === 'crunch' ? BLAZE : OLIVE}`, background: running === 'crunch' ? `${BLAZE}22` : 'transparent', color: running === 'crunch' ? BLAZE : STEEL, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
              {running === 'crunch' ? `30″: ${30 - seconds}s` : 'VIA 30″'}
            </button>
            <button onClick={() => setCrunchCount(c => c + 1)} disabled={running !== 'crunch'}
              style={{ padding: '6px 10px', borderRadius: 8, border: `1px solid ${OLIVE}`, background: running === 'crunch' ? BLAZE : INK_2, color: running === 'crunch' ? PAPER : STEEL, fontSize: 14, fontWeight: 700, cursor: running === 'crunch' ? 'pointer' : 'not-allowed' }}>+1 ({crunchCount})</button>
          </div>
          <div style={{ color: STEEL, fontSize: 9, marginTop: 4 }}>&lt;10 Recluta · 10-20 Combattente · &gt;20 Elite</div>
        </div>
      </div>

      {suggested && (
        <div style={{ background: `linear-gradient(135deg, ${OLIVE_DARK}, ${INK})`, border: `1px solid ${BLAZE}`, borderRadius: 10, padding: 10, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${BLAZE}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Trophy size={16} color={BLAZE} /></div>
          <div style={{ flex: 1 }}>
            <div className="o40-mono" style={{ color: KHAKI, fontSize: 10 }}>LIVELLO SUGGERITO</div>
            <div style={{ color: PAPER, fontSize: 14, fontWeight: 700 }}>{suggested.label.it} · {suggested.work}″/{suggested.rest}″</div>
            <div style={{ color: STEEL, fontSize: 11 }}>{suggested.desc.it}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="o40-mono" style={{ color: BLAZE, fontSize: 10 }}>{p}″ / {c} rep</div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={onClose} style={{ flex: 1, padding: '10px 12px', borderRadius: 10, border: `1px solid ${OLIVE}`, background: INK, color: STEEL, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
          {t('Chiudi', 'Close', 'Schließen')}
        </button>
        <button onClick={() => hasInput && suggested && onSave({ plankSec: p, crunchReps: c, level: suggested.key, date: new Date().toISOString() })} disabled={!hasInput || !suggested}
          style={{ flex: 2, padding: '10px 12px', borderRadius: 10, border: `1px solid ${BLAZE}`, background: hasInput ? `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})` : INK_2, color: PAPER, fontSize: 12, fontWeight: 700, cursor: hasInput ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, opacity: hasInput ? 1 : 0.5 }}>
          <Check size={14} /> {t('Salva livello', 'Save level', 'Level speichern')} <ChevronRight size={14} />
        </button>
      </div>
      <div style={{ display: 'flex', gap: 4, marginTop: 8, justifyContent: 'center' }}>
        {BELLY_LEVELS.map(l => (
          <span key={l.key} style={{ fontSize: 9, color: suggested?.key === l.key ? BLAZE : STEEL, border: `1px solid ${suggested?.key === l.key ? BLAZE : OLIVE}`, borderRadius: 6, padding: '2px 6px', background: suggested?.key === l.key ? `${BLAZE}18` : 'transparent' }}>{l.label.it}</span>
        ))}
      </div>
    </div>
  );
}
