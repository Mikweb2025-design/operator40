import React, { useEffect, useRef, useState } from 'react';
import { INK, OLIVE, KHAKI, PAPER, STEEL, BLAZE } from '../constants/theme.js';

// Pose counter for squat — on-device via MediaPipe Tasks Vision
// Usage: <PoseCounter exercise="squat" onCount={(n)=>{}} onClose={()=>{}} />

function angle(a, b, c) {
  const ab = { x: a.x - b.x, y: a.y - b.y };
  const cb = { x: c.x - b.x, y: c.y - b.y };
  const dot = ab.x * cb.x + ab.y * cb.y;
  const mag = Math.hypot(ab.x, ab.y) * Math.hypot(cb.x, cb.y);
  if (!mag) return 180;
  return (Math.acos(Math.min(1, Math.max(-1, dot / mag))) * 180) / Math.PI;
}

export default function PoseCounter({ exercise = 'squat', onCount, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState('init');
  const [error, setError] = useState(null);
  const countRef = useRef(0);
  const stateRef = useRef('up'); // up -> down -> up = 1
  const rafRef = useRef(null);
  const landmarkerRef = useRef(null);

  useEffect(() => {
    let stream = null;
    let cancelled = false;

    async function init() {
      try {
        setStatus('camera');
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: 640, height: 480 } });
        if (cancelled) return;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setStatus('loading-model');
        // dynamic import to avoid SSR issues
        const vision = await import('@mediapipe/tasks-vision');
        const { PoseLandmarker, FilesetResolver } = vision;
        const fileset = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm');
        const landmarker = await PoseLandmarker.createFromOptions(fileset, {
          baseOptions: { modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task', delegate: 'GPU' },
          runningMode: 'VIDEO',
          numPoses: 1,
          minPoseDetectionConfidence: 0.5,
          minPosePresenceConfidence: 0.5,
        });
        if (cancelled) return;
        landmarkerRef.current = landmarker;
        setStatus('ready');
        requestAnimationFrame(loop);
      } catch (e) {
        setError(e.message || String(e));
        setStatus('error');
      }
    }

    function loop() {
      if (cancelled || !landmarkerRef.current || !videoRef.current || videoRef.current.readyState < 2) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }
      const now = performance.now();
      const result = landmarkerRef.current.detectForVideo(videoRef.current, now);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      }
      if (result.landmarks && result.landmarks[0]) {
        const lm = result.landmarks[0];
        // draw skeleton
        if (ctx) {
          ctx.fillStyle = BLAZE;
          lm.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x * canvas.width, p.y * canvas.height, 3, 0, Math.PI * 2);
            ctx.fill();
          });
        }
        // count logic per exercise
        let a = 180;
        let isDown = false, isUp = false;
        if (exercise === 'squat') {
          const hip = lm[23], knee = lm[25], ankle = lm[27];
          a = angle(hip, knee, ankle);
          isDown = a < 80;
          isUp = a > 160;
        } else if (exercise === 'flessioni' || exercise === 'pushup') {
          const shoulder = lm[11], elbow = lm[13], wrist = lm[15];
          a = angle(shoulder, elbow, wrist);
          isDown = a < 90;
          isUp = a > 160;
        } else {
          // generic: use knee angle
          const hip = lm[23], knee = lm[25], ankle = lm[27];
          a = angle(hip, knee, ankle);
          isDown = a < 80;
          isUp = a > 160;
        }
        if (isDown && stateRef.current === 'up') {
          stateRef.current = 'down';
        } else if (isUp && stateRef.current === 'down') {
          stateRef.current = 'up';
          countRef.current += 1;
          setCount(countRef.current);
          onCount && onCount(countRef.current);
          try { navigator.vibrate && navigator.vibrate(30); } catch {}
        }
        if (ctx) {
          ctx.fillStyle = PAPER;
          ctx.font = '12px monospace';
          ctx.fillText(`ang:${Math.round(a)}° cnt:${countRef.current} st:${stateRef.current}`, 8, 18);
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    }

    init();
    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (stream) stream.getTracks().forEach(t => t.stop());
      try { landmarkerRef.current && landmarkerRef.current.close(); } catch {}
    };
  }, [exercise, onCount]);

  return (
    <div style={{ background: INK, border: `1px solid ${OLIVE}`, borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: INK }}>
        <div className="o40-mono" style={{ color: KHAKI, fontSize: 10 }}>POSE · {exercise.toUpperCase()} · {status}</div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span className="o40-display" style={{ color: BLAZE, fontSize: 18 }}>{count}</span>
          <button onClick={onClose} style={{ padding: '4px 8px', borderRadius: 8, border: `1px solid ${OLIVE}`, background: INK, color: STEEL, fontSize: 11, cursor: 'pointer' }}>Chiudi</button>
        </div>
      </div>
      {error ? (
        <div style={{ padding: 12, color: BLAZE, fontSize: 12 }}>{error}<br /><span style={{ color: STEEL, fontSize: 11 }}>Consenti camera e riprova. HTTPS richiesto.</span></div>
      ) : (
        <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', background: '#000' }}>
          <video ref={videoRef} autoPlay muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
          <canvas ref={canvasRef} width={640} height={480} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
          <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8, display: 'flex', justifyContent: 'space-between', pointerEvents: 'none' }}>
            <span style={{ background: `${BLAZE}DD`, color: PAPER, fontSize: 10, padding: '4px 8px', borderRadius: 20 }}>Stato: {stateRef.current}</span>
            <span style={{ background: `${INK}DD`, color: KHAKI, fontSize: 10, padding: '4px 8px', borderRadius: 20 }}>{exercise === 'squat' ? 'Piega <80° poi estendi >160°' : exercise === 'flessioni' || exercise === 'pushup' ? 'Piega <90° poi estendi >160°' : '—'}</span>
          </div>
        </div>
      )}
      <div style={{ padding: '8px 12px', color: STEEL, fontSize: 11, lineHeight: 1.4 }}>
        Inquadra tutto il corpo di lato. Conta automatico su {exercise}. Funziona offline, nessun video inviato.
      </div>
    </div>
  );
}
