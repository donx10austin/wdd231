/* =============================
   WEATHER & 3-DAY FORECAST API
   ============================= */
const weatherContainer = document.querySelector('#weather-info');
const forecastGrid = document.querySelector('.forecast-grid');

if (weatherContainer) {
    // 1. Configuration (Lagos, Nigeria)
    const lat = 6.45;
    const lon = 3.40;
    const apiKey = 'YOUR_ACTUAL_API_KEY'; // Replace with your real OpenWeatherMap Key
    
    // Using the 5-day/3-hour forecast URL
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    async function getWeatherData() {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Weather API failed to respond.");
            const data = await response.json();
            
            // Execute both displays using the same data object
            displayCurrentWeather(data);
            displayForecast(data);
        } catch (error) {
            console.error("Weather error:", error);
            weatherContainer.innerHTML = "<p>Weather data currently unavailable.</p>";
        }
    }

    function displayCurrentWeather(data) {
        // The first item in the 'list' array is the closest to the current time
        const current = data.list[0]; 
        const temp = Math.round(current.main.temp);
        const desc = current.weather[0].description;
        const iconSrc = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;

        weatherContainer.innerHTML = `
            <div class="weather-current">
                <img src="${iconSrc}" alt="${desc}">
                <p class="temp"><strong>${temp}°C</strong></p>
                <p class="desc">${desc.toUpperCase()}</p>
                <p>Humidity: ${current.main.humidity}%</p>
            </div>`;
    }

    function displayForecast(data) {
        if (!forecastGrid) return;

        // Filter: Find readings for 12:00 PM (noon) to get a consistent daily temperature
        // We take 3 days starting from tomorrow
        const dailyForecast = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(1, 4);
        
        forecastGrid.innerHTML = ""; // Clear any placeholders

        dailyForecast.forEach(day => {
            const date = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
            const temp = Math.round(day.main.temp);
            const icon = day.weather[0].icon;
            
            const dayDiv = document.createElement('div');
            dayDiv.className = "forecast-day";
            dayDiv.innerHTML = `
                <p><strong>${date}</strong></p>
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="forecast icon">
                <p>${temp}°C</p>`;
            forecastGrid.appendChild(dayDiv);
        });
    }

    getWeatherData();
}