// Grab the current URL from the browser's address bar
const currentUrl = window.location.href;

// Split the URL into two halves at the '?'
const everything = currentUrl.split('?');

// Check if there is actually data in the URL
if (everything.length > 1) {
    // Separate each "key=value" pair into an array
    const formData = everything[1].split('&');

    // Helper function to find and clean up the values
    function getFormValue(key) {
        let value = "";
        formData.forEach((element) => {
            if (element.startsWith(key)) {
                // Split at '=' and get the second half, then decode symbols like %40 (@)
                value = decodeURIComponent(element.split('=')[1]);
                // Replace '+' with spaces if the browser used them for encoding
                value = value.replace(/\+/g, ' ');
            }
        });
        return value;
    }

    // Target the div with id="results" in your thankyou.html
    const resultsContainer = document.querySelector('#results');

    // Build the output using the 'name' attributes from your join.html form
    resultsContainer.innerHTML = `
        <h3>Application Summary</h3>
        <p><strong>First Name:</strong> ${getFormValue('fname')}</p>
        <p><strong>Last Name:</strong> ${getFormValue('lname')}</p>
        <p><strong>Email Address:</strong> ${getFormValue('email')}</p>
        <p><strong>Mobile Number:</strong> ${getFormValue('phone')}</p>
        <p><strong>Business Name:</strong> ${getFormValue('orgname')}</p>
        <p><strong>Submitted On:</strong> ${new Date(getFormValue('timestamp')).toLocaleString('en-NG')}</p>
    `;
}

// Global "Last Modified" for the footer
const lastModif = document.querySelector("#lastModified");
if (lastModif) {
    lastModif.textContent = document.lastModified;
}