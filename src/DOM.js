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

import clearNightBG from "./images/backgroundImages/clearNight.jpg";
import partlyCloudyNightBG from "./images/backgroundImages/partlyCloudyNight.jpg";
import partlyCloudyDayBG from "./images/backgroundImages/partlyCloudyDay.jpg";
import cloudyBG from "./images/backgroundImages/cloudy.jpg";
import rainBG from "./images/backgroundImages/rain.jpg";
import clearDayBG from "./images/backgroundImages/clearDay.jpg";
import snowBG from "./images/backgroundImages/snow.jpg";
import fogBG from "./images/backgroundImages/fog.jpg";
import windBG from "./images/backgroundImages/wind.jpg";
import loading from "./images/loading.svg";
import error from "./images/error.svg";

const body = document.querySelector("body");

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
let isErrorActive = false;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    searchLocation = input.value;
    renderWeatherData(searchLocation, userUnitPreference);
    input.value = "";
});

celsiusBtn.addEventListener("click", () => {
    if (isErrorActive) {
        return;
    }
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
    if (isErrorActive) {
        return;
    }
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
    setLoadingIcon();
    response
        .then((weatherDataObj) => {
            isErrorActive = false;
            locationElement.textContent =
                weatherDataObj.dailyConditions.location;
            conditions.textContent = weatherDataObj.dailyConditions.conditions;
            temp.textContent = weatherDataObj.dailyConditions.temp + "°";
            lowTemp.textContent = weatherDataObj.dailyConditions.minTemp + "°";
            highTemp.textContent = weatherDataObj.dailyConditions.maxTemp + "°";
            feelsLike.textContent =
                weatherDataObj.dailyConditions.feelslike + "°";
            setIcon(icon, weatherDataObj.dailyConditions.icon);
            setBackgroundImg(weatherDataObj.dailyConditions.icon);

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
        })
        .catch(() => {
            setLoadingIcon();
            isErrorActive = true;
            locationElement.textContent = "Error: unkown location";
            conditions.textContent = "Please enter a valid location";
            icon.src = error;
            weatherDataNumbersOnlyArray.forEach(
                (element) => (element.textContent = "--"),
            );
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
            console.log(icon);
            imgElement.src = clearDay;
            break;
        case "clear-night":
            imgElement.src = clearNight;
            break;
        default:
    }
}

function setBackgroundImg(icon) {
    switch (icon) {
        case "partly-cloudy-night":
            body.style.backgroundImage = `url(${partlyCloudyNightBG})`;
            break;
        case "partly-cloudy-day":
            body.style.backgroundImage = `url(${partlyCloudyDayBG})`;
            break;
        case "cloudy":
            body.style.backgroundImage = `url(${cloudyBG})`;
            break;
        case "snow":
            body.style.backgroundImage = `url(${snowBG})`;
            break;
        case "rain":
            body.style.backgroundImage = `url(${rainBG})`;
            break;
        case "fog":
            body.style.backgroundImage = `url(${fogBG})`;
            break;
        case "wind":
            body.style.backgroundImage = `url(${windBG})`;
            break;
        case "clear-day":
            body.style.backgroundImage = `url(${clearDayBG})`;
            break;
        case "clear-night":
            body.style.backgroundImage = `url(${clearNightBG})`;
            break;
    }
}

function setLoadingIcon() {
    icon.src = loading;
}
