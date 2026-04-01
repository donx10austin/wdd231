document.addEventListener("DOMContentLoaded", () => {
    // Set the form timestamp
    const timestampField = document.getElementById("form-timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Mobile Menu Toggle
    const menuButton = document.getElementById("menu");
    const navLinks = document.querySelector(".nav-links");

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", () => {
            navLinks.classList.toggle("show");
        });
    }
});

// Close the menu if a link is clicked
const links = document.querySelectorAll(".nav-links a");
links.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
    });
});