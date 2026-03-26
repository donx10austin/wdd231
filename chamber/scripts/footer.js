// Set the current year for the copyright
const yearSpan = document.querySelector("#current-year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Set the last modified date
const lastModifiedElement = document.querySelector("#lastModified");
if (lastModifiedElement) {
    lastModifiedElement.innerHTML = `Last Modified: <span>${document.lastModified}</span>`;
}