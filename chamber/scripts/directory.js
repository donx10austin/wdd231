// scripts/main.js

// --- Footer Date and Modified Handler (Robust Interaction) ---
function setFooterDates() {
    const currentYear = new Date().getFullYear();
    const currentYearElement = document.querySelector('#currentyear');
    if (currentYearElement) {
        currentYearElement.textContent = currentYear;
    }

    const lastMod = document.lastModified;
    const lastModifiedElement = document.querySelector('#lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last Modified: ${lastMod}`;
    }
}

// --- Weather API Integration (Dynamic Data Concept) ---
const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // REQUIRED: Replace with a valid key for standard dynamic results
const city = 'Lagos,NG';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error('Current weather data fetch failed');
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.error(error);
    }
}

function displayCurrentWeather(data) {
    document.querySelector('#current-temp').textContent = Math.round(data.main.temp);
    
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const iconElement = document.querySelector('#weather-icon');
    iconElement.src = iconUrl;
    iconElement.alt = data.weather[0].description;
}

async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) throw new Error('Forecast data fetch failed');
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error(error);
    }
}

function displayForecast(data) {
    const forecastList = document.querySelector('#forecast-list');
    forecastList.innerHTML = ''; // Clear placeholders

    // Filter to get one forecast per day at a logical time (12:00:00)
    const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    dailyData.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);

        const li = document.createElement('li');
        li.innerHTML = `
            <span class="forecast-day">${dayName}:</span>
            <span class="forecast-temp">${temp}°F</span>
        `;
        forecastList.appendChild(li);
    });
}

// --- Initialization ---
window.addEventListener('load', () => {
    setFooterDates();
    fetchWeather();
    fetchForecast();
});