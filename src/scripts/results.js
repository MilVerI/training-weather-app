//https://main--gorgeous-otter-5cc80c.netlify.app/results?lat=50.4197225&lon=30.6396344

let dateTime = new Date();
let formattedDay;
let formattedTime;
let formattedDayForecast;
let inputCityName;
let setMode = document.getElementById("tempToggler");
let apiKey = "d80a82d9d8aa9717ceb7838589de67c1";

// //визначення поточного місцяположення і передача його у функцію handlePosition
function infoOnCurrentLocation() {
  navigator.geolocation.getCurrentPosition(handlePositionForResults);
}

// для results: використання поточних широти і довготи для отримання даних про сьогоднішній прогноз, і передача даних функції showCurrentGeoData
function handlePositionForResults(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiByGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiByGeo).then((response) => {
    cleanErrorContainer();
    showTodayWeather(response);
  });
}

function handlePositionFromIndex(lat, lon) {
  let apiByGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  return axios.get(apiByGeo).then((response) => {
    cleanErrorContainer();
    dateInCity(response);
    timeInCity(response);
    setDateTime(formattedDay, formattedTime);
    showTodayWeather(response);
  });
}

function setDateTime(day, time) {
  let thisDay = document.getElementById("firstDayName");
  thisDay.innerHTML = day;
  let thisTime = document.getElementById("time");
  thisTime.innerHTML = time;
}

//фукнція отримання назви міста з пошукового рядка
function letCity(event) {
  event.preventDefault();
  let inputCity = document.getElementById("search-city-name");
  inputCityName = inputCity.value;
  if (inputCityName) {
    getCityData(inputCityName);
  } else {
    let error = document.getElementById("error-container-for-search");
    error.innerHTML = "Enter the city name to get results";
  }
}

//функція зміни шкали для температури з Цельсія на Фаренгейти і навпаким; потребує покращення
function changeTempMode() {
  if (setMode.getAttribute("class") === "celsius") {
    let elems = document.getElementsByClassName("temperature");
    console.log(elems);
    if (elems.length) {
      for (var i = 0; i < elems.length; i++) {
        let temp = elems[i].innerHTML;
        let tempValue = Math.round(temp * 1.8 + 32);
        elems[i].innerHTML = `${tempValue}`;
      }
    }
    setMode.innerHTML = "°F";
    setMode.setAttribute("class", "fahrenheit");
  } else {
    if (setMode.getAttribute("class") === "fahrenheit") {
      let elems = document.getElementsByClassName("temperature");
      console.log(elems);
      if (elems.length) {
        for (var i = 0; i < elems.length; i++) {
          let temp = elems[i].innerHTML;
          let tempValue = Math.round((temp - 32) / 1.8);
          elems[i].innerHTML = `${tempValue}`;
        }
      }
      setMode.innerHTML = "°C";
      setMode.setAttribute("class", "celsius");
    } else {
      alert("Something went wrong. Reload the page");
    }
  }
}

//зміна шкали температур на стандартну (Цельсії), отримання назви міста з пошукового рядка
// і перехід до виконання showTodayWeather
function getCityData(cityName) {
  let apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

  if (setMode.getAttribute("class") === "fahrenheit") {
    changeTempMode();
  }

  return axios
    .get(apiCity)
    .then((response) => {
      cleanErrorContainer(); // !!!!!!!!!!!!!!!!!!!!!
      dateInCity(response);
      timeInCity(response);
      setDateTime(formattedDay, formattedTime);
      showTodayWeather(response);
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.status);
        console.log(error.response.headers);
        let errorCityDoesntExist = error.response.data.message;
        let errorContainer = document.getElementById(
          "error-container-for-search"
        );
        errorContainer.innerHTML = `Sorry, but ${errorCityDoesntExist}. Check city and retry`;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }); //потрібно більш чітко відловлювати помилки
}

function cleanErrorContainer() {
  let errorContainer = document.getElementById("error-container-for-search");
  errorContainer.innerHTML = "";
}

//функція визначення дати для міста з пошуку
function dateInCity(response) {
  console.log(response.data.dt);
  let unix_timestamp = response.data.dt;
  let date = new Date(unix_timestamp * 1000);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let currentDay = days[date.getDay()];
  let currentMonth = date.getMonth() + 1;
  let currentDate = date.getDate();

  if (currentMonth < 10) {
    formattedDay = `  ${currentDay}, ${currentDate}/0${currentMonth} |  `;
    return formattedDay;
  } else {
    formattedDay = `  ${currentDay}, ${currentDate}/${currentMonth} |  `;
    return formattedDay;
  }
}

//функція визначення часу для міста з пошуку
function timeInCity(response) {
  console.log(response.data.dt);
  let unix_timestamp = response.data.dt;
  let date = new Date(unix_timestamp * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    formattedTime = ` ${hours}:0${minutes}`;
    return formattedTime;
  } else {
    formattedTime = ` ${hours}:${minutes}`;
    return formattedTime;
  }
}

