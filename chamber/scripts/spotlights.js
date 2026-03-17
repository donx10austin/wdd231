const spotlightContainer = document.querySelector('.spotlight-container');
const membersUrl = "data/members.json"; // Ensure this path is correct

async function getSpotlights() {
    const response = await fetch(membersUrl);
    const data = await response.json();
    
    // Filter for Gold (level 3) or Silver (level 2) members only
    const highLevelMembers = data.members.filter(m => m.membership_level >= 2);
    
    // Shuffle and pick 3 random members
    const shuffled = highLevelMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    displaySpotlights(selected);
}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = "";
    members.forEach(member => {
        const card = `
            <div class="card spotlight-card">
                <img src="${member.image}" alt="${member.name} logo">
                <h4>${member.name}</h4>
                <p>${member.tagline || 'Leading the way in Lagos business.'}</p>
                <hr>
                <p>Email: ${member.email}</p>
                <p>Phone: ${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            </div>
        `;
        spotlightContainer.innerHTML += card;
    });
}

getSpotlights();