document.addEventListener("DOMContentLoaded", () => {
    // Dynamic Copyright Year
    document.querySelector("#currentyear").textContent = new Date().getFullYear();

    // Last Modified (Will show 2026 based on current system time)
    const lastMod = document.querySelector("#lastModified");
    if (lastMod) {
        lastMod.textContent = `Last Modification: ${document.lastModified}`;
    }
});