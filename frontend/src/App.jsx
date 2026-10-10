import { useRef } from "react";
import { useCamera } from "./hooks/useCamera";
import { usePoseLoop } from "./hooks/usePoseLoop";

export default function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const cameraReady = useCamera(videoRef, canvasRef);
  usePoseLoop(videoRef, canvasRef, cameraReady);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <video ref={videoRef} autoPlay muted playsInline style={{ display: "block" }} />
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      />
    </div>
  );
}