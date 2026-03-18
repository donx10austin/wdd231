// --- WEATHER.JS ---
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#weather-desc');

// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API Key
const apiKey = 'YOUR_API_KEY'; 
const lat = '6.45'; // Latitude for Lagos
const lon = '3.39'; // Longitude for Lagos
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

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
        console.error(error);
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc.toUpperCase();
}

apiFetch();