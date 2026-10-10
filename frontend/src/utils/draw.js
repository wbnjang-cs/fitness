import { LANDMARK_NAMES } from "../constants";

export function drawPose(ctx, landmarks, width, height) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "red";

  landmarks?.forEach((point, i) => {
    if (i !== 12 && i !== 14 && i !== 16) return; // skip face points
    const px = point.x * width;
    const py = point.y * height;
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, 2 * Math.PI);
    ctx.fill();
    // ctx.fillText(LANDMARK_NAMES[i], px, py - 8);
  });
}