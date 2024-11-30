import { setWeatherObj } from "./api-logic";
import partlyCloudyNight from "./images/weatherIcons/partly-cloudy-night.svg";
import partlyCloudyDay from "./images/weatherIcons/partly-cloudy-day.svg";
import cloudy from "./images/weatherIcons/cloudy.svg";
import rain from "./images/weatherIcons/rain.svg";
import fog from "./images/weatherIcons/fog.svg";
import wind from "./images/weatherIcons/wind.svg";
import snow from "./images/weatherIcons/snow.svg";
import clearDay from "./images/weatherIcons/clear-day.svg";
import clearNight from "./images/weatherIcons/clear-night.svg";

const form = document.querySelector("form");
const input = document.querySelector("#search");

const fahrenheitBtn = document.querySelector("#fahrenheitBtn");
const celsiusBtn = document.querySelector("#celsiusBtn");

const locationElement = document.querySelector("h1");
const conditions = document.querySelector("h3");
const temp = document.querySelector("#temp");
const highTemp = document.querySelector("#highTemp span:last-child");
const lowTemp = document.querySelector("#lowTemp span:last-child");
const icon = document.querySelector(".dailyIcon");
const feelsLike = document.querySelector("#feelsLike span:last-child");

const weeklyForecastDates = document.querySelectorAll(".weeklyForecastDate");
const weeklyForecastIcons = document.querySelectorAll(".weeklyForecastIcon");
const weeklyForecastTemps = document.querySelectorAll(".weeklyForecastTemp");

const weatherDataNumbersOnlyArray = [temp, highTemp, lowTemp, feelsLike];
weeklyForecastTemps.forEach((node) => weatherDataNumbersOnlyArray.push(node));

let userUnitPreference = "metric";
let searchLocation = "Toronto";

form.addEventListener("submit", (e) => {
    e.preventDefault();
    searchLocation = input.value;
    renderWeatherData(searchLocation, userUnitPreference);
    input.value = "";
});

celsiusBtn.addEventListener("click", () => {
    userUnitPreference = "metric";
    if (!celsiusBtn.classList.contains("activeBtn"))
        convertWeatherNumbersToNewUnit(
            weatherDataNumbersOnlyArray,
            fahrenheitToCelsius,
        );
    celsiusBtn.classList.add("activeBtn");
    fahrenheitBtn.classList.remove("activeBtn");
});

fahrenheitBtn.addEventListener("click", () => {
    userUnitPreference = "us";
    if (!fahrenheitBtn.classList.contains("activeBtn"))
        convertWeatherNumbersToNewUnit(
            weatherDataNumbersOnlyArray,
            celsiusToFahrenheit,
        );
    fahrenheitBtn.classList.add("activeBtn");
    celsiusBtn.classList.remove("activeBtn");
});

function renderWeatherData(location, unit) {
    const response = setWeatherObj(location, unit);
    response.then((weatherDataObj) => {
        locationElement.textContent = weatherDataObj.dailyConditions.location;
        conditions.textContent = weatherDataObj.dailyConditions.conditions;
        temp.textContent = weatherDataObj.dailyConditions.temp + "°";
        lowTemp.textContent = weatherDataObj.dailyConditions.minTemp + "°";
        highTemp.textContent = weatherDataObj.dailyConditions.maxTemp + "°";
        feelsLike.textContent = weatherDataObj.dailyConditions.feelslike + "°";
        setIcon(icon, weatherDataObj.dailyConditions.icon);

        weeklyForecastDates.forEach((date, index) => {
            date.textContent = weatherDataObj.weeklyCondition.dates[index];
        });

        weeklyForecastIcons.forEach((icon, index) => {
            setIcon(icon, weatherDataObj.weeklyCondition.icons[index]);
        });

        weeklyForecastTemps.forEach((temp, index) => {
            temp.textContent =
                weatherDataObj.weeklyCondition.temps[index] + "°";
        });
    });
}

renderWeatherData(searchLocation, userUnitPreference);

function fahrenheitToCelsius(fahrenheit) {
    return (((fahrenheit - 32) * 5) / 9).toFixed(1);
}

function celsiusToFahrenheit(celsius) {
    return ((celsius * 9) / 5 + 32).toFixed(1);
}

function convertWeatherNumbersToNewUnit(array, convertingFunction) {
    array.forEach((element) => {
        element.textContent =
            convertingFunction(
                element.textContent.slice(0, element.textContent.length - 1),
            ) + "°";
    });
}

function setIcon(imgElement, icon) {
    switch (icon) {
        case "partly-cloudy-night":
            imgElement.src = partlyCloudyNight;
            break;
        case "partly-cloudy-day":
            imgElement.src = partlyCloudyDay;
            break;
        case "cloudy":
            imgElement.src = cloudy;
            break;
        case "snow":
            imgElement.src = snow;
            break;
        case "rain":
            imgElement.src = rain;
            break;
        case "fog":
            imgElement.src = fog;
            break;
        case "wind":
            imgElement.src = wind;
            break;
        case "clear-day":
            imgElement.src = clearDay;
            break;
        case "clear-night":
            imgElement.src = clearNight;
            break;
    }
}
