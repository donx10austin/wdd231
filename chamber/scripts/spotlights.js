const spotlightContainer = document.querySelector('#spotlight-content');
const membersUrl = "data/members.json";

async function getSpotlights() {
    try {
        const response = await fetch(membersUrl);
        const data = await response.json();
        
        // Filter: Only Gold and Silver members
        const eligibleMembers = data.members.filter(m => 
            m.membershipLevel === "Gold" || m.membershipLevel === "Silver"
        );

        // Shuffle and pick 2-3 members randomly
        const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 2);

        displaySpotlights(selected);
    } catch (error) {
        console.error("Error loading spotlights:", error);
    }
}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = "";
    
    members.forEach(member => {
        const item = document.createElement('div');
        item.className = 'spotlight-item';
        // Applying specific color coding based on level
        const levelClass = member.membershipLevel.toLowerCase();

        item.innerHTML = `
            <div class="spotlight-header">
                <img src="${member.image}" alt="${member.name}">
                <div>
                    <h3>${member.name}</h3>
                    <span class="badge ${levelClass}">${member.membershipLevel}</span>
                </div>
            </div>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Website</a>
        `;
        spotlightContainer.appendChild(item);
    });
}

getSpotlights();