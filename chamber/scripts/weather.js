const currentTemp = document.querySelector('#weather-info');
const weatherIcon = document.createElement('img'); // For the weather icon
const captionDesc = document.createElement('span');

// 1. API URL (Lagos, Nigeria)
const url = 'https://api.openweathermap.org/data/2.5/weather?q=Lagos,NG&units=metric&appid=YOUR_API_KEY';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
        currentTemp.textContent = "Weather unavailable";
    }
}

function displayResults(data) {
    // Format temperature to 0 decimal places
    currentTemp.innerHTML = `<strong>${data.main.temp.toFixed(0)}°C</strong> - `;
    
    // Get description and capitalize each word
    const desc = data.weather[0].description;
    const capitalizedDesc = desc.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    // Icon Setup
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', capitalizedDesc);
    
    captionDesc.textContent = capitalizedDesc;
    
    // Append to the container
    currentTemp.appendChild(weatherIcon);
    currentTemp.appendChild(captionDesc);
}

apiFetch();