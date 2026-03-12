const url = "data/members.json";
const container = document.querySelector("#member-container");
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");

async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data.members);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

function displayMembers(members) {
    container.innerHTML = "";
    members.forEach(member => {
        const card = document.createElement("section");
        card.className = "member-card";
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="150" height="150">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
            <p><strong>Status: ${member.membership}</strong></p>
        `;
        container.appendChild(card);
    });
}

// Toggle Listeners
gridBtn.addEventListener("click", () => container.className = "grid");
listBtn.addEventListener("click", () => container.className = "list");

// Hamburger Menu
const menuBtn = document.querySelector("#menu-btn");
const nav = document.querySelector(".nav-links");
menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuBtn.textContent = nav.classList.contains("open") ? "❌" : "☰";
});

// Footer Dates
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

getMembers();