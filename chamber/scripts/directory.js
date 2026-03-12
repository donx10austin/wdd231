const url = "data/members.json";
const container = document.querySelector("#member-container");

async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data.members);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayMembers(members) {
    container.innerHTML = "";
    members.forEach(member => {
        const section = document.createElement("section");
        section.classList.add("member-card");

        section.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p class="industry">${member.industry}</p>
        `;
        container.appendChild(section);
    });
}

// Button Toggles
document.querySelector("#grid").addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
});

document.querySelector("#list").addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
});

getMembers();