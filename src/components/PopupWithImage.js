import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._description = this._popup.querySelector(".popup__image-description");
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._description.textContent = name;
    super.open();
  }
}
