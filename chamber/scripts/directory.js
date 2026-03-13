// 1. URLs and Selectors
const url = "data/members.json";
const container = document.querySelector("#member-container");
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");

// 2. Fetch Data from JSON
async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data.members);
        } else {
            console.error("The data source could not be reached.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// 3. Render Member Cards
const displayMembers = (members) => {
    container.innerHTML = ""; // Clear container

    members.forEach((member) => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        // Structure matches the screenshot: Logo > Name > Address > Phone > Link > Membership
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p class="membership-level">${member.membership}</p>
        `;

        container.appendChild(card);
    });
};

// 4. View Toggle Functionality
gridBtn.addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
    // Update active button state
    gridBtn.classList.add("active-btn");
    listBtn.classList.remove("active-btn");
});

listBtn.addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
    // Update active button state
    listBtn.classList.add("active-btn");
    gridBtn.classList.remove("active-btn");
});

// 5. Dynamic Footer Info (Audit Requirement)
const currentYear = new Date().getFullYear();
document.querySelector("#currentyear").textContent = currentYear;

const lastMod = document.lastModified;
document.querySelector("#lastModified").textContent = `Last Modified: ${lastMod}`;

// Initialize
getMembers();