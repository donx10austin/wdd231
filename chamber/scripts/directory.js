document.addEventListener('DOMContentLoaded', async () => {
    // --- Hamburger Menu Logic ---
    // Note: Ensure your HTML <ul> has class="navigation" OR change selector to '.primary-nav ul'
    const mainnav = document.querySelector('.primary-nav ul');
    const hambutton = document.querySelector('#menu');

    if (hambutton && mainnav) {
        hambutton.addEventListener('click', () => {
            mainnav.classList.toggle('show');
            hambutton.classList.toggle('show');
        });
    }

    // --- Data Loading & Logic ---
    const grid = document.querySelector('.services-grid');
    const search = document.querySelector('#directory-search');
    const spotlightContainer = document.querySelector('#spotlight-content');

    async function loadData(filter = "") {
        try {
            const response = await fetch('members.json');
            const data = await response.json();
            const members = data.members;

            // 1. Handle Random Spotlight (Home Page - Gold/Silver only)
            if (spotlightContainer) {
                renderSpotlights(members);
            }

            // 2. Handle Directory Grid (Directory Page)
            if (grid) {
                renderDirectory(members, filter);
            }

        } catch (e) { 
            console.error("Data load failed", e); 
        }
    }

    function renderSpotlights(members) {
        // Filter for Gold or Silver levels only
        const eligible = members.filter(m => 
            m.membership.toLowerCase() === 'gold' || 
            m.membership.toLowerCase() === 'silver'
        );

        // Shuffle and pick 2-3 members randomly
        const shuffled = eligible.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        spotlightContainer.innerHTML = ""; 
        
        selected.forEach(m => {
            const spot = document.createElement('div');
            spot.className = 'spotlight-item'; // Styles in your CSS
            spot.innerHTML = `
                <img src="${m.image}" alt="${m.name}" style="width:50px; border-radius:50%;">
                <h3>${m.name}</h3>
                <p class="membership-tag"><strong>${m.membership} Member</strong></p>
                <p>${m.phone}</p>
                <a href="${m.website}" target="_blank">Visit Website</a>
            `;
            spotlightContainer.appendChild(spot);
        });
    }

    function renderDirectory(members, filter) {
        grid.innerHTML = "";
        const filtered = members.filter(m => 
            m.name.toLowerCase().includes(filter.toLowerCase()) ||
            m.membership.toLowerCase().includes(filter.toLowerCase())
        );

        filtered.forEach(m => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${m.image}" alt="${m.name}" style="width:60px; margin-bottom:15px;">
                <h3>${m.name}</h3>
                <p><strong>${m.membership}</strong></p>
                <p>${m.address}</p>
                <a href="${m.website}" target="_blank" class="more-link">Visit Site</a>
            `;
            grid.appendChild(card);
        });
    }

    // --- Search Listener ---
    if (search) {
        search.addEventListener('input', (e) => {
            // We re-fetch or use a global variable; for simplicity, re-run loadData with filter
            loadData(e.target.value);
        });
    }

    // Initialize page
    loadData();
});