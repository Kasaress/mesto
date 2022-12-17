// edit profile info
const popUp = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const editProfileForm = document.querySelector('.popup__form');
let formElements = document.querySelectorAll('.popup__input');
function openPopup(popup) {
    popup.classList.add('popup_opened');
};
function closePopup(popup) {
    popup.classList.remove('popup_opened');
};
function savePopup(popup) {
    document.querySelector('.profile__name').textContent = formElements[0].value;
    document.querySelector('.profile__description').textContent = formElements[1].value;
    closePopup(popup);
};
function handleEditButton () {
    openPopup(popUp);
    formElements[0].value = document.querySelector('.profile__name').textContent;
    formElements[1].value = document.querySelector('.profile__description').textContent;
};
function handleCloseButton () {
    closePopup(popUp);
};
function handleEditProfileFormSubmit (event) {
    event.preventDefault();
    savePopup(popUp);
};
editButton.addEventListener('click', handleEditButton);
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

function addElement(el) {
    const element = elementsTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.element__image').src = el.link;
    element.querySelector('.element__name').textContent = el.name;
    elements.append(element);
};
initialCards.forEach(addElement);

// like card
const likeButtons = document.querySelectorAll('.element__like-button');
function likeCard(evt) {
    evt.target.classList.toggle('element__like-button_active');
};

for (let i=0; i < likeButtons.length; i++) {
    console.log(likeButtons[i]);
    likeButtons[i].addEventListener('click', (event) => likeCard(event));
}