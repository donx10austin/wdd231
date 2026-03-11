const url = "data/members.json";
const cards = document.querySelector("#members");

// 1. Fetch JSON
async function getMembers() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.members || data);
}

const displayMembers = (members) => {
    cards.innerHTML = "";
    members.forEach((member) => {
        let card = document.createElement("section");
        card.className = "member-card";
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
        `;
        cards.appendChild(card);
    });
};

// 2. View Toggle
document.querySelector("#grid-btn").addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");
});
document.querySelector("#list-btn").addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
});

// 3. Menu Toggle
document.querySelector("#menu").addEventListener("click", function() {
    document.querySelector(".nav-links").classList.toggle("show");
    this.textContent = this.textContent === "≡" ? "X" : "≡";
});

// 4. Dark Mode Toggle
const modeBtn = document.querySelector("#dark-mode");
modeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// 5. Footer Dates
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

getMembers();