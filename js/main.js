// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {
  const closeMenu = () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

// Gallery lightbox
const galleryImages = document.querySelectorAll('.gallery-item img');

if (galleryImages.length) {
  const lightbox = document.createElement('div');
  lightbox.className = 'gallery-lightbox';
  lightbox.setAttribute('aria-hidden', 'true');

  const lightboxInner = document.createElement('div');
  lightboxInner.className = 'gallery-lightbox-inner';

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'gallery-lightbox-close';
  closeButton.setAttribute('aria-label', 'Close image preview');
  closeButton.textContent = '×';

  const lightboxImage = document.createElement('img');
  const lightboxCaption = document.createElement('div');
  lightboxCaption.className = 'gallery-lightbox-caption';

  lightboxInner.appendChild(closeButton);
  lightboxInner.appendChild(lightboxImage);
  lightboxInner.appendChild(lightboxCaption);
  lightbox.appendChild(lightboxInner);
  document.body.appendChild(lightbox);

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });

  galleryImages.forEach((image) => {
    image.parentElement.setAttribute('tabindex', '0');
    const openLightbox = () => {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt || 'Kent Germain photo';
      lightboxCaption.textContent = image.alt || 'Kent Germain photo';
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    image.parentElement.addEventListener('click', openLightbox);
    image.parentElement.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox();
      }
    });
  });
}

// Load funeral videos only when they enter the viewport, which improves mobile playback
const lazyVideos = document.querySelectorAll('.video-card video');

if (lazyVideos.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const video = entry.target;
      const source = video.querySelector('source[data-src]');

      if (source && !source.getAttribute('src')) {
        source.setAttribute('src', source.getAttribute('data-src'));
        video.load();
      }

      currentObserver.unobserve(video);
    });
  }, { rootMargin: '200px 0px' });

  lazyVideos.forEach((video) => observer.observe(video));
} else {
  lazyVideos.forEach((video) => {
    const source = video.querySelector('source[data-src]');
    if (source && !source.getAttribute('src')) {
      source.setAttribute('src', source.getAttribute('data-src'));
      video.load();
    }
  });
}

// Back-to-top control
const backToTopButton = document.createElement('button');
backToTopButton.type = 'button';
backToTopButton.className = 'back-to-top';
backToTopButton.setAttribute('aria-label', 'Back to top');
backToTopButton.textContent = '↑';

document.body.appendChild(backToTopButton);

const toggleBackToTop = () => {
  const shouldShow = window.scrollY > 300;
  backToTopButton.classList.toggle('visible', shouldShow);
};

window.addEventListener('scroll', toggleBackToTop, { passive: true });
backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

toggleBackToTop();
