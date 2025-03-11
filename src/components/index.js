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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const cardsContainer = document.querySelector('.places__list');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupConfirm = document.querySelector('.popup_type_confirm');
const confirmButton = popupConfirm.querySelector('.popup__button_confirm');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const editFormElement = popupEditProfile.querySelector('.popup__form');
const nameInput = editFormElement.querySelector('.popup__input_type_name');
const descriptionInput = editFormElement.querySelector('.popup__input_type_description');
const editSubmitButton = editFormElement.querySelector('.popup__button');

const addFormElement = popupAddCard.querySelector('.popup__form');
const placeNameInput = addFormElement.querySelector('.popup__input_type_card-name');
const linkInput = addFormElement.querySelector('.popup__input_type_url');
const addSubmitButton = addFormElement.querySelector('.popup__button');

const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
const popupAvatar = document.querySelector('.popup_type_avatar');
const avatarFormElement = popupAvatar.querySelector('.popup__form');
const avatarInput = avatarFormElement.querySelector('.popup__input_type_url');
const avatarSubmitButton = avatarFormElement.querySelector('.popup__button');
const profileImage = document.querySelector('.profile__image');

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
    const popupImageElement = popupImage.querySelector('.popup__image');
    const popupCaption = popupImage.querySelector('.popup__caption');

    popupImageElement.src = imageSrc;
    popupImageElement.alt = imageAlt;
    popupCaption.textContent = imageAlt;

    openModal(popupImage);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const name = nameInput.value;
    const about = descriptionInput.value;
    const originalButtonText = editSubmitButton.textContent;

    editSubmitButton.textContent = 'Сохранение...';
    editSubmitButton.disabled = true;
    updateUserProfile(name, about)
        .then((updatedUserData) => {
            profileTitle.textContent = updatedUserData.name;
            profileDescription.textContent = updatedUserData.about;
            closeModal(popupEditProfile);
        })
        .catch(err => console.error(`Ошибка обновления профиля: ${err}`))
        .finally(() => {
            editSubmitButton.textContent = originalButtonText;
            editSubmitButton.disabled = false;
        });
}

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    
    const name = placeNameInput.value;
    const link = linkInput.value;
    const originalButtonText = addSubmitButton.textContent;

    addSubmitButton.textContent = 'Сохранение...';
    addSubmitButton.disabled = true;

    addCard(name, link)
        .then((newCardData) => {
            cardsContainer.prepend(renderCard(newCardData, userId));
            closeModal(popupAddCard);
            addFormElement.reset();
            clearValidation(addFormElement, validationConfig);
        })
        .catch(err => console.error(`Ошибка добавления карточки: ${err}`))
        .finally(() => {
            addSubmitButton.textContent = originalButtonText;
            addSubmitButton.disabled = false;
        });
}

function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    
    const avatarUrl = avatarInput.value;
    const originalButtonText = avatarSubmitButton.textContent;

    avatarSubmitButton.textContent = 'Сохранение...';
    avatarSubmitButton.disabled = true;

    updateAvatar(avatarUrl)
        .then((updatedUserData) => {
            profileImage.style.backgroundImage = `url(${updatedUserData.avatar})`;
            closeModal(popupAvatar);
            avatarFormElement.reset();
            clearValidation(avatarFormElement, validationConfig);
        })
        .catch(err => console.error(`Ошибка обновления аватара: ${err}`))
        .finally(() => {
            avatarSubmitButton.textContent = originalButtonText;
            avatarSubmitButton.disabled = false;
        });
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
    return createCard(cardData, confirmDeleteCard, handleLikeCard, handleImageClick, userId);
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

closeButtons.forEach(button => {
    button.addEventListener('click', (evt) => {
        closeModal(evt.target.closest('.popup'));
    });
});

avatarEditButton.addEventListener('click', () => {
    clearValidation(avatarFormElement, validationConfig);
    openModal(popupAvatar);
});

enableValidation(validationConfig);