const profilePopup = document.querySelector('#profilePopup');
const profilePopupCloseButton = document.querySelector('.popup__close-button');
const profilePopupEditButton = document.querySelector('.profile__edit-button');
const profileEditForm = document.querySelector('.popup__form');
const profileInputName = document.querySelector('#profileInputName');
const profileInputJob = document.querySelector('#profileInputJob');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const elementsTemplate = document.querySelector('#elements').content;
const elements = document.querySelector('.elements');
const imagePopup = document.querySelector('#imagePopup');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupDescription = imagePopup.querySelector('.popup__image-description');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button');
const cardPopup = document.querySelector('#cardPopup');
const cardAddButton = document.querySelector('.profile__add-button');
const cardPopupCloseButton = document.querySelector('#closeCardButton');
const cardAddForm = document.querySelector('#addCardForm');
const cardInputName = document.querySelector('#cardInputName');
const cardInputLink = document.querySelector('#cardInputLink');

function openPopup(popup) {
  popup.classList.add('popup_opened');
};
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};
function createElement(el) {
  const element = elementsTemplate.querySelector('.element').cloneNode(true);
  const likeButton = element.querySelector('.element__like-button');
  const delButton = element.querySelector('.element__delete-button');
  const imageButton = element.querySelector('.element__image-button');
  element.querySelector('.element__image').src = el.link;
  element.querySelector('.element__name').textContent = el.name;
  likeButton.addEventListener('click', (event) => handleLikeButton(event));
  delButton.addEventListener('click', (event) => handleDelButton(event));
  imageButton.addEventListener('click', () => handleImageButton(el.name, el.link));
  return element;
};
function validateImageURL(url) {
  if (url.startsWith('http') && (url.endsWith('jpg') || url.endsWith('png'))) {
    return url;
    } else {
      return false;
    }
};
function saveNewCard() {
  newElementData = {
    name: cardInputName.value,
    link: validateImageURL(cardInputLink.value) || 'images/question.jpg'
  };
  elementToAdd = createElement(newElementData);
  elements.prepend(elementToAdd);
  closePopup(cardPopup);
  cardInputName.value = '';
  cardInputLink.value = '';
};
function handleProfileEditButton () {
    openPopup(profilePopup);
    profileInputName.value = document.querySelector('.profile__name').textContent;
    profileInputJob.value = document.querySelector('.profile__description').textContent;
};
function handleProfilePopupCloseButton () {
    closePopup(profilePopup);
};
function handleProfileEditFormSubmit (event) {
    event.preventDefault();
    profileName.textContent = profileInputName.value;
    profileDescription.textContent = profileInputJob.value;
    closePopup(profilePopup);
};
function handleLikeButton(evt) {
  evt.target.classList.toggle('element__like-button_active');
};
function handleDelButton(evt) {
  const cardToDel = evt.target.closest('.element');
  cardToDel.remove();
};
function handlePopupImageCloseButton () {
  closePopup(imagePopup);
};
function handleImageButton(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupDescription.textContent = name;
  openPopup(imagePopup);
};
function handleCardAddButton () {
  openPopup(cardPopup);
};
function handleCardCloseButton () {
  closePopup(cardPopup);
  cardInputName.value = '';
  cardInputLink.value = '';
};
function handleCardAddFormSubmit (event) {
  event.preventDefault();
  saveNewCard();
};

profilePopupEditButton.addEventListener('click', handleProfileEditButton);
profilePopupCloseButton.addEventListener('click', handleProfilePopupCloseButton);
profileEditForm.addEventListener('submit', (event) => handleProfileEditFormSubmit(event));
cardAddButton.addEventListener('click', handleCardAddButton);
cardPopupCloseButton.addEventListener('click', handleCardCloseButton);
cardAddForm.addEventListener('submit', (event) => handleCardAddFormSubmit(event));
imagePopupCloseButton.addEventListener('click', (event) => handlePopupImageCloseButton(event));

initialCards.map(function (item) {
  elements.prepend(createElement(item));
});
  