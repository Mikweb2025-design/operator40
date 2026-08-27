import React from 'react';
import FitnessEngineView from './FitnessEngineView.tsx';

/**
 * @deprecated PoseCounter — legacy simple counter (2-state, generic angles).
 * Preserved for backward compatibility. Delegates to the production
 * FitnessEngine (Modular 22-exercise AI). New code should use
 * FitnessEngineView or SessionAIOverlay directly.
 *
 * Prompt §36: do NOT use generic knee angle for unrelated exercises.
 * This wrapper now routes through the real per-exercise engine so
 * existing callers get correct per-exercise thresholds, smoothing,
 * hysteresis and form scoring without code changes.
 */
export default function PoseCounter({ exercise = 'squat', onCount, onClose }) {
  if (typeof window !== 'undefined' && !window.__o40_pose_deprecated_warned) {
    window.__o40_pose_deprecated_warned = true;
    console.warn(
      '[Operator40] PoseCounter.jsx is deprecated — use FitnessEngineView. Delegating to FitnessEngine.'
    );
  }
  return (
    <FitnessEngineView
      exercise={exercise}
      onRep={(evt) => onCount && onCount(evt.repIndex)}
      onClose={onClose}
    />
  );
}
