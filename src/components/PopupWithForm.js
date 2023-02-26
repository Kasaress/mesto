import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._buttonSave = this._form.querySelector(".popup__submit-button");
  }

  _getInputValues() {
    this._inputValueList = {};
    this._inputList.forEach((item) => {
      this._inputValueList[item.name] = item.value;
    });
    return this._inputValueList;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name.split('_')[1]];
    });
  }
}
