const url = "data/members.json";
const container = document.querySelector('#member-container');
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");

// 1. Fetch the JSON data
async function getMembers() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch member data");
        }
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Error:", error);
        container.innerHTML = `<p class="error">Unable to load directory data at this time.</p>`;
    }
}

// 2. Build the member cards
const displayMembers = (members) => {
    container.innerHTML = ""; // Clear existing content

    members.forEach((member) => {
        const card = document.createElement('section');
        card.className = "member-card";

        // Requirement: Images use lazy loading and have descriptive Alt text
        // Note: CSS handles hiding these images in List View
        card.innerHTML = `
            <img src="${member.image}" alt="Logo for ${member.name}" loading="lazy" width="150" height="100">
            <h3>${member.name}</h3>
            <p class="address">${member.address}</p>
            <p class="phone">${member.phone}</p>
            <p class="membership">Level: <strong>${member.membership}</strong></p>
            <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
        `;
        container.appendChild(card);
    });
}

// 3. Grid and List Toggle Logic
gridBtn.addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
    // Styling the active button
    gridBtn.classList.add("active-btn");
    listBtn.classList.remove("active-btn");
});

listBtn.addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
    // Styling the active button
    listBtn.classList.add("active-btn");
    gridBtn.classList.remove("active-btn");
});

// 4. Footer Date and Last Modified
const currentYear = new Date().getFullYear();
document.querySelector('#currentyear').textContent = currentYear;

const lastMod = document.lastModified;
document.querySelector('#lastModified').textContent = `Last Modified: ${lastMod}`;

// Initialize
getMembers();