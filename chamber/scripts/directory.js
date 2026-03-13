// Use a path relative to the HTML file
const url = "data/members.json"; 
const container = document.querySelector('#member-container');
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");

async function getMembers() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Could not load JSON");
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error(error);
    }
}

const displayMembers = (members) => {
    container.innerHTML = ""; 
    members.forEach((member) => {
        let card = document.createElement('section');
        card.className = "member-card";
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name}" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p><strong>${member.membership}</strong></p>
        `;
        container.appendChild(card);
    });
}

gridBtn.addEventListener("click", () => container.className = "grid");
listBtn.addEventListener("click", () => container.className = "list");

getMembers();

// Date Handlers
document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;