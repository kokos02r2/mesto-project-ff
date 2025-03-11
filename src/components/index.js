import '../pages/index.css';
import { enableValidation, clearValidation } from './validation.js'; 
import { openModal, closeModal } from './modal.js';
import { createCard, deleteCard} from './card.js';
import { 
    getUserProfile, 
    getCards, 
    updateUserProfile, 
    addCard, 
    deleteCardFromServer, 
    addLike, 
    removeLike,
    updateAvatar 
} from './api.js';
import { 
    validationConfig,
    cardsContainer,
    popupEditProfile,
    popupAddCard,
    popupImage,
    popupConfirm,
    popupAvatar,
    confirmButton,
    editButton,
    addButton,
    closeButtons,
    popups,
    profileTitle,
    profileDescription,
    profileImage,
    avatarEditButton,
    editFormElement,
    nameInput,
    descriptionInput,
    addFormElement,
    placeNameInput,
    linkInput,
    avatarFormElement,
    avatarInput,
    popupImageElement,
    popupCaption
} from '../utils/constants.js';
import { handleSubmit } from '../utils/utils.js';

let userId;
let cardToDelete = null;
let cardIdToDelete = null;

Promise.all([getUserProfile(), getCards()])
    .then(([userData, cards]) => {
        userId = userData._id;
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style.backgroundImage = `url(${userData.avatar})`;
        renderInitialCards(cards, userId);
    })
    .catch(err => console.error(`Ошибка загрузки данных: ${err}`));

function handleImageClick(imageSrc, imageAlt) {
    popupImageElement.src = imageSrc;
    popupImageElement.alt = imageAlt;
    popupCaption.textContent = imageAlt;

    openModal(popupImage);
}

function handleProfileFormSubmit(evt) {
    handleSubmit(() => updateUserProfile(nameInput.value, descriptionInput.value)
        .then(updatedUserData => {
            profileTitle.textContent = updatedUserData.name;
            profileDescription.textContent = updatedUserData.about;
        }), evt);
}

function handleAddCardFormSubmit(evt) {
    handleSubmit(() => addCard(placeNameInput.value, linkInput.value)
        .then(newCardData => {
            cardsContainer.prepend(renderCard(newCardData, userId));
        }), evt);
}

function handleAvatarFormSubmit(evt) {
    handleSubmit(() => updateAvatar(avatarInput.value)
        .then(updatedUserData => {
            profileImage.style.backgroundImage = `url(${updatedUserData.avatar})`;
        }), evt);
}

function confirmDeleteCard(cardElement, cardId) {
    cardToDelete = cardElement;
    cardIdToDelete = cardId;
    openModal(popupConfirm);
}

function handleLikeCard(likeButton, likeCount, cardId) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const apiMethod = isLiked ? removeLike : addLike;

    apiMethod(cardId)
        .then((updatedCard) => {
            likeButton.classList.toggle('card__like-button_is-active');
            likeCount.textContent = updatedCard.likes.length; 
        })
        .catch(err => console.error(`Ошибка при обработке лайка: ${err}`));
}

confirmButton.addEventListener('click', () => {
    if (cardToDelete && cardIdToDelete) {
        deleteCardFromServer(cardIdToDelete)
            .then(() => {
                deleteCard(cardToDelete);
                closeModal(popupConfirm);
                cardToDelete = null;
                cardIdToDelete = null;
            })
            .catch(err => console.error(`Ошибка удаления карточки: ${err}`));
    }
});

editFormElement.addEventListener('submit', handleProfileFormSubmit);
addFormElement.addEventListener('submit', handleAddCardFormSubmit);
avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);

function renderCard(cardData, userId) {
    return createCard({
        cardData,
        deleteCallback: confirmDeleteCard,
        likeCallback: handleLikeCard,
        imageClickCallback: handleImageClick,
        userId
    });
}

function renderInitialCards(cards, userId) {
    cards.forEach((cardData) => {
        cardsContainer.append(renderCard(cardData, userId));
    });
}

popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup")) {
            closeModal(popup);
        }
    });
});

editButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
    clearValidation(editFormElement, validationConfig);
    openModal(popupEditProfile);
});

addButton.addEventListener('click', () => {
    clearValidation(addFormElement, validationConfig);
    openModal(popupAddCard);
});

avatarEditButton.addEventListener('click', () => {
    clearValidation(avatarFormElement, validationConfig);
    openModal(popupAvatar);
});

closeButtons.forEach(button => {
    button.addEventListener('click', (evt) => {
        closeModal(evt.target.closest('.popup'));
    });
});

enableValidation(validationConfig);