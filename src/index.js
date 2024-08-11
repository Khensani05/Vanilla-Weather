function updateWeatherData(response) {
  //display temperature
  let tempElement = document.querySelector("#weather-Temp");
  let temperature = response.data.temperature.current;
  tempElement.innerHTML = Math.round(temperature);

  //display weather condtion
  let weatherCondition = document.querySelector("#condition-type");
  weatherCondition.innerHTML = response.data.condition.description;

  //display the city name as in the api object
  let cityElement = document.querySelector("#show-City");
  cityElement.innerHTML = response.data.city;

  //display humidity
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  //display wind speed
  let speedElement = document.querySelector("#speed");
  speedElement.innerHTML = response.data.wind.speed;

  //display the time
  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#date");
  timeElement.innerHTML = formatDate(date);

  //display weather icon
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" id="weather-Icon" />`;
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
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=b03c74bff4oa46bc3d3tee6230146d23&units=metric`;
  console.log(apiKey);
  console.log(apiUrl);
  axios.get(apiUrl).then(updateWeatherData);
}

function changeCityName(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#enter-City");
  searchCity(searchInput.value);
}

let searchElement = document.querySelector("#searchAnywhere");
searchElement.addEventListener("submit", changeCityName);

searchCity("Johannesburg");

//displaying forecast

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      ` 
<div class="temp-icon">
            <div id="icon"></div>
          </div>
        
<div class="forecast-items">    
            <div class="weather-forecastItem">
              <div class="weather-forecastDay">${day}</div>
              <div class="weather-forecastIcon">🌥</div>
              <div class="weather-forecastTemps">
                <div class="weather-forecastTemp">
                  <strong>14&deg;C</strong> 6&deg;C
                </div>
              </div>
            </div>
`;
  });

  forecastElement.innerHTML = forecastHtml;
}

displayForecast();
