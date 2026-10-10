import { useEffect } from "react";
import { createPoseLandmarker } from "../utils/poseLandmarker";
import { drawPose } from "../utils/draw";
import { createAngleCalculator } from "../utils/geometry";
import { exercises } from "../exercises";

function waitForVideo(video) {
  return new Promise((resolve) => {
    if (video.readyState >= 2 && video.videoWidth > 0) return resolve();
    video.addEventListener("loadeddata", () => resolve(), { once: true });
  });
}

export function usePoseLoop(videoRef, canvasRef, enabled) {
  const exerciseName = "Curl";
  const createExercise = exercises[exerciseName];
  const onRep = (count) => console.log("rep", count);
  const onWarning = (type) => console.log("warning", type);
  const update = createExercise({onRep, onWarning})
  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let rafID;
    let lastVideoTime = null;
    let landmarker;

    async function start() {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      [landmarker] = await Promise.all([
        createPoseLandmarker(),
        waitForVideo(video),
      ]);
      if (cancelled) {
        landmarker.close();
        return;
      }
      const calculateAngle = createAngleCalculator(video.videoWidth, video.videoHeight);
      const ctx = canvas.getContext("2d");

      function handleFrame(result) {
        const pose = result.landmarks[0];
        if (!pose) return;
        drawPose(ctx, pose, canvas.width, canvas.height);
        const angle = calculateAngle(pose[12], pose[14], pose[16]);
        update(angle)
      }

      function renderLoop() {
        rafID = requestAnimationFrame(renderLoop);
          if (video.currentTime === lastVideoTime) return;
          lastVideoTime = video.currentTime;

          const result = landmarker.detectForVideo(video, performance.now());
          handleFrame(result);
      }
      renderLoop();
    }

    start();
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafID);
      landmarker?.close();
    };
  }, [enabled, videoRef, canvasRef]);
}