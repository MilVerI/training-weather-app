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

//фукнція отримання назви міста з пошукового рядка
function letCity(event) {
  event.preventDefault();
  let inputCity = document.getElementsById("search-city-name");
  inputCityName = inputCity.value;
  if (inputCityName) {
    window.location.href = `/results?city=${inputCityName}`;
  } else {
    let errorText = document.getElementsById("error-container-for-search");
    errorText.innerHTML = "Enter the city name to get results";
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
      let errorText = document.getElementsById("error-container-for-search");
      errorText.innerHTML = `Sorry, "${cityName}" cannot be found. Check the city and retry`;
    }); //потрібно більш чітко відловлювати помилки

  let todayResponsData = JSON.parse(localStorage.getItem("apiData"));

  showTodayTemp(todayResponsData);
  //datetimeInCity(todayResponsData);
}

let searchForm = document.getElementsById("searching");
let serachByCurrentPosition = document.getElementsById("serach-by-position");
searchForm.addEventListener("submit", letCity);
serachByCurrentPosition.addEventListener("click", infoOnCurrentLocation);