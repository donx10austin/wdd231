// 1. Set the current year for the copyright
const yearSpan = document.querySelector("#current-year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// 2. Set the last modified date
const lastModifiedElement = document.querySelector("#lastModified");
if (lastModifiedElement) {
    // This format keeps the label and the date together cleanly
    lastModifiedElement.innerHTML = `Last Modified: <span class="highlight-date">${document.lastModified}</span>`;
}

// 3. Handle the Hamburger Menu in the header
const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('.nav-links');

if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
        navigation.classList.toggle('show');
        // Toggle the button text/icon
        menuButton.textContent = navigation.classList.contains('show') ? '❌' : '☰';
    });
}

// 1. Set the current year
document.querySelector('#current-year').textContent = new Date().getFullYear();

// 2. Set the last modified date
document.querySelector('#lastModified').textContent = document.lastModified;

// 3. Hamburger Menu Toggle
const mainnav = document.querySelector('.nav-links');
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
});