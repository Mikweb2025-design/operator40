/**
 * Operator40 — LandmarkRecorder (spec §21)
 * Developer-only: record landmark sequences (not video) to landmarks.json for offline replay.
 * All data stays local, never uploaded.
 */
import type { PoseLandmarks } from '../../engine/types';

export interface RecordedFrame {
  t: number;
  landmarks: PoseLandmarks | null;
}

export class LandmarkRecorder {
  private frames: RecordedFrame[] = [];
  private recording = false;
  private startT = 0;

  start(){ this.frames=[]; this.recording=true; this.startT=performance.now(); }
  stop(){ this.recording=false; }
  isRecording(){ return this.recording; }

  push(landmarks: PoseLandmarks | null){
    if (!this.recording) return;
    this.frames.push({ t: Math.round(performance.now()-this.startT), landmarks: landmarks ? JSON.parse(JSON.stringify(landmarks)) : null });
    // cap at 30s @30fps ~900 frames to avoid memory blow
    if (this.frames.length>1200) this.frames.shift();
  }

  exportJson(): string {
    return JSON.stringify({ version: 1, created: new Date().toISOString(), frames: this.frames }, null, 2);
  }
  download(filename='landmarks.json'){
    const blob = new Blob([this.exportJson()], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download=filename; a.click();
    setTimeout(()=>URL.revokeObjectURL(url), 1000);
  }
  load(json: string){
    const data = JSON.parse(json);
    this.frames = data.frames ?? [];
  }
  *replay(): Generator<RecordedFrame> {
    for (const f of this.frames) yield f;
  }
  get count(){ return this.frames.length; }
}
