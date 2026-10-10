// workout/exercises/curl.js
export function createCurl({ onRep, onWarning }) {
  let stage = "lowered";
  let reps = 0;
  return function update(angle) {
    console.log(stage)
    if (stage === "lowered" && angle <= 55) {
        stage = "raised"
        console.log("flipped")
    }
    else if (stage === "raised" && angle >= 100) {
        stage = "lowered"
        reps +=1
        onRep(reps)
        console.log("flipped")
    };
  }
}