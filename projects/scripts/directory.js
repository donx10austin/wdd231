const specialists = [
  {
    "name": "Dr. Chidi Okoro",
    "specialty": "Sports Medicine",
    "location": "Lagos Island",
    "experience": "12 Years",
    "image": "images/dr-okoro.webp", // Path relative to index.html
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
    "bio": "A pioneer in robotic-assisted hip and knee surgery with over 2,000 successful procedures."
  },
  {
    "name": "Dr. Funmi Bakare",
    "specialty": "Spine Surgery",
    "location": "Surulere",
    "experience": "10 Years",
    "image": "images/dr-bakare.webp",
    "bio": "Specializes in complex spinal reconstructions and non-surgical management of chronic back pain."
  },
  {
    "name": "Dr. Emeka Nwosu",
    "specialty": "Trauma & Fractures",
    "location": "Yaba",
    "experience": "7 Years",
    "image": "images/dr-nwosu.webp",
    "bio": "Dedicated to emergency orthopedic care, focusing on complex limb-salvage and fracture healing."
  }
];

const displaySpecialists = (list) => {
  const container = document.querySelector('#specialist-grid');
  if (!container) return;

  container.innerHTML = "";

  list.forEach((doc) => {
    let card = document.createElement("section");
    card.classList.add("specialist-card");

    // We use the image path directly because the script is called from specialists.html
    card.innerHTML = `
      <img src="${doc.image}" alt="Portrait of ${doc.name}" loading="lazy" width="300" height="200">
      <h3>${doc.name}</h3>
      <p class="specialty"><strong>${doc.specialty}</strong></p>
      <p>📍 ${doc.location}</p>
      <p>🎓 ${doc.experience} Experience</p>
      <p class="bio">${doc.bio}</p>
    `;

    container.appendChild(card);
  });
};

const gridBtn = document.querySelector('#grid-view');
const listBtn = document.querySelector('#list-view');
const container = document.querySelector('#specialist-grid');

if (gridBtn && listBtn) {
    gridBtn.addEventListener('click', () => {
        container.classList.add('grid');
        container.classList.remove('list');
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    });

    listBtn.addEventListener('click', () => {
        container.classList.add('list');
        container.classList.remove('grid');
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
    });
}

displaySpecialists(specialists);