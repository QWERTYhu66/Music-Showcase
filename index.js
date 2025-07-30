function toggleDropdown() {
    const menu = document.querySelector('.dropdown-content');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

fetch("topbar.html")
    .then(res => res.text())
    .then(html => {
        document.getElementById("topbar-placeholder").innerHTML = html;
});