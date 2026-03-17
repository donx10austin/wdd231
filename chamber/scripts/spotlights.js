const memberUrl = 'data/members.json';
const spotlightContainer = document.querySelector('#spotlight-container');

async function getSpotlightMembers() {
    try {
        const response = await fetch(memberUrl);
        if (response.ok) {
            const data = await response.json();
            // 1. Filter for Gold or Silver members only
            const premiumMembers = data.members.filter(member => 
                member.membership_level === "Gold" || member.membership_level === "Silver"
            );
            
            // 2. Randomly select 3 members from the premium list
            const shuffled = premiumMembers.sort(() => 0.5 - Math.random());
            const selectedMembers = shuffled.slice(0, 3);

            displaySpotlights(selectedMembers);
        }
    } catch (error) {
        console.error("Error loading spotlights:", error);
    }
}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = ""; // Clear placeholder

    members.forEach(member => {
        const card = document.createElement('div');
        card.className = "spotlight-card";

        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="${member.image}" alt="Logo of ${member.name}" loading="lazy">
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website.replace('https://', '')}</a></p>
            <p class="membership-tag">${member.membership_level} Member</p>
        `;

        spotlightContainer.appendChild(card);
    });
}

// Initialize the spotlight fetch
getSpotlightMembers();