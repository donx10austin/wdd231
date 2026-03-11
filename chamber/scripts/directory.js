/* 1. Constants and Selection */
const url = "data/members.json"; 
const cards = document.querySelector("#members");

/* 2. Fetch Member Data with Error Handling */
async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // Data is usually an object containing the array, e.g., data.members
            displayMembers(data.members || data); 
        } else {
            console.error("HTTP-Error: " + response.status);
            cards.innerHTML = "<p>Failed to load directory data.</p>";
        }
    } catch (error) {
        console.error("Fetch Error: ", error);
        cards.innerHTML = "<p>An error occurred while loading the directory.</p>";
    }
}

/* 3. Display Members Function */
const displayMembers = (members) => {
    cards.innerHTML = ""; // Clear current content
    
    members.forEach((member) => {
        let section = document.createElement("section");
        section.className = "member-card";

        // Membership Level Logic
        const mLevel = member.membership === 3 ? "Gold" : member.membership === 2 ? "Silver" : "Member";

        section.innerHTML = `
            <img src="images/${member.image}" alt="Logo of ${member.name}" loading="lazy" width="150" height="100">
            <div class="member-details">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
                <p class="level"><strong>${mLevel} Member</strong></p>
            </div>
        `;
        cards.appendChild(section);
    });
}

/* 4. Grid/List Toggle Logic */
const gridbtn = document.querySelector("#grid-btn");
const listbtn = document.querySelector("#list-btn");

if (gridbtn && listbtn) {
    gridbtn.addEventListener("click", () => {
        cards.classList.add("grid");
        cards.classList.remove("list");
        gridbtn.classList.add("active");
        listbtn.classList.remove("active");
    });

    listbtn.addEventListener("click", () => {
        cards.classList.add("list");
        cards.classList.remove("grid");
        listbtn.classList.add("active");
        gridbtn.classList.remove("active");
    });
}

/* 5. Hamburger Menu Toggle */
const mainnav = document.querySelector('.nav-links');
const hambutton = document.querySelector('#menu');

if (hambutton && mainnav) {
    hambutton.addEventListener('click', () => {
        mainnav.classList.toggle('show');
        // Toggle the button text or icon for accessibility
        hambutton.textContent = mainnav.classList.contains('show') ? "❌" : "≡";
    });
}

/* 6. Dynamic Footer Dates (Standard WDD Requirements) */
const yearSpan = document.querySelector("#currentyear");
const lastModSpan = document.querySelector("#lastModified");

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

if (lastModSpan) {
    // Format: Last Modified: MM/DD/YYYY HH:MM:SS
    lastModSpan.textContent = `Last Modified: ${document.lastModified}`;
}

// Initialize the fetch
getMembers();