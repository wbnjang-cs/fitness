import { PoseLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

const MODEL = "full"; // "lite" | "full" | "heavy"

async function build(vision, delegate) {
  return PoseLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_${MODEL}/float16/1/pose_landmarker_${MODEL}.task`,
      delegate,
    },
    runningMode: "VIDEO",
  });
}

export async function createPoseLandmarker() {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );
  try {
    return await build(vision, "GPU");
  } catch (e) {
    console.warn("GPU delegate failed, falling back to CPU", e);
    return await build(vision, "CPU");
  }
}