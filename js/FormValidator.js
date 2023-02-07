export class FormValidator {
  constructor(config, formElement) {
    this.config = config;
    this.formElement = formElement;
  }
  _deactivateButton(button) {
    button.classList.add(this.config.buttonInactiveClass);
    button.disabled = true;
  }
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._deactivateButton(buttonElement);
    } else {
      buttonElement.classList.remove(this.config.buttonInactiveClass);
      buttonElement.disabled = false;
    }
  }
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.config.popupInputTypeErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.config.popupInputErrorActiveClass);
  }
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.config.popupInputTypeErrorClass);
    errorElement.classList.remove(this.config.popupInputErrorActiveClass);
    errorElement.textContent = "";
  }
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        this.formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(this.formElement, inputElement);
    }
  }
  _setInputEventListeners(inputElement, inputList, buttonElement) {
    inputElement.addEventListener("input", () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(inputList, buttonElement);
    });
  }
  _setFormEventListeners() {
    const inputList = Array.from(
      this.formElement.querySelectorAll(this.config.popupInputSelector)
    );
    const buttonElement = this.formElement.querySelector(
      this.config.popupSubmitButtonSelector
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._setInputEventListeners(inputElement, inputList, buttonElement);
      });
    });
  }
  enableValidation() {
    this._setFormEventListeners();
  }
}
