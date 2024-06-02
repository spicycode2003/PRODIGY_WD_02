let startTime, updatedTime, difference, tInterval, savedTime = 0, running = false;
const startPauseButton = document.getElementById('startPauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsList = document.getElementById('lapsList');

function startPause() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startPauseButton.textContent = "Pause";
    } else {
        clearInterval(tInterval);
        savedTime = new Date().getTime() - startTime;
        running = false;
        startPauseButton.textContent = "Start";
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startPauseButton.textContent = "Start";
    savedTime = 0;
    minutesDisplay.textContent = "00";
    secondsDisplay.textContent = "00";
    millisecondsDisplay.textContent = "00";
    lapsList.innerHTML = "";
}

function lap() {
    const lapTime = document.createElement('li');
    lapTime.textContent = `${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
    lapsList.appendChild(lapTime);
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    minutesDisplay.textContent = minutes < 10 ? "0" + minutes : minutes;
    secondsDisplay.textContent = seconds < 10 ? "0" + seconds : seconds;
    millisecondsDisplay.textContent = milliseconds < 10 ? "0" + milliseconds : milliseconds;
}

startPauseButton.addEventListener('click', startPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
