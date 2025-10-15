// ==================== BURGER MENU ====================
document.getElementById('burger').addEventListener('click', () => {
  document.getElementById('navMenu').classList.toggle('active');
});

// ==================== SLIDER BACKGROUND AUTO ====================
// Pour toutes les sections avec slider-bg
document.querySelectorAll('.slider-bg').forEach(sliderBg => {
  const slides = sliderBg.querySelectorAll('.bg-slide');
  if (slides.length === 0) return;

  let currentIndex = 0;
  slides[0].classList.add('active');

  setInterval(() => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
  }, 4000);
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
