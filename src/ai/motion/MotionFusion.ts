/**
 * Operator40 — MotionFusion (spec §19)
 * Secondary sensor fusion for Capacitor native builds.
 * Pose is primary; accelerometer/gyroscope optionally contributes for
 * jumpingJack, highKnees, burpee, running detection of rhythm/impact.
 * PWA must work without sensors.
 */
export interface MotionSample { x:number; y:number; z:number; t:number; }

export class MotionFusion {
  private enabled = false;
  private lastMagnitude = 0;
  private impactHistory: number[] = [];

  enable(){ this.enabled=true; try { this.listen(); } catch {} }
  disable(){ this.enabled=false; }

  private listen(){
    if (typeof window==='undefined' || !('DeviceMotionEvent' in window)) return;
    // @ts-ignore
    window.addEventListener('devicemotion', (e:any)=>{
      const a = e.accelerationIncludingGravity ?? e.acceleration;
      if (!a) return;
      const mag = Math.hypot(a.x??0, a.y??0, a.z??0);
      this.lastMagnitude = mag;
      this.impactHistory.push(mag);
      if (this.impactHistory.length>60) this.impactHistory.shift();
    }, { passive:true });
  }

  getImpactScore(): number {
    if (!this.enabled || this.impactHistory.length<5) return 0;
    const avg = this.impactHistory.reduce((s,v)=>s+v,0)/this.impactHistory.length;
    return Math.min(100, Math.max(0, (this.lastMagnitude - avg)*18 + 50));
  }
  getRhythmHz(): number {
    // crude: count peaks in last 1s
    if (this.impactHistory.length<20) return 0;
    let peaks=0; for(let i=1;i<this.impactHistory.length-1;i++){ if(this.impactHistory[i]>this.impactHistory[i-1] && this.impactHistory[i]>this.impactHistory[i+1] && this.impactHistory[i]>12) peaks++; }
    return peaks/ (this.impactHistory.length/30);
  }
}
