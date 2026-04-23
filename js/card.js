export function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.card = card.id;
    cardElement.dataset.label = card.label;

    if (card.color === 'red') {
        cardElement.classList.add('card-red');
    } else if (card.color === 'black') {
        cardElement.classList.add('card-black');
    }

    return cardElement;
}

export function flipCard(cardElement, callback) {
    if (cardElement.classList.contains('flipped')) return;
    cardElement.classList.add('flipped');
    cardElement.textContent = cardElement.dataset.label;
    callback(cardElement);
}