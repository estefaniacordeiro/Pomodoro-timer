'use strict';

document.getElementById('time__display').innerHTML = `
<section class="base-time">
    <svg class="base-time__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-time__circle">
            <circle class="base-time__path-elapsed" cx="50" cy="50" r="45" />
        </g>
    </svg>
    <span>
        <!-- Remaining time label -->
    </span>
</section>
`;