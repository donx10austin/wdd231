// 1. URLs and Selectors
const url = "data/members.json";
const container = document.querySelector("#member-container");
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");

/**
 * 2. Fetch Data from JSON
 * Uses async/await for modern, clean asynchronous logic.
 */
async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data.members);
        } else {
            console.error("HTTP-Error: " + response.status);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

/**
 * 3. Render Member Cards
 * Processes the JSON array and builds the HTML structure for each card.
 */
const displayMembers = (members) => {
    container.innerHTML = ""; // Clear existing content

    members.forEach((member) => {
        // Create elements for the card
        const card = document.createElement("section");
        card.classList.add("member-card");

        // Build internal structure
        // Order: Image > Name > Address > Phone > Link > Membership Level
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p class="membership-level"><strong>${member.membership}</strong></p>
        `;

        container.appendChild(card);
    });
};

/**
 * 4. View Toggle Logic
 * Switches classes on the container to trigger CSS Grid vs CSS List styling.
 */
gridBtn.addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
    // Optional: Add active state styling to buttons
    gridBtn.classList.add("active-btn");
    listBtn.classList.remove("active-btn");
});

listBtn.addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
    // Optional: Add active state styling to buttons
    listBtn.classList.add("active-btn");
    gridBtn.classList.remove("active-btn");
});

/**
 * 5. Dynamic Footer Information
 * Updates the footer with current year and the file's last modified date.
 */
const updateFooter = () => {
    const currentYearSpan = document.querySelector("#currentyear");
    const lastModifiedSpan = document.querySelector("#lastModified");

    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = `Last Modified: ${document.lastModified}`;
    }
};

// Initialize the page
updateFooter();
getMembers();