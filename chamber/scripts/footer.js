// Dynamic Year
const yearSpan = document.querySelector("#currentyear");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Last Modified Date
const lastModifiedElement = document.querySelector("#lastModified");
if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;
}