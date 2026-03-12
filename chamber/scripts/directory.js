const url = "data/members.json";
const container = document.querySelector("#member-container");
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");
const menuBtn = document.querySelector("#menu-btn");
const nav = document.querySelector(".nav-links");

async function getMembers() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Error:", error);
    }
}

function displayMembers(members) {
    container.innerHTML = "";
    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p><strong>${member.industry || ""}</strong></p>
        `;
        container.appendChild(card);
    });
}

// Layout Listeners
gridBtn.addEventListener("click", () => container.className = "grid");
listBtn.addEventListener("click", () => container.className = "list");

// Hamburger Listener
menuBtn.addEventListener("click", () => nav.classList.toggle("open"));

// Footer Logic
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

getMembers();