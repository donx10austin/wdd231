document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector('#menu');
    const navList = document.querySelector('#nav-list');
    const membersDisplay = document.querySelector('#members');
    const gridBtn = document.querySelector('#grid-btn');
    const listBtn = document.querySelector('#list-btn');

    // Hamburger Toggle
    menuBtn.addEventListener('click', () => {
        navList.classList.toggle('show');
        menuBtn.textContent = navList.classList.contains('show') ? '❌' : '☰';
    });

    // Fetch Members
    async function getMembers() {
        const response = await fetch("data/members.json");
        const data = await response.json();
        displayMembers(data.members);
    }

    const displayMembers = (members) => {
        membersDisplay.innerHTML = "";
        members.forEach(member => {
            let card = document.createElement('section');
            card.className = "member-card";
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p class="category">${member.category}</p>
            `;
            membersDisplay.appendChild(card);
        });
    }

    // View Toggles
    gridBtn.addEventListener('click', () => {
        membersDisplay.classList.add('grid');
        membersDisplay.classList.remove('list');
        gridBtn.classList.add('active-toggle');
        listBtn.classList.remove('active-toggle');
    });

    listBtn.addEventListener('click', () => {
        membersDisplay.classList.add('list');
        membersDisplay.classList.remove('grid');
        listBtn.classList.add('active-toggle');
        gridBtn.classList.remove('active-toggle');
    });

    // Dates
    document.querySelector('#currentyear').textContent = new Date().getFullYear();
    document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

    getMembers();
});