//функція для отримання даних про прогоду на 7 днів
function getForecast(coords) {
  console.log(coords);
  let apiForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude={part}&units=metric&appid=${apiKey}`;

  return axios.get(apiForecast).then(displayForecast);
  // .catch(function (error) {
  //   if (error.response) {
  //     // The request was made and the server responded with a status code
  //     // that falls out of the range of 2xx
  //     console.log(error.response.data);
  //     console.log(error.response.status);
  //     console.log(error.response.headers);
  //   } else if (error.request) {
  //     // The request was made but no response was received
  //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //     // http.ClientRequest in node.js
  //     console.log(error.request);
  //   } else {
  //     // Something happened in setting up the request that triggered an Error
  //     console.log("Error", error.message);
  //   }
  //   console.log(error.config);
  // }); //потрібно більш чітко відловлювати помилки
}

//зміна назви міста та температури на сторінці для поточного дня
function showTodayWeather(response) {
  let tempData = Math.round(response.data.main.temp);
  let temp = document.getElementById("firstDayTemp");
  let city = document.getElementById("current-city");
  let weatherDescription = document.getElementById("today-weather-description");
  let weatherDescriptionValue = response.data.weather[0].description;
  let todayHumidity = document.getElementById("today-humidity");
  let todayWindSpeed = document.getElementById("today-wind-speed");
  let todayWindSpeedValue = Math.round(response.data.wind.speed);
  let todayIcon = document.getElementById("today-weather-icon");
  let todayIconCode = response.data.weather[0].icon;
  temp.innerHTML = `${tempData}`;
  city.innerHTML = response.data.name;
  weatherDescription.innerHTML =
    weatherDescriptionValue.charAt(0).toUpperCase() +
    weatherDescriptionValue.slice(1);
  todayHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  todayWindSpeed.innerHTML = `Wind speed: ${todayWindSpeedValue} km/h`;
  todayIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${todayIconCode}@2x.png`
  );
  getForecast(response.data.coord);
}

//форматування дати для displayForecast
function formattedDayForForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let day = days[date.getDay()];
  let month = date.getMonth() + 1;
  let dateForecast = date.getDate();

  if (month < 10) {
    formattedDayForecast = `  ${day}, ${dateForecast}/0${month}`;
    return formattedDayForecast;
  } else {
    formattedDayForecast = `  ${day}, ${dateForecast}/${month}`;
    return formattedDayForecast;
  }
}

//показ пятиденного прогнозу праворуч через ін'єкцію елементу х5;
function displayForecast(response) {
  let forecastData = response.data.daily;

  let forecastElement = document.getElementById("forecast");

  let forecastHTML = "";
  forecastData.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      let description = forecastDay.weather[0].description;
      let descriptionValue =
        description.charAt(0).toUpperCase() + description.slice(1);
      let tempMax = Math.round(forecastDay.temp.max);
      let tempMin = Math.round(forecastDay.temp.min);
      let windSpeed = Math.round(forecastDay.wind_speed);
      let iconCode = forecastDay.weather[0].icon;

      forecastHTML =
        forecastHTML +
        `
    <div class="forecast-info">
      <img class="weather-icons" src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${descriptionValue}">
        <div class="forecast-day-info">
           <h5>${formattedDayForForecast(forecastDay.dt)}</h5>
              <div class="forecast-weather-info"><span>${descriptionValue}</span><span> | H: ${
          forecastDay.humidity
        }% </span><span> | W: ${windSpeed}km/h</span></div>
        </div>
        <div class="forecast-temperature-max temperature">${tempMax}</div>
            <span class="symbol-max">°</span>
        <div class="forecast-temperature-min temperature">${tempMin}</div>
            <span class="symbol-min">°</span>
    </div>`;
      forecastElement.innerHTML = forecastHTML;
    }
  });
}
// temperature - класс чтобы выбрать элемент

//Отримання параметру назва міста
function getCityNameBySearchParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const city = urlParams.get("city");
  if (!city) return false;
  return city;
}

//Отримання параметрів довгота та широта
function getCoorsBySearchParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const lat = urlParams.get("lat");
  const lon = urlParams.get("lon");
  if (!lat || !lon) return false;
  return { lat, lon };
}

//Перевірка параметрів рядка
function startWithParams() {
  const city = getCityNameBySearchParams();
  const coords = getCoorsBySearchParams();
  if (city) {
    getCityData(city);
  } else {
    if (coords) {
      handlePositionFromIndex(coords.lat, coords.lon).then(function () {
        formatDay(dateTime);
        formatTime(dateTime);
        setDateTime(formattedDay, formattedTime);
      });
    } else {
      //переспрямувати на індекс
      window.location.href = "/";
    }
  }
}

startWithParams();
let searchForm = document.getElementById("searching");
let serachByCurrentPosition = document.getElementById("serach-by-position");
searchForm.addEventListener("submit", letCity);
setMode.addEventListener("click", changeTempMode);
serachByCurrentPosition.addEventListener("click", infoOnCurrentLocation);
