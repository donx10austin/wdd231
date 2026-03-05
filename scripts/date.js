/**
 * date.js - Handles footer date and modification tracking for 2026.
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Set the current copyright year
    const yearElement = document.querySelector("#currentyear");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 2. Set the last modified date/time
    const lastModifiedElement = document.querySelector("#lastModified");
    if (lastModifiedElement) {
        // document.lastModified returns a string in the format: MM/DD/YYYY HH:MM:SS
        lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;
    }
});