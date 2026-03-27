/* =============================
   WEATHER & FORECAST API
   ============================= */
const weatherContainer = document.querySelector('#weather-info');

if (weatherContainer) {
    // 1. Setup Elements
    const forecastContainer = document.createElement('div');
    forecastContainer.id = 'forecast-info';
    weatherContainer.insertAdjacentElement('afterend', forecastContainer);

    // 2. Configuration (Lagos, Nigeria)
    const lat = 6.45;
    const lon = 3.40;
    const apiKey = 'YOUR_ACTUAL_API_KEY'; // Replace this!
    
    // We only need the Forecast URL because it contains CURRENT weather too!
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    async function getWeatherData() {
        try {
            const response = await fetch(forecastUrl);
            if (!response.ok) throw new Error("Weather API failed");
            const data = await response.json();
            
            // Call both display functions with the same data
            displayCurrentWeather(data);
            displayForecast(data);
        } catch (error) {
            console.error("Weather error:", error);
            weatherContainer.innerHTML = "<p>Weather data currently unavailable.</p>";
        }
    }

    function displayCurrentWeather(data) {
        const current = data.list[0]; // The very first entry is the current time
        const temp = current.main.temp.toFixed(0);
        const desc = current.weather[0].description;
        const iconSrc = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;

        weatherContainer.innerHTML = `
            <div class="weather-current card">
                <div class="card-header">Current Weather</div>
                <div class="card-body">
                    <img src="${iconSrc}" alt="${desc}">
                    <p class="temp"><strong>${temp}°C</strong></p>
                    <p class="desc">${desc.toUpperCase()}</p>
                    <p>Humidity: ${current.main.humidity}%</p>
                </div>
            </div>`;
    }

    function displayForecast(data) {
        // Filter for 12:00 PM readings for the next 3 days
        const dailyForecast = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
        
        forecastContainer.innerHTML = `
            <div class="card">
                <div class="card-header">3-Day Forecast</div>
                <div class="card-body forecast-grid"></div>
            </div>`;
        
        const grid = forecastContainer.querySelector('.forecast-grid');

        dailyForecast.forEach(day => {
            const date = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
            const temp = day.main.temp.toFixed(0);
            
            const dayDiv = document.createElement('div');
            dayDiv.className = "forecast-day";
            dayDiv.innerHTML = `
                <p><strong>${date}</strong></p>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="icon">
                <p>${temp}°C</p>`;
            grid.appendChild(dayDiv);
        });
    }

    getWeatherData();
}