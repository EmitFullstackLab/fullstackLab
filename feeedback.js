let selectedStar = 0;
let feedbackData = [];

function changeStarColor(selectedValue) {
  selectedStar = selectedValue;
  const stars = document.querySelectorAll('.star svg');
  stars.forEach((star, index) => {
    star.classList.toggle('selected', index < selectedValue);
  });
}

const stars = document.querySelectorAll('.star svg');
stars.forEach((star, index) => {
  star.addEventListener('click', () => changeStarColor(index + 1));
});

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const subject = document.querySelector('#subject').value;
  const message = document.querySelector('#text').value;
  feedbackData.push({ subject, rating: selectedStar, message });
  console.log(feedbackData);
});

const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');
const continua = document.getElementById('continua');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  console.log("Invio al db")
  console.log("Reset dei campi")
  form.reset();
  selectedStar = 0;
  changeStarColor(0);

  popup.style.display = 'block';
  overlay.style.display = 'block';
});

// Aggiungi un evento per chiudere il popup e nascondere lo sfondo opaco
continua.addEventListener('click', function () {
  console.log("continua")
  popup.style.display = 'none';
  overlay.style.display = 'none';
});

const exitButton = document.querySelector('#exit'); // Seleziona l'elemento per il pulsante "Esci"

exitButton.addEventListener('click', () => {
  console.log("pop up chiuso")
  popup.style.display = 'none';
  overlay.style.display = 'none';
});