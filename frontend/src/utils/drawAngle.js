// src/utils/drawAngle.js
export function drawAngle(ctx, pose, [ia, ib, ic], angle, w, h) {
  const a = pose[ia], b = pose[ib], c = pose[ic];

  // landmarks are normalized 0 to 1, so scale to canvas pixels
  const bx = b.x * w, by = b.y * h;

  // direction from the vertex toward each neighbor
  const start = Math.atan2(a.y * h - by, a.x * w - bx);
  const end = Math.atan2(c.y * h - by, c.x * w - bx);

  // pick the short way around so the arc sits inside the joint's angle
  let diff = end - start;
  while (diff > Math.PI) diff -= 2 * Math.PI;
  while (diff <= -Math.PI) diff += 2 * Math.PI;

  ctx.beginPath();
  ctx.arc(bx, by, 30, start, end, diff < 0);
  ctx.strokeStyle = "yellow";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = "yellow";
  ctx.font = "20px sans-serif";
  ctx.fillText(`${Math.round(angle)}°`, bx + 12, by - 12);
}