// utils/draw.js

export function clearCanvas(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);
}

export function drawPoints(ctx, landmarks, width, height, pointsToDraw) {
  ctx.fillStyle = "red";
  landmarks.forEach((point, i) => {
    if (!pointsToDraw.has(i)) return;
    ctx.beginPath();
    ctx.arc(point.x * width, point.y * height, 4, 0, 2 * Math.PI);
    ctx.fill();
  });
}

export function drawAngles(ctx, landmarks, width, height, exerciseAngles, angles) {
  for (const [name, idx] of Object.entries(exerciseAngles)) {
    if (angles[name] == null) continue;
    drawArc(ctx, landmarks, idx, angles[name], width, height);
  }
}

export function drawArc(ctx, landmarks, [ia, ib, ic], angle, w, h) {
  const a = landmarks[ia], b = landmarks[ib], c = landmarks[ic];

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