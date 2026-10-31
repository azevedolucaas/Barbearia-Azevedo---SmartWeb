/**
 * NAVIGATION MODULE - BARBEARIA AZEVEDO
 * Handles sticky navbar, scrollspy, hamburger menu and accessible mobile drawer.
 */

export function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (!navbar) return;

  // 1. Scroll-Aware Navbar (Add background & border on scroll)
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Menu Toggle
  const toggleMobileNav = (forceClose = false) => {
    if (!mobileDrawer || !hamburger) return;
    const isCurrentlyActive = mobileDrawer.classList.contains('active');
    const shouldOpen = forceClose ? false : !isCurrentlyActive;

    if (shouldOpen) {
      hamburger.classList.add('active');
      mobileDrawer.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      hamburger.classList.remove('active');
      mobileDrawer.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  };

  if (hamburger && mobileDrawer) {
    hamburger.addEventListener('click', () => toggleMobileNav());

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
        toggleMobileNav(true);
      }
    });

    // Close when clicking outside of list
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        toggleMobileNav(true);
      }
    });
  }

  // 3. Smooth Anchor Scrolling with precise navbar offset
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#') && targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();

          // Close mobile menu if open
          toggleMobileNav(true);

          const navHeight = navbar.classList.contains('scrolled') ? 68 : 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 4. ScrollSpy: Highlight active link based on current section in view
  if (sections.length > 0) {
    const spyOptions = {
      root: null,
      rootMargin: '-25% 0px -65% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, spyOptions);

    sections.forEach((section) => observer.observe(section));
  }
}
