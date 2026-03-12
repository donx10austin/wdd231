const url = "data/members.json";
const container = document.querySelector("#member-container");

async function getMembers() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.members);
}

const displayMembers = (members) => {
    container.innerHTML = "";
    members.forEach((member) => {
        let card = document.createElement("section");
        card.classList.add("member-card");
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name}" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Website</a>
            <p>Level: ${member.membership}</p>
        `;
        container.appendChild(card);
    });
};

document.querySelector("#grid").addEventListener("click", () => container.className = "grid");
document.querySelector("#list").addEventListener("click", () => container.className = "list");
document.querySelector("#menu-btn").addEventListener("click", () => document.querySelector(".nav-links").classList.toggle("open"));

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

getMembers();