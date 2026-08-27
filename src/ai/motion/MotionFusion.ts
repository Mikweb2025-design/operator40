/**
 * Operator40 — MotionFusion (spec §19) — wired to Capacitor Motion (audit 4 -> 6.0.1)
 * Secondary sensor fusion for Capacitor native builds + PWA fallback.
 * Pose is primary; accelerometer optionally contributes for jumpingJack/highKnees/burpee.
 * PWA must work without sensors — all failures are silent.
 */
export interface MotionSample {
  x: number;
  y: number;
  z: number;
  t: number;
}

export class MotionFusion {
  private enabled = false;
  private lastMagnitude = 0;
  private impactHistory: number[] = [];
  private accelHandler: any = null;
  private removeCapacitorListener: (() => void) | null = null;

  enable() {
    if (this.enabled) return;
    this.enabled = true;
    try {
      this.listen();
    } catch {}
  }
  disable() {
    this.enabled = false;
    try {
      if (this.removeCapacitorListener) this.removeCapacitorListener();
    } catch {}
    try {
      if (this.accelHandler) window.removeEventListener('devicemotion', this.accelHandler);
    } catch {}
    this.removeCapacitorListener = null;
    this.accelHandler = null;
  }

  private async listen() {
    // Try Capacitor Motion first (native iOS/Android, more reliable than DeviceMotionEvent)
    try {
      const mod: any = await import('@capacitor/motion').catch(() => null);
      const Motion = mod?.Motion;
      if (Motion && typeof Motion.addListener === 'function') {
        // Capacitor Motion uses {x,y,z} in m/s², 50-100Hz
        const listener: any = await Motion.addListener('accel', (event: any) => {
          const a = event.accelerationIncludingGravity ?? event.acceleration ?? event;
          const x = a.x ?? 0;
          const y = a.y ?? 0;
          const z = a.z ?? 0;
          const mag = Math.hypot(x, y, z);
          this.lastMagnitude = mag;
          this.impactHistory.push(mag);
          if (this.impactHistory.length > 60) this.impactHistory.shift();
        });
        // Capacitor 6 returns {remove: ()=>} or handle with remove()
        this.removeCapacitorListener = () => {
          try {
            if (listener && typeof listener.remove === 'function') listener.remove();
            else Motion.removeAllListeners?.();
          } catch {}
        };
        return;
      }
    } catch {}
    // Fallback: DeviceMotionEvent (PWA, Safari requires permission gesture)
    if (typeof window === 'undefined' || !('DeviceMotionEvent' in window)) return;
    this.accelHandler = (e: any) => {
      const a = e.accelerationIncludingGravity ?? e.acceleration;
      if (!a) return;
      const mag = Math.hypot(a.x ?? 0, a.y ?? 0, a.z ?? 0);
      this.lastMagnitude = mag;
      this.impactHistory.push(mag);
      if (this.impactHistory.length > 60) this.impactHistory.shift();
    };
    window.addEventListener('devicemotion', this.accelHandler, { passive: true } as any);
    // iOS 13+ requires permission request on user gesture — caller should have triggered it
    try {
      const DM: any = (window as any).DeviceMotionEvent;
      if (DM && typeof DM.requestPermission === 'function') {
        // Do not auto-request here; App will request on first user interaction if needed
      }
    } catch {}
  }

  getImpactScore(): number {
    if (!this.enabled || this.impactHistory.length < 5) return 0;
    const avg =
      this.impactHistory.reduce((s, v) => s + v, 0) / this.impactHistory.length;
    return Math.min(100, Math.max(0, (this.lastMagnitude - avg) * 18 + 50));
  }
  getRhythmHz(): number {
    // crude: count peaks in last 1s
    if (this.impactHistory.length < 20) return 0;
    let peaks = 0;
    for (let i = 1; i < this.impactHistory.length - 1; i++) {
      if (
        this.impactHistory[i] > this.impactHistory[i - 1] &&
        this.impactHistory[i] > this.impactHistory[i + 1] &&
        this.impactHistory[i] > 12
      )
        peaks++;
    }
    return peaks / (this.impactHistory.length / 30);
  }
  isEnabled(): boolean {
    return this.enabled;
  }
  hasData(): boolean {
    return this.impactHistory.length >= 5;
  }
}
