const spotlightContainer = document.querySelector('#spotlight-content');

async function getSpotlights() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        
        // 1. Filter for Gold and Silver only (Lagos requirements)
        const eligibleMembers = data.members.filter(m => 
            m.membershipLevel === 'Gold' || m.membershipLevel === 'Silver'
        );

        // 2. Shuffle and pick 3 random members
        const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        displaySpotlights(selected);
    } catch (error) {
        console.error("Error loading spotlights:", error);
    }
}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = ""; // Clear placeholders

    members.forEach(member => {
        const card = document.createElement('section');
        card.className = "spotlight-card card";
        
        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
            <p class="membership-tag">${member.membershipLevel} Member</p>
            <hr>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        spotlightContainer.appendChild(card);
    });
}

getSpotlights();