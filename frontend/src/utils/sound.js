// workout/sound.js
let ctx = null;
let audioAllowed = false
let lastWarningTime = Number.NEGATIVE_INFINITY

export function unlockAudio() {
    audioAllowed = !audioAllowed;
    if (!ctx) ctx = new AudioContext();
    if (ctx.state === "suspended") ctx.resume();
    return audioAllowed;

}

function beep(freq, duration, type = "sine", beepReason = "rep", delay = 0) {
    if (!audioAllowed) return
    if (!ctx) return;
    
    if (performance.now() - lastWarningTime < 1000 && beepReason === "warning") return
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.value = freq;

    const t = ctx.currentTime + delay;
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    if (beepReason === "warning")
        lastWarningTime = performance.now()
    osc.stop(t + duration);
}

export const playRep = () => beep(880, 0.15);
export const playWarning = () => beep(220, 0.4, "square", "warning");
export const playSet = () => {
    beep(523, 0.15, "sine", "rep", 0);
    beep(659, 0.15, "sine", "rep", 0.12);
    beep(784, 0.15, "sine", "rep", 0.24);
    beep(1047, 0.35, "sine", "rep", 0.36);
};