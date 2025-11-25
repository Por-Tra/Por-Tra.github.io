// ==================== Burger Menu ====================
document.getElementById('burger').onclick = () =>
  document.getElementById('menu').classList.toggle('show');

// ==================== Lightbox Class ====================
class Lightbox {
  constructor() {
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImg = document.getElementById('lightbox-img');
    this.lightboxClose = document.getElementById('lightbox-close');
    this.lightboxPrev = document.getElementById('lightbox-prev');
    this.lightboxNext = document.getElementById('lightbox-next');
    this.lightboxCurrent = document.getElementById('lightbox-current');
    this.lightboxTotal = document.getElementById('lightbox-total');

    this.currentImages = [];
    this.currentIndex = 0;

    this.init();
  }

  init() {
    // Ajouter les événements de clic sur toutes les images
    document.querySelectorAll('.slide').forEach((slide, globalIndex) => {
      slide.addEventListener('click', e => {
        e.preventDefault();
        this.openLightbox(slide, globalIndex);
      });
    });

    // Événements de fermeture et navigation
    this.lightboxClose.addEventListener('click', () => this.closeLightbox());
    this.lightboxPrev.addEventListener('click', () => this.prevImage());
    this.lightboxNext.addEventListener('click', () => this.nextImage());

    // Fermer avec Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') this.prevImage();
      if (e.key === 'ArrowRight') this.nextImage();
    });

    // Fermer en cliquant sur le fond
    this.lightbox.addEventListener('click', e => {
      if (e.target === this.lightbox) this.closeLightbox();
    });
  }

  getAllImages() {
    this.currentImages = [];
    document.querySelectorAll('.slide').forEach(slide => {
      const bgImage = slide.style.backgroundImage;
      const imageUrl = bgImage.slice(5, -2); // Enlever url(" et ")
      this.currentImages.push(imageUrl);
    });
  }

  openLightbox(slideElement, index) {
    this.getAllImages();
    this.currentIndex = index;

    const bgImage = slideElement.style.backgroundImage;
    const imageUrl = bgImage.slice(5, -2); // Enlever url(" et ")

    this.lightboxImg.src = imageUrl;
    this.updateCounter();

    // Arrêter le défilement automatique
    if (autoSlider) autoSlider.stop();

    // Animation d'ouverture
    this.lightbox.style.display = 'flex';
    setTimeout(() => {
      this.lightbox.classList.add('active');
    }, 10);

    // Empêcher le scroll de la page
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightbox.classList.remove('active');
    setTimeout(() => {
      this.lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
      // Redémarrer le défilement automatique
      if (autoSlider) autoSlider.restart();
    }, 300);
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.currentImages.length) % this.currentImages.length;
    this.lightboxImg.src = this.currentImages[this.currentIndex];
    this.updateCounter();
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.currentImages.length;
    this.lightboxImg.src = this.currentImages[this.currentIndex];
    this.updateCounter();
  }

  updateCounter() {
    this.lightboxCurrent.textContent = this.currentIndex + 1;
    this.lightboxTotal.textContent = this.currentImages.length;
  }
}

// ==================== Auto Slider Class ====================
class AutoSlider {
  constructor() {
    this.intervals = [];
    this.init();
  }

  init() {
    document.querySelectorAll('.slider').forEach((slider, index) => {
      const slides = slider.querySelector('.slides');
      const slideCount = slides.children.length;
      let currentSlide = 0;
      const interval = parseInt(slider.getAttribute('data-interval')) || 3000;

      // Démarrer le défilement automatique
      const autoInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slideCount;
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
      }, interval);

      this.intervals.push(autoInterval);
    });
  }

  // Arrêter tous les défilements automatiques (appelé quand lightbox ouvre)
  stop() {
    this.intervals.forEach(interval => clearInterval(interval));
  }

  // Redémarrer tous les défilements automatiques (appelé quand lightbox ferme)
  restart() {
    this.intervals = [];
    this.init();
  }
}

// ==================== Initialization ====================
// Variable globale pour contrôler le slider
let autoSlider;

// Initialiser les classes
document.addEventListener('DOMContentLoaded', () => {
  autoSlider = new AutoSlider();
  new Lightbox();
});
