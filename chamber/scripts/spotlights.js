const spotlightContainer = document.querySelector('#spotlight-content');
const membersURL = "data/members.json"; 

async function getSpotlightMembers() {
    try {
        const response = await fetch(membersURL);
        const data = await response.json();
        
        // 1. FILTER: Only Gold and Silver (Case-sensitive to match your JSON)
        const eligible = data.members.filter(m => 
            m.membershipLevel === "Gold" || m.membershipLevel === "Silver"
        );
        
        // 2. RANDOMIZE: Shuffle the list
        const shuffled = eligible.sort(() => 0.5 - Math.random());
        
        // 3. LIMIT: Display 2 or 3 members
        displaySpotlights(shuffled.slice(0, 3));
        
    } catch (error) {
        console.error("Error loading spotlights:", error);
    }
}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = ""; 
    
    members.forEach(member => {
        const card = document.createElement('section');
        card.className = "lcci-spotlight-card";
        
        // Note: I used member.image directly since your JSON includes 'images/' in the string
        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <span class="membership-tag">${member.membershipLevel} Member</span>
        `;
        spotlightContainer.appendChild(card);
    });
}

getSpotlightMembers();