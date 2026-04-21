import { createBoard } from './board.js';

const winOverlay = document.getElementById('win-overlay');
const winAttempts = document.getElementById('win-attempts');

function showWinMessage(attempts) {
    winAttempts.textContent = `Löysit kaikki parit ${attempts} yrityksellä.`;
    winOverlay.classList.remove('hidden');
}

function hideWinMessage() {
    winOverlay.classList.add('hidden');
    winAttempts.textContent = '';
}

function startGame() {
    hideWinMessage();
    const cardCount = parseInt(prompt("Syötä korttien määrä (parillinen luku):"), 10);
    if (isNaN(cardCount) || cardCount % 2 !== 0 || cardCount < 2) {
        alert("Korttien määrän täytyy olla parillinen luku.");
        return;
    }
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