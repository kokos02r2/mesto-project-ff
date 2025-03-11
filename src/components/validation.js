const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, config) => {
  let errorMessage = inputElement.validationMessage;

  if (!inputElement.validity.valid) {
    if (inputElement.validity.patternMismatch) {
      errorMessage = inputElement.dataset.errorMessage || errorMessage;
    }
    showInputError(formElement, inputElement, errorMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const toggleButtonState = (inputList, submitButton, config) => {
  const isFormValid = inputList.every((input) => input.validity.valid);
  submitButton.disabled = !isFormValid;
  submitButton.classList.toggle(config.inactiveButtonClass, !isFormValid);
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, submitButton, config);
    });
  });

  toggleButtonState(inputList, submitButton, config);
};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

export const clearValidation = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((input) => hideInputError(formElement, input, config));
  toggleButtonState(inputList, submitButton, config);
};
