const url = "data/members.json";
const container = document.querySelector("#member-container");
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");

// Async function to fetch and display members
async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data.members);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const displayMembers = (members) => {
    container.innerHTML = ""; // Clear current content
    
    members.forEach((member) => {
        const card = document.createElement("section");
        card.classList.add("member-card");
        
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="100" height="60">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p class="membership-level">${member.membership}</p>
        `;
        
        container.appendChild(card);
    });
};

// View Toggle Listeners
gridBtn.addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
});

listBtn.addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
});

// Footer Info
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

getMembers();