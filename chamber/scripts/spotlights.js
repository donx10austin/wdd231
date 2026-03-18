spotlights.js
 // spotlight.js - Cycles through featured members
const spotlightMembers = [
    { name: "Adkan Nig. Ltd", message: "Leading the way in Nigerian Infrastructure." },
    { name: "Lifewood Data", message: "Expert Data Entry & Tech Solutions." },
    { name: "Lagos Commerce", message: "Connecting Businesses to the World." }
];

let currentIndex = 0;

function rotateSpotlight() {
    const spotlightTitle = document.querySelector('#spotlight-name');
    const spotlightDesc = document.querySelector('#spotlight-desc');
    
    if (spotlightTitle && spotlightDesc) {
        // Simple fade out/in effect using opacity
        const container = document.querySelector('.spotlight-container');
        container.style.opacity = 0;

        setTimeout(() => {
            spotlightTitle.textContent = spotlightMembers[currentIndex].name;
            spotlightDesc.textContent = spotlightMembers[currentIndex].message;
            container.style.opacity = 1;
            currentIndex = (currentIndex + 1) % spotlightMembers.length;
        }, 500);
    }
}

// Run rotation every 5 seconds
setInterval(rotateSpotlight, 5000);
document.addEventListener('DOMContentLoaded', rotateSpotlight);