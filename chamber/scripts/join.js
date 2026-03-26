/* ==========================================
   1. FORM TIMESTAMP
   ========================================== */
// This records the exact second the user opened the form
const timestampField = document.querySelector('#timestamp');
if (timestampField) {
    timestampField.value = new Date().toISOString();
}

/* ==========================================
   2. MEMBERSHIP MODAL LOGIC
   ========================================== */
// Select all "Learn More" buttons and close buttons
const modalButtons = document.querySelectorAll('.open-modal');
const closeButtons = document.querySelectorAll('.close-modal');

// Open the correct modal based on the data-target attribute
modalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-target');
        const modal = document.getElementById(modalId);
        
        if (modal) {
            modal.showModal(); // Opens the <dialog> element
        }
    });
});

// Close the modal when the 'X' button is clicked
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('dialog');
        if (modal) {
            modal.close();
        }
    });
});

// Close modal if the user clicks the backdrop (outside the box)
window.addEventListener('click', (event) => {
    if (event.target.tagName === 'DIALOG') {
        event.target.close();
    }
});

/* ==========================================
   3. FOOTER DATE LOGIC
   ========================================== */
const lastModifiedElement = document.querySelector("#lastModified");
if (lastModifiedElement) {
    lastModifiedElement.textContent = document.lastModified;
}