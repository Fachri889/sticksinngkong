/**
 * carousel.js
 * Logika Slider Banner Promo Otomatis & Manual (HokBen Top Hero Slider)
 */

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('promo-carousel');
  if (!slider) return;

  const slides = slider.querySelectorAll('.carousel-slide');
  const dotsContainer = document.getElementById('carousel-dots');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (slides.length === 0) return;

  let currentIndex = 0;
  let autoPlayInterval = null;
  const AUTOPLAY_DELAY = 5000; // 5 detik ganti otomatis

  // Generate dots secara dinamis
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${idx === 0 ? 'bg-yellow-400 w-8' : 'bg-white/60 hover:bg-white'}`;
      dot.setAttribute('aria-label', `Pindah ke slide ${idx + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetAutoPlay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  // Tampilkan slide tertentu
  function goToSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.remove('opacity-0', 'pointer-events-none', 'z-0');
        slide.classList.add('opacity-100', 'pointer-events-auto', 'z-10');
      } else {
        slide.classList.remove('opacity-100', 'pointer-events-auto', 'z-10');
        slide.classList.add('opacity-0', 'pointer-events-none', 'z-0');
      }
    });

    // Update dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('button');
      dots.forEach((dot, i) => {
        if (i === index) {
          dot.className = 'w-8 h-3 rounded-full bg-yellow-400 transition-all duration-300 shadow-sm';
        } else {
          dot.className = 'w-3 h-3 rounded-full bg-white/60 hover:bg-white transition-all duration-300';
        }
      });
    }

    currentIndex = index;
  }

  // Next slide
  function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
  }

  // Prev slide
  function prevSlide() {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
  }

  // Event listener tombol navigasi manual
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoPlay();
    });
  }

  // Mulai autoplay otomatis
  function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
  }

  // Hentikan sementara autoplay
  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  // Reset autoplay saat ada interaksi manual
  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  // Pause autoplay saat kursor mouse hover di slider
  slider.addEventListener('mouseenter', stopAutoPlay);
  slider.addEventListener('mouseleave', startAutoPlay);

  // Dukungan touch swipe untuk mobile
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      nextSlide();
      resetAutoPlay();
    } else if (touchEndX - touchStartX > 50) {
      prevSlide();
      resetAutoPlay();
    }
  }, { passive: true });

  // Inisialisasi slide pertama dan jalankan autoplay
  goToSlide(0);
  startAutoPlay();
});
