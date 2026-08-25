/**
 * Operator40 — MotionFeatures (spec §8)
 * Maintains short temporal history (up to 900ms) of angles/landmarks to derive
 * velocity, acceleration, direction, ROM, symmetry, phase confidence.
 */
import { calculateVelocity, calculateAcceleration, clamp } from './Geometry';
import type { PoseLandmarks } from '../../engine/types';
export { calculateVelocity, calculateAcceleration } from './Geometry';

// Re-export for convenience
export function directionFromVelocity(v: number, holdThresh = 18): 'down'|'up'|'hold'|'idle' {
  if (Math.abs(v) < holdThresh) return 'hold';
  return v < 0 ? 'down' : 'up';
}

export class MotionHistory {
  private angles: Array<{ v: number; t: number }> = [];
  private maxAge = 900;
  push(angle: number, t: number){ this.angles.push({v:angle,t}); this.evict(t); }
  private evict(now: number){ const cutoff = now - this.maxAge; while(this.angles.length && this.angles[0].t < cutoff) this.angles.shift(); }
  get values(){ return this.angles.map(a=>a.v); }
  get range(){ if (!this.angles.length) return 0; const vs=this.values; return Math.max(...vs)-Math.min(...vs); }
  get velocity(): number {
    if (this.angles.length < 2) return 0;
    const a = this.angles[this.angles.length-2], b=this.angles[this.angles.length-1];
    return calculateVelocity(a.v, b.v, b.t - a.t);
  }
}

export interface MotionSnapshot {
  primaryAngle: number;
  secondary: Record<string, number>;
  velocity: number; // deg/s filtered
  acceleration: number;
  direction: 'down'|'up'|'hold'|'idle';
  rangeOfMotion: number;
  symmetry: number; // 0-100 if applicable
  timestamp: number;
}
