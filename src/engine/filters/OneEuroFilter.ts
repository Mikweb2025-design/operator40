/**
 * Operator40 — OneEuro Filter (G. Casiez et al. CHI'12)
 * Adaptive low-pass for jitter reduction at low CPU cost.
 * Lightweight TS port — no deps, per-scalar instance.
 */
export class OneEuroFilter {
  private xPrev = 0;
  private dxPrev = 0;
  private initialized = false;
  private lastTimestamp = 0;

  constructor(
    private minCutoff = 1.0, // Hz, higher = less lag, more jitter
    private beta = 0.007,      // drift compensation; 0 = no adapt, ~0.007 typical
    private dCutoff = 1.0     // cut-off for derivative
  ) {}

  private alpha(cutoff: number, dt: number): number {
    const tau = 1 / (2 * Math.PI * cutoff);
    return 1 / (1 + tau / dt);
  }

  private lowPass(prev: number, curr: number, alpha: number): number {
    return alpha * curr + (1 - alpha) * prev;
  }

  /** Filter one scalar value. timestampMs from performance.now() or video timestamp. */
  filter(value: number, timestampMs: number): number {
    let dt = 0.016; // default ~60fps
    if (this.initialized) {
      dt = Math.max(0.001, (timestampMs - this.lastTimestamp) / 1000);
    }
    this.lastTimestamp = timestampMs;

    if (!this.initialized) {
      this.xPrev = value;
      this.dxPrev = 0;
      this.initialized = true;
      return value;
    }

    // derivative
    const dx = (value - this.xPrev) / dt;
    const edx = this.lowPass(this.dxPrev, dx, this.alpha(this.dCutoff, dt));
    this.dxPrev = edx;

    const cutoff = this.minCutoff + this.beta * Math.abs(edx);
    const a = this.alpha(cutoff, dt);
    const out = this.lowPass(this.xPrev, value, a);
    this.xPrev = out;
    return out;
  }

  reset(): void {
    this.initialized = false;
    this.xPrev = 0; this.dxPrev = 0; this.lastTimestamp = 0;
  }

  setParams(minCutoff: number, beta: number, dCutoff = this.dCutoff): void {
    this.minCutoff = minCutoff; this.beta = beta; this.dCutoff = dCutoff;
  }
}

/** Factory helpers tuned for Operator40: motion vs hold */
export function createMotionFilter(): OneEuroFilter {
  // Slightly higher cutoff for responsive rep motion, still smooth
  return new OneEuroFilter(1.2, 0.008, 1.0);
}
export function createHoldFilter(): OneEuroFilter {
  // Lower cutoff for stable plank hold — less jitter, more lag OK
  return new OneEuroFilter(0.7, 0.002, 1.0);
}
