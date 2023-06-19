const weatherToken = "NGI3ZWMyMTctOWNiMy00NWVkLTk0ZmItNDlkZjUwNzdjYzc5";

const input = document.querySelector("#cityinput");
const button = document.querySelector("#add");
const city = document.querySelector("#cityoutput");
const description = document.querySelector("#description");
const tempreture = document.querySelector("#temp");
const wind = document.querySelector("#wind");

const buttonId = "btn-search";
const addressInputId = "address-input";
const countryId = "country";
const regionId = "region";
const timeId = "time";
const windId = "wind";
const temperatureId = "temp";
const windLabelId = "wind-label";
const temperatureLabelId = "temp-label";
// Api link //
const buttonElement = document.getElementById(buttonId);
const inputE = document.getElementById(addressInputId);

async function getWeatherAndPopulateElements(address) {
  const weatherInfo = await getWeather(address);

  // update the title
}

buttonElement.addEventListener("click", async (e) => {
  // click search button
  const value = inputE.value;
  if (!value) {
    return;
  }

  const weatherInfo = await getWeather(value);

  const countryE = document.getElementById(countryId);
  const regionE = document.getElementById(regionId);
  const timeE = document.getElementById(timeId);

  countryE.textContent = weatherInfo.location.country;
  regionE.textContent = weatherInfo.location.region;

  // Format the time to AM or PM with 12 hr format
  const t = weatherInfo.location.time.split(" ")[1];
  timeE.textContent = formatTime(t);

  // temperature and wind
  const temperatureE = document.getElementById(temperatureId);
  const windE = document.getElementById(windId);
  const temp = weatherInfo.temperatures.fahrenheit;
  temperatureE.innerText = `${temp}°F`;
  windE.innerText = weatherInfo.wind.mph;

  const tLabel = document.getElementById(temperatureLabelId);
  const wLabel = document.getElementById(windLabelId);

  console.log(typeof tLabel.innerText);
  if (tLabel.innerText === "" && wLabel.innerText === "") {
    tLabel.innerText = "Temperature";
    wLabel.innerText = "Wind";
  }

  // 1. get the value from the input
  // 2. pass that value into the click search button function
  inputE.value = ""; // Clears the search bar //
});

// call functions here

//  -------------------------------- FUNCTIONS --------------------------------  //

/**
 * Gets the weather from the api
 */
async function getWeather(location) {
  const body = { location };
  const resp = await fetch("https://api.m3o.com/v1/weather/Now", {
    method: "post",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${weatherToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = await resp.json();

  return {
    condition: data.condition,
    location: {
      country: data.country,
      time: data.local_time,
      region: data.region,
    },
    temperatures: {
      celsius: data.temp_c,
      fahrenheit: data.temp_f,
    },
    wind: {
      kph: data.wind_kph,
      mph: data.wind_mph,
      direction: data.wind_direction,
    },
  };
}

// Format the time
function formatTime(time) {
  const hours = time.split(":")[0];
  const minutes = time.split(":")[1];

  let amOrPm;
  if (hours < 13) {
    amOrPm = "AM";
  } else {
    amOrPm = "PM";
  }

  const hoursFormatted = hours % 12;
  return `${hoursFormatted}:${minutes} ${amOrPm}`;
  // const amOrPm = h < 13 ? 'AM' : "PM"
  // const tt = (h % 12) + ":" + m + " " + ap;
}
