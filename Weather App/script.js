document.getElementById("location-input").addEventListener('change', async () => {
    const location = document.getElementById("location-input").value;

    const weatherData = await getWeatherData(location);

    // pentru afisarea datelor
    displayWeatherData(weatherData);
});

const getWeatherData = async (location) => {
    if (!location) {
        return {};
    }

    const apiKey = "847ce9489bb1d29dd7044ff469a574d7";
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
    const data = await response.json();
    return data;
};

// pt schimbarea culorilor in functie de temperatura
function getBackgroundColor(temperature) {
    if (temperature < 0) {
        return 'lightblue';
    } else if (temperature < 10) {
        return 'lightgreen';
    } else if (temperature < 20) {
        return 'lightyellow';
    } else if (temperature < 30) {
        return 'lightsalmon';
    } else {
        return 'lightcoral';
    }
}

const displayWeatherData = (data) => {
    const weatherDataElement = document.getElementById("weather-data");
    if (Object.keys(data).length === 0) {
        weatherDataElement.innerHTML = "Introduceți o locație pentru a vedea vremea.";
    } else {
        const backgroundColor = getBackgroundColor(Math.floor(data.main.temp - 273.15));
        weatherDataElement.style.backgroundColor = backgroundColor;

        weatherDataElement.innerHTML = `
            <h3>${data.name}</h3>
            <p>Temperatura: ${Math.floor(data.main.temp - 273.15)}°C</p>
        `;
    }
};
