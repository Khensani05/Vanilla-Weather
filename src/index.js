function updateWeatherData(response) {
  // Display temperature
  let tempElement = document.querySelector("#weather-Temp");
  let temperature = response.data.temperature.current;
  tempElement.innerHTML = Math.round(temperature);

  // Display weather condition
  let weatherCondition = document.querySelector("#condition-type");
  weatherCondition.innerHTML = response.data.condition.description;

  // Display the city name
  let cityElement = document.querySelector("#show-City");
  cityElement.innerHTML = response.data.city;

  // Display humidity
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  // Display wind speed
  let speedElement = document.querySelector("#speed");
  speedElement.innerHTML = response.data.wind.speed;

  // Display the time
  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#date");
  timeElement.innerHTML = formatDate(date);

  // Display weather icon
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" id="weather-Icon" />`;

  // Fetch the forecast
  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "b03c74bff4oa46bc3d3tee6230146d23";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  console.log("API URL:", apiUrl);
  axios
    .get(apiUrl)
    .then(updateWeatherData)
    .catch((error) =>
      console.error("Error fetching current weather data:", error)
    );
}

function changeCityName(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enter-City");
  searchCity(searchInput.value);
}

let searchElement = document.querySelector("#searchAnywhere");
searchElement.addEventListener("submit", changeCityName);

// Displaying forecast
function getForecast(city) {
  let apiKey = "b03c74bff4oa46bc3d3tee6230146d23";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios
    .get(apiUrl)
    .then(displayForecast)
    .catch((error) => console.error("Error fetching forecast data:", error));
}

function displayTime(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  console.log("Forecast Data:", response.data);

  let forecastElement = document.querySelector("#forecast");
  let forecastData = response.data.daily;
  let today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to the start of today
  let todayTimestamp = Math.floor(today.getTime() / 1000);
  let nextDayStart = todayTimestamp + 24 * 60 * 60; // Start of the next day

  let forecastHtml = `<div class="forecast-container">
                        <div class="temp-icon">
                          <div id="icon"></div>
                        </div>`;

  forecastHtml += `<div class="forecast-items">`;

  // Find the index of the first forecast day after today
  let startIndex = 0;
  for (let i = 0; i < forecastData.length; i++) {
    if (forecastData[i].time >= nextDayStart) {
      startIndex = i;
      break;
    }
  }

  // Display the forecast starting from the next day
  forecastData.slice(startIndex, startIndex + 5).forEach(function (day) {
    forecastHtml += `
    <div class="weather-forecastItem">
      <div class="weather-forecastDay">${displayTime(day.time)}</div>
      <div>
      <img src="${day.condition.icon_url}" alt="${
      day.condition.description
    }" class="weather-forecastIcon"/>
      </div>
      <div class="weather-forecastTemps">
        <div class="weather-forecastTemp">
          <strong>${Math.round(
            day.temperature.maximum
          )}<span>&deg;C</span></strong> ${Math.round(
      day.temperature.minimum
    )}<span>&deg;C</span>
        </div>
      </div>
    </div>`;
  });

  forecastHtml += `</div>`;

  forecastElement.innerHTML = forecastHtml;
}

searchCity("Johannesburg");
