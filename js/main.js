const popUp = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const submitButton = document.querySelector('.popup__submit-button');
let formElements = document.querySelectorAll('.popup__input')

function openPopup(popup) {
    popup.classList.add('popup_opened');
};
function closePopup(popup) {
    popup.classList.remove('popup_opened');
};
function savePopup(popup) {
    document.querySelector('.profile__name').textContent = formElements[0].value;
    document.querySelector('.profile__description').textContent = formElements[1].value;
    closePopup(popup)
};
editButton.addEventListener('click', (event) => {
    openPopup(popUp);
    formElements[0].value = document.querySelector('.profile__name').textContent;
    formElements[1].value = document.querySelector('.profile__description').textContent;
});
closeButton.addEventListener('click', (event) => {
    closePopup(popUp)
});
submitButton.addEventListener('click', (event) => {
    savePopup(popUp)
});
