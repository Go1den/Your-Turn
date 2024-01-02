let timeOnClock;
let timer;

function hideOptions() {
    document.getElementById("divOptions").style.display = "none";
}

function showTimer() {
    document.getElementById("divTimerFG").style.display = "";
    document.getElementById("divTimerBG").style.display = "";
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
    let redTime = Number(document.getElementById("inputRed").value);
    timer = setInterval(function() {
        updateTimeOnScreen(timeOnClock - elapsedTime);
        if (timeOnClock - elapsedTime < yellowTime) {
            document.getElementById("circleFG").style.stroke = "#ffff00";
        }
        if (timeOnClock - elapsedTime < redTime) {
            playWarningSound();
            document.getElementById("circleFG").style.stroke = "#ff0000";
        }
        if (elapsedTime >= timeOnClock) {
            clearInterval(timer);
            document.getElementById("divTimeRemaining").textContent = "OVER";
            stopTimer("#ff0000");
            return;
        }
        document.getElementById("circleFG").style.strokeDashoffset = ((elapsedTime+0.1)*(initialOffset/timeOnClock));
        elapsedTime += .1; //one-tenth of a second
    }, 100);
}

function stopTimer(stroke) {
    clearInterval(timer);
    document.getElementById("circleFG").style.strokeDasharray = 440;
    document.getElementById("circleFG").style.strokeDashoffset = 0;
    document.getElementById("circleFG").style.stroke = stroke;
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