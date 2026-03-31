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

    // 2. Set the Hidden Timestamp
    // We use toLocaleString so it's readable on the Thank You page
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        const now = new Date();
        // Format: "3/31/2026, 3:15:00 PM" (or based on user's local settings)
        timestampField.value = now.toLocaleString();
    }
});