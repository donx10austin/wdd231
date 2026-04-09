const specialists = [
    // ... Paste all 15 doctor objects here ...
    {
        "name": "Dr. Chidi Okoro",
        "specialty": "Sports Medicine",
        "location": "Lagos Island",
        "experience": "12 Years",
        "image": "images/dr-okoro.webp",
        "bio": "Dr. Okoro specializes in minimally invasive arthroscopic surgery for athletes."
    },
    // ... add the rest until you have 15 ...
];

const modal = document.querySelector('#specialist-modal');
const modalContent = document.querySelector('#modal-content');
const closeModal = document.querySelector('#close-modal');
const container = document.querySelector('#specialist-grid');

const displaySpecialists = (list) => {
    if (!container) return;
    container.innerHTML = "";

    list.forEach((doc) => {
        let card = document.createElement("section");
        card.classList.add("specialist-card");

        card.innerHTML = `
            <img src="${doc.image}" alt="Portrait of ${doc.name}" loading="lazy" width="300" height="200">
            <h3>${doc.name}</h3>
            <p class="specialty"><strong>${doc.specialty}</strong></p>
            <p>📍 ${doc.location}</p>
            <button class="view-bio-btn">View Full Bio</button>
        `;

        // MODAL LOGIC (Inside the loop so it knows which 'doc' is clicked)
        card.querySelector('.view-bio-btn').addEventListener('click', () => {
            modalContent.innerHTML = `
                <h2>${doc.name}</h2>
                <hr>
                <p><strong>Specialty:</strong> ${doc.specialty}</p>
                <p><strong>Experience:</strong> ${doc.experience}</p>
                <p><strong>Location:</strong> ${doc.location}</p>
                <p class="modal-bio">${doc.bio}</p>
            `;
            modal.showModal();
        });

        container.appendChild(card);
    });
};

// --- VIEW TOGGLE & LOCAL STORAGE ---
const gridBtn = document.querySelector('#grid-view');
const listBtn = document.querySelector('#list-view');

// Check Local Storage for saved preference
const savedView = localStorage.getItem('viewPreference');
if (savedView === 'list') {
    container.classList.add('list');
    container.classList.remove('grid');
}

if (gridBtn && listBtn) {
    gridBtn.addEventListener('click', () => {
        container.classList.add('grid');
        container.classList.remove('list');
        localStorage.setItem('viewPreference', 'grid');
    });

    listBtn.addEventListener('click', () => {
        container.classList.add('list');
        container.classList.remove('grid');
        localStorage.setItem('viewPreference', 'list');
    });
}

// Close Modal Event
if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.close();
    });
}

// Initial Call
displaySpecialists(specialists);