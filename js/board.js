import { createCardElement, flipCard } from './card.js';

const allCards = [
    '🍎', '🍐', '🍒', '🍉', '🍇', '🍓', '🍌', '🍍', '🥝', '🥥', '🍑', '🍈', '🍋', '🍊', '🍏', '🍅'
];
const gameBoard = document.getElementById('game-board');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let totalPairs = 0;
let onGameWon = null;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function clearBoard() {
    gameBoard.innerHTML = '';
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matchedPairs = 0;
    totalPairs = 0;
}

export function createBoard(cardCount, onWin) {
    clearBoard();
    totalPairs = cardCount / 2;
    onGameWon = onWin || null;
    const columns = Math.min(Math.ceil(Math.sqrt(cardCount)), 6);
    gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    const selectedCards = allCards.slice(0, cardCount / 2);
    const cards = [...selectedCards, ...selectedCards];
    shuffle(cards);
    cards.forEach(card => {
        const cardElement = createCardElement(card);
        cardElement.addEventListener('click', () => {
            if (lockBoard) return;
            if (cardElement.classList.contains('matched')) return;
            flipCard(cardElement, handleCardFlip);
        });
        gameBoard.appendChild(cardElement);
    });
}

function handleCardFlip(cardElement) {
    if (lockBoard) return;
    if (cardElement === firstCard) return;

    if (!firstCard) {
        firstCard = cardElement;
        return;
    }

    secondCard = cardElement;
    lockBoard = true;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedPairs++;
    const won = matchedPairs === totalPairs;
    resetBoard();
    if (won && onGameWon) {
        onGameWon();
    }
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}