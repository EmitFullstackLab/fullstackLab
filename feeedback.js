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
const exit = document.getElementById('exit');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  // Esegui qui la logica per inviare il modulo al server

  // Mostra il popup e lo sfondo opaco
  popup.style.display = 'block';
  overlay.style.display = 'block';
});

// Aggiungi un evento per chiudere il popup e nascondere lo sfondo opaco
exit.addEventListener('click', function () {
  popup.style.display = 'none';
  overlay.style.display = 'none';
});
