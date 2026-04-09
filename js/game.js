import { createBoard } from './board.js';

let currentCardCount = 0;

function startGame() {
    const cardCount = parseInt(prompt("Syötä korttien määrä (parillinen luku):"), 10);
    if (isNaN(cardCount) || cardCount % 2 !== 0 || cardCount < 2) {
        alert("Korttien määrän täytyy olla parillinen luku.");
        return;
    }
    currentCardCount = cardCount;
    createBoard(cardCount);
}

document.addEventListener('DOMContentLoaded', () => {
    startGame();

    document.getElementById('restart-btn').addEventListener('click', () => {
        startGame();
    });
});