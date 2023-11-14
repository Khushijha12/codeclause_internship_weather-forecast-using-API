function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "579f932899357c43ec389f39ee15e911";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById("weather-info");
            weatherInfo.classList.remove("error");
            if (data.cod === 200) {
                const temperature = data.main.temp;
                const description = data.weather[0].description;
                weatherInfo.textContent = `Temperature: ${temperature}°C, Description: ${description}`;
                
                // Dynamically style based on weather conditions
                if (description.includes("rain")) {
                    weatherInfo.style.color = "blue";
                } else if (description.includes("cloud")) {
                    weatherInfo.style.color = "gray";
                } else if (description.includes("clear")) {
                    weatherInfo.style.color = "yellow";
                } else {
                    weatherInfo.style.color = "black";
                }
            } else {
                weatherInfo.textContent = `City not found. Please try again.`;
                weatherInfo.classList.add("error");
            }
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            const weatherInfo = document.getElementById("weather-info");
            weatherInfo.textContent = `Error fetching data. Please try again later.`;
            weatherInfo.classList.add("error");
        });
}
