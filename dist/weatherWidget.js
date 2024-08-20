"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apiKey = 'a2c162fe9e2b49b6b4c124102241808';
const apiUrl = 'https://api.weatherapi.com/v1/forecast.json';
function createInputForm(divId) {
    const formDiv = divId ? document.getElementById(divId) : createWeatherDiv();
    if (formDiv) {
        const form = createForm(divId);
        formDiv.appendChild(form);
    }
}
function createWeatherDiv() {
    let weatherDiv = document.querySelector('.weatherDivContainer');
    if (!weatherDiv) {
        weatherDiv = document.createElement('div');
        weatherDiv.classList.add('weatherDivContainer');
        document.body.appendChild(weatherDiv);
    }
    return weatherDiv;
}
function createForm(divId) {
    const form = document.createElement('form');
    form.innerHTML =
        `<label for="location">Enter City Name or Coordinates (lat,lon):</label>
        <input type='text' id='location' name='location' required>
        <button type='submit'>Get Weather</button>`;
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const locationInput = document.getElementById('location').value;
        getWeather(locationInput, divId);
    });
    return form;
}
function getWeather(location, divId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let query = location;
            const coordMatch = location.match(/^([-+]?\d{1,2}\.\d+),\s*([-+]?\d{1,3}\.\d+)$/);
            if (coordMatch) {
                const [lat, lon] = coordMatch.slice(1);
                query = `${lat},${lon}`;
            }
            const weatherResponse = yield fetch(`${apiUrl}?key=${apiKey}&q=${query}&days=14`);
            const weatherData = yield weatherResponse.json();
            const weatherDiv = divId ? document.getElementById(divId) : createWeatherDiv();
            if (weatherDiv) {
                displayWeather(weatherData, weatherDiv);
            }
        }
        catch (error) {
            console.error("Failed to load weather data:", error);
        }
    });
}
function displayWeather(data, div) {
    var _a;
    const avgTemps = getAverageTemperatures(data);
    removeWeatherResults(div); // Remove previous weatherResults div if it exists
    const weatherResultsDiv = document.createElement('div');
    weatherResultsDiv.setAttribute('id', 'weatherResults');
    weatherResultsDiv.innerHTML = `<h3>Average Temperatures for the Next 2 Weeks in ${(_a = data.location) === null || _a === void 0 ? void 0 : _a.name}</h3>`;
    const days = document.createElement('div');
    days.setAttribute('id', 'resultsList');
    for (const [day, temp] of Object.entries(avgTemps)) {
        const dayTemp = document.createElement('div');
        dayTemp.textContent = `${day}: ${temp.toFixed(2)}\u00B0C`;
        days.appendChild(dayTemp);
    }
    weatherResultsDiv.appendChild(days);
    div.appendChild(weatherResultsDiv);
}
function removeWeatherResults(div) {
    const previousWeatherResultsDiv = div.querySelector("#weatherResults");
    if (previousWeatherResultsDiv) {
        previousWeatherResultsDiv.remove();
    }
}
function getAverageTemperatures(data) {
    var _a, _b;
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const tempSums = {};
    const avgTemps = {};
    (_b = (_a = data.forecast) === null || _a === void 0 ? void 0 : _a.forecastday) === null || _b === void 0 ? void 0 : _b.forEach((dayData) => {
        const date = new Date(dayData.date);
        const dayName = dayNames[date.getUTCDay()];
        if (!tempSums[dayName]) {
            tempSums[dayName] = { sum: 0, count: 0 };
        }
        tempSums[dayName].sum += dayData.day.avgtemp_c;
        tempSums[dayName].count += 1;
    });
    for (const day in tempSums) {
        avgTemps[day] = tempSums[day].sum / tempSums[day].count;
    }
    return avgTemps;
}
window.initializeWeatherWidget = (divId) => {
    createInputForm(divId);
};
