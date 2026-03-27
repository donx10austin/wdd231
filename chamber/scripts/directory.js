// 1. Correct the Selectors to match your HTML exactly
const mainContainer = document.querySelector('#member-container'); 
const gridBtn = document.querySelector('#grid'); 
const listBtn = document.querySelector('#list'); 
const membersUrl = "data/members.json";

async function getMembers() {
    // FORCE INITIAL GRID VIEW (Must be at the start)
    if (mainContainer) mainContainer.classList.add('grid');
    if (gridBtn) gridBtn.classList.add('active');

    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error("Could not fetch data");
        const data = await response.json();
        
        // Initial display of the members list
        displayMembers(data.members);
    } catch (error) {
        console.error("Error fetching members:", error);
        if (mainContainer) {
            mainContainer.innerHTML = "<p>Failed to load member directory. Please try again later.</p>";
        }
    }
}

function displayMembers(members) {
    mainContainer.innerHTML = ""; 

    members.forEach((member) => {
        const card = document.createElement('section');
        card.className = "member-card";

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy">
            <div class="member-info">
                <h3>${member.name}</h3>
                <p class="membership-level"><strong>${member.membershipLevel} Member</strong></p>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank" class="member-link">Visit Website</a>
            </div>
        `;
        mainContainer.appendChild(card);
    });
}

// 2. Button Toggle Logic
if (gridBtn && listBtn) {
    gridBtn.addEventListener('click', () => {
        mainContainer.classList.add('grid');
        mainContainer.classList.remove('list');
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    });

    listBtn.addEventListener('click', () => {
        mainContainer.classList.add('list');
        mainContainer.classList.remove('grid');
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
    });
}

// Initialize
getMembers();