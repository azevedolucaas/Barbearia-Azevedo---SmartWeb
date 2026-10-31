/**
 * GALLERY & LIGHTBOX MODAL MODULE - BARBEARIA AZEVEDO
 * Accessible lightbox modal with keyboard navigation and touch support.
 */

export function initModal() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('galleryLightbox');
  if (!galleryItems.length || !lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close-btn');
  const prevBtn = lightbox.querySelector('.lightbox-nav-btn.prev');
  const nextBtn = lightbox.querySelector('.lightbox-nav-btn.next');

  let currentIndex = 0;
  const itemsData = [];

  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    const titleEl = item.querySelector('.gallery-title');
    const catEl = item.querySelector('.gallery-cat');

    itemsData.push({
      src: img ? img.getAttribute('src') : '',
      alt: img ? img.getAttribute('alt') : 'Barbearia Azevedo',
      title: titleEl ? titleEl.textContent.trim() : 'O Ofício em Detalhes',
      caption: catEl ? catEl.textContent.trim() : 'Detalhe'
    });

    item.addEventListener('click', () => {
      openLightbox(index);
    });

    // Keyboard accessibility for gallery item
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `Ver imagem ampliada: ${titleEl ? titleEl.textContent : ''}`);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  function updateLightboxContent(index) {
    const data = itemsData[index];
    if (!data) return;

    if (lightboxImg) {
      lightboxImg.src = data.src;
      lightboxImg.alt = data.alt;
    }
    if (lightboxTitle) lightboxTitle.textContent = data.title;
    if (lightboxCaption) lightboxCaption.textContent = data.caption;
    currentIndex = index;
  }

  function openLightbox(index) {
    updateLightboxContent(index);
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showNext() {
    const nextIndex = (currentIndex + 1) % itemsData.length;
    updateLightboxContent(nextIndex);
  }

  function showPrev() {
    const prevIndex = (currentIndex - 1 + itemsData.length) % itemsData.length;
    updateLightboxContent(prevIndex);
  }

  // Event Listeners
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  // Click on background closes
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-dialog')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    }
  });
}

export function initGallery() {
  initModal();
}
