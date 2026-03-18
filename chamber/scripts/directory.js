document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.querySelector('.services-grid');
    const search = document.querySelector('#directory-search');

    async function loadMembers(filter = "") {
        try {
            const response = await fetch('members.json');
            const data = await response.json();
            
            grid.innerHTML = "";
            const filtered = data.members.filter(m => 
                m.name.toLowerCase().includes(filter.toLowerCase()) ||
                m.membership.toLowerCase().includes(filter.toLowerCase())
            );

            filtered.forEach(m => {
                const card = document.createElement('div');
                card.className = 'card'; // Ensure .card style is in your CSS
                card.innerHTML = `
                    <img src="${m.image}" alt="${m.name}" style="width:60px; margin-bottom:15px;">
                    <h3>${m.name}</h3>
                    <p><strong>${m.membership}</strong></p>
                    <p>${m.address}</p>
                    <a href="${m.website}" target="_blank" class="more-link">Visit Site</a>
                `;
                grid.appendChild(card);
            });
        } catch (e) { console.error("Data load failed", e); }
    }

    search.addEventListener('input', (e) => loadMembers(e.target.value));
    loadMembers();
});