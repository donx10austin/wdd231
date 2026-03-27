// 1. Handle the Membership Modals
const openButtons = document.querySelectorAll(".open-modal");
const closeButtons = document.querySelectorAll(".close-modal");

// Loop through all "Learn More" buttons
openButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modalId = button.getAttribute("data-target");
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.showModal(); // Opens the <dialog>
        }
    });
});

// Loop through all "X" close buttons
closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = button.closest("dialog");
        if (modal) {
            modal.close(); // Closes the <dialog>
        }
    });
});

// 2. Set the Hidden Timestamp
// This records the date/time when the page was loaded
const timestampField = document.getElementById("timestamp");
if (timestampField) {
    const now = new Date();
    timestampField.value = now.toISOString(); 
    // Example: 2026-03-27T12:00:00.000Z
}