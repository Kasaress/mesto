import { initialCards, validationConfig } from "./data.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

const formValidators = {};
const profilePopup = document.querySelector("#profilePopup");
const profilePopupEditButton = document.querySelector(".profile__edit-button");
const profileEditForm = document.querySelector(".popup__form");
const profileInputName = document.querySelector("#profileInputName");
const profileInputJob = document.querySelector("#profileInputJob");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const elements = document.querySelector(".elements");
const cardPopup = document.querySelector("#cardPopup");
const cardAddButton = document.querySelector(".profile__add-button");
const cardAddForm = document.querySelector("#addCardForm");
const cardInputName = document.querySelector("#cardInputName");
const cardInputLink = document.querySelector("#cardInputLink");

// попап с картинкой
const popupImageObject = new PopupWithImage("#imagePopup");
popupImageObject.setEventListeners();

function openImage({ link, name }) {
  popupImageObject.open(name, link);
}

function handleCardClick(name, link) {
  popupImageObject.src = this.link;
  popupImageObject.alt = this.name;
  popupImageObject.textContent = this.name;
}

// Добавление первых карточек на страницу
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardList.addItem(card);
    },
  },
  ".elements"
);

cardList.renderItems();

// добавление карточки места
const popupCard = new PopupWithForm("#cardPopup", (input) => {
  const data = {
    name: input.card_name,
    link: input.card_link,
  }
  cardList.addItem(createCard(data));
  popupCard.close();
});

popupCard.setEventListeners();

function handleCardAddButton() {
  formValidators["addCardForm"].resetValidation();
  popupCard.open();
}
cardAddButton.addEventListener("click", handleCardAddButton);


function createCard(item) {
  const newCard = new Card(item, "#elements", handleCardClick, openImage);
  return newCard.getNewCard();
}


// инфо юзера
const userInfo = new UserInfo({
  name: ".profile__name",
  description: ".profile__description",
});

// попап редактирования профиляы
const popupEditProfile = new PopupWithForm("#profilePopup", (input) => {
  userInfo.setUserInfo(input.profile_name, input.profile_description);
  popupEditProfile.close();
});

popupEditProfile.setEventListeners();

function handleProfileEditButton() {
  formValidators["profileEditForm"].resetValidation();
  const info = userInfo.getUserInfo();
  profileInputName.value = info.name;
  profileInputJob.value = info.description;
  popupEditProfile.open();
}

function handleProfileEditFormSubmit(event) {
  event.preventDefault();
  const info = userInfo.getUserInfo();
  profileInputName.value = info.name;
  profileInputJob.value = info.description;
  popupEditProfile.close();
}
profilePopupEditButton.addEventListener("click", handleProfileEditButton);

profileEditForm.addEventListener("submit", (event) =>
  handleProfileEditFormSubmit(event)
);

// включаем валидацию
function enableFormsValidation(config) {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    const newFormValidator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = newFormValidator;
    newFormValidator.enableValidation();
  });
}

enableFormsValidation(validationConfig);
