// pages/settingsPage.jsx
import { useRef, useState } from "react";
import { config } from "../config";
import { exercises } from "../exercises";
import PoseTracker from "../components/poseTracker";

// config section name to exercise registry name (global has no exercise)
const SECTION_TO_EXERCISE = {
  curl: "Curl",
};

export default function SettingsPage({ onBack }) {
  const [section, setSection] = useState("curl");

  // throwaway state for the test feed, never touches real session data
  const allowDrawRef = useRef(true);
  const [reps, setReps] = useState(0);
  const [warning, setWarning] = useState(null);

  const exerciseName = SECTION_TO_EXERCISE[section];
  const exercise = exercises[exerciseName];

  function handleRep() {
    setReps((r) => r + 1);
  }

  function handleWarning(key) {
    setWarning(key ? exercise.warnings[key] : null);
  }

  function SectionEditor({ name }) {
    const [values, setValues] = useState({ ...config[name] });

    function change(key, raw) {
      if (raw === "") return;
      const v = Number(raw);
      config[name][key] = v;                           // the state machine reads this next frame
      setValues((prev) => ({ ...prev, [key]: v }));    // the form rerenders
    }

    const entries = Object.entries(values);
    if (entries.length === 0) return <p>No settings yet.</p>;

    return (
      <div>
        {entries.map(([key, value]) => (
          <label key={key} style={{ display: "block" }}>
            {key}
            <input
              type="number"
              value={value}
              onChange={(e) => change(key, e.target.value)}
            />
          </label>
        ))}
      </div>
    );
  }

  return (
    <div className="settingspage">
      <button onClick={() => onBack(null)}>Back</button>
      <div className="menu">
        <select value={section} onChange={(e) => setSection(e.target.value)}>
          {Object.keys(config).map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>

        <SectionEditor key={section} name={section} />
      </div>
      {exercise && (
        <>
          <PoseTracker
            active={true}
            exercise={exercise}
            allowDrawRef={allowDrawRef}
            onRep={handleRep}
            onWarning={handleWarning}
          />
          <p>Test reps: {reps}</p>
          <p className="warning">{warning}</p>
        </>
      )}
    </div>
  );
}