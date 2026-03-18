// Example of the 3-day forecast logic
async function getWeather() {
    // Current Weather
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=6.45&lon=3.40&units=metric&appid=YOUR_API_KEY`;
    
    // 3-Day Forecast (Requires the 'forecast' endpoint)
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=6.45&lon=3.40&units=metric&appid=YOUR_API_KEY`;

    try {
        const response = await fetch(forecastUrl);
        const data = await response.json();

        // The 'forecast' API gives data every 3 hours. 
        // To get 3 distinct days, you usually filter for a specific time (like 12:00 PM).
        const threeDayForecast = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
        
        displayForecast(threeDayForecast);
    } catch (error) {
        console.error(error);
    }
}