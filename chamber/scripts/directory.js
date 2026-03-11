const url = "data/members.json";
const cards = document.querySelector("#members");

// 1. Fetch JSON
async function getMembers() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMembers(data.members || data);
    } catch (error) {
        console.error("Error fetching members:", error);
    }
}

// 2. Display Members - UPDATED FOR SCREENSHOT ACCURACY
const displayMembers = (members) => {
    cards.innerHTML = "";
    members.forEach((member) => {
        let card = document.createElement("section");
        card.className = "member-card";
        
        card.innerHTML = `
            <img src="images/${member.image}" alt="Logo for ${member.name}" loading="lazy">
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">${member.website}</a></p>
        `;
        cards.appendChild(card);
    });
};

// 3. View Toggle
document.querySelector("#grid-btn").addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");
});

document.querySelector("#list-btn").addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
});

// 4. Menu Toggle
document.querySelector("#menu").addEventListener("click", function() {
    document.querySelector(".nav-links").classList.toggle("show");
    this.textContent = this.textContent === "≡" ? "X" : "≡";
});

// 5. Dark Mode Toggle
document.querySelector("#dark-mode").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// 6. Footer Dates
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

getMembers();