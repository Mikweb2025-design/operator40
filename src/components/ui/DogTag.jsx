import React from 'react';
import { INK, INK_2, OLIVE, KHAKI, STEEL, BLAZE } from '../../constants/theme.js';

/**
 * DogTag — pill-card per metriche (duration/kcal/rounds/streak)
 * Usato in Home, Preview, Summary, History — deduplicato in audit/3-dedup-ui
 */
export default function DogTag({ label, value, sub, accent = false }) {
  return (
    <div
      className="o40-card o40-card-face"
      style={{
        background: `linear-gradient(160deg, ${INK_2}, ${INK})`,
        border: `1px solid ${OLIVE}`,
        borderRadius: 14,
        padding: '12px 13px',
        position: 'relative',
        flex: 1,
        minWidth: 0,
        minHeight: 84,
        boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
      }}
    >
      <span
        className="o40-card-accent"
        style={{ background: accent ? BLAZE : KHAKI, opacity: accent ? 1 : 0.55 }}
      />
      <div
        style={{
          position: 'absolute',
          top: 9,
          left: 8,
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: INK,
          border: `2px solid ${KHAKI}`,
        }}
      />
      <div
        className="o40-mono"
        style={{ color: accent ? BLAZE : KHAKI, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}
      >
        {label}
      </div>
      <div
        className={`o40-display ${accent ? 'o40-num-glow on' : 'o40-num-glow'}`}
        style={{ fontSize: 26, lineHeight: 1.1, wordBreak: 'break-word', overflowWrap: 'anywhere' }}
      >
        {value}
      </div>
      {sub && <div style={{ color: STEEL, fontSize: 11, wordBreak: 'break-word' }}>{sub}</div>}
    </div>
  );
}
