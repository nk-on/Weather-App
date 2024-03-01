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
function renderData(weatherData) {
  const {
    sys: { country },
  } = weatherData;
  const city = weatherData.name;
  locationElement.textContent = `${city},${country}`;
}
async function getWeather() {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${APIkey}`
    );
    const res = await data.json();
    console.log(res);
    renderData(res);
  } catch {
    alert(`Failed to fetch`);
  }
}
getWeather();
