// Filenames match your request exactly
const url = "data/members.json";
const container = document.querySelector("#member-container");
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");
const menuBtn = document.querySelector("#menu-btn");
const nav = document.querySelector(".nav-links");

// Fetch the 7 members from JSON
async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data.members);
        }
    } catch (error) {
        console.error("Error fetching the JSON data:", error);
    }
}

// Render the cards to the HTML
function displayMembers(members) {
    container.innerHTML = ""; // Clear existing content
    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
            <p><strong>${member.industry}</strong></p>
        `;
        container.appendChild(card);
    });
}

// Event Listeners for Grid/List toggle
gridBtn.addEventListener("click", () => {
    container.className = "grid";
});

listBtn.addEventListener("click", () => {
    container.className = "list";
});

// Hamburger Menu for Mobile
menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuBtn.textContent = nav.classList.contains("open") ? "❌" : "☰";
});

// Footer Dates
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

// Start the app
getMembers();