'use strict';

/******** Variables references *******/
const pomodoro = document.getElementById('pomodoro-button');
const shortBreak = document.getElementById('shortBreak-button');
const longBreak = document.getElementById('longBreak-button');
const displayCount = document.getElementById('time__display');
const audio = document.getElementById('audio');
let startButton = document.getElementById('time__start-button');

/******** Call events  ********/
pomodoro.addEventListener('click', chooseOptionsTimer);
shortBreak.addEventListener('click', chooseOptionsTimer);
longBreak.addEventListener('click', chooseOptionsTimer);

/******* Variables  *******/
// Declaring variable of interval of time (pomodoro = 25 minutes)
let time = 0;
// Start with an initial value of 25 minutes in seconds.
let timeLimit = time * 60;
// Initially, no time has passed, but this will count up
// and subtract from the timeLimit
let timePassed = 0;
let timeLeft = timeLimit;
let timeInterval = null;
/* let status = ["pomodoro", "shortBreak", "longBreak"]; */

/* Basic markup and styles countdown and setting up time label */
/* Use to animate the length of remaining time line.
    Ring should cover the full length of the circle:
    Length = 2πr = 2 * π * 45 = 282,6 ≈ 283 */
document.getElementById('time__display').innerHTML = `
<section class="base-time">
    <svg class="base-time__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-time__circle">
            <circle class="base-time__path-elapsed" cx="50" cy="50" r="45"></circle>
            <path id="base-time-path-remaining" stroke-dasharray="283" class="base-time__path-remaining"
            d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
            ">
            </path>
        </g>
    </svg>
    <!-- Remaining time label -->
    <span id="base-time-label" class="base-time__label">
    ${formatTime(timeLeft)}</span>
</section>
`;

function onTimesUp() {
    clearInterval(timeInterval);
    startButton.innerText = "START";
}

function startTime() {
    timeInterval = setInterval(() => {
        // The amount of time passed increments by one
        timePassed += 1;
        timeLeft = timeLimit - timePassed;
        // The time left label is updated
        document.getElementById("base-time-label").innerHTML = formatTime(timeLeft);
        setCircleDasharray();
        if (timeLeft === 0) {
            audio.play();
            onTimesUp();
        }
    }, 1000);
}

function formatTime(time) {
    // The largest round integer less than or equal to the result of time divided being by 60.
    let minutes = Math.floor(time / 60);
    // Seconds are the remainder of the time divided by 60 (modulus operator).
    let seconds = time % 60;

    // If the value of minutes or seconds are less than 10, then display seconds with a leading zero.
    if (minutes < 10) {
        minutes = `0${minutes}`;
        if(seconds < 10) {
            seconds = `0${seconds}`;
        }
    } else {
        if(seconds < 10) {
            seconds = `0${seconds}`;
        }
    }
    // The output in MM:SS format.
    return `${minutes}:${seconds}`;
}

// Divides time left by the defined time limit.
function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / timeLimit;
    return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
}

// Update the dasharray value as time passes, starting with 283
function setCircleDasharray() {
    const fullDashArray = 283;
    const circleDasharray = `${(calculateTimeFraction() * fullDashArray).toFixed(0)} 283`;
    document
    .getElementById("base-time-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

//Options that you choose for countdown (pomodoro, short break and long break)
function chooseOptionsTimer(e) {
    startButton.addEventListener('click', timeHandler);
    let idButton = e.target.id;
    switch(idButton) {
        case "pomodoro-button":
            e.path[3].children[1].children[0].children[0].children[1].innerText = "25:00";
            e.path[3].children[1].children[2].innerText = "Time to work!";
            time = 25;
            timeLimit = time * 60;
            break;
        case "shortBreak-button":
            e.path[3].children[1].children[0].children[0].children[1].innerText = "01:00";
            e.path[3].children[1].children[2].innerText = "Coffee break!";
            time = 1;
            timeLimit = time * 60;
            break;
        case "longBreak-button":
            e.path[3].children[1].children[0].children[0].children[1].innerText = "15:00";
            e.path[3].children[1].children[2].innerText = "Time to relax!";
            time = 15;
            timeLimit = time * 60;
            break;
    }
}

//When the button "pomodoro" will clicked, will run this function
function timeHandler(e, timeLimit) {
    if(startButton.innerText == "START"){
        startTime(timeLimit);
        startButton.style.backgroundColor = "rgb(233, 197, 37)";
        startButton.innerText = "STOP";
    }
    else if(startButton.innerText == "STOP"){
        timePassed = 0;
        clearInterval(timeInterval);
        startButton.style.backgroundColor = "#FFE46B";
        startButton.innerText = "START";
    }
}
