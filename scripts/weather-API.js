const addressFinderkey =
  "https://api.geoapify.com/v1/geocode/autocomplete?text=Mosco&apiKey=56d38093b4a04fa791761b8b9c4714e3";

const weatherToken = "NGI3ZWMyMTctOWNiMy00NWVkLTk0ZmItNDlkZjUwNzdjYzc5";

/**
 * Gets the weather from the api
 */
const getWeather = async (location) => {
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

  const data = resp.json();

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
};
