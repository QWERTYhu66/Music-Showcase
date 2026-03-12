function toggleDropdown() {
    const dropdown = document.querySelector('.dropdown');
    if (!dropdown) return;
    const isOpen = dropdown.classList.toggle('open');
    const btn = dropdown.querySelector('button');
    const menu = dropdown.querySelector('.dropdown-content');
    if (btn) btn.setAttribute('aria-expanded', String(isOpen));
    if (menu) menu.setAttribute('aria-hidden', String(!isOpen));
}

const slides = document.querySelectorAll('.slide');
const carousel = document.querySelector('.carousel-images');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

let index = 0;

function showSlide(i) {
  index = (i + slides.length) % slides.length;
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

next?.addEventListener('click', () => {
  showSlide(index + 1);
  restartAutoplay();
});
prev?.addEventListener('click', () => {
  showSlide(index - 1);
  restartAutoplay();
});

// Nav active link + dropdown close behaviors
(() => {
  const topbar = document.querySelector('.top-bar');
  if (!topbar) return;
  const dropdown = topbar.querySelector('.dropdown');
  const btn = dropdown?.querySelector('button');
  const menu = dropdown?.querySelector('.dropdown-content');
  if (btn) {
    btn.setAttribute('aria-haspopup', 'menu');
    btn.setAttribute('aria-expanded', 'false');
  }
  if (menu) menu.setAttribute('aria-hidden', 'true');

  document.addEventListener('click', (e) => {
    if (!dropdown) return;
    if (!dropdown.classList.contains('open')) return;
    if (dropdown.contains(e.target)) return;
    dropdown.classList.remove('open');
    btn?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-hidden', 'true');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!dropdown?.classList.contains('open')) return;
    dropdown.classList.remove('open');
    btn?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-hidden', 'true');
  });

  const currentPath = window.location.pathname.split('/').pop() || '';
  topbar.querySelectorAll('nav a[href]').forEach((a) => {
    const href = a.getAttribute('href') || '';
    const leaf = href.split('/').pop();
    if (leaf && leaf === currentPath) a.setAttribute('aria-current', 'page');
  });
})();

// Hero intro animation
window.addEventListener('load', () => {
  const hero = document.querySelector('.hero');
  hero?.classList.add('hero--animate');
});

// Scroll reveal
const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
(() => {
  if (prefersReducedMotion) return;
  const candidates = document.querySelectorAll('.content > *, .image-row, .carousel, .video-wrapper');
  candidates.forEach((el) => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
})();

// Carousel autoplay + swipe (lightweight)
let autoplayTimer = 0;
function startAutoplay() {
  if (prefersReducedMotion) return;
  if (!slides.length) return;
  autoplayTimer = window.setInterval(() => showSlide(index + 1), 4500);
}
function stopAutoplay() {
  if (autoplayTimer) window.clearInterval(autoplayTimer);
  autoplayTimer = 0;
}
function restartAutoplay() {
  stopAutoplay();
  startAutoplay();
}

const carouselEl = document.querySelector('.carousel');
carouselEl?.addEventListener('mouseenter', stopAutoplay);
carouselEl?.addEventListener('mouseleave', startAutoplay);

let startX = 0;
let tracking = false;
carouselEl?.addEventListener('pointerdown', (e) => {
  tracking = true;
  startX = e.clientX;
  carouselEl.setPointerCapture?.(e.pointerId);
  stopAutoplay();
});
carouselEl?.addEventListener('pointerup', (e) => {
  if (!tracking) return;
  tracking = false;
  const dx = e.clientX - startX;
  if (Math.abs(dx) > 40) showSlide(index + (dx < 0 ? 1 : -1));
  restartAutoplay();
});

startAutoplay();
