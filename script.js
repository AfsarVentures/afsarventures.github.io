// script.js

let score = 0;
let time = 10;
let timer;
let activeBox = null;
let clickSound = new Audio('click.mp3'); // Add the path to your click sound

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const selectTimeButton = document.getElementById('select-time-button');
    const retryButton = document.getElementById('retry-button');
    const homeButton = document.getElementById('home-button');

    startButton.addEventListener('click', startGame);
    selectTimeButton.addEventListener('click', changeTimeOption);
    retryButton.addEventListener('click', startGame);
    homeButton.addEventListener('click', goHome);

    createGrid();
});

function playClickSound() {
    clickSound.currentTime = 0; // Rewind to start
    clickSound.play();
}

function startGame() {
    document.getElementById('settings').classList.add('hidden');
    document.getElementById('game-board').classList.remove('hidden');
    document.getElementById('end-screen').classList.add('hidden');
    
    score = 0;
    document.getElementById('score-display').textContent = `Score: ${score}`;
    time = parseInt(document.getElementById('select-time-button').textContent.split(': ')[1]);
    document.getElementById('timer-display').textContent = `Time: ${time}s`;

    timer = setInterval(() => {
        time--;
        document.getElementById('timer-display').textContent = `Time: ${time}s`;
        if (time <= 0) endGame();
    }, 1000);

    setRandomActiveBox();
}

function endGame() {
    clearInterval(timer);
    document.getElementById('game-board').classList.add('hidden');
    document.getElementById('end-screen').classList.remove('hidden');
    document.getElementById('final-score').textContent = `Your Score: ${score}`;
}

function goHome() {
    document.getElementById('settings').classList.remove('hidden');
    document.getElementById('game-board').classList.add('hidden');
    document.getElementById('end-screen').classList.add('hidden');
}

function changeTimeOption() {
    const button = document.getElementById('select-time-button');
    const times = [10, 15, 30];
    let currentIndex = times.indexOf(parseInt(button.textContent.split(': ')[1]));
    let nextIndex = (currentIndex + 1) % times.length;
    button.textContent = `Select Time: ${times[nextIndex]}s`;
}

function createGrid() {
    const grid = document.getElementById('grid');
    for (let i = 0; i < 16; i++) {
        const box = document.createElement('div');
        box.className = 'grid-box';
        box.addEventListener('click', handleBoxClick);
        grid.appendChild(box);
    }
}

function handleBoxClick(event) {
    const box = event.target;
    if (box === activeBox) {
        score++;
        document.getElementById('score-display').textContent = `Score: ${score}`;
        setRandomActiveBox();
    } else {
        setRandomActiveBox();
    }
    playClickSound(); // Play sound on click
}

function setRandomActiveBox() {
    const boxes = document.querySelectorAll('.grid-box');
    if (activeBox) {
        activeBox.classList.remove('active');
    }
    activeBox = boxes[Math.floor(Math.random() * boxes.length)];
    activeBox.classList.add('active');
}
