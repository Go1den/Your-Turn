let timeOnClock;
let timer;
let circumference = 0;
let soundboard = new Soundboard();

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

function startTimer() {
    soundboard.playSound("resetSound");
    let elapsedTime = 0;
    timeOnClock = Number(document.getElementById("inputSecondsPerTurn").value);
    let yellowTime = Number(document.getElementById("inputYellow").value);
    let redTime = Number(document.getElementById("inputRed").value);
    let currentTimeColor = "green";
    let tickTockTime = 5;
    timer = setInterval(function() {
        updateTimeOnScreen(timeOnClock - elapsedTime);
        console.log(currentTimeColor);
        if (currentTimeColor == "green" && timeOnClock - elapsedTime < yellowTime) {
            document.getElementById("circleFG").style.stroke = "#ffff00";
            currentTimeColor = "yellow";
            if (document.getElementById("radioYellowYes").checked) {
                soundboard.playSound("warningSound");
            }
        }
        if (currentTimeColor == "yellow" && timeOnClock - elapsedTime < redTime) {
            document.getElementById("circleFG").style.stroke = "#ff0000";
            currentTimeColor = "red";
            if (document.getElementById("radioRedYes").checked) {
                soundboard.playSound("warningSound");
            }
        }
        if (elapsedTime >= timeOnClock) {
            clearInterval(timer);
            document.getElementById("divTimeRemaining").textContent = "0";
            stopTimer("#ff0000");
            soundboard.playSound("timesUpSound");
            return;
        }
        if (currentTimeColor == "red" && timeOnClock - elapsedTime < tickTockTime && document.getElementById("radioTickTockYes").checked) {
            soundboard.playSound("runningOutSound");
            tickTockTime = tickTockTime - 1;
        }
        document.getElementById("circleFG").style.strokeDashoffset = ((elapsedTime+0.1)*(circumference/timeOnClock));
        elapsedTime += .1; //one-tenth of a second
    }, 100);
}

function setCircleParameters() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let svgDimensions = Math.min(width, height) * 0.8;
    let dimensionInPx = svgDimensions + "px";
    document.getElementById("divTimerBG").width = dimensionInPx;
    document.getElementById("divTimerBG").height = dimensionInPx;
    document.getElementById("divTimerFG").width = dimensionInPx;
    document.getElementById("divTimerFG").height = dimensionInPx;
    document.getElementById("svgCircleBG").setAttribute('width', dimensionInPx);
    document.getElementById("svgCircleBG").setAttribute('height', dimensionInPx);
    document.getElementById("svgCircleFG").setAttribute('width', dimensionInPx);
    document.getElementById("svgCircleFG").setAttribute('height', dimensionInPx);
    document.getElementById("circleBG").setAttribute('width', svgDimensions);
    document.getElementById("circleBG").setAttribute('height', svgDimensions);
    document.getElementById("circleFG").setAttribute('width', svgDimensions);
    document.getElementById("circleFG").setAttribute('height', svgDimensions);
    document.getElementById("circleBG").setAttribute('cy', Math.floor(svgDimensions / 2));
    document.getElementById("circleBG").setAttribute('cx', Math.floor(svgDimensions / 2));
    document.getElementById("circleFG").setAttribute('cy', Math.floor(svgDimensions / 2));
    document.getElementById("circleFG").setAttribute('cx', Math.floor(svgDimensions / 2));
    document.getElementById("circleBG").setAttribute('r', (svgDimensions / 2) - 12);
    document.getElementById("circleFG").setAttribute('r', (svgDimensions / 2) - 12);
    circumference = Math.PI * 2 * ((svgDimensions / 2) - 12);
    document.getElementById("circleFG").style.strokeDasharray = circumference;
}

function stopTimer(stroke) {
    clearInterval(timer);
    document.getElementById("circleFG").style.strokeDasharray = circumference;
    document.getElementById("circleFG").style.strokeDashoffset = 0;
    document.getElementById("circleFG").style.stroke = stroke;
}

function startGame() {
    hideOptions();
    setCircleParameters();
    stopTimer();
    startTimer();
    showTimer();
}

function restartTimer() {
    stopTimer("#00ff00");
    startTimer();
}

window.onresize = setCircleParameters;