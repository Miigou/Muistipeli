import { createBoard } from './board.js';

const winOverlay = document.getElementById('win-overlay');
const winAttempts = document.getElementById('win-attempts');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const cardThemeSelect = document.getElementById('card-theme-select');

const THEME_STORAGE_KEY = 'muistipeli-theme';
const CARD_THEME_STORAGE_KEY = 'muistipeli-card-theme';

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('theme-dark', isDark);
    themeToggleBtn.textContent = isDark ? 'Vaalea teema' : 'Tumma teema';
    themeToggleBtn.setAttribute('aria-pressed', String(isDark));
}

function setupThemeToggle() {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const initialTheme = storedTheme === 'dark' ? 'dark' : 'light';
    applyTheme(initialTheme);

    themeToggleBtn.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
        applyTheme(nextTheme);
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    });
}

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
    const selectedCardTheme = cardThemeSelect.value || 'fruits';
    createBoard(cardCount, showWinMessage, selectedCardTheme);
}

function setupCardThemeSelection() {
    const savedCardTheme = localStorage.getItem(CARD_THEME_STORAGE_KEY);
    const allowedThemes = ['fruits', 'poker'];
    const initialTheme = allowedThemes.includes(savedCardTheme) ? savedCardTheme : 'fruits';
    cardThemeSelect.value = initialTheme;

    cardThemeSelect.addEventListener('change', () => {
        localStorage.setItem(CARD_THEME_STORAGE_KEY, cardThemeSelect.value);
        startGame();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();
    setupCardThemeSelection();
    startGame();

    document.getElementById('restart-btn').addEventListener('click', () => {
        startGame();
    });

    document.getElementById('play-again-btn').addEventListener('click', () => {
        startGame();
    });
});