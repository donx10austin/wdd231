// FOOTER DATE
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;


// WEATHER (Replace with your API key)
const apiKey = "YOUR_API_KEY";

const url = `https://api.openweathermap.org/data/2.5/weather?q=Lagos&units=imperial&appid=${apiKey}`;

fetch(url)
.then(res => res.json())
.then(data => {
  document.getElementById("current-temp").textContent = Math.round(data.main.temp);

  const icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  document.getElementById("weather-icon").src = icon;
});