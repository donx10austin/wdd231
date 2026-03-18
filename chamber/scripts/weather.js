// --- WEATHER.JS ---
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#weather-desc');

// Lagos Coordinates (LCCI Headquarters Area)
const lat = 6.45; 
const lon = 3.39;
const apiKey = 'YOUR_API_KEY'; // <--- Replace this with your actual OpenWeatherMap Key!

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function apiFetch() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data); // Sends the data to the display function
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Weather data failed to load:", error);
    }
}

function displayWeather(data) {
    // Round temperature and add the Celsius symbol
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
    
    // Set the weather icon image source and alt text
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    
    // Set the description in uppercase for a professional look
    captionDesc.textContent = desc.toUpperCase();
}

apiFetch();