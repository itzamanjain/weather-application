const input = document.querySelector(".input-box");
const button = document.querySelector("#btn");
const modes = document.querySelector("#modes");
const temp = document.querySelector(".temp");
const desk = document.querySelector(".desk");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#windspeed");
const cityName = document.querySelector(".city-name");
const forecastContainer = document.querySelector("#forecast-container");

const api = "db7b9870eacc516d761e8e26e4d404bd";

const checkWeather = async (city) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;
    const weatherData = await fetch(weatherUrl).then(response => response.json());

    temp.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
    desk.innerHTML = weatherData.weather[0].description;
    humidity.innerHTML = `${weatherData.main.humidity}%`;
    wind.innerHTML = `${weatherData.wind.speed}km/H`;
    cityName.innerHTML = weatherData.name;

    switch (weatherData.weather[0].main) {
        case "Clouds":
            modes.src = "assest/clouds.png";
            break;
        case "Clear":
            modes.src = "assest/clear.png";
            break;
        case "Rain":
            modes.src = "assest/rain.png";
            break;
        case "Snow":
            modes.src = "assest/snow.png";
            break;
        case "Mist":
            modes.src = "assest/mist.png";
            break;
    }

    fetchForecast(city);
};

const fetchForecast = async (city) => {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}`;
    const forecastData = await fetch(forecastUrl).then(response => response.json());
    const dailyForecast = forecastData.list.filter(forecast => forecast.dt_txt.includes("12:00:00"));

    forecastContainer.innerHTML = ""; // Clear previous forecast
    dailyForecast.forEach(day => {
        const forecastDate = new Date(day.dt_txt).toLocaleDateString();
        const forecastTemp = `${Math.round(day.main.temp - 273.15)}°C`;
        const forecastDesc = day.weather[0].description;
        const forecastIcon = day.weather[0].icon;

        const forecastElement = document.createElement("div");
        forecastElement.classList.add("forecast-day");

        forecastElement.innerHTML = `
            <h3>${forecastDate}</h3>
            <img src="http://openweathermap.org/img/wn/${forecastIcon}.png" alt="${forecastDesc}">
            <p>${forecastTemp}</p>
            <p>${forecastDesc}</p>
        `;

        forecastContainer.appendChild(forecastElement);
    });
};

button.addEventListener("click", () => {
    checkWeather(input.value);
});
