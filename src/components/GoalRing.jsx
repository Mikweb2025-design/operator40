import React from 'react';
import { INK, OLIVE_DARK, BLAZE, PAPER, KHAKI, STEEL } from '../constants/theme.js';

export function GoalRing({ done, total, size = 72, stroke = 7 }) {
  const pct = Math.min(1, Math.max(0, done / total));
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ * (1 - pct);
  const isDone = done >= total;
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', display: 'block' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={OLIVE_DARK}
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius - stroke / 2 - 1.5}
          stroke={isDone ? '#7FB069' : BLAZE}
          strokeWidth={1.5}
          fill="none"
          strokeDasharray="1 5"
          strokeLinecap="round"
          opacity={0.5}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={isDone ? '#7FB069' : BLAZE}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.6s ease, stroke 0.3s ease',
            filter: isDone ? 'drop-shadow(0 0 7px #7FB06999)' : `drop-shadow(0 0 7px ${BLAZE}77)`,
          }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          className={isDone ? 'o40-num-glow on' : 'o40-num-glow'}
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: size * 0.32,
            lineHeight: 1,
          }}
        >
          {done}/{total}
        </span>
        <span
          style={{
            color: STEEL,
            fontSize: size * 0.11,
            letterSpacing: '0.06em',
            fontFamily: 'IBM Plex Mono, monospace',
          }}
        >
          {isDone ? 'FATTO!' : 'GOAL'}
        </span>
      </div>
    </div>
  );
}

export function MiniGoalBar({ history }) {
  // history: array from getGoalHistory
  const max = Math.max(1, ...history.map((h) => Math.max(h.done, h.goal)));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 48 }}>
      {history.map((h, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              height: 36,
              justifyContent: 'flex-end',
            }}
          >
            <div
              style={{
                width: '100%',
                height: `${Math.round((h.done / max) * 28) + 4}px`,
                background: h.isDone ? '#7FB069' : h.done > 0 ? KHAKI : OLIVE_DARK,
                borderRadius: 3,
                opacity: h.isDone ? 1 : 0.85,
              }}
            />
            <div
              style={{
                width: '100%',
                height: 2,
                background: BLAZE,
                opacity: 0.35,
                borderRadius: 1,
              }}
              title={`goal ${h.goal}`}
            />
          </div>
          <span style={{ color: STEEL, fontSize: 8, fontFamily: 'IBM Plex Mono, monospace' }}>
            {h.label}
          </span>
        </div>
      ))}
    </div>
  );
}
