const weatherContainer = document.querySelector('#weather-info');

// Only run if the container exists on the page
if (weatherContainer) {
    const forecastContainer = document.createElement('div');
    forecastContainer.id = 'forecast-info';
    weatherContainer.insertAdjacentElement('afterend', forecastContainer);

    // Coordinates for Lagos, Nigeria
    const lat = 6.45;
    const lon = 3.40;
    const apiKey = 'YOUR_API_KEY'; // MUST replace this with your actual key

    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    async function getWeatherData() {
        try {
            const response = await fetch(currentUrl);
            if (!response.ok) throw new Error("Current weather failed");
            const data = await response.json();
            displayCurrentWeather(data);

            const fResponse = await fetch(forecastUrl);
            if (!fResponse.ok) throw new Error("Forecast failed");
            const fData = await fResponse.json();
            displayForecast(fData);
        } catch (error) {
            console.error("Weather error:", error);
            weatherContainer.innerHTML = "<p>Weather data unavailable.</p>";
        }
    }

    function displayCurrentWeather(data) {
        const temp = data.main.temp.toFixed(0);
        const desc = data.weather[0].description;
        const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherContainer.innerHTML = `
            <div class="weather-current card">
                <div class="card-header">Current Weather</div>
                <div class="card-body">
                    <img src="${iconSrc}" alt="${desc}">
                    <p class="temp"><strong>${temp}°C</strong></p>
                    <p class="desc">${desc.toUpperCase()}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                </div>
            </div>
        `;
    }

    function displayForecast(data) {
        // Filter for noon readings for the next 3 days
        const dailyForecast = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
        
        forecastContainer.innerHTML = `
            <div class="card">
                <div class="card-header">3-Day Forecast</div>
                <div class="card-body forecast-grid"></div>
            </div>`;
        
        const grid = forecastContainer.querySelector('.forecast-grid');

        dailyForecast.forEach(day => {
            const date = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short' });
            const temp = day.main.temp.toFixed(0);
            
            const dayDiv = document.createElement('div');
            dayDiv.className = "forecast-day";
            dayDiv.innerHTML = `
                <p><strong>${date}</strong></p>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="icon">
                <p>${temp}°C</p>
            `;
            grid.appendChild(dayDiv);
        });
    }

    getWeatherData();
}