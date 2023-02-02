const configObject = {
    popupFormsSelector: '.popup__form',
    popupInputSelector: '.popup__input',
    popupSubmitButtonSelector: '.popup__submit-button'
}

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
  };
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type-error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(configObject.popupInputSelector));
    const buttonElement = formElement.querySelector(configObject.popupSubmitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};



function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}
function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('button_inactive');
        buttonElement.disabled = true;
} else {
    buttonElement.classList.remove('button_inactive');
    buttonElement.disabled = false;
    }
}

function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.popupFormsSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    }); 
}
enableValidation(configObject)