export class Card {
  constructor(cardData, templateSelector, openImage) {
    this.name = cardData.name;
    this.link = cardData.link;
    this.templateSelector = templateSelector;
    this._elementTemplate = document
      .querySelector(this.templateSelector)
      .content.querySelector(".element");
    this._element = this._createTemplate();
    this._likeButton = this._element.querySelector(".element__like-button");
    this._delButton = this._element.querySelector(".element__delete-button");
    this._imageButton = this._element.querySelector(".element__image-button");
    this._cardImage = this._element.querySelector(".element__image");
    this._cardName = this._element.querySelector(".element__name");
    this._openImage = openImage;
  }
  _createTemplate() {
    return this._elementTemplate.cloneNode(true);
  }
  _handleLikeButton(evt) {
    evt.target.classList.toggle("element__like-button_active");
  }
  _handleDelButton(evt) {
    evt.target.closest(".element").remove();
  }
  _addListeners() {
    this._likeButton.addEventListener("click", (event) =>
      this._handleLikeButton(event)
    );
    this._delButton.addEventListener("click", (event) =>
      this._handleDelButton(event)
    );
    this._cardImage.addEventListener("click", () => {
      this._openImage({ link: this.link, name: this.name });
    });
  }
  _createElement() {
    this._cardName.textContent = this.name;
    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;
    this._addListeners();
    return this._element;
  }
  getNewCard() {
    return this._createElement();
  }
}
