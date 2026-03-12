// Criterion 7: URL to your local JSON data
const url = "data/members.json";

// Selectors for DOM manipulation
const container = document.querySelector("#member-container");
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");
const menuBtn = document.querySelector("#menu-btn");
const navLinks = document.querySelector(".nav-links");

// Criterion 8: Async/Await function to fetch member data
async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // Criterion 9: Process and display at least 7 members
            displayMembers(data.members);
        } else {
            console.error("Failed to fetch data. Status:", response.status);
        }
    } catch (error) {
        console.error("Error fetching the JSON file:", error);
    }
}

// Function to render member cards/list items
function displayMembers(members) {
    container.innerHTML = ""; // Clear existing content

    members.forEach((member) => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        // Building the internal structure
        // Note: images/ prefix ensures it looks in your images folder
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="150" height="75">
            <h3>${member.name}</h3>
            <p class="address">${member.address}</p>
            <p class="phone">${member.phone}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
            <p class="membership"><strong>${member.membership} Level</strong></p>
        `;

        container.appendChild(card);
    });
}

/* --- Criterion 10: Grid vs. List Toggle Logic --- */
gridBtn.addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
});

listBtn.addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
});

/* --- Criterion 5: Responsive Navigation --- */
menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    // Toggle the button icon between Hamburger and X
    menuBtn.textContent = navLinks.classList.contains("open") ? "❌" : "☰";
});

/* --- Footer Date & Modification Logic --- */
const currentYear = new Date().getFullYear();
const yearSpan = document.querySelector("#currentyear");
const lastModSpan = document.querySelector("#lastModified");

if (yearSpan) yearSpan.textContent = currentYear;
if (lastModSpan) lastModSpan.textContent = `Last Modified: ${document.lastModified}`;

// Initialize the app
getMembers();