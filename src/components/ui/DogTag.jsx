import React from 'react';
import { INK, INK_2, PAPER, OLIVE, KHAKI, STEEL } from '../../constants/theme.js';

/**
 * DogTag — pill-card per metriche (duration/kcal/rounds/streak)
 * Usato in Home, Preview, Summary, History — deduplicato in audit/3-dedup-ui
 */
export default function DogTag({ label, value, sub }) {
  const numeric = typeof value === 'number';
  return (
    <div
      className="o40-card"
      style={{
        background: `linear-gradient(160deg, ${INK_2}, ${INK})`,
        border: `1px solid ${OLIVE}`,
        borderRadius: 14,
        padding: '12px 13px',
        position: 'relative',
        flex: 1,
        minWidth: 0,
        boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 9,
          left: -5,
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: INK,
          border: `2px solid ${KHAKI}`,
        }}
      />
      <div className="o40-mono" style={{ color: KHAKI, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {label}
      </div>
      <div className="o40-display" style={{ color: PAPER, fontSize: 26, lineHeight: 1.1 }}>
        {numeric ? value : value}
      </div>
      {sub && <div style={{ color: STEEL, fontSize: 11 }}>{sub}</div>}
    </div>
  );
}
