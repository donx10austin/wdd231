const spotlightContainer = document.querySelector('#spotlight-content');
const membersUrl = "data/members.json";

// 1. Safety check to ensure container exists on the current page
if (spotlightContainer) {
    async function getSpotlights() {
        try {
            const response = await fetch(membersUrl);
            const data = await response.json();
            
            // 2. Filter: Only Gold and Silver levels
            const eligibleMembers = data.members.filter(m => 
                m.membershipLevel === "Gold" || m.membershipLevel === "Silver"
            );

            // 3. Shuffle the filtered array randomly
            const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());

            // 4. Select exactly 3 members for a consistent layout
            const selected = shuffled.slice(0, 3);

            displaySpotlights(selected);
        } catch (error) {
            console.error("Error loading spotlights:", error);
        }
    }

    function displaySpotlights(members) {
        spotlightContainer.innerHTML = "";
        
        members.forEach(member => {
            const card = document.createElement('div');
            card.className = 'spotlight-item card'; // Added 'card' to use your existing CSS
            
            const levelClass = member.membershipLevel.toLowerCase();

            card.innerHTML = `
                <div class="card-header">
                    <h3>${member.name}</h3>
                </div>
                <div class="card-body">
                    <img src="${member.image}" alt="${member.name} logo" loading="lazy">
                    <p class="badge ${levelClass}"><strong>${member.membershipLevel} Member</strong></p>
                    <hr>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><a href="${member.website}" target="_blank" class="member-link">Visit Website</a></p>
                    <p><em>${member.membership} Industry</em></p>
                </div>
            `;
            spotlightContainer.appendChild(card);
        });
    }

    getSpotlights();
}