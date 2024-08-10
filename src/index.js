function updateWeatherData(response) {
  let tempElement = document.querySelector("#weather-Temp");
  let temperature = response.data.temperature.current;
  tempElement.innerHTML = Math.round(temperature);

  let cityElement = document.querySelector("#show-City");
  cityElement.innerHTML = response.data.city;
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
