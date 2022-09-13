//https://main--gorgeous-otter-5cc80c.netlify.app/results?lat=50.4197225&lon=30.6396344

let dateTime = new Date();
let formattedDay1;
let formattedTime;
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

  axios.get(apiByGeo).then(showCurrentGeoData);
}

function handlePositionFromIndex(lat, lon) {
  let apiByGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  return axios.get(apiByGeo).then((response) => {
    showCurrentGeoData(response);
  });
}

//показ прогнозу на поточний день для поточної локації користувача
function showCurrentGeoData(response) {
  console.log(response.data.main.temp);
  console.log(response.data.name);
  let tempData = Math.round(response.data.main.temp);
  let temp = document.getElementById("firstDayTemp");
  let city = document.getElementById("current-city");
  temp.innerHTML = `${tempData}`;
  city.innerHTML = `${response.data.name}`;
}

//функція конвертації поточного дня: назви дня тижня, місяця, дати
function formatDay1(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let currentMonth = date.getMonth() + 1;
  let currentDate = date.getDate();

  if (currentMonth < 10) {
    formattedDay1 = `${currentDay}, ${currentDate}/0${currentMonth} | `;
    return formattedDay1;
  } else {
    formattedDay1 = `${currentDay}, ${currentDate}/${currentMonth} | `;
    return formattedDay1;
  }
}

//функція конвертації поточного часу після відкриття сторінки юзером
function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    formattedTime = `${hours}:0${minutes}`;
    return formattedTime;
  } else {
    formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  }
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
    let temp1 = document.getElementById("firstDayTemp");
    let temp2 = document.getElementById("secondDayTemp");
    let temp3 = document.getElementById("thirdDayTemp");
    let temp4 = document.getElementById("fourthDayTemp");
    let temp5 = document.getElementById("fifthDayTemp");
    let temp6 = document.getElementById("sixthDayTemp");

    let temp1Value = temp1.innerHTML;
    let farTemp1 = Math.round(temp1Value * 1.8 + 32);
    temp1.innerHTML = `${farTemp1}`;

    let temp2Value = temp2.innerHTML;
    let farTemp2 = Math.round(temp2Value * 1.8 + 32);
    temp2.innerHTML = `${farTemp2}`;

    let temp3Value = temp3.innerHTML;
    let farTemp3 = Math.round(temp3Value * 1.8 + 32);
    temp3.innerHTML = `${farTemp3}`;

    let temp4Value = temp4.innerHTML;
    let farTemp4 = Math.round(temp4Value * 1.8 + 32);
    temp4.innerHTML = `${farTemp4}`;

    let temp5Value = temp5.innerHTML;
    let farTemp5 = Math.round(temp5Value * 1.8 + 32);
    temp5.innerHTML = `${farTemp5}`;

    let temp6Value = temp6.innerHTML;
    let farTemp6 = Math.round(temp6Value * 1.8 + 32);
    temp6.innerHTML = `${farTemp6}`;

    setMode.innerHTML = "°F";
    setMode.setAttribute("class", "fahrenheit");
  } else {
    if (setMode.getAttribute("class") === "fahrenheit") {
      let temp1 = document.getElementById("firstDayTemp");
      let temp2 = document.getElementById("secondDayTemp");
      let temp3 = document.getElementById("thirdDayTemp");
      let temp4 = document.getElementById("fourthDayTemp");
      let temp5 = document.getElementById("fifthDayTemp");
      let temp6 = document.getElementById("sixthDayTemp");

      let temp1Value = temp1.innerHTML;
      let celsTemp1 = Math.round((temp1Value - 32) / 1.8);
      temp1.innerHTML = `${celsTemp1}`;

      let temp2Value = temp2.innerHTML;
      let celsTemp2 = Math.round((temp2Value - 32) / 1.8);
      temp2.innerHTML = `${celsTemp2}`;

      let temp3Value = temp3.innerHTML;
      let celsTemp3 = Math.round((temp3Value - 32) / 1.8);
      temp3.innerHTML = `${celsTemp3}`;

      let temp4Value = temp4.innerHTML;
      let celsTemp4 = Math.round((temp4Value - 32) / 1.8);
      temp4.innerHTML = `${celsTemp4}`;

      let temp5Value = temp5.innerHTML;
      let celsTemp5 = Math.round((temp5Value - 32) / 1.8);
      temp5.innerHTML = `${celsTemp5}`;

      let temp6Value = temp6.innerHTML;
      let celsTemp6 = Math.round((temp6Value - 32) / 1.8);
      temp6.innerHTML = `${celsTemp6}`;

      setMode.innerHTML = "°C";
      setMode.setAttribute("class", "celsius");
    } else {
      alert("Something went wrong. Reload the page");
    }
  }
}

//зміна шкали температур на стандартну (Цельсії), отримання назви міста з пошукового рядка
// і перехід до виконання showTodayTemp
function getCityData(cityName) {
  let apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

  if (setMode.getAttribute("class") === "fahrenheit") {
    changeTempMode();
  }

  return axios.get(apiCity).then((response) => {
    showTodayTemp(response);
  });
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

//функція визначення дати для міста з пошуку
function datetimeInCity(data) {
  console.log(data.dt);
  let unix_timestamp = data.dt;
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_timestamp * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  console.log(formattedTime);
}

//зміна назви міста та температури на сторінці для поточного дня
function showTodayTemp(response) {
  let tempData = Math.round(response.data.main.temp);
  let temp = document.getElementById("firstDayTemp");
  let city = document.getElementById("current-city");
  let weatherDescription = document.getElementById("today-weather-description");
  let weatherDescriptionValue = response.data.weather[0].description;
  let todayHumidity = document.getElementById("today-humidity");
  let todayIcon = document.getElementById("today-weather-icon");
  let todayIconCode = response.data.weather[0].icon;
  temp.innerHTML = `${tempData}`;
  city.innerHTML = response.data.name;
  weatherDescription.innerHTML =
    weatherDescriptionValue.charAt(0).toUpperCase() +
    weatherDescriptionValue.slice(1);
  todayHumidity.innerHTML = `Humidity ${response.data.main.humidity}%`;
  todayIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${todayIconCode}@2x.png`
  );

  //setAttribute
}

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
    //.then(function () { showTodayTemp(); });
  } else {
    if (coords) {
      handlePositionFromIndex(coords.lat, coords.lon).then(function () {
        formatDay1(dateTime);
        formatTime(dateTime);
        setDateTime(formattedDay1, formattedTime);
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
