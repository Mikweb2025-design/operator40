/**
 * Operator40 — LandmarkSmoother
 * One Euro per coordinate (x,y) per landmark → reduces jitter without Kalman overhead.
 * Low CPU, battery-friendly; pooled array reused.
 */
import { OneEuroFilter } from './OneEuroFilter';
import type { PoseLandmarks } from '../types';

export class LandmarkSmoother {
  private fx: OneEuroFilter[] = [];
  private fy: OneEuroFilter[] = [];
  private initialized = false;

  constructor(
    private count = 33,
    private minCutoff = 1.0,
    private beta = 0.007,
    private dCutoff = 1.0
  ) {
    this.alloc();
  }

  private alloc(): void {
    this.fx = Array.from({ length: this.count }, () => new OneEuroFilter(this.minCutoff, this.beta, this.dCutoff));
    this.fy = Array.from({ length: this.count }, () => new OneEuroFilter(this.minCutoff, this.beta, this.dCutoff));
  }

  smooth(input: PoseLandmarks, timestampMs: number): PoseLandmarks {
    if (!input || input.length === 0) return input;
    if (!this.initialized) {
      // warm-start: seed with first frame
      this.alloc();
      this.initialized = true;
    }
    const out: PoseLandmarks = new Array(input.length);
    for (let i = 0; i < input.length; i++) {
      const p = input[i];
      if (!p) { out[i] = p; continue; }
      const idx = i < this.count ? i : 0;
      // ensure filters exist
      if (!this.fx[idx]) {
        this.fx[idx] = new OneEuroFilter(this.minCutoff, this.beta, this.dCutoff);
        this.fy[idx] = new OneEuroFilter(this.minCutoff, this.beta, this.dCutoff);
      }
      const sx = this.fx[idx].filter(p.x, timestampMs);
      const sy = this.fy[idx].filter(p.y, timestampMs);
      out[i] = { x: sx, y: sy, z: p.z, visibility: p.visibility };
    }
    return out;
  }

  reset(): void {
    for (const f of this.fx) f.reset();
    for (const f of this.fy) f.reset();
    this.initialized = false;
  }

  setTuning(minCutoff: number, beta: number): void {
    this.minCutoff = minCutoff; this.beta = beta;
    for (const f of [...this.fx, ...this.fy]) f.setParams(minCutoff, beta);
  }
}
