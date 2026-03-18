const membersUrl = "data/members.json";
const directoryDisplay = document.querySelector("#directory-container");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

async function getMembers() {
    try {
        const response = await fetch(membersUrl);
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Error fetching members:", error);
    }
}

function displayMembers(members) {
    directoryDisplay.innerHTML = "";
    members.forEach((member) => {
        let card = document.createElement("section");
        card.className = "member-card";

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p class="membership-tag">${member.membership}</p>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        directoryDisplay.appendChild(card);
    });
}

// Toggle Listeners
gridButton?.addEventListener("click", () => {
    directoryDisplay.classList.add("grid");
    directoryDisplay.classList.remove("list");
});

listButton?.addEventListener("click", () => {
    directoryDisplay.classList.add("list");
    directoryDisplay.classList.remove("grid");
});

getMembers();

const visitDisplay = document.querySelector("#visit-message");
const lastVisit = window.localStorage.getItem("lastVisit-ls");
const msPerDay = 86400000;
const currentVisit = Date.now();

if (visitDisplay) {
    if (!lastVisit) {
        visitDisplay.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysPassed = (currentVisit - lastVisit) / msPerDay;
        if (daysPassed < 1) {
            visitDisplay.textContent = "Back so soon! Awesome!";
        } else {
            const roundedDays = Math.floor(daysPassed);
            visitDisplay.textContent = `You last visited ${roundedDays} ${roundedDays === 1 ? "day" : "days"} ago.`;
        }
    }
    localStorage.setItem("lastVisit-ls", currentVisit);
}