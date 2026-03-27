/* =============================
   HOME PAGE SPOTLIGHT LOGIC
   ============================= */
const spotlightContainer = document.querySelector('#spotlight-content');
const membersUrl = "data/members.json";

if (spotlightContainer) {
    async function getSpotlights() {
        try {
            const response = await fetch(membersUrl);
            const data = await response.json();
            
            // 1. FILTER: Only Gold and Silver (Adjust strings if your JSON uses numbers)
            const eligibleMembers = data.members.filter(m => 
                m.membershipLevel === "Gold" || m.membershipLevel === "Silver" || 
                m.membershipLevel === 3 || m.membershipLevel === 2
            );

            // 2. SHUFFLE: Randomize
            const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());

            // 3. SLICE: Select exactly 3
            const selected = shuffled.slice(0, 3);

            displaySpotlights(selected);
        } catch (error) {
            console.error("Error loading spotlights:", error);
        }
    }

    function displaySpotlights(members) {
        spotlightContainer.innerHTML = "";
        
        members.forEach(member => {
            // Determine the display level (handles both string and number JSON data)
            let levelDisplay = member.membershipLevel;
            if (levelDisplay === 3) levelDisplay = "Gold";
            if (levelDisplay === 2) levelDisplay = "Silver";

            const card = `
                <div class="card spotlight-card">
                    <div class="card-header">${member.name}</div>
                    <div class="card-body">
                        <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy">
                        <p class="membership-badge"><strong>${levelDisplay} Member</strong></p>
                        <hr>
                        <p><strong>Phone:</strong> ${member.phone}</p>
                        <p>${member.address}</p>
                        <a href="${member.website}" target="_blank" class="btn-primary">Visit Website</a>
                    </div>
                </div>
            `;
            spotlightContainer.innerHTML += card;
        });
    }

    getSpotlights();
}