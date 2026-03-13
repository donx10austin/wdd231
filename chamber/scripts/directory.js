const url = "data/members.json";
const cards = document.querySelector('#directory-cards');

async function getMemberData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const displayMembers = (members) => {
    cards.innerHTML = ""; // Clear loader text or old content

    members.forEach((member) => {
        let card = document.createElement('section');
        card.className = "member-card";

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><strong>Category:</strong> ${member.membership}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;

        cards.appendChild(card);
    });
}

// Initial Call
getMemberData();

// Optional: Grid/List Toggle (if you have buttons with id="grid" and id="list")
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");

if (gridbutton && listbutton) {
    gridbutton.addEventListener("click", () => cards.classList.add("grid"));
    listbutton.addEventListener("click", () => cards.classList.remove("grid"));
}