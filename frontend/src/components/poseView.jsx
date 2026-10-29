// components/PoseView.jsx
import { useCamera } from "../hooks/useCamera";
import { usePoseLoop } from "../hooks/usePoseLoop";

export default function PoseView({
  videoRef, canvasRef, cameraOn, allowDrawRef,
  exerciseName, setReps, setWarning, currentWarnings,
}) {
  const cameraReady = useCamera(videoRef, canvasRef, cameraOn);
  usePoseLoop(videoRef, canvasRef, cameraReady, setReps, setWarning,
              allowDrawRef, exerciseName, currentWarnings);

  return (
    <div className="videowrap">
      <video ref={videoRef} autoPlay muted playsInline style={{ display: "block" }} />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}