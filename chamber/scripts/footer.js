// --- FOOTER.JS ---
document.addEventListener("DOMContentLoaded", () => {
    // 1. Set current year for copyright
    const yearSpan = document.querySelector("#currentyear");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Set last modified date
    const lastModifiedSpan = document.querySelector("#lastModified");
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = `Last Modification: ${document.lastModified}`;
    }

    // 3. Mobile Menu Toggle (Hamburger logic)
    const menuButton = document.querySelector('#menu-button');
    const nav = document.querySelector('.nav-links');

    if (menuButton && nav) {
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('open');
            menuButton.classList.toggle('active');
        });
    }
});

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;

// Hamburger Menu Logic
const menuButton = document.querySelector('#menu-button');
const navLinks = document.querySelector('.nav-links');

if (menuButton) {
    menuButton.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        menuButton.classList.toggle('active');
    });
}