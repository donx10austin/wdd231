import { locations } from '../data/locations.mjs';

// --- VISITOR MESSAGE LOGIC ---
const visitDisplay = document.querySelector("#visitor-message");
const now = Date.now();
const msInDay = 86400000;
const lastVisit = Number(window.localStorage.getItem("lastVisit-ls")) || 0;

if (lastVisit === 0) {
    visitDisplay.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const timeDiff = now - lastVisit;
    if (timeDiff < msInDay) {
        visitDisplay.textContent = "Back so soon! Awesome!";
    } else {
        const days = Math.floor(timeDiff / msInDay);
        visitDisplay.textContent = `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
    }
}
window.localStorage.setItem("lastVisit-ls", now);

// --- GALLERY GENERATION ---
const gallery = document.querySelector(".gallery-container");

locations.forEach(loc => {
    const card = document.createElement("section");
    card.className = "location-card";
    card.innerHTML = `
        <h2>${loc.name}</h2>
        <figure>
            <img src="${loc.image}" alt="${loc.name}" loading="lazy" width="300" height="200">
        </figure>
        <address>${loc.address}</address>
        <p>${loc.description}</p>
        <button class="learn-btn">Learn More</button>
    `;
    gallery.appendChild(card);
});