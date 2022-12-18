// universal
const closeButton = document.querySelector('.popup__close-button');
function openPopup(popup) {
    popup.classList.add('popup_opened');
};
function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

// edit profile info
const profilePopup = document.querySelector('#profilePopup');
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileForm = document.querySelector('.popup__form');
let profileFormElements = document.querySelectorAll('.popup__input');

function savePopup(popup) {
    document.querySelector('.profile__name').textContent = profileFormElements[0].value;
    document.querySelector('.profile__description').textContent = profileFormElements[1].value;
    closePopup(popup);
};
function handleEditButton () {
    openPopup(profilePopup);
    profileFormElements[0].value = document.querySelector('.profile__name').textContent;
    profileFormElements[1].value = document.querySelector('.profile__description').textContent;
};
function handleCloseButton () {
    closePopup(profilePopup);
};
function handleEditProfileFormSubmit (event) {
    event.preventDefault();
    savePopup(profilePopup);
};
editProfileButton.addEventListener('click', handleEditButton);
closeButton.addEventListener('click', handleCloseButton);
editProfileForm.addEventListener('submit', (event) => handleEditProfileFormSubmit(event));

// add places cards
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

const elementsTemplate = document.querySelector('#elements').content;
const elements = document.querySelector('.elements');
const imagePopup = document.querySelector('#imagePopup');
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
function handleImageButton(evt) {
    const imageToOpen = evt.target.closest('.element__image');
    let popupImage = imagePopup.querySelector('.popup__image');
    popupImage.src = imageToOpen.src;
    openPopup(imagePopup);
    let popupImageClose = imagePopup.querySelector('.popup__close-button');
    popupImageClose.addEventListener('click', (event) => handlePopupImageCloseButton(event))
};
function addElement(el) {
    const element = elementsTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.element__image').src = el.link;
    element.querySelector('.element__name').textContent = el.name;
    elements.append(element);
    let likeButton = element.querySelector('.element__like-button');
    let delButton = element.querySelector('.element__delete-button');
    let imageButton = element.querySelector('.element__image-button');
    likeButton.addEventListener('click', (event) => handleLikeButton(event));
    delButton.addEventListener('click', (event) => handleDelButton(event));
    imageButton.addEventListener('click', (event) => handleImageButton(event));
};

initialCards.forEach(addElement);
// add new card
const addButton = document.querySelector('.profile__add-button');
const closeCardButton = document.querySelector('#closeCardButton');
const cardPopup= document.querySelector('#cardPopup');
const addNewCardForm = document.querySelector('#addCardForm');
let cardFormElements = document.querySelectorAll('#cardPopupInput');

function handleAddButton () {
    openPopup(cardPopup);
};
function handleCloseCardButton () {
    closePopup(cardPopup);
};
function saveCardPopup() {
    console.log('пытаются сохранить')
    console.log(cardFormElements)
    newElement = {
        name: cardFormElements[0].value,
        link: cardFormElements[1].value
      },
    addElement(newElement);
    console.log(newElement);
    closePopup(cardPopup);
};

function handleAddCardFormSubmit (event) {
    event.preventDefault();
    saveCardPopup();
};
addButton.addEventListener('click', handleAddButton);
closeCardButton.addEventListener('click', handleCloseCardButton);
addNewCardForm.addEventListener('submit', (event) => handleAddCardFormSubmit(event));



