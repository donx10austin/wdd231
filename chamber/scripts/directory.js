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

    // Fetch and Display Members
    async function getMembers() {
        try {
            const response = await fetch("data/members.json");
            const data = await response.json();
            displayMembers(data.members);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
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
                <p class="category"><strong>${member.category}</strong></p>
            `;
            membersDisplay.appendChild(card);
        });
    }

    // Toggle Buttons
    gridBtn.addEventListener('click', () => {
        membersDisplay.classList.replace('list', 'grid');
        gridBtn.classList.add('active-toggle');
        listBtn.classList.remove('active-toggle');
    });

    listBtn.addEventListener('click', () => {
        membersDisplay.classList.replace('grid', 'list');
        listBtn.classList.add('active-toggle');
        gridBtn.classList.remove('active-toggle');
    });

    // Date Footer
    document.querySelector('#currentyear').textContent = new Date().getFullYear();
    document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

    getMembers();
});