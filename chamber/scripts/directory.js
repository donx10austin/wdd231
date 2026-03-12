const url = "data/members.json";
const cards = document.querySelector("#members");
const gridButton = document.querySelector("#grid-btn");
const listButton = document.querySelector("#list-btn");

// 1. Fetch the 7 members from the JSON file
async function getMembers() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch member data");
        }
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

// 2. Build the member cards dynamically
const displayMembers = (members) => {
    cards.innerHTML = ""; // Clear existing content
    
    members.forEach((member) => {
        let section = document.createElement("section");
        section.className = "member-card";
        
        // Structure includes image (hidden via CSS in list view) and text info
        section.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p class="category"><strong>${member.category}</strong></p>
        `;
        cards.appendChild(section);
    });
}

// 3. View Toggle Logic (Grid vs List)
gridButton.addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");
    
    // UI Feedback: Update button styles
    gridButton.classList.add("active");
    listButton.classList.remove("active");
});

listButton.addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
    
    // UI Feedback: Update button styles
    listButton.classList.add("active");
    gridButton.classList.remove("active");
});

// 4. Hamburger Menu Logic for Mobile
const menuBtn = document.querySelector("#menu");
const navLinks = document.querySelector(".nav-links");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");
        menuBtn.textContent = navLinks.classList.contains("show") ? "X" : "≡";
    });
}

// 5. Footer Dynamic Info
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

// Initialize page data
getMembers();