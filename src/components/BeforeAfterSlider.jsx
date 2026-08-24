import React, { useState } from 'react';
import { INK, OLIVE, KHAKI, PAPER, STEEL, BLAZE } from '../constants/theme.js';

export default function BeforeAfterSlider({ before, after }) {
  const [pos, setPos] = useState(50);
  if (!before || !after) return null;
  return (
    <div style={{ background: INK, border: `1px solid ${OLIVE}`, borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
      <div className="o40-mono" style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', color: KHAKI, fontSize: 9, letterSpacing: '0.06em', background: INK }}>
        <span>PRIMA</span><span>DOPO</span>
      </div>
      <div style={{ position: 'relative', width: '100%', height: 280, overflow: 'hidden', background: '#000' }}>
        <img src={after.url} alt="dopo" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, width: `${pos}%`, overflow: 'hidden', borderRight: `2px solid ${BLAZE}` }}>
          <img src={before.url} alt="prima" style={{ width: '100%', height: 280, objectFit: 'cover', maxWidth: 'none', display: 'block' }} />
        </div>
        <input type="range" min={0} max={100} value={pos} onChange={e => setPos(parseInt(e.target.value, 10))}
          style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', width: '80%', accentColor: BLAZE }} />
        <div style={{ position: 'absolute', left: `${pos}%`, top: 0, bottom: 0, width: 2, background: BLAZE, pointerEvents: 'none', transform: 'translateX(-1px)' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', color: STEEL, fontSize: 10 }}>
        <span>{new Date(before.date).toLocaleDateString('it-IT')}</span>
        <span>{new Date(after.date).toLocaleDateString('it-IT')} · Δ {Math.round((new Date(after.date) - new Date(before.date))/86400000)} gg</span>
      </div>
    </div>
  );
}
