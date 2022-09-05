let dateTime = new Date();
let formattedDay1;
let formattedTime;
let setMode = document.querySelector("#tempToggler");
let inputCityName;
let apiKey = "d80a82d9d8aa9717ceb7838589de67c1";

function infoOnCurrentLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiByGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiByGeo).then(showCurrentGeoData);
}

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
  let thisDay = document.querySelector("#firstDayName");
  thisDay.innerHTML = day;
  let thisTime = document.querySelector("#time");
  thisTime.innerHTML = time;
}

function letCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-city-name");
  inputCityName = inputCity.value;
  if (inputCityName) {
    getCityData(inputCityName);
  } else {
    alert("Enter a city!");
  }
}

function changeTempMode() {
  if (setMode.getAttribute("class") === "celsius") {
    let temp1 = document.querySelector("#firstDayTemp");
    let temp2 = document.querySelector("#secondDayTemp");
    let temp3 = document.querySelector("#thirdDayTemp");
    let temp4 = document.querySelector("#fourthDayTemp");
    let temp5 = document.querySelector("#fifthDayTemp");
    let temp6 = document.querySelector("#sixthDayTemp");

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
      let temp1 = document.querySelector("#firstDayTemp");
      let temp2 = document.querySelector("#secondDayTemp");
      let temp3 = document.querySelector("#thirdDayTemp");
      let temp4 = document.querySelector("#fourthDayTemp");
      let temp5 = document.querySelector("#fifthDayTemp");
      let temp6 = document.querySelector("#sixthDayTemp");

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

function getCityData(cityName) {
  let apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  axios
    .get(apiCity)
    .then(showTodayTemp)
    .catch((error) => {
      alert(`Sorry, "${cityName}" cannot be found. Check the city and retry`);
    });
}

function showTodayTemp(response) {
  let tempData = Math.round(response.data.main.temp);
  let temp = document.querySelector("#firstDayTemp");
  let city = document.querySelector("#current-city");
  temp.innerHTML = `${tempData}`;
  city.innerHTML = inputCityName;
}

infoOnCurrentLocation();
formatDay1(dateTime);
formatTime(dateTime);
setDateTime(formattedDay1, formattedTime);
let searchForm = document.querySelector("#searching");
searchForm.addEventListener("submit", letCity);
setMode.addEventListener("click", changeTempMode);