const slider = document.querySelector('.slider');

const slides = document.querySelectorAll('.slide');

const prevBtn = document.querySelector('.prev');

const nextBtn = document.querySelector('.next');

const slideCountSelect = document.getElementById('slideCount');

let currentIndex = 0;

let slideCount = 1;

let startX;

let isDragging = false;

let startTranslate = 0;

function updateSlideWidth() {
  const containerWidth = slider.offsetWidth;
  const gap = 20;
  const slideWidth = (containerWidth - gap * (slideCount - 1)) / slideCount;

  slides.forEach((slide, index) => {
    slide.style.flex = `0 0 ${slideWidth}px`;
    slide.style.maxWidth = `${slideWidth}px`;
    slide.style.marginRight = index < slides.length - 1 ? `${gap}px` : '0';

    const img = slide.querySelector('img');

    if (img) {
      img.setAttribute('draggable', 'false');
    }
  });

  slider.style.transition = 'transform 0.3s ease';
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

function dragStart(e) {
  isDragging = true;
  startX = e.clientX;
  startTranslate = getCurrentTranslate();
  slider.style.transition = 'none';

  slider.addEventListener('mousemove', dragging);
  slider.addEventListener('mouseup', dragEnd);
  slider.addEventListener('mouseleave', dragEnd);
}

function dragging(e) {
  if (!isDragging) return;
  const currentX = e.clientX;
  const diff = startX - currentX;
  const newTranslate = startTranslate + diff;
  slider.style.transform = `translateX(-${newTranslate}px)`;
}

function dragEnd() {
  if (!isDragging) return;
  isDragging = false;

  slider.removeEventListener('mousemove', dragging);
  slider.removeEventListener('mouseup', dragEnd);
  slider.removeEventListener('mouseleave', dragEnd);

  const containerWidth = slider.offsetWidth;

  const gap = 20;

  const slideWidth = (containerWidth - gap * (slideCount - 1)) / slideCount;

  const threshold = slideWidth / 10;

  const currentTranslate = getCurrentTranslate();

  const diff = currentTranslate - startTranslate;

  if (diff > threshold && currentIndex < slides.length - slideCount) {
    showSlide(currentIndex + 1);
  } else if (diff < -threshold && currentIndex > 0) {
    showSlide(currentIndex - 1);
  } else {
    showSlide(currentIndex);
  }
}

function touchStart(e) {
  isDragging = true;
  startX = e.touches[0].clientX;
  startTranslate = getCurrentTranslate();
  slider.style.transition = 'none';

  slider.addEventListener('touchmove', touchMove);
  slider.addEventListener('touchend', touchEnd);
  slider.addEventListener('touchcancel', touchEnd);
}

function touchMove(e) {
  if (!isDragging) return;
  const currentX = e.touches[0].clientX;
  const diff = startX - currentX;
  const newTranslate = startTranslate + diff;
  slider.style.transform = `translateX(-${newTranslate}px)`;
}

function touchEnd() {
  if (!isDragging) return;
  isDragging = false;

  slider.removeEventListener('touchmove', touchMove);
  slider.removeEventListener('touchend', touchEnd);
  slider.removeEventListener('touchcancel', touchEnd);

  const containerWidth = slider.offsetWidth;
  const gap = 20;
  const slideWidth = (containerWidth - gap * (slideCount - 1)) / slideCount;
  const threshold = slideWidth / 10;
  const currentTranslate = getCurrentTranslate();
  const diff = currentTranslate - startTranslate;

  if (diff > threshold && currentIndex < slides.length - slideCount) {
    showSlide(currentIndex + 1);
  } else if (diff < -threshold && currentIndex > 0) {
    showSlide(currentIndex - 1);
  } else {
    showSlide(currentIndex);
  }
}

function getCurrentTranslate() {
  const style = window.getComputedStyle(slider);
  const matrix = new WebKitCSSMatrix(style.transform);
  return Math.abs(matrix.m41);
}

prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));

slideCountSelect.addEventListener('change', (e) => {
  slideCount = parseInt(e.target.value);
  showSlide(currentIndex);
});

slider.addEventListener('mousedown', (e) => {
  dragStart(e);
});

slider.addEventListener('touchstart', (e) => {
  touchStart(e);
});

window.addEventListener('resize', () => {
  updateSlideWidth();
  updateArrowVisibility();
});

updateSlideWidth();
updateArrowVisibility();
