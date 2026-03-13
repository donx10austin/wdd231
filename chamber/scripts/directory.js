const url = "data/members.json";
const container = document.querySelector('#member-container');
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");

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

    members.forEach((member) => {
        let card = document.createElement('section');
        card.classList.add('member-card');

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p><strong>${member.membership}</strong></p>
        `;
        container.appendChild(card);
    });
}

// Toggle Buttons
gridBtn.addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
});

listBtn.addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
});

// Footer Info
document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

getMembers();