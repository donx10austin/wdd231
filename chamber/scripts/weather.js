const apiKey = 'YOUR_API_KEY_HERE';
const city = 'Lagos';

async function fetchWeather() {
    const weatherEl = document.querySelector('#weather-info');
    if (!weatherEl) return;

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        const data = await response.json();

        if (!data.main) return;

        weatherEl.innerHTML = `
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png"
                 alt="Weather icon">
            <span>Lagos: <strong>${Math.round(data.main.temp)}°C</strong>,
            ${data.weather[0].description}</span>
        `;
    } catch {
        weatherEl.textContent = "Weather currently unavailable.";
    }
}

document.addEventListener('DOMContentLoaded', fetchWeather);