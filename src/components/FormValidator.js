export class FormValidator {
  constructor(config, formElement) {
    this.config = config;
    this.formElement = formElement;
    this._buttonSubmit = this.formElement.querySelector(
      this.config.popupSubmitButtonSelector
    );
    this._inputList = Array.from(
      this.formElement.querySelectorAll(this.config.popupInputSelector)
    );
  }
  _activateButton() {
    this._buttonSubmit.classList.remove(this.config.buttonInactiveClass);
    this._buttonSubmit.disabled = false;
  }
  _deactivateButton() {
    this._buttonSubmit.classList.add(this.config.buttonInactiveClass);
    this._buttonSubmit.disabled = true;
  }
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._deactivateButton();
    } else {
      this._activateButton();
    }
  }
  _showInputError(inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this.config.popupInputTypeErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.config.popupInputErrorActiveClass);
  }
  _hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this.config.popupInputTypeErrorClass);
    errorElement.classList.remove(this.config.popupInputErrorActiveClass);
    errorElement.textContent = "";
  }
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _setFormEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
  resetValidation() {
    this.formElement.reset();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._deactivateButton();
  }
  enableValidation() {
    this._setFormEventListeners();
  }
}
