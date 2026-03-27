// scripts/join.js

document.addEventListener("DOMContentLoaded", () => {
    // 1. Handle the Membership Modals (Learn More dialogs)
    const openButtons = document.querySelectorAll(".open-modal");
    const closeButtons = document.querySelectorAll(".close-modal");

    // Open modal logic
    openButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-target");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal(); // Opens the <dialog> with a backdrop
            }
        });
    });

    // Close modal logic
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest("dialog");
            if (modal) {
                modal.close();
            }
        });
    });

    // 2. Set the Hidden Timestamp (Consolidated)
    // This records exactly when the user loaded the form
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
        // Returns format like: 2026-03-27T18:45:00.000Z
    }
});