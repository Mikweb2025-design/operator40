import React from 'react';
import { OLIVE_DARK, PAPER } from '../../constants/theme.js';

/**
 * ProgressRing — anello di avanzamento con cometa
 * Duplicato in HomeScreen + SessionScreen — centralizzato qui (audit/3-dedup-ui)
 */
export default function ProgressRing({ progress, size = 240, stroke = 12, color, comet = true }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.max(0, Math.min(1, progress)));
  const gradId = `ring-grad-${color.replace('#', '')}`;
  const angle = Math.max(0.001, Math.min(0.999, progress)) * 2 * Math.PI;
  const dotX = size / 2 + radius * Math.sin(angle);
  const dotY = size / 2 - radius * Math.cos(angle);
  return (
    <svg
      width={size}
      height={size}
      style={{ transform: 'rotate(-90deg)', filter: `drop-shadow(0 0 10px ${color}55)` }}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.65" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </linearGradient>
      </defs>
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
        r={radius}
        stroke={`url(#${gradId})`}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s linear' }}
      />
      {comet && progress > 0 && (
        <>
          <circle cx={dotX} cy={dotY} r={stroke * 2} fill={color} opacity="0.15" />
          <circle className="o40-comet" cx={dotX} cy={dotY} r={stroke * 0.8} fill={PAPER} />
        </>
      )}
    </svg>
  );
}
