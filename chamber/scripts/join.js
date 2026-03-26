// 1. SET THE HIDDEN TIMESTAMP
// This records when the form was loaded/started
const timestampField = document.querySelector('#timestamp');
if (timestampField) {
    timestampField.value = new Date().toISOString();
}

// 2. MODAL LOGIC FOR MEMBERSHIP CARDS
const modalButtons = document.querySelectorAll('.open-modal');
const closeButtons = document.querySelectorAll('.close-modal');

// Loop through all "Learn More" buttons
modalButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the specific modal ID from the data-target attribute
        const modalId = button.getAttribute('data-target');
        const modal = document.getElementById(modalId);
        
        if (modal) {
            modal.showModal(); // Opens the dialog as a top-level overlay
        }
    });
});

// Loop through all close (X) buttons inside the modals
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('dialog');
        if (modal) {
            modal.close();
        }
    });
});

// Close modal if user clicks outside of the dialog box
window.addEventListener('click', (event) => {
    if (event.target.tagName === 'DIALOG') {
        event.target.close();
    }
});

// 3. FOOTER DATE LOGIC
const lastModified = document.querySelector("#lastModified");
if (lastModified) {
    lastModified.textContent = document.lastModified;
}