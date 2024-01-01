let timeOnClock;
let timer;

function hideOptions() {
    document.getElementById("divOptions").style.display = "none";
}

function showTimer() {
    document.getElementById("divTimer").style.display = "";
    document.getElementById("divTimeRemaining").style.display = "";
}

function updateTimeOnScreen(time) {
    document.getElementById("divTimeRemaining").textContent = Math.ceil(time);
}

function playWarningSound() {
    return;
}

function startTimer() {
    let initialOffset = 440;
    let elapsedTime = 0;
    timeOnClock = Number(document.getElementById("inputSecondsPerTurn").value);
    let yellowTime = Number(document.getElementById("inputYellow").value);
    let warningTime = Number(document.getElementById("inputRed").value);
    timer = setInterval(function() {
        updateTimeOnScreen(timeOnClock - elapsedTime);
        if (timeOnClock - elapsedTime < warningTime + ((timeOnClock - warningTime) / 2)) {
            document.getElementById("circle").style.stroke = "#ffff00";
        }
        if (timeOnClock - elapsedTime < warningTime) {
            playWarningSound();
            document.getElementById("circle").style.stroke = "#ff0000";
        }
        if (elapsedTime >= timeOnClock) {
            clearInterval(timer);
            document.getElementById("textTimeRemaining").textContent = "OVER";
            stopTimer("#ff0000");
            return;
        }
        document.getElementById("circle").style.strokeDashoffset = ((elapsedTime+0.1)*(initialOffset/timeOnClock));
        elapsedTime += .1; //one-tenth of a second
    }, 100);
}

function stopTimer(stroke) {
    clearInterval(timer);
    document.getElementById("circle").style.strokeDasharray = 440;
    document.getElementById("circle").style.strokeDashoffset = 0;
    document.getElementById("circle").style.stroke = stroke;
}

function startGame() {
    hideOptions();
    startTimer();
    showTimer();
}

function restartTimer() {
    stopTimer("#00ff00");
    startTimer();
}