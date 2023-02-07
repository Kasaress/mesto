import {
  imagePopup,
  openPopup,
  imagePopupImage,
  imagePopupDescription,
} from "./index.js";

export class Card {
  constructor(cardData, templateSelector) {
    this.name = cardData.name;
    this.link = cardData.link;
    this.templateSelector = templateSelector;
  }
  _createTemplate() {
    const elementTemplate = document
      .querySelector(this.templateSelector)
      .content.querySelector(".element");
    const element = elementTemplate.cloneNode(true);
    return element;
  }
  _handleLikeButton(evt) {
    evt.target.classList.toggle("element__like-button_active");
  }
  _handleDelButton(evt) {
    const cardToDel = evt.target.closest(".element");
    cardToDel.remove();
  }
  _handleImageButton() {
    imagePopupImage.src = this.link;
    imagePopupImage.alt = this.name;
    imagePopupDescription.textContent = this.name;
    openPopup(imagePopup);
  }
  _addListeners(element) {
    const buttonToLike = element.querySelector(".element__like-button");
    const buttonToDelete = element.querySelector(".element__delete-button");
    const imageButton = element.querySelector(".element__image-button");
    buttonToLike.addEventListener("click", (event) =>
      this._handleLikeButton(event)
    );
    buttonToDelete.addEventListener("click", (event) =>
      this._handleDelButton(event)
    );
    imageButton.addEventListener("click", () => this._handleImageButton());
  }
  _createElement() {
    const element = this._createTemplate();
    element.querySelector(".element__name").textContent = this.name;
    element.querySelector(".element__image").src = this.link;
    element.querySelector(".element__image").alt = this.name;
    this._addListeners(element);
    return element;
  }
  getNewCard() {
    return this._createElement();
  }
}
