// Navigation
const hb = document.querySelector('#menu-toggle');
const menu = document.querySelector('#nav-links');
hb.addEventListener('click', () => menu.classList.toggle('open'));

// Spotlight Logic
const spotlightContainer = document.querySelector('#spotlight-container');

async function getSpotlight() {
    // data directory sits next to this HTML file
    const response = await fetch('data/members.json');
    const data = await response.json();
    
    // Filter for higher-level memberships
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

// Directory Logic
const directoryContainer = document.querySelector('#directory-container');
const gridButton = document.querySelector('#grid-button');
const listButton = document.querySelector('#list-button');

async function populateDirectory() {
    const response = await fetch('data/members.json');
    const data = await response.json();

    data.members.forEach(m => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.innerHTML = `
            <img src="${m.image}" alt="${m.name} logo">
            <h3>${m.name}</h3>
            <div class="details">
                <p>${m.address}</p>
                <p>${m.phone}</p>
                <p><a href="${m.website}" target="_blank">Visit Website</a></p>
                <p><em>${m.category}</em></p>
            </div>
        `;
        directoryContainer.appendChild(card);
    });
}

function setView(view) {
    if (view === 'grid') {
        directoryContainer.classList.add('grid');
        directoryContainer.classList.remove('list');
        gridButton.classList.add('active');
        listButton.classList.remove('active');
    } else {
        directoryContainer.classList.add('list');
        directoryContainer.classList.remove('grid');
        listButton.classList.add('active');
        gridButton.classList.remove('active');
    }
    localStorage.setItem('directoryView', view);
}

// event listeners
gridButton.addEventListener('click', () => setView('grid'));
listButton.addEventListener('click', () => setView('list'));

// initialize view from localStorage or default to grid
const savedView = localStorage.getItem('directoryView') || 'grid';
setView(savedView);

// call functions
populateDirectory();
getSpotlight();

// Footer Dates
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

getSpotlight();