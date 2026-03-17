const mainContainer = document.querySelector('#directory-container');
const gridBtn = document.querySelector('#grid');
const listBtn = document.querySelector('#list');

async function getMembers() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayMembers(data.members);
}

function displayMembers(members) {
    mainContainer.innerHTML = "";
    members.forEach(member => {
        let section = document.createElement('section');
        section.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">${member.website}</a>
        `;
        mainContainer.appendChild(section);
    });
}

// Toggle logic
gridBtn.addEventListener('click', () => {
    mainContainer.classList.add('grid');
    mainContainer.classList.remove('list');
});

listBtn.addEventListener('click', () => {
    mainContainer.classList.add('list');
    mainContainer.classList.remove('grid');
});

getMembers();