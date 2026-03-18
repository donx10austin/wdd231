const spotlightMembers = [
    { name: "Adkan Nig. Ltd", message: "Leading the way in Nigerian infrastructure." },
    { name: "Lifewood Data", message: "Expert data entry and technology solutions." },
    { name: "Lagos Commerce", message: "Connecting businesses to the world." }
];

let currentIndex = 0;

function rotateSpotlight() {
    const title = document.querySelector('#spotlight-name');
    const desc = document.querySelector('#spotlight-desc');
    const container = document.querySelector('.spotlight-container');

    if (!title || !desc || !container) return;

    container.style.opacity = 0;

    setTimeout(() => {
        title.textContent = spotlightMembers[currentIndex].name;
        desc.textContent = spotlightMembers[currentIndex].message;

        container.style.opacity = 1;
        currentIndex = (currentIndex + 1) % spotlightMembers.length;
    }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
    rotateSpotlight();
    setInterval(rotateSpotlight, 5000);
});