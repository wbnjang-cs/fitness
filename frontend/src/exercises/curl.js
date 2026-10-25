// workout/exercises/curl.js
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
    let stage = null;
    let overCurledStatus = false;
    let straightenedStatus = false;
    const repUpper = 55;
    const repLower = 110;
    const warnUpper = 30;
    const warnLower = 170;

    return function update({elbow, elbowL}) {

      if (stage !== "raised" && elbowL <= repUpper) {
          stage = "raised"
      }
      else if (stage === "raised" && elbowL >= repLower) {
          stage = "lowered"
          onRep();
      };

      const IsOverCurled = elbowL < warnUpper;
      if (stage === "raised" && IsOverCurled !== overCurledStatus) {
        onWarning(IsOverCurled ? "overCurled" : null);
      }
      overCurledStatus = IsOverCurled

      const isStraightened = elbowL >= warnLower;
      if (stage === "lowered" && isStraightened !== straightenedStatus) {
        onWarning(isStraightened ? "straightened" : null)
      }
      straightenedStatus = isStraightened
    }
  }
}