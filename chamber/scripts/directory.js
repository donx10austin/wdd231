document.addEventListener("DOMContentLoaded", () => {
    // --- Navigation Menu ---
    const menuBtn = document.querySelector('#menu');
    const navList = document.querySelector('#nav-list');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navList.classList.toggle('show');
            menuBtn.textContent = navList.classList.contains('show') ? '❌' : '☰';
        });
    }

    // --- Member Data Fetching ---
    const membersDisplay = document.querySelector('#members');
    const url = "data/members.json";

    async function getMembers() {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                displayMembers(data.members);
            } else {
                console.error("Failed to load member data.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const displayMembers = (members) => {
        membersDisplay.innerHTML = ""; // Clear existing content
        
        members.forEach((member) => {
            let card = document.createElement('section');
            card.className = "member-card"; 
            
            // Note: Images are pulled from the images/ folder 
            // The structure matches your screenshot perfectly
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

    // --- Grid/List Toggle Logic ---
    const gridBtn = document.querySelector('#grid-btn');
    const listBtn = document.querySelector('#list-btn');

    gridBtn.addEventListener('click', () => {
        membersDisplay.classList.add('grid');
        membersDisplay.classList.remove('list');
        // Optional: Update button styling to match screenshot active state
        gridBtn.style.backgroundColor = "#003366";
        gridBtn.style.color = "white";
        listBtn.style.backgroundColor = "white";
        listBtn.style.color = "#003366";
    });

    listBtn.addEventListener('click', () => {
        membersDisplay.classList.add('list');
        membersDisplay.classList.remove('grid');
        // Optional: Update button styling to match screenshot active state
        listBtn.style.backgroundColor = "#003366";
        listBtn.style.color = "white";
        gridBtn.style.backgroundColor = "white";
        gridBtn.style.color = "#003366";
    });

    // --- Footer Metadata ---
    const yearSpan = document.querySelector('#currentyear');
    const lastModSpan = document.querySelector('#lastModified');

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    if (lastModSpan) {
        lastModSpan.textContent = `Last Modified: ${document.lastModified}`;
    }

    // Initialize the fetch
    getMembers();
});