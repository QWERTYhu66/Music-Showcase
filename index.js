function toggleDropdown() {
    const menu = document.querySelector('.dropdown-content');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

const repoName = "Music-Showcase";
const basePath = window.location.hostname.includes("github.io") ? `/${repoName}/` : "./";

fetch(`${basePath}topbar.html`)
  .then(res => res.text())
  .then(html => {
    document.getElementById("topbar-placeholder").innerHTML = html;
  });
