const APIKEY = "cafede2797ebf92b71ba6a18195f6f78";
const inpSearch = document.querySelector(".search__form");
const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const inpChange = async (e) => {
  e.preventDefault();
  const inpCity = document.querySelector("#cityPlace");
  const inpValue = inpCity.value.trim();
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inpValue}&units=metric&appid=${APIKEY}`;
  const historyUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${inpValue}&units=metric&appid=${APIKEY}`;
  const currentData = await getData(currentUrl);
  const historyData = await getData(historyUrl);
  console.log(currentData);
  console.log(historyData);
  let sr = new Date(currentData.sys.sunrise * 1000).toLocaleTimeString();
  let ss = new Date(currentData.sys.sunset * 1000).toLocaleTimeString();
  
  console.log(sr, ss);
  const filteredHistory = historyData.list.filter(
    (i) => i.dt_txt.slice(11, 13) === "06" && i
  );
  console.log(filteredHistory);
};

inpSearch.addEventListener("submit", inpChange);
