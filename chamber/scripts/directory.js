// 1. Select DOM elements
const url = "data/members.json";
const container = document.querySelector("#member-container");
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");

// 2. Async function to fetch data
async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data.members);
        } else {
            console.error("Failed to fetch member data.");
        }
    } catch (error) {
        console.error("Error connecting to data source:", error);
    }
}

// 3. Display members function
const displayMembers = (members) => {
    container.innerHTML = ""; // Clear existing content

    members.forEach((member) => {
        // Create section for each member
        const card = document.createElement("section");
        card.classList.add("member-card");

        // Build HTML structure to match your screenshot layout
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p class="membership-info"><strong>${member.membership}</strong></p>
        `;

        container.appendChild(card);
    });
};

// 4. View Toggling Logic
gridBtn.addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
    // Visual feedback for buttons
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
    // Visual feedback for buttons
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
});

// 5. Footer Dates (Audit Requirements)
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

// 6. Initialize
getMembers();