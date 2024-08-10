function changeCityName(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#enter-City");
  console.log(searchInput.value);

  let cityElement = document.querySelector("#show-City");
  cityElement.innerHTML = searchInput.value;
}

let searchElement = document.querySelector("#searchAnywhere");
console.log(searchElement);
searchElement.addEventListener("submit", changeCityName);
