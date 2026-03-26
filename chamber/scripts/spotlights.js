const spotlightContainer = document.querySelector('#spotlight-content');
const membersUrl = "data/members.json"; // Adjust path if your JSON is in a different folder

async function getSpotlights() {
    try {
        const response = await fetch(membersUrl);
        const data = await response.json();
        
        // 1. Filter for Gold or Silver members only
        const eligibleMembers = data.members.filter(member => 
            member.membershipLevel === "Gold" || member.membershipLevel === "Silver"
        );

        // 2. Shuffle the eligible members randomly
        const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());

        // 3. Select the top 2 or 3 members
        const selectedMembers = shuffled.slice(0, 3);

        // 4. Display them
        displaySpotlights(selectedMembers);

    } catch (error) {
        console.error("Error fetching spotlight data:", error);
    }
}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = ""; // Clear existing content

    members.forEach(member => {
        const section = document.createElement('div');
        section.className = 'spotlight-item';

        section.innerHTML = `
            <div class="spotlight-header">
                <img src="${member.image}" alt="${member.name} logo" loading="lazy">
                <h3>${member.name}</h3>
            </div>
            <p class="membership-badge ${member.membershipLevel.toLowerCase()}">${member.membershipLevel} Member</p>
            <p>${member.membership}</p>
            <hr>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        spotlightContainer.appendChild(section);
    });
}

getSpotlights();