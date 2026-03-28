/* =============================================
   WEATHER & 3-DAY FORECAST API (Lagos, Nigeria)
   ============================================= */
const weatherContainer = document.querySelector('#weather-info');
const forecastGrid = document.querySelector('.forecast-grid');

// Safety Check: Only run if the weather container exists on the page
if (weatherContainer) {
    // 1. Configuration
    const lat = 6.45;
    const lon = 3.40;
    const apiKey = 'YOUR_ACTUAL_API_KEY'; // Replace this with your OpenWeatherMap Key
    
    // Using the 5-day/3-hour forecast URL to get both current and future data
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    async function getWeatherData() {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Weather API failed to respond.");
            const data = await response.json();
            
            // Execute display functions
            displayCurrentWeather(data);
            displayForecast(data);
        } catch (error) {
            console.error("Weather error:", error);
            weatherContainer.innerHTML = "<p>Weather data currently unavailable.</p>";
        }
    }

   function displayCurrentWeather(data) {
    // 1. Extract the data
    const current = data.list[0];
    const temp = Math.round(current.main.temp);
    const desc = current.weather[0].description;
    const humidity = current.main.humidity;
    const iconSrc = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;

    // 2. Inject the HTML
    // This replaces the "Loading weather..." text and the --°C with real data
    weatherContainer.innerHTML = `
        <div class="weather-current">
            <figure>
                <img src="${iconSrc}" alt="${desc}" id="weather-icon">
                <figcaption id="weather-desc">${desc.toUpperCase()}</figcaption>
            </figure>
            <p class="temp"><strong>${temp}°C</strong></p>
            <p class="humidity">Humidity: ${humidity}%</p>
        </div>
    `;
}

    function displayForecast(data) {
        if (!forecastGrid) return;

        // Filter for 12:00 PM readings to get consistent daily temps
        // .slice(1, 4) skips today and takes the next 3 days
        const dailyForecast = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(1, 4);
        
        forecastGrid.innerHTML = ""; // Clear "Loading..." placeholder

        dailyForecast.forEach(day => {
            const date = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
            const temp = Math.round(day.main.temp);
            const icon = day.weather[0].icon;
            const desc = day.weather[0].description;
            
            const dayDiv = document.createElement('div');
            dayDiv.className = "forecast-day";
            dayDiv.innerHTML = `
                <p><strong>${date}</strong></p>
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}">
                <p>${temp}°C</p>`;
            forecastGrid.appendChild(dayDiv);
        });
    }

    getWeatherData();
}