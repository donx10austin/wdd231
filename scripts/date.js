// Get the current year for the copyright
const currentYear = new Date().getFullYear();
document.querySelector("#currentyear").textContent = currentYear;

// Get the last modification date and time of the document
const lastMod = document.lastModified;
document.querySelector("#lastModified").textContent = `Last Modification: ${lastMod}`;