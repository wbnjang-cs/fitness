// hooks/useFrameLoop.js
import { useEffect, useRef } from "react";

export function useFrameLoop(callback, active) {
  const cbRef = useRef(callback);

  useEffect(() => {
    cbRef.current = callback;
  });

  useEffect(() => {
    if (!active) return;
    let id;
    const tick = () => {
      id = requestAnimationFrame(tick);
      cbRef.current();
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [active]);
}