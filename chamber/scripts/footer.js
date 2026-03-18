// --- FOOTER.JS ---

// 1. Set current year
const currentYearElement = document.querySelector("#currentyear");
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// 2. Set last modified date
const lastModifiedElement = document.querySelector("#lastModified");
if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;
}

// 3. Hamburger Menu Toggle (Bonus for Mobile)
const menuButton = document.querySelector('#menu-button');
const navigation = document.querySelector('nav');

if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        menuButton.classList.toggle('open');
    });
}