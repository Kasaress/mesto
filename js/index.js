import { initialCards } from "./cards_data.js";
import { deactivateButton } from "./validate.js";
import { Card } from "./Card.js";

const profilePopup = document.querySelector("#profilePopup");
const profilePopupCloseButton = document.querySelector(".popup__close-button");
const profilePopupEditButton = document.querySelector(".profile__edit-button");
const profileEditForm = document.querySelector(".popup__form");
const profileInputName = document.querySelector("#profileInputName");
const profileInputJob = document.querySelector("#profileInputJob");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const elements = document.querySelector(".elements");
export const imagePopup = document.querySelector("#imagePopup");
export const imagePopupImage = imagePopup.querySelector(".popup__image");
export const imagePopupDescription = imagePopup.querySelector(
  ".popup__image-description"
);
const imagePopupCloseButton = imagePopup.querySelector(".popup__close-button");
const cardPopup = document.querySelector("#cardPopup");
const cardAddButton = document.querySelector(".profile__add-button");
const cardPopupCloseButton = document.querySelector("#closeCardButton");
const cardAddForm = document.querySelector("#addCardForm");
const cardInputName = document.querySelector("#cardInputName");
const cardInputLink = document.querySelector("#cardInputLink");
const popupList = document.querySelectorAll(".popup");
const buttonElement = document.querySelector("#cardSubmitButton");

const hadnleOverlayClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
};

export function openPopup(popup) {
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
  openPopup(profilePopup);
  profileInputName.value = profileName.textContent;
  profileInputJob.value = profileDescription.textContent;
}

function handleProfilePopupCloseButton() {
  closePopup(profilePopup);
}

function handleProfileEditFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = profileInputName.value;
  profileDescription.textContent = profileInputJob.value;
  closePopup(profilePopup);
}

function handlePopupImageCloseButton() {
  closePopup(imagePopup);
}

function handleCardAddButton() {
  cardAddForm.reset();
  deactivateButton(buttonElement);
  openPopup(cardPopup);
}

function handleCardCloseButton() {
  closePopup(cardPopup);
}

function handleCardAddFormSubmit(event) {
  event.preventDefault();
  saveNewCard();
}

profilePopupEditButton.addEventListener("click", handleProfileEditButton);
profilePopupCloseButton.addEventListener(
  "click",
  handleProfilePopupCloseButton
);
profileEditForm.addEventListener("submit", (event) =>
  handleProfileEditFormSubmit(event)
);
cardAddButton.addEventListener("click", handleCardAddButton);
cardPopupCloseButton.addEventListener("click", handleCardCloseButton);
cardAddForm.addEventListener("submit", (event) =>
  handleCardAddFormSubmit(event)
);
imagePopupCloseButton.addEventListener("click", (event) =>
  handlePopupImageCloseButton(event)
);

popupList.forEach((popupElement) => {
  popupElement.addEventListener("mousedown", hadnleOverlayClick);
});

function insertCardToPage(card) {
  elements.prepend(card);
}
function saveNewCard() {
  const newElementData = {
    name: cardInputName.value,
    link: cardInputLink.value,
  };
  const newCard = new Card(newElementData, "#elements");
  insertCardToPage(newCard.getNewCard());
  closePopup(cardPopup);
}

initialCards.map(function (item) {
  const newCard = new Card(item, "#elements");
  insertCardToPage(newCard.getNewCard());
});
