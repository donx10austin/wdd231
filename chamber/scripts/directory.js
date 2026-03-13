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
        console.error("Error fetching member data:", error);
    }
}

const displayMembers = (members) => {
    container.innerHTML = ""; 
    members.forEach((member) => {
        const card = document.createElement('section');
        card.className = "member-card";
        
        // Audit Fix: Improved Alt text for SEO/Accessibility
        card.innerHTML = `
            <img src="${member.image}" alt="Logo for ${member.name}" loading="lazy" width="150" height="100">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p><strong>Membership: ${member.membership}</strong></p>
        `;
        container.appendChild(card);
    });
}

gridBtn.addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
});

listBtn.addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
});

getMembers();

// Date Handlers
document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;