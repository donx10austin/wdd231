const url = "data/members.json";
const cards = document.querySelector("#members");
const gridbtn = document.querySelector("#grid-btn");
const listbtn = document.querySelector("#list-btn");

async function getMembers() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.members);
}

const displayMembers = (members) => {
    cards.innerHTML = "";
    members.forEach((member) => {
        let section = document.createElement("section");
        section.className = "member-card";

        section.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p><strong>Category:</strong> ${member.category}</p>
        `;
        cards.appendChild(section);
    });
}

// Toggle logic with visual button feedback
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

getMembers();