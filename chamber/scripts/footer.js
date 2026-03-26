document.addEventListener('DOMContentLoaded', () => {
    // 1. Update the Copyright Year
    const footerYear = document.querySelector('#current-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
    
    // 2. Display the Last Modified Date in the HTML
    const lastModifiedElement = document.querySelector('#lastModified');
    if (lastModifiedElement) {
        // This formats the date into a readable string
        lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    }
});