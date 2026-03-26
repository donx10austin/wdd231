// 1. EXTRACT DATA FROM THE URL
// This looks at the "query string" (everything after the ? in the URL)
const urlParams = new URLSearchParams(window.location.search);

// 2. TARGET THE RESULTS BOX
const resultsContainer = document.querySelector('#results');

if (resultsContainer && urlParams.has('fname')) {
    // Clear the "Loading..." message
    resultsContainer.innerHTML = '';

    // Create a list of the submitted data
    const submissionData = [
        { label: 'First Name', value: urlParams.get('fname') },
        { label: 'Last Name', value: urlParams.get('lname') },
        { label: 'Email', value: urlParams.get('email') },
        { label: 'Phone', value: urlParams.get('phone') },
        { label: 'Membership Level', value: urlParams.get('membership') },
        { label: 'Submission Date', value: new Date().toLocaleString() }
    ];

    // Build the HTML to display the data
    submissionData.forEach(item => {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${item.label}:</strong> ${item.value}`;
        resultsContainer.appendChild(p);
    });
}

// 3. FOOTER DATE LOGIC (Always keep this!)
const lastModified = document.querySelector("#lastModified");
if (lastModified) {
    lastModified.textContent = document.lastModified;
}