const specialists = [
  {
    "name": "Dr. Chidi Okoro",
    "specialty": "Sports Medicine",
    "location": "Lagos Island",
    "experience": "12 Years",
    "image": "images/dr-okoro.webp",
    "bio": "Dr. Okoro specializes in minimally invasive arthroscopic surgery for athletes."
  },
  {
    "name": "Dr. Amina Yusuf",
    "specialty": "Pediatric Orthopedics",
    "location": "Ikeja",
    "experience": "8 Years",
    "image": "images/dr-yusuf.webp",
    "bio": "Expert in correcting congenital bone disorders and pediatric trauma."
  },
  {
    "name": "Dr. Segun Adebayo",
    "specialty": "Joint Replacement",
    "location": "Lekki Phase 1",
    "experience": "15 Years",
    "image": "images/dr-adebayo.webp",
    "bio": "A pioneer in robotic-assisted hip and knee surgery."
  },
  {
    "name": "Dr. Funmi Bakare",
    "specialty": "Spine Surgery",
    "location": "Surulere",
    "experience": "10 Years",
    "image": "images/dr-bakare.webp",
    "bio": "Specializes in complex spinal reconstructions."
  },
  {
    "name": "Dr. Emeka Nwosu",
    "specialty": "Trauma & Fractures",
    "location": "Yaba",
    "experience": "7 Years",
    "image": "images/dr-nwosu.webp",
    "bio": "Dedicated to emergency orthopedic care and limb-salvage."
  },
  {
    "name": "Dr. Tunde Fashola",
    "specialty": "Physical Therapy",
    "location": "Victoria Island",
    "experience": "5 Years",
    "image": "images/dr-fashola.webp",
    "bio": "Focuses on post-operative rehabilitation and mobility recovery."
  },
  {
    "name": "Dr. Ifeoma Azikiwe",
    "specialty": "Hand & Upper Extremity",
    "location": "Ikoyi",
    "experience": "11 Years",
    "image": "images/dr-azikiwe.webp",
    "bio": "Expert in delicate nerve repairs and carpal tunnel treatments."
  },
  {
    "name": "Dr. Babatunde Lawal",
    "specialty": "Orthopedic Oncology",
    "location": "Lagos Mainland",
    "experience": "20 Years",
    "image": "images/dr-lawal.webp",
    "bio": "Specializes in the management of bone and soft tissue tumors."
  },
  {
    "name": "Dr. Zainab Balogun",
    "specialty": "Rheumatology",
    "location": "Ajah",
    "experience": "9 Years",
    "image": "images/dr-balogun.webp",
    "bio": "Dedicated to managing inflammatory bone conditions."
  },
  {
    "name": "Dr. Victor Obi",
    "specialty": "Foot & Ankle Surgery",
    "location": "Festac Town",
    "experience": "6 Years",
    "image": "images/dr-obi.webp",
    "bio": "Treats complex ankle fractures and deformities."
  },
  {
    "name": "Dr. Kelechi Iheanacho",
    "specialty": "Osteoporosis Care",
    "location": "Gbagada",
    "experience": "14 Years",
    "image": "images/dr-iheanacho.webp",
    "bio": "Expert in bone density optimization."
  },
  {
    "name": "Dr. Sarah Alabi",
    "specialty": "Sports Medicine",
    "location": "Apapa",
    "experience": "7 Years",
    "image": "images/dr-alabi.webp",
    "bio": "Specializes in ACL reconstruction and shoulder stability."
  },
  {
    "name": "Dr. Mohammed Danjuma",
    "specialty": "Trauma Surgery",
    "location": "Ogba",
    "experience": "13 Years",
    "image": "images/dr-danjuma.webp",
    "bio": "Focuses on high-impact emergency interventions."
  },
  {
    "name": "Dr. Nneka Eze",
    "specialty": "Joint Replacement",
    "location": "Magodo",
    "experience": "16 Years",
    "image": "images/dr-eze.webp",
    "bio": "Expert in total knee and hip replacements."
  },
  {
    "name": "Dr. David Bello",
    "specialty": "Physical Medicine",
    "location": "Ikorodu",
    "experience": "4 Years",
    "image": "images/dr-bello.webp",
    "bio": "Passionate about non-surgical pain management."
  }
];

const container = document.querySelector('#specialist-grid');
const modal = document.querySelector('#specialist-modal');
const modalContent = document.querySelector('#modal-content');
const closeModal = document.querySelector('#close-modal');

const displaySpecialists = (list) => {
    if (!container) return;
    container.innerHTML = ""; // Clear existing content ONCE

    list.forEach((doc) => {
        let card = document.createElement("section");
        card.className = "specialist-card";

        card.innerHTML = `
            <img src="${doc.image}" alt="Portrait of ${doc.name}" loading="lazy" width="300" height="250">
            <h3>${doc.name}</h3>
            <p class="specialty"><strong>${doc.specialty}</strong></p>
            <p>📍 ${doc.location}</p>
            <button class="view-bio-btn">View Full Bio</button>
        `;

        // Modal event listener
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

        container.appendChild(card); // Append inside the loop
    });
};

// --- VIEW TOGGLE ---
const gridBtn = document.querySelector('#grid-view');
const listBtn = document.querySelector('#list-view');

const setView = (view) => {
    if (view === 'list') {
        container.classList.add('list');
        container.classList.remove('grid');
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
    } else {
        container.classList.add('grid');
        container.classList.remove('list');
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    }
};

// Initialize View from Local Storage
const savedView = localStorage.getItem('viewPreference') || 'grid';
setView(savedView);

if (gridBtn && listBtn) {
    gridBtn.addEventListener('click', () => {
        setView('grid');
        localStorage.setItem('viewPreference', 'grid');
    });

    listBtn.addEventListener('click', () => {
        setView('list');
        localStorage.setItem('viewPreference', 'list');
    });
}

// Close Modal
if (closeModal) {
    closeModal.addEventListener('click', () => modal.close());
}

// Render the 15 specialists
displaySpecialists(specialists);