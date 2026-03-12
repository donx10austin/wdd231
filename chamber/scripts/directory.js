// Navigation
const hb = document.querySelector('#menu-toggle');
const menu = document.querySelector('#nav-links');
hb.addEventListener('click', () => menu.classList.toggle('open'));

// Spotlight Logic
const spotlightContainer = document.querySelector('#spotlight-container');

async function getSpotlight() {
    const response = await fetch('members.json');
    const data = await response.json();
    
    // Filter for levels 2 and 3
    const highTier = data.members.filter(m => m.membership >= 2);
    const shuffled = highTier.sort(() => 0.5 - Math.random()).slice(0, 3);

    shuffled.forEach(m => {
        const card = document.createElement('div');
        card.className = 'spotlight-card';
        card.innerHTML = `
            <img src="${m.image}" alt="${m.name} logo" class="spot-logo">
            <h3>${m.name}</h3>
            <p class="tagline">${m.category}</p>
            <hr>
            <div class="spot-details">
                <p><strong>PHONE:</strong> ${m.phone}</p>
                <p><strong>URL:</strong> <a href="${m.website}" target="_blank">Visit Site</a></p>
            </div>
        `;
        spotlightContainer.appendChild(card);
    });
}

// Footer Dates
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

getSpotlight();