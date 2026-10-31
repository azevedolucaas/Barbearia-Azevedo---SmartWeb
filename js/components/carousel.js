/**
 * TESTIMONIALS & CAROUSEL SLIDER MODULE - BARBEARIA AZEVEDO
 * Smooth, accessible carousel with autoplay, pause-on-hover, dots and touch swipe.
 */

export function initCarousel() {
  const sliderWrap = document.querySelector('.testimonials-slider-wrap');
  if (!sliderWrap) return;

  const track = sliderWrap.querySelector('.testimonial-track');
  const slides = sliderWrap.querySelectorAll('.testimonial-slide');
  const prevBtn = sliderWrap.querySelector('.slider-btn.prev');
  const nextBtn = sliderWrap.querySelector('.slider-btn.next');
  const dotsContainer = sliderWrap.querySelector('.slider-dots');

  if (!track || !slides.length) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoplayTimer = null;

  // Build Pagination Dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('slider-dot');
      dot.setAttribute('type', 'button');
      dot.setAttribute('aria-label', `Ir para depoimento ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        goToSlide(i);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  const dots = dotsContainer ? dotsContainer.querySelectorAll('.slider-dot') : [];

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    if (dots.length) {
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }
  }

  function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    updateSlider();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }

  // Keyboard navigation inside slider
  sliderWrap.setAttribute('tabindex', '0');
  sliderWrap.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
      resetAutoplay();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
      resetAutoplay();
    }
  });

  // Autoplay functionality
  function startAutoplay() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      nextSlide();
    }, 6000);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  sliderWrap.addEventListener('mouseenter', stopAutoplay);
  sliderWrap.addEventListener('mouseleave', startAutoplay);
  sliderWrap.addEventListener('focusin', stopAutoplay);
  sliderWrap.addEventListener('focusout', startAutoplay);

  // Mobile Touch Swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  sliderWrap.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    },
    { passive: true }
  );

  sliderWrap.addEventListener(
    'touchend',
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) > 40) {
        if (swipeDistance < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      startAutoplay();
    },
    { passive: true }
  );

  startAutoplay();
}

export function initTestimonials() {
  initCarousel();
}
