const weatherContainer = document.querySelector('#weather-info');
const forecastContainer = document.createElement('div');
forecastContainer.id = 'forecast-info';
weatherContainer.after(forecastContainer);

const lat = 6.45;
const lon = 3.40;
const apiKey = 'YOUR_API_KEY'; // Replace with your actual key

// URLs for Current and Forecast data
const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeatherData() {
    try {
        // Fetch Current Weather
        const response = await fetch(currentUrl);
        const data = await response.json();
        displayCurrentWeather(data);

        // Fetch Forecast
        const fResponse = await fetch(forecastUrl);
        const fData = await fResponse.json();
        displayForecast(fData);
    } catch (error) {
        console.error("Weather error:", error);
    }
}

function displayCurrentWeather(data) {
    const temp = data.main.temp.toFixed(0);
    const desc = data.weather[0].description;
    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherContainer.innerHTML = `
        <div class="weather-current">
            <img src="${iconSrc}" alt="${desc}">
            <div>
                <p class="temp">${temp}°C</p>
                <p class="desc">${desc}</p>
                <p>Humidity: ${data.main.humidity}%</p>
            </div>
        </div>
    `;
}

function displayForecast(data) {
    // Filter to get one reading per day (at 12:00 PM) for the next 3 days
    const dailyForecast = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
    
    forecastContainer.innerHTML = `<h3>3-Day Forecast</h3><div class="forecast-grid"></div>`;
    const grid = forecastContainer.querySelector('.forecast-grid');

    dailyForecast.forEach(day => {
        const date = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short' });
        const temp = day.main.temp.toFixed(0);
        
        grid.innerHTML += `
            <div class="forecast-day">
                <p><strong>${date}</strong></p>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="icon">
                <p>${temp}°C</p>
            </div>
        `;
    });
}

getWeatherData();