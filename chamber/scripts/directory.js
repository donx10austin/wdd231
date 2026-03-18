const membersUrl = "data/members.json";
const directoryDisplay = document.querySelector("#directory-container");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

async function getMembers() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data.members);
        }
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

function displayMembers(members) {
    directoryDisplay.innerHTML = "";

    members.forEach((member) => {
        let card = document.createElement("section");
        card.className = "member-card";

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name}" loading="lazy">
            <h3>${member.name}</h3>
            <p class="membership-tag">${member.membership}</p>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;

        directoryDisplay.appendChild(card);
    });
}

if (gridButton && listButton) {
    gridButton.addEventListener("click", () => {
        directoryDisplay.classList.add("grid");
        directoryDisplay.classList.remove("list");
    });

    listButton.addEventListener("click", () => {
        directoryDisplay.classList.add("list");
        directoryDisplay.classList.remove("grid");
    });
}

getMembers();