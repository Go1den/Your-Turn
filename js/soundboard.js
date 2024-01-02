class Soundboard {
    resetSound = new Audio("audio/reset.mp3");
    runningOutSound = new Audio("audio/runningout.mp3");
    timesUpSound = new Audio("audio/timesup.mp3");
    warningSound = new Audio("audio/warning.mp3");
    soundMap = new Map();

    constructor () {
        this.soundMap.set("resetSound", this.resetSound);
        this.soundMap.set("runningOutSound", this.runningOutSound);
        this.soundMap.set("timesUpSound", this.timesUpSound);
        this.soundMap.set("warningSound", this.warningSound);
    }

    playSound(soundName) {
        let targetSound = this.soundMap.get(soundName);
        targetSound.currentTime = 0;
        targetSound.volume = 1;
        targetSound.play();
    }
}