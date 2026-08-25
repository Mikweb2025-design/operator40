/**
 * Operator40 — Skeleton Overlay helpers
 * Draws MediaPipe 33-point skeleton on canvas — battery-friendly (single stroke).
 */
import type { PoseLandmarks } from '../types';

// Pairs for drawing — subset that reads well on small phone canvas
export const POSE_CONNECTIONS: Array<[number, number]> = [
  [11, 12], // shoulders
  [11, 13], [13, 15], // left arm
  [12, 14], [14, 16], // right arm
  [11, 23], [12, 24], // torso sides
  [23, 24], // hips
  [23, 25], [25, 27], [27, 29], [29, 31], // left leg
  [24, 26], [26, 28], [28, 30], [30, 32], // right leg
  [27, 28], // ankles bridge (subtle)
];

export interface OverlayOpts {
  mirror?: boolean;
  lineWidth?: number;
  pointRadius?: number;
  color?: string;
  jointColor?: string;
}

export function drawSkeleton(
  ctx: CanvasRenderingContext2D,
  landmarks: PoseLandmarks | null,
  width: number,
  height: number,
  opts: OverlayOpts = {}
): void {
  if (!landmarks || landmarks.length === 0) return;
  const { mirror = true, lineWidth = 2.5, pointRadius = 2.8, color = '#C1440E', jointColor = '#EDE8D8' } = opts;

  ctx.save();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.globalAlpha = 0.95;

  // Connections
  ctx.beginPath();
  for (const [a, b] of POSE_CONNECTIONS) {
    const pa = landmarks[a], pb = landmarks[b];
    if (!pa || !pb) continue;
    const v = Math.min(pa.visibility ?? 1, pb.visibility ?? 1);
    if (v < 0.33) continue;
    const ax = (mirror ? 1 - pa.x : pa.x) * width;
    const ay = pa.y * height;
    const bx = (mirror ? 1 - pb.x : pb.x) * width;
    const by = pb.y * height;
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
  }
  ctx.stroke();

  // Joints
  ctx.fillStyle = jointColor;
  for (let i = 0; i < landmarks.length; i++) {
    const p = landmarks[i];
    if (!p || (p.visibility ?? 1) < 0.35) continue;
    // Highlight primary joints a bit larger
    const isPrimary = [11, 12, 13, 14, 23, 24, 25, 26].includes(i);
    const r = isPrimary ? pointRadius * 1.25 : pointRadius;
    const x = (mirror ? 1 - p.x : p.x) * width;
    const y = p.y * height;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    if (isPrimary) { ctx.strokeStyle = color; ctx.lineWidth = 1; ctx.stroke(); }
  }
  ctx.restore();
}

export function drawAngleBadge(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number, y: number
): void {
  const padX = 8, padY = 4;
  ctx.save();
  ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, monospace';
  const w = ctx.measureText(text).width + padX * 2;
  const h = 18;
  ctx.fillStyle = 'rgba(27,29,22,0.88)';
  ctx.strokeStyle = 'rgba(74,82,51,0.9)';
  ctx.lineWidth = 1;
  const rx = 9;
  // rounded rect
  ctx.beginPath();
  // @ts-ignore roundRect may not be typed in lib
  if (ctx.roundRect) (ctx as any).roundRect(x, y, w, h, rx);
  else { ctx.rect(x, y, w, h); }
  ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#EDE8D8';
  ctx.fillText(text, x + padX, y + 12.5);
  ctx.restore();
}
