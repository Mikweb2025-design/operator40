import React from 'react';
import { OLIVE_DARK } from '../../constants/theme.js';

/**
 * SegmentedProgress — barra a segmenti per avanzamento fase/sessione
 * Duplicato in HomeScreen + SessionScreen
 */
export default function SegmentedProgress({ total, current, currentProgress, color }) {
  return (
    <div style={{ display: 'flex', gap: 4, width: '100%' }}>
      {Array.from({ length: total }).map((_, i) => {
        const isDone = i < current;
        const isActive = i === current;
        return (
          <div
            key={i}
            style={{
              flex: 1,
              height: 6,
              borderRadius: 3,
              background: isDone || isActive ? color : OLIVE_DARK,
              opacity: isActive ? 0.5 + 0.5 * currentProgress : 1,
              transition: 'opacity 0.3s linear, background 0.3s ease',
              boxShadow: isDone || isActive ? `0 0 8px ${color}66` : 'none',
            }}
          />
        );
      })}
    </div>
  );
}
