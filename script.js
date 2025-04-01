// API Key WeatherAPI
const apiKey = "f54dc75a617a4e90a98122404250104";

// Fonction pour obtenir la météo
async function getWeather(city, elementId) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const temperature = data.current.temp_c;

        // Affichage de la météo
        displayWeather(elementId, temperature);
    } catch (error) {
        console.error("Erreur lors de la récupération de la météo:", error);
    }
}

// Fonction pour afficher la météo et les icônes
function displayWeather(elementId, temperature) {
    const weatherDiv = document.getElementById(elementId);
    let icon = "";
    let description = "";

    if (temperature >= 30) {
        icon = "🔥"; // Flamme
        description = `Température: ${temperature}°C - Très chaud !`;
    } else if (temperature >= 21) {
        icon = "☀️"; // Grand soleil
        description = `Température: ${temperature}°C - Ensoleillé !`;
    } else if (temperature >= 6) {
        icon = "🌤️"; // Petit soleil
        description = `Température: ${temperature}°C - Agréable !`;
    } else if (temperature >= 0) {
        icon = "❄️"; // Neige
        description = `Température: ${temperature}°C - Froid !`;
    }

    weatherDiv.innerHTML = `
        <span class="text-4xl">${icon}</span>
        <p>${description}</p>
    `;
}

// Charger la météo
getWeather("Luxembourg", "luxembourg-weather");
getWeather("Cancun", "cancun-weather");
getWeather("Seychelles", "seychelles-weather");