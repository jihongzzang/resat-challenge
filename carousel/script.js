const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const slideCountSelect = document.getElementById('slideCount');

let currentIndex = 0;
let slideCount = 1;

function updateSlideWidth() {
  const containerWidth = slider.offsetWidth;
  const gap = 20;
  const slideWidth = (containerWidth - gap * (slideCount - 1)) / slideCount;

  slides.forEach((slide, index) => {
    slide.style.flex = `0 0 ${slideWidth}px`;
    slide.style.maxWidth = `${slideWidth}px`;
    slide.style.marginRight = index < slides.length - 1 ? `${gap}px` : '0';
  });

  slider.style.transform = `translateX(-${currentIndex * (slideWidth + gap)}px)`;
}

function updateArrowVisibility() {
  const maxIndex = slides.length - slideCount;
  prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
  nextBtn.style.display = currentIndex === maxIndex ? 'none' : 'block';
}

function showSlide(index) {
  const maxIndex = slides.length - slideCount;
  currentIndex = Math.max(0, Math.min(index, maxIndex));
  updateSlideWidth();
  updateArrowVisibility();
}

prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));

slideCountSelect.addEventListener('change', (e) => {
  slideCount = parseInt(e.target.value);
  showSlide(currentIndex);
});

window.addEventListener('resize', () => {
  updateSlideWidth();
  updateArrowVisibility();
});

updateSlideWidth();
updateArrowVisibility();
