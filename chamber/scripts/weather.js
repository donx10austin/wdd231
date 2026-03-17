const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const forecastContainer = document.querySelector('#forecast');

// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const url = 'https://api.openweathermap.org/data/2.5/forecast?lat=6.52&lon=3.37&units=metric&appid=YOUR_API_KEY';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    // Current Weather (First item in the list)
    currentTemp.innerHTML = `${Math.round(data.list[0].main.temp)}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
    let desc = data.list[0].weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc.toUpperCase();

    // 3-Day Forecast (Fetching mid-day temps for the next 3 days)
    const dailyForecast = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
    
    forecastContainer.innerHTML = ""; // Clear placeholder
    dailyForecast.forEach(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString('en-US', {weekday: 'short'});
        const temp = Math.round(day.main.temp);
        const html = `<p>${date}: <strong>${temp}&deg;C</strong></p>`;
        forecastContainer.innerHTML += html;
    });
}

apiFetch();