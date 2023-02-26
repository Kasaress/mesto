export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const validationConfig = {
  popupFormsSelector: ".popup__form",
  popupInputSelector: ".popup__input",
  popupSubmitButtonSelector: ".popup__submit-button",
  popupInputTypeErrorClass: "popup__input_type-error",
  popupInputErrorActiveClass: "popup__input-error_active",
  buttonInactiveClass: "button_inactive",
};

export const formValidators = {};
export const profilePopupEditButton = document.querySelector(".profile__edit-button");
export const profileEditForm = document.querySelector(".popup__form");
export const profileInputName = document.querySelector("#profileInputName");
export const profileInputJob = document.querySelector("#profileInputJob");
export const cardAddButton = document.querySelector(".profile__add-button");
export const elementsSelector = "#elements";
export const cardPopupSelector = "#cardPopup";
export const addCardFormSelector = "addCardForm";
export const popupsForms = document.querySelectorAll(".popup__form");
export const imagePopupSelector = "#imagePopup";
export const profileNameSelector = ".profile__name";
export const profileDescriptionSelector = ".profile__description";
export const profilePopupSelector = "#profilePopup";
export const profileEditFormSelector = "profileEditForm";