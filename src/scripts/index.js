let dateTime = new Date();
let inputCityName;
let apiKey = "d80a82d9d8aa9717ceb7838589de67c1";

//визначення поточного місцяположення і передача його у функцію handlePosition
function infoOnCurrentLocation() {
  navigator.geolocation.getCurrentPosition(handlePositionInIndex);
}

//для index: для використання поточних широти і довготи для отримання даних про сьогоднішній прогноз, і передача даних функції showCurrentGeoData
function handlePositionInIndex(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  window.location.href = `/results?lat=${lat}&lon=${lon}`;
}

//фукнція отримання назви міста з пошукового рядка
function letCity(event) {
  event.preventDefault();
  let inputCity = document.getElementById("search-city-name");
  inputCityName = inputCity.value;
  if (inputCityName) {
    window.location.href = `/results?city=${inputCityName}`;
  } else {
    let errorText = document.getElementById("error-container-for-search");
    errorText.innerHTML = "Enter the city name to get results";
  }
}

//зміна шкали температур на стандартну (Цельсії), отримання назви міста з пошукового рядка
// і перехід до виконання showTodayTemp
// function getCityData(cityName) {
//   let apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

//   if (setMode.getAttribute("class") === "fahrenheit") {
//     changeTempMode();
//   }

//   axios
//     .get(apiCity)
//     // .then((response) => {
//       //   localStorage.setItem("apiData", JSON.stringify(response.data));
//       // })
//     .catch(
//       function (error) {
//         if (error.response) {
//           // The request was made and the server responded with a status code
//           // that falls out of the range of 2xx
//           console.log(error.response.data);
//           console.log(error.response.status);
//           console.log(error.response.headers);
//         } else if (error.request) {
//           // The request was made but no response was received
//           // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//           // http.ClientRequest in node.js
//           console.log(error.request);
//         } else {
//           // Something happened in setting up the request that triggered an Error
//           console.log("Error", error.message);
//         }
//         console.log(error.config);
//       }
//       //   (error) => {
//       //   let errorText = document.getElementById("error-container-for-search");
//       //   errorText.innerHTML = `Sorry, "${cityName}" cannot be found. Check the city and retry`;
//       // }
//     ) //потрібно більш чітко відловлювати помилки
//     .finally(
//       function (response) {
//       // let todayResponsData = JSON.parse(localStorage.getItem("apiData"));

//       showTodayTemp(response);
//       //datetimeInCity(todayResponsData);
//     });
// }

let searchForm = document.getElementById("searching");
let serachByCurrentPosition = document.getElementById("serach-by-position");
searchForm.addEventListener("submit", letCity);
serachByCurrentPosition.addEventListener("click", infoOnCurrentLocation);
