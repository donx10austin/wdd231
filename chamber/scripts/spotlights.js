const spotlightUrl = 'data/members.json';

async function loadSpotlights() {
    try {
        const response = await fetch(spotlightUrl);
        const data = await response.json();
        
        const spotlightGrid = document.querySelector('#spotlight-grid');
        if (!spotlightGrid) return;

        // Shuffle and take 3
        const shuffled = data.members.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        spotlightGrid.innerHTML = "";
        selected.forEach(member => {
            const card = document.createElement('section');
            card.className = 'spotlight-card';
            card.innerHTML = `
                <h3>${member.name}</h3>
                <img src="${member.image}" alt="${member.name}" loading="lazy">
                <p><strong>${member.membership}</strong></p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Website</a>
            `;
            spotlightGrid.appendChild(card);
        });
    } catch (e) { console.log(e); }
}

loadSpotlights();