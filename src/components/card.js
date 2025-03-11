export function createCard({cardData, deleteCallback, likeCallback, imageClickCallback, userId}) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like-count');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    likeCount.textContent = cardData.likes.length;

    if (cardData.likes.some(like => like._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    if (cardData.owner._id !== userId) {
        deleteButton.style.display = 'none';
    } else {
        deleteButton.addEventListener('click', () => deleteCallback(cardElement, cardData._id));
    }

    likeButton.addEventListener('click', () => likeCallback(likeButton, likeCount, cardData._id));

    cardImage.addEventListener('click', () => imageClickCallback(cardData.link, cardData.name));

    return cardElement;
}

export function deleteCard(cardElement) {
    cardElement.remove();
}
