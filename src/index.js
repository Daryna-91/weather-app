function currentDate(date, shortDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "Jully",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let year = date.getFullYear();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let Date1 = "";
  if (shortDate == false) {
    Date1 = `${currentDay}, ${currentMonth} ${currentDate} ${year}`;
  } else {
    Date1 = `${currentDay} ${hours}:${minutes}`;
  }
  return Date1;
}
function displayForecast(response) {
  forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-1">
    <div class="card h-100">
      <div class="card-body-1">
        <h5 class="card-title">${formatDay(day.dt)}</h5>
        <img
          src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
          alt=""
          width="42">
        <p class="card-text">${Math.round(day.temp.max)}°C / ${Math.round(
          day.temp.min
        )}°C</p>
      </div>
    </div>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function form(event) {
  event.preventDefault();

  let formInput = document.querySelector(".search-field");
  cityName.innerHTML = formInput.value;
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.innerHTML}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function tempCelsius(event) {
  event.preventDefault();
  currentTemperature.innerHTML = celsiusTemp;
}
function tempFahrenheit(event) {
  event.preventDefault();
  let tempFahrenheit = (celsiusTemp * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(tempFahrenheit);
}
function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=5f472b7acba333cd8a035ea85a0d4d4c&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function showTemperature(response) {
  console.log(response.data.daily);
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  console.log(response);
  cityName.innerHTML = response.data.name;
  currentTemperature.innerHTML = temperature;
  celsiusTemp = temperature;
  let weatherSky = document.querySelector("#sky");
  let incomingString = response.data.weather[0].description;
  let capitalString =
    incomingString.charAt(0).toUpperCase() + incomingString.slice(1);
  weatherSky.innerHTML = capitalString;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let mainIcon = document.querySelector("#main-icon");
  mainIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}
function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function showCurrentTemp(event) {
  navigator.geolocation.getCurrentPosition(getLocation);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

let today = new Date();
let currentDate1 = document.querySelector("#date");
let shortDate = document.querySelector("#day");
shortDate.innerHTML = currentDate(today, true);
currentDate1.innerHTML = currentDate(today, false);
let cityName = document.querySelector("#cityName");

let enterCity = document.querySelector("#form-input");
enterCity.addEventListener("submit", form);
let currentTemperature = document.querySelector("#currentTemp");

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", tempCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", tempFahrenheit);

let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.innerHTML}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showTemperature);

let currentLocationButton = document.querySelector("#currentLocationButton");

currentLocationButton.addEventListener("click", showCurrentTemp);
