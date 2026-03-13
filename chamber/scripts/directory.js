const url = "data/members.json";
const container = document.querySelector("#member-container");

async function getMembers() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.members);
}

const displayMembers = (members) => {
    container.innerHTML = "";
    members.forEach((m) => {
        const card = document.createElement("section");
        card.className = "member-card";
        card.innerHTML = `
            <img src="${m.image}" alt="${m.name} logo">
            <h3>${m.name}</h3>
            <p>${m.address}</p>
            <p>${m.phone}</p>
            <a href="${m.website}" target="_blank">Visit Website</a>
            <p class="membership-level"><strong>${m.membership}</strong></p>
        `;
        container.appendChild(card);
    });
};

document.querySelector("#grid").addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
});

document.querySelector("#list").addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
});

// Footer Logic
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

getMembers();