// pages/menuPage.jsx
import { useState } from "react";
import { exercises } from "../exercises/index.js"; // adjust the path to match your folders

const EXERCISE_NAMES = Object.keys(exercises);

export default function MenuPage({ updateConfig }) {
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [exerciseName, setExerciseName] = useState("");

  const canStart =
    Number(reps) > 0 && Number(sets) > 0 && exerciseName !== "";

  function handleStart() {
    updateConfig({
      repsPerSet: Number(reps),
      setAmount: Number(sets),
      exerciseName,
    });
  }

  return (
    <div className="menu">
      <label>
        Reps per set
        <input
          type="text"
          inputMode="numeric"
          value={reps}
          onChange={(e) => setReps(e.target.value.replace(/\D/g, ""))}
        />
      </label>

      <label>
        Sets
        <input
          type="text"
          inputMode="numeric"
          value={sets}
          onChange={(e) => setSets(e.target.value.replace(/\D/g, ""))}
        />
      </label>

      <label>
        Exercise
        <select
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        >
          <option value="">Choose an exercise</option>
          {EXERCISE_NAMES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>

      <button className="primary" onClick={handleStart} disabled={!canStart}>
        Start
      </button>
    </div>
  );
}