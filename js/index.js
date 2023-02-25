import { initialCards, validationConfig } from "./data.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";

const formValidators = {};
const profilePopup = document.querySelector("#profilePopup");
const profilePopupEditButton = document.querySelector(".profile__edit-button");
const profileEditForm = document.querySelector(".popup__form");
const profileInputName = document.querySelector("#profileInputName");
const profileInputJob = document.querySelector("#profileInputJob");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const elements = document.querySelector(".elements");
const imagePopup = document.querySelector("#imagePopup");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupDescription = imagePopup.querySelector(
  ".popup__image-description"
);
const cardPopup = document.querySelector("#cardPopup");
const cardAddButton = document.querySelector(".profile__add-button");
const cardAddForm = document.querySelector("#addCardForm");
const cardInputName = document.querySelector("#cardInputName");
const cardInputLink = document.querySelector("#cardInputLink");
const popupList = document.querySelectorAll(".popup");

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const popupElement = document.querySelector(".popup_opened");
    closePopup(popupElement);
  }
}

function handleProfileEditButton() {
  formValidators["profileEditForm"].resetValidation();
  openPopup(profilePopup);
  profileInputName.value = profileName.textContent;
  profileInputJob.value = profileDescription.textContent;
}

function handleProfileEditFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = profileInputName.value;
  profileDescription.textContent = profileInputJob.value;
  closePopup(profilePopup);
}

function handleCardAddButton() {
  formValidators["addCardForm"].resetValidation();
  openPopup(cardPopup);
}

function handleCardAddFormSubmit(event) {
  event.preventDefault();
  saveNewCard();
}

function insertCardToPage(card) {
  elements.prepend(card);
}

function createCard(item) {
  const newCard = new Card(item, "#elements", handleCardClick);
  return newCard.getNewCard();
}

function saveNewCard() {
  const newElementData = {
    name: cardInputName.value,
    link: cardInputLink.value,
  };
  insertCardToPage(createCard(newElementData));
  closePopup(cardPopup);
}

function enableFormsValidation(config) {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    const newFormValidator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = newFormValidator;
    newFormValidator.enableValidation();
  });
}

function handleCardClick(name, link) {
  imagePopupImage.src = this.link;
  imagePopupImage.alt = this.name;
  imagePopupDescription.textContent = this.name;
  openPopup(imagePopup);
}

popupList.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

profilePopupEditButton.addEventListener("click", handleProfileEditButton);
profileEditForm.addEventListener("submit", (event) =>
  handleProfileEditFormSubmit(event)
);
cardAddButton.addEventListener("click", handleCardAddButton);
cardAddForm.addEventListener("submit", (event) =>
  handleCardAddFormSubmit(event)
);

// initialCards.map(function (item) {
//   insertCardToPage(createCard(item));
// });

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    cardList.addItem(card);
  }
}, '.elements');

cardList.renderItems();

enableFormsValidation(validationConfig);
