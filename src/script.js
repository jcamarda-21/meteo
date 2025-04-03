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


    async function getWeather(city, elementId) {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.error) {
                document.getElementById(elementId).innerText = "Error loading data";
                return;
            }

            const temperature = data.current.temp_c;

            document.getElementById(elementId).innerHTML = `${temperature}°C`;
        } catch (error) {
            console.error("Error :", error);
            document.getElementById(elementId).innerText = "Error";
        }
    }

    cities.forEach(city => getWeather(city.name, city.id));
});
