// Get the full URL
const currentUrl = window.location.href;

// Split the URL to get only the parameters after the '?'
const everything = currentUrl.split('?');

if (everything.length > 1) {
    const formData = everything[1].split('&');

    // Function to extract and display data
    function show(key) {
        formData.forEach((element) => {
            if (element.startsWith(key)) {
                // Get the value after the '='
                let value = element.split('=')[1];
                // Decode URL characters (like %40 for @) and replace + with spaces
                value = decodeURIComponent(value).replace(/\+/g, ' ');
                // Place it in the correct span
                document.getElementById(`res-${key}`).textContent = value;
            }
        });
    }

    // Call the function for each field in your form
    show("fname");
    show("lname");
    show("email");
    show("phone");
    show("orgname");
    show("timestamp");
}