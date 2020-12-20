'use strict';

// Declaring variable of interval of time (pomodoro = 25 minutes)
let time = 1;
// Start with an initial value of 25 minutes
let timeLimit = time * 60;
// Initially, no time has passed, but this will count up
// and subtract from the timeLimit
let timePassed = 0;
let timeLeft = timeLimit;
let timeInterval = null;

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

startTime();

function onTimesUp() {
    clearInterval(timeInterval);
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