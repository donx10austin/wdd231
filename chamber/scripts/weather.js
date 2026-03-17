// --- CONFIGURATION ---
const apiKey = "YOUR_OPENWEATHERMAP_API_KEY_HERE"; // Replace with your actual API key
const city = "Lagos";
const countryCode = "NG";
const units = "metric"; // For Celsius

// API URLs
const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=${units}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&units=${units}&appid=${apiKey}`;

async function fetchWeather() {
    try {
        // 1. Fetch Current Weather
        const response = await fetch(currentUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        } else {
            throw Error(await response.text());
        }

        // 2. Fetch Forecast
        const forecastResponse = await fetch(forecastUrl);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        }

    } catch (error) {
        console.error("Weather Error:", error);
    }
}

function displayCurrentWeather(data) {
    const currentTemp = document.querySelector('#current-temp');
    const weatherDesc = document.querySelector('#weather-desc');
    const weatherIcon = document.querySelector('#weather-icon');

    currentTemp.innerHTML = `${Math.round(data.main.temp)}`;
    
    // Capitalize first letter of description
    const desc = data.weather[0].description;
    weatherDesc.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);

    // Update Icon
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
}

function displayForecast(data) {
    // The forecast API returns data every 3 hours. 
    // We want to grab one snapshot per day (roughly at noon).
    const dailyForecast = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    // Map to your HTML IDs
    if (dailyForecast[0]) document.querySelector('#day1').textContent = Math.round(dailyForecast[0].main.temp);
    if (dailyForecast[1]) document.querySelector('#day2').textContent = Math.round(dailyForecast[1].main.temp);
    if (dailyForecast[2]) document.querySelector('#day3').textContent = Math.round(dailyForecast[2].main.temp);
}

// Initialize
fetchWeather();