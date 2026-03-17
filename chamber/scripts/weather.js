// Select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#weather-desc');
const forecastContainer = document.querySelector('#forecast-container');

// API URL - Using Lagos, Nigeria coordinates (Lat: 6.52, Lon: 3.37)
const key = 'YOUR_API_KEY'; 
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=6.52&lon=3.37&units=metric&appid=${key}`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // Testing purposes
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    // 1. Current Weather Logic
    const currentData = data.list[0];
    currentTemp.innerHTML = `${Math.round(currentData.main.temp)}&deg;C`;
    
    // Icon and Description
    const iconsrc = `https://openweathermap.org/img/w/${currentData.weather[0].icon}.png`;
    let desc = currentData.weather[0].description;
    
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);

    // 2. 3-Day Forecast Logic
    // We filter the list to find timestamps for 12:00:00 (midday) to get a consistent daily reading
    const dailyForecast = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
    
    forecastContainer.innerHTML = ""; // Clear placeholders

    dailyForecast.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temp = Math.round(day.main.temp);

        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-day';
        forecastCard.innerHTML = `
            <span>${dayName}:</span>
            <strong>${temp}&deg;C</strong>
        `;
        forecastContainer.appendChild(forecastCard);
    });
}

apiFetch();