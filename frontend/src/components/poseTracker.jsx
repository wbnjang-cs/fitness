// components/PoseTracker.jsx
import { useMemo } from "react";
import { createAngleCalculator } from "../utils/angleCalc";
import { clearCanvas, drawAngles, drawPoints } from "../utils/draw";
import { useLandmarker } from "../hooks/useLandmarker";
import WebcamVideo from "./webcamVideo";


export default function PoseTracker({ active, exercise, allowDrawRef, onRep, onWarning }) {
  const landmarker = useLandmarker();

  const update = useMemo(
    () => exercise.handleAngles({ onRep, onWarning }),
    [exercise]
  );

  const pointsToDraw = useMemo(
      () => new Set(Object.values(exercise.anglesNeeded).flat()),
      [exercise]
    );

  function handleFrame(video, canvas) {
    if (!landmarker) return;
    const result = landmarker.detectForVideo(video, performance.now());
    const landmarkPositions = result.landmarks[0];
    if (!landmarkPositions) return;

    const calculateAngle = createAngleCalculator(video.videoWidth, video.videoHeight);
    const anglesOfLandmarks = {};
    for (const [name, [a,b,c]] of Object.entries(exercise.anglesNeeded)) {
      anglesOfLandmarks[name] = calculateAngle(
        landmarkPositions[a], 
        landmarkPositions[b], 
        landmarkPositions[c]);
    }

    const ctx = canvas.getContext("2d");
    clearCanvas(ctx, canvas.width, canvas.height);
    if (allowDrawRef.current) {
      drawPoints(ctx, landmarkPositions, canvas.width, canvas.height, pointsToDraw);
      drawAngles(ctx, landmarkPositions, canvas.width, canvas.height, exercise.anglesNeeded, anglesOfLandmarks);
    }

    update(anglesOfLandmarks)

  }

  


  return <WebcamVideo active={active} onFrame={handleFrame} />;
}