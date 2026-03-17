const spotlightURL = "data/members.json";
const spotlightContainer = document.querySelector("#spotlight-container");

async function getSpotlights() {
    try {
        const response = await fetch(spotlightURL);
        const data = await response.json();

        // Shuffle members
        const shuffled = data.members.sort(() => 0.5 - Math.random());

        // Pick 3 random members
        const selected = shuffled.slice(0, 3);

        displaySpotlights(selected);
    } catch (error) {
        console.error("Error fetching spotlights:", error);
    }
}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo">
            <h3>${member.name}</h3>
            <p>${member.membership}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;

        spotlightContainer.appendChild(card);
    });
}

getSpotlights();