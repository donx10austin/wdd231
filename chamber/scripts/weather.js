const weatherContainer = document.querySelector('#weather-info');

// Lagos, Nigeria Coordinates or City ID
const lat = 6.45;
const lon = 3.40;
const apiKey = 'YOUR_OPENWEATHER_API_KEY'; // Replace with your actual key
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function apiFetch() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
        weatherContainer.innerHTML = `<p class="error">Unable to load weather data.</p>`;
    }
}

function displayWeather(data) {
    const temp = data.main.temp.toFixed(0);
    const desc = data.weather[0].description;
    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherContainer.innerHTML = `
        <div class="weather-display">
            <img src="${iconSrc}" alt="${desc}" class="weather-icon">
            <div class="weather-stats">
                <p class="temp">${temp}°C</p>
                <p class="desc">${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
                <p class="humidity">Humidity: ${data.main.humidity}%</p>
            </div>
        </div>
    `;
}

apiFetch();