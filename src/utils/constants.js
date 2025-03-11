export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const cardsContainer = document.querySelector('.places__list');

export const popupEditProfile = document.querySelector('.popup_type_edit');
export const popupAddCard = document.querySelector('.popup_type_new-card');
export const popupImage = document.querySelector('.popup_type_image');
export const popupConfirm = document.querySelector('.popup_type_confirm');
export const popupAvatar = document.querySelector('.popup_type_avatar');

export const confirmButton = popupConfirm.querySelector('.popup__button_confirm');
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const closeButtons = document.querySelectorAll('.popup__close');
export const popups = document.querySelectorAll('.popup');

export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const profileImage = document.querySelector('.profile__image');
export const avatarEditButton = document.querySelector('.profile__avatar-edit-button');

export const editFormElement = document.forms["edit-profile"];
export const addFormElement = document.forms["new-place"];
export const avatarFormElement = document.forms["update-avatar"];

export const nameInput = editFormElement.elements["name"];
export const descriptionInput = editFormElement.elements["description"];
export const placeNameInput = addFormElement.elements["place-name"];
export const linkInput = addFormElement.elements["link"];
export const avatarInput = avatarFormElement.elements["avatar"];

export const editSubmitButton = editFormElement.querySelector('.popup__button');
export const addSubmitButton = addFormElement.querySelector('.popup__button');
export const avatarSubmitButton = avatarFormElement.querySelector('.popup__button');

export const popupImageElement = popupImage.querySelector('.popup__image');
export const popupCaption = popupImage.querySelector('.popup__caption');
