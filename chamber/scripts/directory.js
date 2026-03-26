const mainContainer = document.querySelector('#directory-container');
const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');
const membersUrl = "data/members.json";

async function getMembers() {
    const response = await fetch(membersUrl);
    const data = await response.json();
    displayMembers(data.members);
}

function displayMembers(members) {
    mainContainer.innerHTML = ""; // Clear existing content

    members.forEach((member) => {
        const card = document.createElement('section');
        card.className = "member-card";

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy">
            <div class="member-info">
                <h3>${member.name}</h3>
                <p class="membership-level">${member.membershipLevel} Member</p>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            </div>
        `;
        mainContainer.appendChild(card);
    });
}

// Toggle logic
gridBtn.addEventListener('click', () => {
    mainContainer.classList.add('grid-view');
    mainContainer.classList.remove('list-view');
});

listBtn.addEventListener('click', () => {
    mainContainer.classList.add('list-view');
    mainContainer.classList.remove('grid-view');
});

getMembers();