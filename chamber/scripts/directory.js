document.addEventListener("DOMContentLoaded", () => {
    // Hamburger Menu Logic
    const menuBtn = document.querySelector('#menu');
    const navList = document.querySelector('#nav-list');
    
    menuBtn.addEventListener('click', () => {
        navList.classList.toggle('show');
        menuBtn.textContent = navList.classList.contains('show') ? '❌' : '☰';
    });

    // Member Data Fetching
    const membersDisplay = document.querySelector('#members');
    const url = "data/members.json";

    async function getMembers() {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                displayMembers(data.members);
            } else {
                console.error("Failed to fetch member data.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const displayMembers = (members) => {
        membersDisplay.innerHTML = ""; 
        
        members.forEach((member) => {
            // Map membership numbers to readable levels
            const levels = { 1: 'Member', 2: 'Silver', 3: 'Gold' };
            const levelName = levels[member.membership] || 'Member';

            let card = document.createElement('section');
            card.className = "member-card"; 
            
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
                <h3>${member.name}</h3>
                <p class="category"><em>${member.category}</em></p>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank">Visit Website</a></p>
                <p class="membership-level">Level: <strong>${levelName}</strong></p>
            `;
            membersDisplay.appendChild(card);
        });
    }

    // Grid/List View Toggle
    document.querySelector('#grid-btn').addEventListener('click', () => {
        membersDisplay.classList.add('grid');
        membersDisplay.classList.remove('list');
    });

    document.querySelector('#list-btn').addEventListener('click', () => {
        membersDisplay.classList.add('list');
        membersDisplay.classList.remove('grid');
    });

    // Dynamic Footer Dates
    document.querySelector('#currentyear').textContent = new Date().getFullYear();
    document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

    getMembers();
});