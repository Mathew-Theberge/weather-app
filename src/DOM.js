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

const weatherDataNumbersOnlyArray = [temp, highTemp, lowTemp, feelsLike];

let userUnitPreference = "metric";
let searchLocation = "Toronto";

import { setWeatherObj } from "./api-logic";

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
