const url = "data/members.json"; // path relative to directory.html
const cards = document.querySelector("#members");

// 1. Fetch Member Data with Error Handling
async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data);
        } else {
            console.error("HTTP-Error: " + response.status);
        }
    } catch (error) {
        console.error("Fetch Error: ", error);
    }
}

// 2. Display Members Function
const displayMembers = (members) => {
    cards.innerHTML = ""; 
    members.forEach((member) => {
        let section = document.createElement("section");
        section.className = "member-card";

        const mLevel = member.membership === 3 ? "Gold" : member.membership === 2 ? "Silver" : "Member";

        section.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Site</a></p>
            <p class="level">${mLevel} Member</p>
        `;
        cards.appendChild(section);
    });
}

// 3. Grid/List Toggle Logic
const gridbtn = document.querySelector("#grid-btn");
const listbtn = document.querySelector("#list-btn");

if (gridbtn && listbtn) {
    gridbtn.addEventListener("click", () => {
        cards.classList.add("grid");
        cards.classList.remove("list");
    });

    listbtn.addEventListener("click", () => {
        cards.classList.add("list");
        cards.classList.remove("grid");
    });
}

// 4. Hamburger Menu Toggle (For Mobile View)
const mainnav = document.querySelector('.nav-links');
const hambutton = document.querySelector('#menu');

if (hambutton && mainnav) {
    hambutton.addEventListener('click', () => {
        mainnav.classList.toggle('show');
        hambutton.classList.toggle('show');
    });
}

// 5. Footer Dates
const yearSpan = document.querySelector("#currentyear");
const lastModSpan = document.querySelector("#lastModified");

if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModSpan) lastModSpan.textContent = `Last Modified: ${document.lastModified}`;

// Initialize
getMembers();