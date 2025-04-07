const apiKey = "f54dc75a617a4e90a98122404250104";
const cities = [
    { name: "Luxembourg", id: "luxembourg-weather" },
    { name: "Cancun", id: "cancun-weather" },
    { name: "Seychelles", id: "seychelles-weather" },
    { name: "Paris", id: "paris-weather" },
    { name: "Milan", id: "milan-weather" }
];

    document.addEventListener("DOMContentLoaded", () => {
        const themeToggle = document.getElementById("theme-toggle");
        const sunIcon = document.getElementById("sun-icon");
        const moonIcon = document.getElementById("moon-icon");
        const htmlElement = document.documentElement;

        if (localStorage.getItem("theme") === "dark") {
            htmlElement.classList.add("dark");
            sunIcon.classList.remove("hidden"); //Display the sun
            moonIcon.classList.add("hidden");  //Remove the moon
        } else {
            htmlElement.classList.remove("dark");
            sunIcon.classList.add("hidden"); //Remove the sun
            moonIcon.classList.remove("hidden"); //Display the moon
        }

        themeToggle.addEventListener("click", () => {
            htmlElement.classList.toggle("dark");

            if (htmlElement.classList.contains("dark")) {
                localStorage.setItem("theme", "dark");
                sunIcon.classList.remove("hidden");
                moonIcon.classList.add("hidden");
            } else {
                localStorage.setItem("theme", "light");
                sunIcon.classList.add("hidden");
                moonIcon.classList.remove("hidden");
            }
    });

    //async to wait API datas
    async function getWeather(city, elementId, days = 3) {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no&alerts=no`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.error) {
                document.getElementById(elementId).innerText = "Erreur de données météo";
                return;
            }

            const temperature = data.current.temp_c;
            const humidity = data.current.humidity;
            const precipitation = data.current.precip_mm;
            const rainChance = data.forecast.forecastday[0].day.daily_chance_of_rain;

            let emoji = "";
            if (temperature <= 0) emoji = "❄️";
            else if (temperature <= 10) emoji = "🥶";
            else if (temperature <= 20) emoji = "🙂";
            else if (temperature <= 30) emoji = "😎";
            else emoji = "🥵";

            document.getElementById(elementId).innerHTML = `
                <span class="text-2xl">${emoji}</span><br>
                🌡️ ${temperature}°C<br>
                💧 ${humidity}%<br>
                🌧️ ${precipitation} mm<br>
                📈 ${rainChance}% probability of rain
            `;
        } catch (error) {
            console.error("Erreur :", error);
            document.getElementById(elementId).innerText = "Erreur météo";
        }
    }
    
    cities.forEach(city => getWeather(city.name, city.id));
});
