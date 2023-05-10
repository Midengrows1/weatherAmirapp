const APIKEY = "cafede2797ebf92b71ba6a18195f6f78";
const inpCity = document.querySelector("#cityPlace");
const inpSearch = document.querySelector(".search__form");
const currentCity = document.querySelector(".current__city");
const dailyWeather = document.querySelector(".daily");
console.log(dailyWeather);
const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const inpChange = async (e) => {
  e.preventDefault();
  const inpValue = inpCity.value.trim();
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inpValue}&units=metric&appid=${APIKEY}`;
  const historyUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${inpValue}&units=metric&appid=${APIKEY}`;
  const currentData = await getData(currentUrl);
  const historyData = await getData(historyUrl);
  currentCity.textContent = inpValue;
  console.log(currentData);
  console.log(historyData);

  const filteredHistory = historyData.list.filter(
    (i) => i.dt_txt.slice(11, 13) === "06" && i
  );
  showWeather(currentData);
  try {
    showDailyWeather(filteredHistory);
  } catch (err) {
    console.log("showdailyweather error");
  }
};
function showWeather(data) {
  const { dt, sunrise, sunset, name, main, sys, weather, wind } = data;
  const { description, icon, id } = data.weather[0];
  let sr = new Date(sys.sunrise * 1000).toLocaleTimeString();
  let ss = new Date(sys.sunset * 1000).toLocaleTimeString();
  let date = new Date(dt * 1000).toDateString().slice(3, 10);
  let time = new Date(dt * 1000).toLocaleTimeString();
  let dayoftheWeek = new Date(dt * 1000).toDateString().slice(0, 4);
  const bannerDate = document.querySelector(".weather__left");
  const bannerWeather = document.querySelector(".weather__right");
  const windSpeedW = document.querySelector(".wind");
  const pressureW = document.querySelector(".pressure");
  const sunriseW = document.querySelector(".sunrise");
  const humidityW = document.querySelector(".humidity");
  const uvIndexW = document.querySelector(".UVindex");
  const sunsetW = document.querySelector(".sunset");

  try {
    bannerDate.innerHTML = `
    <h3>${date}</h3>
    <p>${dayoftheWeek}<span>${time}</span></p>`;
    bannerWeather.innerHTML = ` 
      <h1>${Math.round(main.temp)}&deg</h2>
      <p>${description}</p>`;
    windSpeedW.innerHTML = `
      <p>Wind speed</p>
      <h3>${Math.round(wind.speed)}km/h</h3>`;
    pressureW.innerHTML = `
      <p>Pressure</p>
      <h3>${main.pressure} mb</h3>`;
    sunriseW.innerHTML = `
      <p>Sunrise</p>
      <h3>${sr}</h3>`;
    humidityW.innerHTML = `
      <p>Humidity</p>
      <h3>${main.humidity}%</h3>`;
    sunsetW.innerHTML = `
      <p>Sunset</p>
      <h3>${ss}</h3>`;
  } catch (err) {
    console.log("error in ShowWeather");
  }
}
function showDailyWeather(data) {
  const weatherItem_div = document.querySelector(".weather__daily__container");
  weatherItem_div.innerHTML = ``;
  data.forEach((i) => {
    const { dt, weather, main } = i;
    let dayoftheWeek = new Date(dt * 1000).toDateString().slice(0, 4);
    let date = new Date(dt * 1000).toDateString().slice(3, 10);
    console.log(i);
    console.log(date);
    const weathItem = document.createElement("div");
    weathItem.classList.add("weather__items");
    weathItem.innerHTML = `<div class="weather_desc_left">
    <h4>${dayoftheWeek}</h4>
    <p>${date}</p>
   </div>
   <div class="weather_desc_right">
    <img src="https://openweathermap.org/img/wn/${
      weather[0].icon
    }@2x.png" alt="">
    <h3>${Math.round(main.temp)}&deg</h3>
</div>`;
    weatherItem_div.append(weathItem);
  });
}

const citiesArr = document.querySelectorAll(".cities");
for (let city = 0; city < citiesArr.length; city++) {
  item = citiesArr[city];
  item.addEventListener("click", async (e) => {
    inpCity.value = e.target.textContent;
    currentCity.textContent = e.target.textContent;
    const cityValue = inpCity.value.trim();
    const Url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=${APIKEY}`;
    const historyUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityValue}&units=metric&appid=${APIKEY}`;
    const Data = await getData(Url);
    const historyData = await getData(historyUrl);
    const filteredHistory = historyData.list.filter(
      (i) => i.dt_txt.slice(11, 13) === "06" && i
    );
    showWeather(Data);
    showDailyWeather(filteredHistory);
  });
}
inpSearch.addEventListener("submit", inpChange);
