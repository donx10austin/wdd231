const url = 'data/specialists.json';

export async function initDirectory() {
    const grid = document.querySelector('#directory-grid');
    if (!grid) return;

    try {
        const response = await fetch(url);
        const specialists = await response.json();
        renderCards(specialists, grid);
    } catch (error) {
        console.error("Error fetching medical data:", error);
    }
}

function renderCards(data, container) {
    container.innerHTML = ""; // Clear loading message
    data.forEach(doctor => {
        const card = document.createElement('section');
        card.className = 'doctor-card';
        card.innerHTML = `
            <img src="${doctor.image}" alt="${doctor.name}" loading="lazy">
            <h3>${doctor.name}</h3>
            <p>${doctor.specialty}</p>
            <button class="view-btn">Full Profile</button>
        `;
        container.appendChild(card);
    });
}