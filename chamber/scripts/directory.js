// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector('#menu');
    const navigation = document.querySelector('nav ul');

    // Check if elements exist to avoid console errors
    if (menuButton && navigation) {
        menuButton.addEventListener('click', () => {
            navigation.classList.toggle('show');
            
            // Optional: Toggle the button icon between ☰ and ❌
            if (navigation.classList.contains('show')) {
                menuButton.textContent = '❌';
            } else {
                menuButton.textContent = '☰';
            }
        });
    }

    // Handle Footer Dates (Standard requirement for this course)
    const yearSpan = document.querySelector('#currentyear');
    const lastModSpan = document.querySelector('#lastModified');

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    if (lastModSpan) {
        lastModSpan.textContent = `Last Modification: ${document.lastModified}`;
    }
});