// components/WebcamVideo.jsx
import { useEffect, useRef } from "react";
import { useCamera } from "../hooks/useCamera";
import { useFrameLoop } from "../hooks/useFrameLoop";

export default function WebcamVideo({ active, onFrame }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const lastTime = useRef(null);

  const ready = useCamera(videoRef, canvasRef, active);

  useEffect(() => {
    if (!ready) lastTime.current = null;
  }, [ready]);

  useFrameLoop(() => {
    const video = videoRef.current;
    if (video.currentTime === lastTime.current) return;
    lastTime.current = video.currentTime;
    onFrame?.(video, canvasRef.current);
  }, ready);

  return (
    <div className="webcamVideo">
      <video ref={videoRef} playsInline muted />
      <canvas ref={canvasRef} />
    </div>
  );
}