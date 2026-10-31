/**
 * ANIMATIONS & SCROLL REVEALS - BARBEARIA AZEVEDO
 * Uses IntersectionObserver for scroll reveals, animated counters & subtle parallax.
 */

export function initAnimations() {
  document.body.classList.add('js-enabled');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. IntersectionObserver for Scroll Reveals
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-fade');

  if (revealElements.length > 0) {
    if (prefersReducedMotion) {
      revealElements.forEach((el) => el.classList.add('is-revealed'));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target); // Reveal once
            }
          });
        },
        {
          root: null,
          rootMargin: '100px 0px 50px 0px',
          threshold: 0.01
        }
      );

      revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 100 && rect.bottom > -50) {
          el.classList.add('is-revealed');
        } else {
          revealObserver.observe(el);
        }
      });
    }
  }

  // 2. Animated Number Counters
  const counterElements = document.querySelectorAll('[data-counter]');

  if (counterElements.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetEl = entry.target;
            const targetValue = parseInt(targetEl.getAttribute('data-counter'), 10);
            const duration = 1600; // ms
            const frameDuration = 1000 / 60;
            const totalFrames = Math.round(duration / frameDuration);
            let frame = 0;

            const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);

            const timer = setInterval(() => {
              frame++;
              const progress = easeOutQuart(frame / totalFrames);
              const currentVal = Math.round(targetValue * progress);
              targetEl.textContent = currentVal;

              if (frame >= totalFrames) {
                targetEl.textContent = targetValue;
                clearInterval(timer);
              }
            }, frameDuration);

            observer.unobserve(targetEl);
          }
        });
      },
      { threshold: 0.1 }
    );

    counterElements.forEach((el) => counterObserver.observe(el));
  }

  // 3. Subtle Hero Parallax (Desktop Only & Reduced Motion safe)
  const heroImage = document.querySelector('.hero-image-wrap img');
  if (heroImage && !prefersReducedMotion && window.innerWidth > 992) {
    window.addEventListener(
      'scroll',
      () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
          heroImage.style.transform = `translateY(${scrolled * 0.12}px) scale(1.02)`;
        }
      },
      { passive: true }
    );
  }
}
