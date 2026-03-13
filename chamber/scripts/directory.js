// 1. Set the URL for the member data
const url = "data/members.json";
const container = document.querySelector('#member-container');
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");

// 2. Fetch the JSON data
async function getMembers() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch member data");
        }
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Error loading JSON:", error);
        container.innerHTML = `<p class="error">Sorry, we couldn't load the directory at this time.</p>`;
    }
}

// 3. Display the members
const displayMembers = (members) => {
    container.innerHTML = ""; // Clear existing content

    members.forEach((member) => {
        const card = document.createElement('section');
        card.className = "member-card";

        // Requirement: Lazy loading images and descriptive alt text
        card.innerHTML = `
            <img src="${member.image}" alt="Logo for ${member.name}" loading="lazy" width="150" height="100">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><strong>Membership Level:</strong> ${member.membership}</p>
            <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
        `;
        container.appendChild(card);
    });
}

// 4. Grid and List Toggle Events
gridBtn.addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
});

listBtn.addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
});

// 5. Footer Date Handlers
const currentYear = new Date().getFullYear();
document.querySelector('#currentyear').textContent = currentYear;

const lastMod = document.lastModified;
document.querySelector('#lastModified').textContent = `Last Modified: ${lastMod}`;

// 6. Initialize the page
getMembers();