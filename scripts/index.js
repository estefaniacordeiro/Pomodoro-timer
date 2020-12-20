'use strict';
// Declaring variable of interval of time (pomodoro = 25 minutes)
let time = 25;
// Start with an initial value of 25 minutes
let timeLimit = time * 60;
// Initially, no time has passed, but this will count up
// and subtract from the timeLimit
let timePassed = 0;
let timeLeft = timeLimit;


/* Basic markup and styles countdown and setting up time label */
document.getElementById('time__display').innerHTML = `
<section class="base-time">
    <svg class="base-time__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-time__circle">
            <circle class="base-time__path-elapsed" cx="50" cy="50" r="45" />
        </g>
    </svg>
    <!-- Remaining time label -->
    <span id="base-time-label" class="base-time__label">
    ${formatTime(timeLeft)}</span>
</section>
`;

function formatTime(time) {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes = Math.floor(time / 60);
    // Seconds are the remainder of the time divided by 60 (modulus operator).
    let seconds = time % 60;
    // If the value of seconds is less than 10, then display seconds with a leading zero.
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    // The output in MM:SS format.
    return `${minutes}:${seconds}`;
}