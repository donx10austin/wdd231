// weather.js - Fetches Lagos weather data
const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API Key
const city = 'Lagos';

async function fetchWeather() {
    const weatherElement = document.querySelector('#weather-info');
    if (!weatherElement) return;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();

        if (data.main) {
            const temp = Math.round(data.main.temp);
            const desc = data.weather[0].description;
            const icon = data.weather[0].icon;

            weatherElement.innerHTML = `
                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon" style="vertical-align: middle;">
                <span>Lagos: <strong>${temp}°C</strong>, ${desc}</span>
            `;
        }
    } catch (error) {
        console.error("Weather fetch failed:", error);
        weatherElement.textContent = "Weather currently unavailable";
    }
}

document.addEventListener('DOMContentLoaded', fetchWeather);