// scripts/main.js

// --- Footer Date Handlers ---
function setFooterDates() {
    const currentYear = new Date().getFullYear();
    const currentYearElement = document.querySelector('#currentyear');
    if (currentYearElement) {
        currentYearElement.textContent = currentYear;
    }

    const lastMod = document.lastModified;
    const lastModifiedElement = document.querySelector('#lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last Modified: ${lastMod}`;
    }
}

// --- Weather API Integration ---
const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your actual API key
const city = 'Lagos,NG';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error('Weather data fetch failed');
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.error(error);
    }
}

function displayCurrentWeather(data) {
    document.querySelector('#current-temp').textContent = Math.round(data.main.temp);
    document.querySelector('#weather-desc').textContent = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const iconElement = document.querySelector('#weather-icon');
    iconElement.src = iconUrl;
    iconElement.alt = data.weather[0].description;
}

async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) throw new Error('Forecast data fetch failed');
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error(error);
    }
}

function displayForecast(data) {
    const forecastList = document.querySelector('#forecast-list');
    forecastList.innerHTML = ''; // Clear existing content

    // Filter to get one forecast per day (e.g., at 12:00:00)
    const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    dailyData.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);
        const desc = day.weather[0].description;

        const li = document.createElement('li');
        li.innerHTML = `
            <span class="forecast-day">${dayName}:</span>
            <span class="forecast-temp">${temp}°F</span>,
            <span class="forecast-desc">${desc}</span>
        `;
        forecastList.appendChild(li);
    });
}

// --- Member Spotlight ---
const membersUrl = 'data/members.json';

async function fetchSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error('Member data fetch failed');
        const data = await response.json();
        displaySpotlights(data.members);
    } catch (error) {
        console.error(error);
    }
}

function displaySpotlights(members) {
    const spotlightContainer = document.querySelector('#spotlight-container');
    spotlightContainer.innerHTML = ''; // Clear placeholders

    // Filter for Gold or Silver members
    const eligibleMembers = members.filter(member => 
        member.membership === 'Gold' || member.membership === 'Silver'
    );

    // Randomly select 2 or 3 members
    const numberOfSpotlights = Math.floor(Math.random() * 2) + 2; // Generates 2 or 3
    const shuffledMembers = eligibleMembers.sort(() => 0.5 - Math.random());
    const selectedMembers = shuffledMembers.slice(0, numberOfSpotlights);

    selectedMembers.forEach(member => {
        const card = document.createElement('section');
        card.className = 'member-card spotlight-card';
        card.innerHTML = `
            <img src="${member.image}" alt="Logo for ${member.name}" class="member-logo" loading="lazy">
            <h4>${member.name}</h4>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><strong>Membership Level:</strong> ${member.membership}</p>
            <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
        `;
        spotlightContainer.appendChild(card);
    });
}

// --- Initialization ---
window.addEventListener('load', () => {
    setFooterDates();
    fetchWeather();
    fetchForecast();
    fetchSpotlights();
});