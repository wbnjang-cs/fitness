// hooks/useLandmarker.js
import { useEffect, useState } from "react";
import { createPoseLandmarker } from "../utils/poseLandmarker";

export function useLandmarker() {
  const [landmarker, setLandmarker] = useState(null);

  useEffect(() => {
    let cancelled = false;
    //return holds a snapshot of landmarker when it first renders (null)
    //so we need another thing to point at landmarker so cleanup can run
    let loadedLandmarker;
    createPoseLandmarker().then((result) => {
      if (cancelled) {
        result.close();
        return;
      }
      loadedLandmarker = result;
      setLandmarker(result);
    });
    return () => {
      cancelled = true;
      loadedLandmarker?.close();
    };
  }, []);

  return landmarker;
}