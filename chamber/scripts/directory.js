const url = "data/members.json";
const cards = document.querySelector("#members");

async function getMembers() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        // Uses the 6 members from your JSON
        displayMembers(data.members);
    } catch (error) {
        console.error("Error fetching member data:", error);
    }
}

const displayMembers = (members) => {
    cards.innerHTML = "";
    members.forEach((member) => {
        let section = document.createElement("section");
        section.className = "member-card";
        
        // Generate HTML with correct image paths
        section.innerHTML = `
            <img src="images/${member.image}" 
                 alt="Logo for ${member.name}" 
                 loading="lazy" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
            <div class="image-placeholder" style="display:none; padding: 20px; font-weight: bold;">
                ${member.name}
            </div>
            <p><strong>${member.name}</strong></p>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">${member.website}</a></p>
        `;
        cards.appendChild(section);
    });
}

/* --- Controls --- */
// Grid/List toggle logic
document.querySelector("#grid-btn").addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");
});

document.querySelector("#list-btn").addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
});

// Menu Toggle for Mobile
const menuBtn = document.querySelector("#menu");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    // Change icon between burger and X
    menuBtn.textContent = navLinks.classList.contains("show") ? "X" : "≡";
});

// Footer Info
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

getMembers();