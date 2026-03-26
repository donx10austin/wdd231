const spotlightContainer = document.querySelector('#spotlight-content');
const membersUrl = "data/members.json";

async function getSpotlights() {
    try {
        const response = await fetch(membersUrl);
        const data = await response.json();
        
        // 1. Filter: Only Gold (3) and Silver (2) levels
        const eligibleMembers = data.members.filter(m => 
            m.membershipLevel === "Gold" || m.membershipLevel === "Silver"
        );

        // 2. Shuffle the filtered array randomly
        const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());

        // 3. Select 2 to 3 members
        const count = Math.floor(Math.random() * 2) + 2; // Returns 2 or 3
        const selected = shuffled.slice(0, count);

        displaySpotlights(selected);
    } catch (error) {
        console.error("Error loading spotlights:", error);
    }
}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = "";
    
    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'spotlight-item';
        
        // Lowercase the level for the CSS badge class (gold/silver)
        const levelClass = member.membershipLevel.toLowerCase();

        card.innerHTML = `
            <div class="spotlight-header">
                <img src="${member.image}" alt="${member.name} logo">
                <div>
                    <h3>${member.name}</h3>
                    <span class="badge ${levelClass}">${member.membershipLevel} Member</span>
                </div>
            </div>
            <hr>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website.replace('https://', '')}</a></p>
            <p><em>${member.membership} Industry</em></p>
        `;
        spotlightContainer.appendChild(card);
    });
}

getSpotlights();