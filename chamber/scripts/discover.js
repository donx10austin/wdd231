// 1. Visitor Message Logic (localStorage)
const visitorMessage = document.querySelector("#visitor-message");
const now = Date.now();
const lastVisit = localStorage.getItem("lastVisit");

if (!lastVisit) {
    visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    
    if (daysSince < 1) {
        visitorMessage.textContent = "Back so soon! Awesome!";
    } else {
        visitorMessage.textContent = `You last visited ${daysSince} ${daysSince === 1 ? "day" : "days"} ago.`;
    }
}

localStorage.setItem("lastVisit", now);

// 2. Simple Lazy Loading Check
const images = document.querySelectorAll("img[loading='lazy']");
images.forEach(img => {
    if (img.dataset.src) {
        img.src = img.dataset.src;
    }
});