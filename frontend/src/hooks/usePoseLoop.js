import { useEffect, useState } from "react";
import { createPoseLandmarker } from "../utils/poseLandmarker";
import { drawPose } from "../utils/draw";
import { createAngleCalculator } from "../utils/geometry";
import { exercises } from "../exercises";
import { playRep, playWarning } from "../utils/sound";


export function usePoseLoop(videoRef, canvasRef, enabled, setReps, setWarning, allowDrawRef, exerciseName, currentWarning) {
  useEffect(() => {
    if (!enabled) return;
    const exerciseName = "Curl";
    const exercise = exercises[exerciseName];
    const update = exercise.create({
      onRep: () => {
        setReps((r) => r + 1);
        playRep();
      },
      onWarning: (warningKey) => {
        setWarning(warningKey ? exercise.warnings[warningKey] : null);
        if (warningKey) {
          playWarning();
          const w = currentWarning.current;
          w[warningKey] = (w[warningKey] ?? 0) + 1;
        }
      },
    });
    const drawPoints = new Set(Object.values(exercise.angles).flat());

    let cancelled = false;
    let rafID;
    let lastVideoTime = null;
    let landmarker;

    async function start() {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      [landmarker] = await Promise.all([
        createPoseLandmarker(),
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
        const angles = {};
        for (const [name, [a, b, c]] of Object.entries(exercise.angles)) {
          angles[name] = calculateAngle(pose[a], pose[b], pose[c]);
        }
        if(allowDrawRef.current)
          drawPose(ctx, pose, canvas.width, canvas.height, drawPoints, exercise.angles, angles);
        update(angles)
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
  }, [enabled, videoRef, canvasRef, allowDrawRef]);
}