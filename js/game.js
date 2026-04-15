import { createBoard } from './board.js';

let currentCardCount = 0;
const winOverlay = document.getElementById('win-overlay');

function showWinMessage() {
    winOverlay.classList.remove('hidden');
}

function hideWinMessage() {
    winOverlay.classList.add('hidden');
}

function startGame() {
    hideWinMessage();
    const cardCount = parseInt(prompt("Syötä korttien määrä (parillinen luku):"), 10);
    if (isNaN(cardCount) || cardCount % 2 !== 0 || cardCount < 2) {
        alert("Korttien määrän täytyy olla parillinen luku.");
        return;
    }
    currentCardCount = cardCount;
    createBoard(cardCount, showWinMessage);
}

document.addEventListener('DOMContentLoaded', () => {
    startGame();

    document.getElementById('restart-btn').addEventListener('click', () => {
        startGame();
    });

    document.getElementById('play-again-btn').addEventListener('click', () => {
        startGame();
    });
});