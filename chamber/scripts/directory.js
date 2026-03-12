const url = "data/members.json";
const container = document.querySelector("#member-container");
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");

// --- 1. Fetch JSON Data ---
async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data.members);
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

// --- 2. Build the Member Cards ---
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
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p class="membership">Level: ${member.membership}</p>
        `;
        container.appendChild(card);
    });
}

// --- 3. Toggle Logic ---
gridBtn.addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
});

listBtn.addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
});

// --- 4. Footer & Menu Logic ---
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;

const menuBtn = document.querySelector("#menu-btn");
const nav = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuBtn.textContent = nav.classList.contains("open") ? "❌" : "☰";
});

// Initialize
getMembers();