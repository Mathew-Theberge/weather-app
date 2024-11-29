const form = document.querySelector("form");
const input = document.querySelector("#search");

let userUnitPreference = "metric";

import { setWeatherObj } from "./api-logic";

form.addEventListener("submit", (e) => {
    e.preventDefault();
    renderWeatherData(input.value, userUnitPreference);
    input.value = "";
});

function renderWeatherData(location, unit) {
    const response = setWeatherObj(location, unit);
    response.then((weatherDataObj) => {
        console.log("render logic");
    });
}
