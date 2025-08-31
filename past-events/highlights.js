function toggleDropdown() {
    const menu = document.querySelector('.dropdown-content');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

const repoName = "Music-Showcase";
const basePath = window.location.hostname.includes("github.io") ? `/${repoName}/` : "./";

fetch(`../topbar.html`)
  .then(res => res.text())
  .then(html => {
    document.getElementById("topbar-placeholder").innerHTML = html;
  });

const slides = document.querySelectorAll('.slide');
const carousel = document.querySelector('.carousel-images');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

let index = 0;

function showSlide(i) {
  index = (i + slides.length) % slides.length;
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

next.addEventListener('click', () => showSlide(index + 1));
prev.addEventListener('click', () => showSlide(index - 1));
