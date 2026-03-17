// Get the current year
const year = document.querySelector("#currentyear");
if (year) {
    year.textContent = new Date().getFullYear();
}

// Get the last modified date
const lastMod = document.querySelector("#lastModified");
if (lastMod) {
    lastMod.textContent = `Last Modification: ${document.lastModified}`;
}