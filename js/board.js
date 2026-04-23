import { createCardElement, flipCard } from './card.js';

const cardSets = {
    fruits: [
        { id: 'apple', label: '🍎', color: 'default' },
        { id: 'pear', label: '🍐', color: 'default' },
        { id: 'cherry', label: '🍒', color: 'default' },
        { id: 'watermelon', label: '🍉', color: 'default' },
        { id: 'grapes', label: '🍇', color: 'default' },
        { id: 'strawberry', label: '🍓', color: 'default' },
        { id: 'banana', label: '🍌', color: 'default' },
        { id: 'pineapple', label: '🍍', color: 'default' },
        { id: 'kiwi', label: '🥝', color: 'default' },
        { id: 'coconut', label: '🥥', color: 'default' },
        { id: 'peach', label: '🍑', color: 'default' },
        { id: 'melon', label: '🍈', color: 'default' },
        { id: 'lemon', label: '🍋', color: 'default' },
        { id: 'orange', label: '🍊', color: 'default' },
        { id: 'greenApple', label: '🍏', color: 'default' },
        { id: 'tomato', label: '🍅', color: 'default' }
    ],
    poker: [
        { id: 'spade_solid', label: '♠', color: 'black' },
        { id: 'spade_outline', label: '♤', color: 'black' },
        { id: 'club_solid', label: '♣', color: 'black' },
        { id: 'club_outline', label: '♧', color: 'black' },
        { id: 'heart_solid', label: '♥', color: 'red' },
        { id: 'heart_outline', label: '♡', color: 'red' },
        { id: 'diamond_solid', label: '♦', color: 'red' },
        { id: 'diamond_outline', label: '♢', color: 'red' }
    ]
};
const gameBoard = document.getElementById('game-board');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let totalPairs = 0;
let onGameWon = null;
let attempts = 0;
const attemptsDisplay = document.getElementById('attempts-counter');

function updateAttemptsDisplay() {
    attemptsDisplay.textContent = String(attempts);
}

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
    attempts = 0;
    updateAttemptsDisplay();
}

export function createBoard(cardCount, onWin, cardTheme = 'fruits') {
    clearBoard();
    totalPairs = cardCount / 2;
    onGameWon = onWin || null;

    const selectedSet = cardSets[cardTheme] || cardSets.fruits;
    if (totalPairs > selectedSet.length) {
        alert(`Valitussa korttityylissa on enintaan ${selectedSet.length * 2} korttia.`);
        return;
    }

    const columns = Math.min(Math.ceil(Math.sqrt(cardCount)), 6);
    gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    const selectedCards = selectedSet.slice(0, totalPairs);
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
    attempts++;
    updateAttemptsDisplay();
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
        onGameWon(attempts);
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