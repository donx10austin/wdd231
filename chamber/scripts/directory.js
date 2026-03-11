const url = "data/members.json";
const cards = document.querySelector("#members");

async function getMembers() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.members || data);
}

const displayMembers = (members) => {
    cards.innerHTML = "";
    members.forEach((member) => {
        let section = document.createElement("section");
        section.className = "member-card";
        section.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <p><strong>${member.name}</strong></p>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">${member.website}</a></p>
        `;
        cards.appendChild(section);
    });
}

// Controls
document.querySelector("#grid-btn").addEventListener("click", () => cards.className = "grid");
document.querySelector("#list-btn").addEventListener("click", () => cards.className = "list");

document.querySelector("#menu").addEventListener("click", () => {
    document.querySelector(".nav-links").classList.toggle("show");
});

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

getMembers();