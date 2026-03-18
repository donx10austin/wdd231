// --- SPOTLIGHTS.JS ---
const membersData = "data/members.json";

async function getSpotlights() {
    try {
        const response = await fetch(membersData);
        const data = await response.json();
        const members = data.members;

        // Shuffle and pick 3 random members
        const shuffled = [...members].sort(() => 0.5 - Math.random());
        const selectedMembers = shuffled.slice(0, 3);

        displaySpotlights(selectedMembers);
    } catch (error) {
        console.error("Error loading spotlights:", error);
    }
}

function displaySpotlights(members) {
    const spotlightGrid = document.querySelector('#spotlight-grid');
    if (!spotlightGrid) return;

    spotlightGrid.innerHTML = ""; // Clear existing

    members.forEach(member => {
        const card = document.createElement('section');
        card.className = 'spotlight-card';
        
        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="${member.image}" alt="${member.name} logo" loading="lazy">
            <p class="membership-tag">${member.membership}</p>
            <div class="spotlight-contact">
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Site</a>
            </div>
        `;
        spotlightGrid.appendChild(card);
    });
}

getSpotlights();