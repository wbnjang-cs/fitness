import { useRef, useState, useEffect } from "react";
import { useCamera } from "../hooks/useCamera";
import { usePoseLoop } from "../hooks/usePoseLoop";
import { unlockAudio } from "../utils/sound";
import { playSet } from "../utils/sound";
import "../App.css"
import SetSummary from "../components/setSummary";

export default function WebcamPage({repsPerSet, setAmount, exerciseName, updateConfig}) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const allowDrawRef = useRef(true);
    const [reps, setReps] = useState(0);
    const [warning, setWarning] = useState(null);
    const [setsCompleted, setSetsCompleted] = useState(0);
    const [soundAllowed, setSoundAllowed] = useState(false);
    const [allowDraw, setAllowDraw] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);
    const exerciseInfo = useRef({
      exercise: exerciseName,
      targetSets: setAmount,
      targetReps: repsPerSet,
      sets: [],
    });
    const currentWarnings = useRef({});
    

    const cameraReady = useCamera(videoRef, canvasRef, cameraOn);
    usePoseLoop(videoRef, canvasRef, cameraReady, setReps, setWarning, allowDrawRef, exerciseName, currentWarnings);

    const done = setsCompleted >= setAmount;
    useEffect(() =>
  {
    if (reps >= repsPerSet) {
        if (done) return;
      setReps(0);
      setSetsCompleted(s => s + 1);
      playSet();
      exerciseInfo.current.sets.push({
        reps: repsPerSet,
        warnings: currentWarnings.current,
      });
      currentWarnings.current = {};
    }
  }, [reps]);

    function toggleDrawing() {
    const next = !allowDrawRef.current;
    allowDrawRef.current = next;

    if (!next) {
      const canvas = canvasRef.current;
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    }

    setAllowDraw(next);
  }

  function togglePause() {
    if (cameraOn) {
      setWarning(null);
      const canvas = canvasRef.current;
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    }
    setCameraOn((p) => !p);
  }

  const info = exerciseInfo.current;

  return (
    <div className="webcampage">
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

      <div className="stats">
        <div className="stat"><small>Reps</small>{reps} / {repsPerSet}</div>
        <div className="stat"><small>Sets</small>{setsCompleted} / {setAmount}</div>
      </div>

      <div className="warning">{warning}</div>

      <div className="controls">
        <button onClick={() => setSoundAllowed(unlockAudio())}>
          {soundAllowed ? "Stop audio" : "Start audio"}
        </button>
        <button onClick={toggleDrawing}>
          {allowDraw ? "Turn off drawing" : "Turn on drawing"}
        </button>
        <button onClick={togglePause}>
          {cameraOn ? "Pause Camera" : "Resume Camera"}
        </button>
      </div>
      
      <button className="exit" onClick={() => updateConfig(null)}>
        Exit exercise
      </button>

      {done && (
      <SetSummary
        info={exerciseInfo.current}
        onReturn={() => updateConfig(null)}
      />
      )}
    </div>
  );
  }