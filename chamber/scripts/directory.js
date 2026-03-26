const mainContainer = document.querySelector('#directory-container');
const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');
const membersUrl = "data/members.json";

async function getMembers() {
    try {
        const response = await fetch(membersUrl);
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Error fetching members:", error);
    }
}

function displayMembers(members) {
    mainContainer.innerHTML = ""; 

    members.forEach((member) => {
        const card = document.createElement('section');
        // Use member-card for general styling, grid-item for specific grid behavior
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

// Toggle logic with active button styling
if (gridBtn && listBtn) {
    gridBtn.addEventListener('click', () => {
        mainContainer.classList.add('grid-view');
        mainContainer.classList.remove('list-view');
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    });

    listBtn.addEventListener('click', () => {
        mainContainer.classList.add('list-view');
        mainContainer.classList.remove('grid-view');
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
    });
}

getMembers();