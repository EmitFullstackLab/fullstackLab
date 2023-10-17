const stars = document.querySelectorAll('.rating-star');

stars.forEach(star => {
  star.addEventListener('click', (e) => {
    const clickedValue = e.currentTarget.getAttribute('data-value');
    removeSelectedStars(); 
    markStarsAsSelected(clickedValue); 
  });
});

function removeSelectedStars() {
  stars.forEach(star => {
    star.classList.remove('selected');
  });
}

function markStarsAsSelected(value) {
  stars.forEach(star => {
    if (star.getAttribute('data-value') <= value) {
      star.classList.add('selected');
    }
  });
}