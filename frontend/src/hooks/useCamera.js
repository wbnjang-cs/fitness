import { useEffect, useState } from "react";

export function useCamera(videoRef, canvasRef, active) {
  const [ready, setReady] = useState(false);
  

  useEffect(() => {
    if (!active) return;
    const video = videoRef.current;
    let stream;
    let cancelled = false;

    async function startCamera() {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (cancelled) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      const video = videoRef.current;
      video.srcObject = stream;
      await video.play();
      if (cancelled) return;
      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;
      setReady(true);
    }

    startCamera();
    return () => {
      cancelled = true;
      stream?.getTracks().forEach((t) => t.stop());
      if (video) video.srcObject = null;
      setReady(false);
    };
  }, [videoRef, canvasRef, active]);

  return ready;
}