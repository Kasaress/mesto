const popUp = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
function openPopup(popup) {
    popup.classList.add('popup_opened');
    console.log('меня вызвали')
};
const closeButton = document.querySelector('.popup__close-button');
function closePopup(popup) {
    popup.classList.remove('popup_opened');
};
editButton.addEventListener('click', (event) => {
    openPopup(popUp)
});
closeButton.addEventListener('click', (event) => {
    closePopup(popUp)
});



