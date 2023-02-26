import "./pages/index.css";
import {
  initialCards,
  validationConfig,
  formValidators,
  profilePopupEditButton,
  profileEditForm,
  profileInputName,
  profileInputJob,
  cardAddButton,
  elementsSelector,
  cardPopupSelector,
  addCardFormSelector,
  popupsForms,
  imagePopupSelector,
  profileNameSelector,
  profileDescriptionSelector,
  profilePopupSelector,
  profileEditFormSelector,
} from "./utils/constants.js";
import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";

// попап с картинкой
const popupImageObject = new PopupWithImage(imagePopupSelector);
popupImageObject.setEventListeners();

function openImage({ link, name }) {
  popupImageObject.open(name, link);
}

function handleCardClick(name, link) {
  popupImageObject.src = this.link;
  popupImageObject.alt = this.name;
  popupImageObject.textContent = this.name;
}

// добавление карточки места
function createCard(item) {
  const newCard = new Card(item, elementsSelector, handleCardClick, openImage);
  return newCard.getNewCard();
}

const popupCard = new PopupWithForm(cardPopupSelector, (input) => {
  const data = {
    name: input.card_name,
    link: input.card_link,
  };
  cardList.addItem(createCard(data));
  popupCard.close();
});

popupCard.setEventListeners();

function handleCardAddButton() {
  formValidators[addCardFormSelector].resetValidation();
  popupCard.open();
}
cardAddButton.addEventListener("click", handleCardAddButton);

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

// инфо юзера
const userInfo = new UserInfo({
  name: profileNameSelector,
  description: profileDescriptionSelector,
});

// попап редактирования профиля
const popupEditProfile = new PopupWithForm(profilePopupSelector, (input) => {
  userInfo.setUserInfo(input.profile_name, input.profile_description);
  popupEditProfile.close();
});

popupEditProfile.setEventListeners();

function insertUserInfo() {
  const info = userInfo.getUserInfo();
  profileInputName.value = info.name;
  profileInputJob.value = info.description;
}

function handleProfileEditButton() {
  formValidators[profileEditFormSelector].resetValidation();
  insertUserInfo();
  popupEditProfile.open();
}

function handleProfileEditFormSubmit(event) {
  event.preventDefault();
  insertUserInfo();
  popupEditProfile.close();
}

profilePopupEditButton.addEventListener("click", handleProfileEditButton);

profileEditForm.addEventListener("submit", (event) =>
  handleProfileEditFormSubmit(event)
);

// включаем валидацию
function enableFormsValidation(config) {
  const formList = Array.from(popupsForms);
  formList.forEach((formElement) => {
    const newFormValidator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = newFormValidator;
    newFormValidator.enableValidation();
  });
}

enableFormsValidation(validationConfig);
