const url = 'data/members.json';
const cards = document.querySelector('#directory-cards');
const gridbutton = document.querySelector('#grid');
const listbutton = document.querySelector('#list');

// 1. Fetch the JSON data
async function getMemberData() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data.members);
        } else {
            console.error("Could not fetch member data");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// 2. Loop through members and create HTML elements
const displayMembers = (members) => {
    cards.innerHTML = ""; // Clear existing content

    members.forEach((member) => {
        let card = document.createElement('section');
        card.className = "member-card";

        // Create elements
        let logo = document.createElement('img');
        let name = document.createElement('h3');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('a');
        let level = document.createElement('p');

        // Set content
        name.textContent = member.name;
        address.textContent = member.address;
        phone.textContent = member.phone;
        level.textContent = `Membership Level: ${member.membership_level}`;
        
        website.textContent = "Visit Website";
        website.setAttribute('href', member.website);
        website.setAttribute('target', '_blank');

        logo.setAttribute('src', member.image);
        logo.setAttribute('alt', `Logo of ${member.name}`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', '200');
        logo.setAttribute('height', '100');

        // Append to card
        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(level);

        // Append card to container
        cards.appendChild(card);
    });
}

// 3. Grid/List Toggle Logic
if (gridbutton && listbutton) {
    gridbutton.addEventListener("click", () => {
        cards.classList.add("grid");
        cards.classList.remove("list");
    });

    listbutton.addEventListener("click", () => {
        cards.classList.add("list");
        cards.classList.remove("grid");
    });
}

// Initialize
getMemberData();