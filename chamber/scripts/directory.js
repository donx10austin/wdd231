const url = "data/members.json";
const container = document.querySelector("#member-container");

async function getMembers() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}

const displayMembers = (members) => {
    container.innerHTML = "";
    members.forEach((m) => {
        const card = document.createElement("section");
        card.className = "member-card";
        card.innerHTML = `
            <img src="${m.image}" alt="${m.name} logo" loading="lazy">
            <h3>${m.name}</h3>
            <p>${m.address}</p>
            <p>${m.phone}</p>
            <a href="${m.website}" target="_blank">Visit Website</a>
            <p><strong>${m.membership}</strong></p>
        `;
        container.appendChild(card);
    });
};

document.querySelector("#grid").addEventListener("click", () => container.className = "grid");
document.querySelector("#list").addEventListener("click", () => container.className = "list");

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

getMembers();