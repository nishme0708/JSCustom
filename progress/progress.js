'use strict';

function addProgress() {
    let temp = document.querySelector('#progress-template').content.cloneNode(true);
    const inner = temp.querySelector('.progress-inner');
    document.querySelector('.container').appendChild(temp);
    return inner;
}

const queue = [];
function start() {
    queue.push(addProgress());
    processQ();
}
let isRunning = false;
function processQ() {
    if (isRunning) return;
    isRunning = queue.length >= 3;

    function innerProcess() {
        const next = document.querySelector('.progress-inner:not(.active)');
        next.classList.toggle('active');
        setTimeout(() => {
            queue.shift();
            isRunning = queue.length >= 3;
            if (queue.length >= 3) innerProcess();
        }, 3000);
    }
    innerProcess();
}
