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
