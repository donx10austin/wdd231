// footer.js - Updates the copyright year automatically
document.addEventListener('DOMContentLoaded', () => {
    const footerYear = document.querySelector('#current-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
    
    // Optional: Log the last modified date of the document
    console.log("Last updated: " + document.lastModified);
});