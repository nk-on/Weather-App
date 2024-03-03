/* 1. App should display weather based on default location
   2. App should disp0lay weather based user's entered location
   3. User shoult be able to switch between units
*/
const locationElement = document.querySelector('.location');
const dateElement = document.querySelector('.date');
const timeElement = document.querySelector('.time');
const temperatureElement = document.querySelector('.temperature');
const weatherConditionElement = document.querySelector('.weather-condition');
const humidityElement = document.querySelector('.humidity');
const windSpeedElement = document.querySelector('.wind-speed');
const searchLocationInput = document.querySelector('#search-location');
const switchUnitButton = document.querySelector('.switch-unit');
const APIkey = '8f899912ad562b53558fa04e91536303';
function renderTimeAndDate() {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  dateElement.textContent = date.toLocaleDateString();
  timeElement.textContent = `${hour}:${minute}:${second}`;
}
function renderData(weatherData, unit) {
  let speedUnit;
  let tempUnit;
  if (unit === 'Metric') {
    speedUnit = 'kph';
    tempUnit = '°C';
  } else {
    speedUnit = 'mph';
    tempUnit = '°F';
  }
  const {
    main: { humidity },
  } = weatherData;
  const {
    sys: { country },
  } = weatherData;
  const {
    main: { temp },
  } = weatherData;
  const {
    wind: { speed: windSpeed },
  } = weatherData;
  const weatherCondtion = weatherData.weather[0].main;
  const city = weatherData.name;
  locationElement.textContent = `${city},${country}`;
  setInterval(renderTimeAndDate, 1000);
  temperatureElement.textContent = `${temp} ${tempUnit}`;
  weatherConditionElement.textContent = weatherCondtion;
  humidityElement.textContent = `Humidity:${humidity}%`;
  windSpeedElement.textContent = `${windSpeed} ${speedUnit}`;
}
async function getWeather(unit) {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${APIkey}&units=${unit}`
    );
    const res = await data.json();
    console.log(res);
    renderData(res, unit);
  } catch {
    alert(`Failed to fetch`);
  }
}
function switchUnit() {
  const unit = this.textContent;
  getWeather(unit);
  if (this.textContent === 'Metric') {
    this.textContent = 'Imperial';
  } else {
    this.textContent = 'Metric';
  }
}
getWeather('metric');
switchUnitButton.addEventListener('click', switchUnit);
