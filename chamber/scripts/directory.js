// --- HERO ANIMATION LOGIC ---
function initHero() {
    const heroTitle = document.querySelector('.hero-content h1');
    const heroContent = document.querySelector('.hero-content');

    if (heroTitle && heroContent) {
        // Initial state for animation
        heroContent.style.opacity = "0";
        heroContent.style.transform = "translateY(20px)";
        heroContent.style.transition = "all 1s ease-out";

        // Trigger animation after a tiny delay
        setTimeout(() => {
            heroContent.style.opacity = "1";
            heroContent.style.transform = "translateY(0)";
        }, 100);
    }
}

// --- DIRECTORY LOGIC ---
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Initialize the Hero visuals
    initHero();

    const grid = document.querySelector('.services-grid');
    const search = document.querySelector('#directory-search');

    async function loadMembers(filter = "") {
        try {
            // Path must match where your members.json is (e.g., 'data/members.json')
            const response = await fetch('members.json'); 
            const data = await response.json();
            
            // Clear current cards before reloading
            grid.innerHTML = "";

            // Filter logic: Checks both Name and Membership type
            const filtered = data.members.filter(m => 
                m.name.toLowerCase().includes(filter.toLowerCase()) ||
                m.membership.toLowerCase().includes(filter.toLowerCase())
            );

            // Create and append cards
            filtered.forEach(m => {
                const card = document.createElement('div');
                card.className = 'card'; 
                card.innerHTML = `
                    <div class="card-image">
                        <img src="${m.image}" alt="${m.name} logo" loading="lazy">
                    </div>
                    <h3>${m.name}</h3>
                    <p class="membership-type"><strong>${m.membership}</strong></p>
                    <p class="address">${m.address}</p>
                    <p class="phone">${m.phone}</p>
                    <div class="card-actions">
                        <a href="${m.website}" target="_blank" class="btn secondary">Visit Website</a>
                    </div>
                `;
                grid.appendChild(card);
            });

        } catch (e) { 
            console.error("Directory data load failed:", e); 
            grid.innerHTML = "<p>Sorry, we couldn't load the directory right now.</p>";
        }
    }

    // 2. Listen for search typing
    if (search) {
        search.addEventListener('input', (e) => loadMembers(e.target.value));
    }

    // 3. Initial load of all members
    loadMembers();
});