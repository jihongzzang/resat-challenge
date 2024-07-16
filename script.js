const carouselSlide = document.querySelector('.carousel-slide');

const prevBtn = document.querySelector('.prev');

const nextBtn = document.querySelector('.next');

const slideCountSelect = document.getElementById('slideCount');

const images = [
  'https://images.unsplash.com/photo-1505144808419-1957a94ca61e',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
  'https://images.unsplash.com/photo-1720937172267-575f3575386b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D,',
  'https://images.unsplash.com/photo-1505245208761-ba872912fac0',
  'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1',
];

let counter = 1;
let slideInterval;
let isTransitioning = false;
let slidesPerView = 1;

function loadImages() {
  carouselSlide.innerHTML = '';
  for (let i = 1; i <= slidesPerView; i++) {
    carouselSlide.innerHTML += `<img src="${images[images.length - i]}" alt="Clone ${i}">`;
  }
  images.forEach((img) => {
    carouselSlide.innerHTML += `<img src="${img}" alt="">`;
  });
  for (let i = 0; i < slidesPerView; i++) {
    carouselSlide.innerHTML += `<img src="${images[i]}" alt="Clone ${i}">`;
  }
  updateSlidePosition();
}

function updateSlidePosition() {
  carouselSlide.style.transform = `translateX(${(-100 * counter) / slidesPerView}%)`;
}

function slideNext() {
  if (isTransitioning) return;
  isTransitioning = true;
  counter++;
  carouselSlide.style.transition = 'transform 0.5s ease-in-out';
  updateSlidePosition();
}

function slidePrev() {
  if (isTransitioning) return;
  isTransitioning = true;
  counter--;
  carouselSlide.style.transition = 'transform 0.5s ease-in-out';
  updateSlidePosition();
}

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(slideNext, 2000);
}

function initializeCarousel() {
  counter = slidesPerView;
  loadImages();
  resetInterval();
  updateStyles();
}

function updateStyles() {
  const images = carouselSlide.querySelectorAll('img');
  images.forEach((img) => {
    img.style.flex = `0 0 ${100 / slidesPerView}%`;
  });
  carouselSlide.style.transform = `translateX(${(-100 * counter) / slidesPerView}%)`;
}

nextBtn.addEventListener('click', () => {
  slideNext();
  resetInterval();
});

prevBtn.addEventListener('click', () => {
  slidePrev();
  resetInterval();
});

carouselSlide.addEventListener('transitionend', () => {
  isTransitioning = false;
  if (counter <= slidesPerView - 1) {
    carouselSlide.style.transition = 'none';
    counter = images.length + (counter - slidesPerView);
    updateSlidePosition();
  } else if (counter >= images.length + slidesPerView) {
    carouselSlide.style.transition = 'none';
    counter = slidesPerView + (counter - images.length - slidesPerView);
    updateSlidePosition();
  }
});

slideCountSelect.addEventListener('change', (e) => {
  slidesPerView = parseInt(e.target.value);
  initializeCarousel();
});

initializeCarousel();
