/* --- SPOTLIGHTS.JS --- */

const spotlightUrl = "data/members.json";
const spotlightContainer = document.querySelector("#spotlight-grid");

/**
 * Fetch member data and filter for high-level members
 */
async function getSpotlights() {
    try {
        const response = await fetch(spotlightUrl);
        if (response.ok) {
            const data = await response.json();
            
            // Filter: Only Gold (level 3) and Silver (level 2) members are eligible
            const eligibleMembers = data.members.filter(member => 
                member.membership_level === 3 || member.membership_level === 2
            );
            
            // Randomly shuffle the eligible members array
            const shuffledMembers = eligibleMembers.sort(() => 0.5 - Math.random());
            
            // Select the top 2 or 3 members to display
            const selectedMembers = shuffledMembers.slice(0, 3);
            
            displaySpotlights(selectedMembers);
        } else {
            console.error("Spotlight data could not be reached.");
        }
    } catch (error) {
        console.error("Error fetching spotlights:", error);
    }
}

/**
 * Build the HTML for the spotlight cards
 * @param {Array} members - Array of filtered member objects
 */
function displaySpotlights(members) {
    if (!spotlightContainer) return;
    
    // Clear the container (removes any "loading" text or placeholders)
    spotlightContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");
        card.className = "spotlight-card";

        // Generate the HTML content for each card
        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
            <div class="contact-info">
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank">Visit Site</a></p>
            </div>
            <p class="membership-badge">${member.membership_level === 3 ? 'Gold Member' : 'Silver Member'}</p>
        `;

        spotlightContainer.appendChild(card);
    });
}

// Execute the fetch on page load
getSpotlights();