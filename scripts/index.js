const cardsContainer = document.querySelector('.places__list');

function deleteCard(cardElement) {
    cardElement.remove();
}

function createCard(cardData, deleteCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', () => deleteCallback(cardElement));

    return cardElement;
}

function renderCard(cardData) {
    const cardElement = createCard(cardData, deleteCard);
    cardsContainer.prepend(cardElement);
}

function renderInitialCards(cards) {
    cards.forEach(renderCard);
}

renderInitialCards(initialCards);
