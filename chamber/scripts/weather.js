// Define the coordinates and your API Key
const lat = 6.45;
const lon = 3.40;
const apiKey = 'YOUR_API_KEY'; // REPLACE THIS WITH YOUR ACTUAL KEY

async function getWeather() {
    // 1. URLs for both Current and Forecast
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try {
        // 2. Fetch Current Weather
        const responseCurrent = await fetch(currentUrl);
        if (responseCurrent.ok) {
            const currentData = await responseCurrent.json();
            displayCurrentWeather(currentData);
        } else {
            throw new Error(await responseCurrent.text());
        }

        // 3. Fetch 3-Day Forecast
        const responseForecast = await fetch(forecastUrl);
        if (responseForecast.ok) {
            const forecastData = await responseForecast.json();
            // Filter for midday readings to get 3 distinct days
            const threeDayForecast = forecastData.list
                .filter(item => item.dt_txt.includes("12:00:00"))
                .slice(0, 3);
            
            displayForecast(threeDayForecast);
        }

    } catch (error) {
        console.error("Weather Error:", error);
        document.querySelector('#weather-info').textContent = "Unable to load weather data.";
    }
}

function displayCurrentWeather(data) {
    const weatherInfo = document.querySelector('#weather-info');
    const temp = data.main.temp.toFixed(0);
    const desc = data.weather[0].description;
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    // Overwrites "Loading current weather..."
    weatherInfo.innerHTML = `
        <div class="current-weather-display">
            <img src="${icon}" alt="${desc}">
            <p><strong>${temp}°C</strong> - ${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
            <p>Humidity: ${data.main.humidity}%</p>
        </div>
    `;
}

function displayForecast(forecastList) {
    const forecastContainer = document.querySelector('#forecast-info');
    forecastContainer.innerHTML = "<h4>3-Day Forecast</h4>"; // Clear and add header

    forecastList.forEach(day => {
        const date = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short' });
        const temp = day.main.temp.toFixed(0);
        const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

        const dayDiv = document.createElement('div');
        dayDiv.className = 'forecast-day';
        dayDiv.innerHTML = `
            <span>${date}</span>
            <img src="${icon}" alt="weather icon" style="width:30px;">
            <strong>${temp}°C</strong>
        `;
        forecastContainer.appendChild(dayDiv);
    });
}

// 4. IMPORTANT: Call the function to start the process
getWeather();