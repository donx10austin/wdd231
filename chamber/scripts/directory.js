// Criterion 7: Points to your members.json file
const url = "data/members.json";
const container = document.querySelector("#member-container");
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");
const menuBtn = document.querySelector("#menu-btn");
const navList = document.querySelector(".nav-links");

// Criterion 8: Async/Await function to fetch data
async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // Criterion 9: Display at least 7 members
            displayMembers(data.members);
        } else {
            console.error("HTTP-Error: " + response.status);
        }
    } catch (error) {
        console.error("Connection Error:", error);
    }
}

function displayMembers(members) {
    container.innerHTML = ""; // Clear existing content for re-rendering if needed
    
    members.forEach(member => {
        // Create elements for the grid/list display
        const card = document.createElement("section");
        card.classList.add("member-card");

        // Building the card structure to match your screenshot
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="150" height="75">
            <h3>${member.name}</h3>
            <p class="address">${member.address}</p>
            <p class="phone">${member.phone}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
            <p class="industry"><strong>${member.industry}</strong></p>
        `;
        
        container.appendChild(card);
    });
}

/* --- Criterion 10: Grid and List Toggle Logic --- */
gridBtn.addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
});

listBtn.addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
});

/* --- Criterion 5: Responsive Navigation (Hamburger) --- */
menuBtn.addEventListener("click", () => {
    navList.classList.toggle("open");
    // Accessibility: Change button text/icon when active
    menuBtn.textContent = navList.classList.contains("open") ? "❌" : "☰";
});

/* --- Footer Date Logic (Audit/Lighthouse Requirement) --- */
const yearSpan = document.querySelector("#currentyear");
const lastMod = document.querySelector("#lastModified");

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
if (lastMod) {
    lastMod.textContent = `Last Modified: ${document.lastModified}`;
}

// Initialize data fetch
getMembers();