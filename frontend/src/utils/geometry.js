export function createAngleCalculator(w, h) {
  return function calculateAngle(a, b, c) {
    const ba = [(a.x - b.x) * w, (a.y - b.y) * h];
    const bc = [(c.x - b.x) * w, (c.y - b.y) * h];
    const dot = ba[0] * bc[0] + ba[1] * bc[1];
    const cross = ba[0] * bc[1] - ba[1] * bc[0];
    return Math.atan2(Math.abs(cross), dot) * (180 / Math.PI);
  };
}

export function toPixels(pose, w, h) {
  return pose.map(p => ({ x: p.x * w, y: p.y * h, z: p.z, visibility: p.visibility }));
}