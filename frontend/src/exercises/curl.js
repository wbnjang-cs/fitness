// workout/exercises/curl.js

import { config } from "../config";

export const curl = {
  angles: {
    elbow: [12, 14, 16],
    elbowL: [11,13,15]
  },
  warnings: {
    overCurled: "Raising arm too high",
    straightened: "Don't straighten your arm fully",
  },
  create({ onRep, onWarning }) {
    const s = config.curl;
    let stage = null;
    let overCurledStatus = false;
    let straightenedStatus = false;

    return function update({elbow, elbowL}) {

      if (stage !== "raised" && elbowL <= s.repUpper) {
          stage = "raised"
      }
      else if (stage === "raised" && elbowL >= s.repLower) {
          stage = "lowered"
          onRep();
      };

      const IsOverCurled = elbowL < s.warnUpper;
      if (stage === "raised" && IsOverCurled !== overCurledStatus) {
        onWarning(IsOverCurled ? "overCurled" : null);
      }
      overCurledStatus = IsOverCurled

      const isStraightened = elbowL >= s.warnLower;
      if (stage === "lowered" && isStraightened !== straightenedStatus) {
        onWarning(isStraightened ? "straightened" : null)
      }
      straightenedStatus = isStraightened
    }
  }
}