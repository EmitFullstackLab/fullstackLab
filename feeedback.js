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