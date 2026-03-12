const url = "data/members.json";
const cards = document.querySelector("#members");
const gridButton = document.querySelector("#grid-btn");
const listButton = document.querySelector("#list-btn");

async function getMembers() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Error:", error);
    }
}

const displayMembers = (members) => {
    cards.innerHTML = ""; 
    members.forEach((member) => {
        let section = document.createElement("section");
        section.className = "member-card";
        section.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p class="category"><strong>${member.category}</strong></p>
        `;
        cards.appendChild(section);
    });
}

gridButton.addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");
    gridButton.classList.add("active");
    listButton.classList.remove("active");
});

listButton.addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
    listButton.classList.add("active");
    gridButton.classList.remove("active");
});

// Hamburger Menu
const menuBtn = document.querySelector("#menu");
const navLinks = document.querySelector(".nav-links");
menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    menuBtn.textContent = navLinks.classList.contains("show") ? "X" : "≡";
});

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

getMembers();