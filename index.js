function toggleDropdown() {
    const dropdown = document.querySelector('.dropdown');
    if (!dropdown) return;
    const isOpen = dropdown.classList.toggle('open');
    const btn = dropdown.querySelector('button');
    const menu = dropdown.querySelector('.dropdown-content');
    if (btn) btn.setAttribute('aria-expanded', String(isOpen));
    if (menu) menu.setAttribute('aria-hidden', String(!isOpen));
}

const repoName = "Music-Showcase";
const basePath = window.location.hostname.includes("github.io") ? `/${repoName}/` : "./";

fetch(`${basePath}topbar.html`)
  .then(res => res.text())
  .then(html => {
    document.getElementById("topbar-placeholder").innerHTML = html;
    initTopbar();
  });

function initTopbar() {
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

  // Close dropdown on outside click / escape
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

  // Active nav link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  topbar.querySelectorAll('nav a[href]').forEach((a) => {
    const href = a.getAttribute('href') || '';
    const leaf = href.split('/').pop();
    if (leaf && leaf === currentPath) a.setAttribute('aria-current', 'page');
  });
}

// Hero intro animation
window.addEventListener('load', () => {
  const hero = document.querySelector('.hero');
  hero?.classList.add('hero--animate');
});

// Scroll reveal (adds life to static content)
const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

function setupReveal() {
  if (prefersReducedMotion) return;
  const candidates = document.querySelectorAll('.content > *, .img-section, .login_container, .content h1, .content p');
  candidates.forEach((el) => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

// Parallax-ish hero background (subtle)
function setupHeroParallax() {
  const hero = document.querySelector('.hero');
  if (!hero || prefersReducedMotion) return;
  let raf = 0;
  const onScroll = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const y = window.scrollY || 0;
      hero.style.backgroundPosition = `center ${Math.min(60, y * 0.08)}px`;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

setupReveal();
setupHeroParallax();
