import '../pages/index.css';
import { initialCards } from './cards.js';
import { openModal, closeModal } from './modal.js';
import { createCard, deleteCard, handleLikeCard, handleImageClick } from './card.js';

const cardsContainer = document.querySelector('.places__list');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const editFormElement = popupEditProfile.querySelector('.popup__form');
const nameInput = editFormElement.querySelector('.popup__input_type_name');
const descriptionInput = editFormElement.querySelector('.popup__input_type_description');

const addFormElement = popupAddCard.querySelector('.popup__form');
const placeNameInput = addFormElement.querySelector('.popup__input_type_card-name');
const linkInput = addFormElement.querySelector('.popup__input_type_url');

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(popupEditProfile);
}

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const newCardData = { name: placeNameInput.value, link: linkInput.value };
    renderCard(newCardData);
    closeModal(popupAddCard);
    addFormElement.reset();
}

editFormElement.addEventListener('submit', handleProfileFormSubmit);
addFormElement.addEventListener('submit', handleAddCardFormSubmit);

function renderCard(cardData) {
    const cardElement = createCard(cardData, deleteCard, handleLikeCard, (imageSrc, imageAlt) => {
        handleImageClick(imageSrc, imageAlt, popupImage);
        openModal(popupImage);
    });
    cardsContainer.prepend(cardElement);
}

function renderInitialCards(cards) {
    cards.forEach(renderCard);
}

document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    }
});

editButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
    openModal(popupEditProfile);
});

addButton.addEventListener('click', () => {
    openModal(popupAddCard);
});

closeButtons.forEach(button => {
    button.addEventListener('click', (evt) => {
        closeModal(evt.target.closest('.popup'));
    });
});

renderInitialCards(initialCards);