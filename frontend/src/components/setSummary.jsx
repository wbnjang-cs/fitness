import { WARNING_LABELS } from "../constants";

export default function SetSummary({ info, onReturn }) {
  return (
    <div className="popup">
      <div className="popuptext">
        <h2>Sets done, good job!</h2>
        <p className="summary">
          {info.exercise}, {info.targetSets} sets of {info.targetReps} reps
        </p>

        <div className="setlist">
          {info.sets.map((set, i) => {
            const entries = Object.entries(set.warnings);
            return (
              <div className="setcard" key={i}>
                <div className="settitle">
                  <span>Set {i + 1}</span>
                  <span>{set.reps} reps</span>
                </div>
                {entries.length === 0 ? (
                  <div className="clean">Clean form</div>
                ) : (
                  entries.map(([key, count]) => (
                    <div className="warnrow" key={key}>
                      <span>{WARNING_LABELS[key] ?? key}</span>
                      <span>x{count}</span>
                    </div>
                  ))
                )}
              </div>
            );
          })}
        </div>

        <button onClick={onReturn}>Return</button>
      </div>
    </div>
  );
}