let dateTime = new Date();
let formattedDay1;
let formattedTime;
let inputCityName;
let apiKey = "d80a82d9d8aa9717ceb7838589de67c1";

//визначення поточного місцяположення і передача його у функцію handlePosition
function infoOnCurrentLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

//функція для використання поточних широти і довготи для отримання даних про сьогоднішній прогноз, і передача даних функції showCurrentGeoData
function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  window.location.href = `/results?lat=${lat}&lon=${lon}`;
}

//показ прогнозу на поточний день для поточної локації користувача
function showCurrentGeoData(response) {
  console.log(response.data.main.temp);
  console.log(response.data.name);
  alert(`Your current position is "${response.data.name}"`);
  let tempData = Math.round(response.data.main.temp);
  let temp = document.querySelector("#firstDayTemp");
  let city = document.querySelector("#current-city");
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

//фукнція отримання назви міста з пошукового рядка
function letCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-city-name");
  inputCityName = inputCity.value;
  if (inputCityName) {
    window.location.href = `/results?city=${inputCityName}`;
  } else {
    let errorText = document.querySelector("#error-container");
    errorText.innerHTML = "Enter a city!";
    //alert("Enter a city!");
  }
}

//зміна шкали температур на стандартну (Цельсії), отримання назви міста з пошукового рядка
// і перехід до виконання showTodayTemp
function getCityData(cityName) {
  let apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

  if (setMode.getAttribute("class") === "fahrenheit") {
    changeTempMode();
  }

  axios
    .get(apiCity)
    .then((response) => {
      localStorage.setItem("apiData", JSON.stringify(response.data));
    })
    .catch((error) => {
      let errorText = document.querySelector("#error-container");
      errorText.innerHTML = `Sorry, "${cityName}" cannot be found. Check the city and retry`;
      //alert(`Sorry, "${cityName}" cannot be found. Check the city and retry`);
    }); //потрібно більш чітко відловлювати помилки

  let todayResponsData = JSON.parse(localStorage.getItem("apiData"));

  showTodayTemp(todayResponsData);
  //datetimeInCity(todayResponsData);
}

//Получение параметров
function getCityNameBySearchParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const city = urlParams.get("city");
  if (!city) return false;
  return city;
}

function getCoorsBySearchParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const lat = urlParams.get("lat");
  const lng = urlParams.get("lng");
  if (!lat || !lng) return false;
  return { lng, lat };
}

//Проверяем параметри строки
function startWithParams() {
  const city = getCityNameBySearchParams();
  const coords = getCoorsBySearchParams();
  if (city) {
    //Тут запускаем функцию по городу
  } else if (coords) {
    //Тут делаем запрос по координатам
  } else {
    //редиректим на титуьлную
    window.history.replace("/");
  }
}

let searchForm = document.querySelector("#searching");
let serachByCurrentPosition = document.querySelector("#serach-by-position");
searchForm.addEventListener("submit", letCity);
serachByCurrentPosition.addEventListener("click", infoOnCurrentLocation);
