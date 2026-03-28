/* =============================
   SHARED SITE LOGIC (Header & Footer)
   ============================= */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Set the current year for the copyright
    const yearSpan = document.querySelector("#current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Set the last modified date
    const lastModifiedElement = document.querySelector("#lastModified");
    if (lastModifiedElement) {
        // document.lastModified provides the date the file was last saved
        lastModifiedElement.textContent = document.lastModified;
    }

    // 3. Handle the Hamburger Menu (Header)
    const menuButton = document.querySelector('#menu');
    const navigation = document.querySelector('.nav-links');

    if (menuButton && navigation) {
        menuButton.addEventListener('click', () => {
            navigation.classList.toggle('show');
            
            // Toggle the button icon between Hamburger and X
            if (navigation.classList.contains('show')) {
                menuButton.textContent = '❌';
                menuButton.setAttribute('aria-expanded', 'true');
            } else {
                menuButton.textContent = '☰';
                menuButton.setAttribute('aria-expanded', 'false');
            }
        });
    }
});