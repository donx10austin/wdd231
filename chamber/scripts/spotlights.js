// --- CONFIGURATION ---
const membersUrl = "data/members.json"; // Path to your JSON file
let spotlightMembers = [];
let currentIndex = 0;

// --- HERO LOGIC ---
function initHero() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        heroTitle.style.opacity = "0";
        heroTitle.style.transform = "translateY(20px)";
        
        setTimeout(() => {
            heroTitle.style.transition = "all 0.8s ease-out";
            heroTitle.style.opacity = "1";
            heroTitle.style.transform = "translateY(0)";
        }, 200);
    }
}

// --- FETCH DATA & ROTATION LOGIC ---
async function getMembers() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const data = await response.json();
            // We use all members from the JSON for the rotation
            spotlightMembers = data.members;
            
            // Start the rotation once data is loaded
            rotateSpotlight();
            setInterval(rotateSpotlight, 5000);
        } else {
            console.error("Failed to load members.json");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function rotateSpotlight() {
    const spotlightTitle = document.querySelector('#spotlight-name');
    const spotlightDesc = document.querySelector('#spotlight-desc');
    const spotlightImg = document.querySelector('#spotlight-logo'); // Added for the logo
    const container = document.querySelector('.spotlight-container');
    
    if (spotlightTitle && spotlightDesc && container && spotlightMembers.length > 0) {
        const member = spotlightMembers[currentIndex];
        
        container.style.opacity = 0;

        setTimeout(() => {
            spotlightTitle.textContent = member.name;
            spotlightDesc.textContent = `${member.membership} | ${member.address}`;
            
            // Update the logo if you have an <img> tag in your HTML for it
            if (spotlightImg) {
                spotlightImg.src = member.image;
                spotlightImg.alt = `${member.name} Logo`;
            }
            
            container.style.opacity = 1;
            currentIndex = (currentIndex + 1) % spotlightMembers.length;
        }, 500);
    }
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initHero();
    getMembers(); // Loads JSON data then starts rotation
});