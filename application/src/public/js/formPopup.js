//open and closes the popup window about privacy policies
const openPopup = document.getElementById('open-popup');
const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('close-popup');

openPopup.addEventListener('click', function(){
    overlay.classList.add('active');
    popup.classList.add('active');
});

closePopup.addEventListener('click', function(){
    overlay.classList.remove('active');
    popup.classList.remove('active');
});