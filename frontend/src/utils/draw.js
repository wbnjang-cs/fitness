import { LANDMARK_NAMES } from "../constants";
import { drawAngle } from "./drawAngle";

export function drawPose(ctx, pose, width, height, drawPoints, angleSpecs, angles) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "red";

  pose?.forEach((point, i) => {
    if (!drawPoints.has(i)) return;

    const px = point.x * width;
    const py = point.y * height;
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, 2 * Math.PI);
    ctx.fill();
  });

  if (!pose || !angles) return;

  for (const [name, idx] of Object.entries(angleSpecs)) {
    if (angles[name] == null) continue;
    drawAngle(ctx, pose, idx, angles[name], width, height);
  }
}