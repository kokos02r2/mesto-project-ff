export function createCard(cardData, deleteCallback, likeCallback, imageClickCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', () => deleteCallback(cardElement));
    likeButton.addEventListener('click', () => likeCallback(likeButton));
    cardImage.addEventListener('click', () => imageClickCallback(cardData.link, cardData.name));

    return cardElement;
}

export function deleteCard(cardElement) {
    cardElement.remove();
}

export function handleLikeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}