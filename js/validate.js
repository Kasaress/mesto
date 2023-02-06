const validationConfig = {
  popupFormsSelector: ".popup__form",
  popupInputSelector: ".popup__input",
  popupSubmitButtonSelector: ".popup__submit-button",
  popupInputTypeErrorClass: "popup__input_type-error",
  popupInputErrorActiveClass: "popup__input-error_active",
  buttonInactiveClass: "button_inactive",
};
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.popupInputTypeErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.popupInputErrorActiveClass);
};
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.popupInputTypeErrorClass);
  errorElement.classList.remove(validationConfig.popupInputErrorActiveClass);
  errorElement.textContent = "";
};
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.popupInputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.popupSubmitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

export function deactivateButton(button) {
  button.classList.add(validationConfig.buttonInactiveClass);
  button.disabled = true;
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    deactivateButton(buttonElement);
  } else {
    buttonElement.classList.remove(validationConfig.buttonInactiveClass);
    buttonElement.disabled = false;
  }
}

function enableValidation(config) {
  const formList = Array.from(
    document.querySelectorAll(config.popupFormsSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

enableValidation(validationConfig);
