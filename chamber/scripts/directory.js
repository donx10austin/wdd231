/* --- DIRECTORY.JS --- */

// 1. Define the data source (Relative to the HTML file)
const membersUrl = "data/members.json";

// 2. Select HTML elements
const directoryDisplay = document.querySelector("#directory-container");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

/**
 * Async function to fetch member data from JSON
 */
async function getMembers() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const data = await response.json();
            // Call the display function and pass the members array
            displayMembers(data.members);
        } else {
            console.error("HTTP-Error: " + response.status);
        }
    } catch (error) {
        console.error("Error fetching the members JSON:", error);
    }
}

/**
 * Function to build and display member cards
 * @param {Array} members - The array of member objects
 */
function displayMembers(members) {
    // Clear the container first
    directoryDisplay.innerHTML = "";

    members.forEach((member) => {
        // Create elements for each member section
        let card = document.createElement("section");
        let name = document.createElement("h3");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let website = document.createElement("a");
        let portrait = document.createElement("img");
        let level = document.createElement("p");

        // Set the content
        name.textContent = member.name;
        address.textContent = member.address;
        phone.textContent = member.phone;
        
        // Link Setup
        website.textContent = member.website;
        website.setAttribute("href", member.website);
        website.setAttribute("target", "_blank");

        // Image Setup (Lazy Load for performance)
        portrait.setAttribute("src", member.image);
        portrait.setAttribute("alt", `Logo for ${member.name}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "200");
        portrait.setAttribute("height", "150");

        // Membership Level Mapping
        const levels = { 1: "Member", 2: "Silver", 3: "Gold" };
        level.textContent = `Status: ${levels[member.membership_level] || "Member"}`;
        level.classList.add("membership-status");

        // Append to card
        card.appendChild(portrait);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(level);

        // Append card to directory
        directoryDisplay.appendChild(card);
    });
}

// 3. EVENT LISTENERS: Grid and List Toggles
if (gridButton && listButton) {
    gridButton.addEventListener("click", () => {
        directoryDisplay.classList.add("grid");
        directoryDisplay.classList.remove("list");
    });

    listButton.addEventListener("click", () => {
        directoryDisplay.classList.add("list");
        directoryDisplay.classList.remove("grid");
    });
}

// 4. Initialize the page
getMembers();