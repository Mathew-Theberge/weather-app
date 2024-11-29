const weatherDataObj = {
    dailyConditions: {},
    weeklyCondition: {
        icons: [],
        temps: [],
        dates: [],
    },
};

async function getWeatherObj(location, unit) {
    const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=${unit}&key=FX7NPM54AHXJEVGYXF62W98PW`,
        { mode: "cors" },
    );
    const json = await response.json();
    return json;
}

export async function setWeatherObj(location, unit) {
    const weatherData = await getWeatherObj(location, unit);
    weatherDataObj.dailyConditions.location = weatherData.address;
    weatherDataObj.dailyConditions.temp = weatherData.currentConditions.temp;
    weatherDataObj.dailyConditions.feelslike =
        weatherData.currentConditions.feelslike;
    weatherDataObj.dailyConditions.conditions =
        weatherData.currentConditions.conditions;
    weatherDataObj.dailyConditions.maxTemp = weatherData.days[0].tempmax;
    weatherDataObj.dailyConditions.minTemp = weatherData.days[0].tempmin;
    weatherDataObj.dailyConditions.icon = weatherData.currentConditions.icon;

    weatherDataObj.weeklyCondition.dates = [];
    weatherDataObj.weeklyCondition.icons = [];
    weatherDataObj.weeklyCondition.temps = [];

    weatherData.days.forEach((day, index) => {
        if (index === 0) {
            return;
        }
        weatherDataObj.weeklyCondition.dates.push(day.datetime);
    });

    weatherData.days.forEach((day, index) => {
        if (index === 0) {
            return;
        }
        weatherDataObj.weeklyCondition.temps.push(day.temp);
    });

    weatherData.days.forEach((day, index) => {
        if (index === 0) {
            return;
        }
        weatherDataObj.weeklyCondition.icons.push(day.icon);
    });
    console.log(weatherDataObj);
    return weatherDataObj;
}
