function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayindex = currentTime.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let month = currentTime.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let year = currentTime.getFullYear();
  let day = currentTime.getDate();
  return `${days[dayindex]}, ${months[month]} ${day}, ${year} | ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#dateTime");
let currentTime = new Date();

dateElement.innerHTML = formatDate(currentTime);

function displayWeather(response) {
  let h1 = document.querySelector("#cityName");
  let mainTemp = Math.round(response.data.main.temp);
  h1.innerHTML = response.data.name;
  let h2 = document.querySelector("#temperature");
  h2.innerHTML = `${mainTemp}`;
}
function search(city) {
  let key = `a95c2c6739994ba4903e007ee817e7d1`;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function cityImput(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;

  search(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", cityImput);

//current location
function showCurrentLocation(position) {
  let key = `a95c2c6739994ba4903e007ee817e7d1`;
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}
let locationButton = document.querySelector("#currentLocationButton");
locationButton.addEventListener("click", getCurrentLocation);
