// OpenWeatherMap API key
const apikey = "afb6efdf7fd2713f8690bbda8b110612";

// DOM elements
const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");

// Event listener for form submission
formEl.addEventListener("submit", (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();
  // Get the value entered by the user in the input field
  const cityValue = cityInputEl.value;
  // Call the function to fetch and display weather data
  getWeatherData(cityValue);
});

// Function to fetch weather data from the OpenWeatherMap API
async function getWeatherData(cityValue) {
  try {
    // Fetch weather data using the provided city and API key
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    );

    // Check if the network response is successful
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Parse the JSON response
    const data = await response.json();

    // Extract relevant weather information
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    // Additional weather details
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed} m/s`,
    ];

    // Update HTML elements with weather information
    weatherDataEl.querySelector(".icon").innerHTML = `<img
      src="http://openweathermap.org/img/wn/${icon}.png"
      alt="Weather Icon"
    />`;

    weatherDataEl.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;

    weatherDataEl.querySelector(".description").textContent = description;

    weatherDataEl.querySelector(".details").innerHTML = details
      .map((detail) => ` <div>${detail}</div>`)
      .join("");
  } catch (error) {
    // Handle errors by displaying a user-friendly message
    weatherDataEl.querySelector(".icon").innerHTML = "";
    weatherDataEl.querySelector(".temperature").textContent = "";
    weatherDataEl.querySelector(".description").textContent =
      "An error happened, please try again.";
    weatherDataEl.querySelector(".details").innerHTML = "";
  }
}
