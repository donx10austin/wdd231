const url = "data/members.json";
const container = document.querySelector("#member-container");
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");

// 1. Fetch JSON Data
async function getMembers() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

// 2. Display Cards
function displayMembers(members) {
    container.innerHTML = "";
    members.forEach(member => {
        const card = document.createElement("section");
        card.className = "member-card";
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name}" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p><strong>Level: ${member.membership}</strong></p>
        `;
        container.appendChild(card);
    });
}

// 3. Toggle Listeners
gridBtn.addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
});

listBtn.addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
});

// 4. Footer & Dates
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

// 5. Hamburger Menu
const menuBtn = document.querySelector("#menu-btn");
const nav = document.querySelector(".nav-links");
menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuBtn.textContent = nav.classList.contains("open") ? "❌" : "☰";
});

getMembers();