document.addEventListener("DOMContentLoaded", () => {
    // 🌙 Gestion du Dark Mode
    const themeToggle = document.getElementById("theme-toggle");

    // Vérifie si un thème est stocké et applique-le
    if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("dark");
    }

    // Événement sur le bouton pour basculer le mode
    themeToggle.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");

        // Sauvegarde le mode choisi
        if (document.documentElement.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });

    // 🚀 Fonction pour récupérer la météo de n'importe quelle ville
    const apiKey = "f54dc75a617a4e90a98122404250104";

    async function getWeather(city, elementId) {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.error) {
                document.getElementById(elementId).innerText = "Erreur météo";
                return;
            }

            const temperature = data.current.temp_c;

            // Mise à jour de l'élément HTML avec la température
            document.getElementById(elementId).innerHTML = `${temperature}°C`;
        } catch (error) {
            console.error("Erreur lors de la récupération des données météo :", error);
            document.getElementById(elementId).innerText = "Impossible de récupérer la météo.";
        }
    }

    // 🚀 Charger la météo pour toutes les villes
    getWeather("Luxembourg", "luxembourg-weather");
    getWeather("Cancun", "cancun-weather");
    getWeather("Seychelles", "seychelles-weather");
    getWeather("Paris", "paris-weather");
    getWeather("Milan", "milan-weather");
});
