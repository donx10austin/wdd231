// --- Inside renderSpotlights function ---
function renderSpotlights(members) {
    const eligible = members.filter(m => 
        // Use 'membershipLevel' to match your JSON keys
        m.membershipLevel.toLowerCase() === 'gold' || 
        m.membershipLevel.toLowerCase() === 'silver'
    );

    const shuffled = eligible.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    spotlightContainer.innerHTML = ""; 
    
    selected.forEach(m => {
        const spot = document.createElement('div');
        spot.className = 'spotlight-item';
        spot.innerHTML = `
            <img src="${m.image}" alt="${m.name}" style="width:50px;">
            <h3>${m.name}</h3>
            <p><strong>${m.membershipLevel} Member</strong></p> <p>${m.membership}</p> <a href="${m.website}" target="_blank">Visit Site</a>
        `;
        spotlightContainer.appendChild(spot);
    });
}

// --- Inside renderDirectory function ---
function renderDirectory(members, filter) {
    grid.innerHTML = "";
    const filtered = members.filter(m => 
        m.name.toLowerCase().includes(filter.toLowerCase()) ||
        m.membershipLevel.toLowerCase().includes(filter.toLowerCase()) || // Updated
        m.membership.toLowerCase().includes(filter.toLowerCase())
    );
    // ... rest of the rendering code
}