// 1. Get the full URL from the browser
const currentUrl = window.location.href;

// 2. Split the URL to get only the data after the '?'
const everything = currentUrl.split('?');

// 3. If there is data to process...
if (everything.length > 1) {
    // Split the string into an array of "key=value" pairs
    const formData = everything[1].split('&');

    // Helper function to extract and clean values based on the 'name' attribute
    function getFormValue(key) {
        let value = "";
        formData.forEach((element) => {
            if (element.startsWith(key)) {
                // Decode symbols like %40 (@) and replace '+' with spaces
                value = decodeURIComponent(element.split('=')[1]);
                value = value.replace(/\+/g, ' ');
            }
        });
        return value;
    }

    // 4. Target the 'results' div in thankyou.html
    const resultsContainer = document.querySelector('#results');

    if (resultsContainer) {
        // Build the HTML output using your form's specific 'name' attributes
        resultsContainer.innerHTML = `
            <div class="summary-item">
                <p><strong>Full Name:</strong> ${getFormValue('fname')} ${getFormValue('lname')}</p>
                <p><strong>Email:</strong> ${getFormValue('email')}</p>
                <p><strong>Phone:</strong> ${getFormValue('phone')}</p>
                <p><strong>Organization:</strong> ${getFormValue('orgname')}</p>
                <p><strong>Membership Tier:</strong> ${getFormValue('membership').toUpperCase()}</p>
                <p><strong>Date Submitted:</strong> ${new Date(getFormValue('timestamp')).toLocaleString('en-NG')}</p>
            </div>
        `;
    }
}

// 5. Global Footer Logic (Last Modified)
const lastModif = document.querySelector("#lastModified");
if (lastModif) {
    lastModif.textContent = document.lastModified;
}