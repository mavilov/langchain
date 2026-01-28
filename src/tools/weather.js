import { tool } from "langchain";
import * as z from "zod";

/**
 * Maps WMO Weather interpretation codes to human-readable descriptions.
 * @param {number} code
 * @returns {string}
 */
const getWeatherDescription = (code) => {
  const descriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Drizzle: Light intensity",
    53: "Drizzle: Moderate intensity",
    55: "Drizzle: Dense intensity",
    56: "Freezing Drizzle: Light intensity",
    57: "Freezing Drizzle: Dense intensity",
    61: "Rain: Slight intensity",
    63: "Rain: Moderate intensity",
    65: "Rain: Heavy intensity",
    66: "Freezing Rain: Light intensity",
    67: "Freezing Rain: Heavy intensity",
    71: "Snow fall: Slight intensity",
    73: "Snow fall: Moderate intensity",
    75: "Snow fall: Heavy intensity",
    77: "Snow grains",
    80: "Rain showers: Slight intensity",
    81: "Rain showers: Moderate intensity",
    82: "Rain showers: Violent intensity",
    85: "Snow showers: Slight intensity",
    86: "Snow showers: Heavy intensity",
    95: "Thunderstorm: Slight or moderate",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };
  return descriptions[code] || "Unknown weather condition";
};

export const _getWeather = async ({ city }) => {
  try {
    // 1. Geocoding: Get coordinates for the city
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city,
    )}&count=1&language=en&format=json`;
    const geoResponse = await fetch(geoUrl);

    if (!geoResponse.ok) {
      throw new Error("Failed to connect to the geocoding service.");
    }

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      return `Sorry, I couldn't find a city named "${city}". Please check the spelling and try again.`;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2. Weather Fetching: Get current weather using coordinates
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=auto`;
    const weatherResponse = await fetch(weatherUrl);

    if (!weatherResponse.ok) {
      throw new Error("Failed to connect to the weather service.");
    }

    const weatherData = await weatherResponse.json();
    const current = weatherData.current;

    const temp = current.temperature_2m;
    const feelsLike = current.apparent_temperature;
    const humidity = current.relative_humidity_2m;
    const windSpeed = current.wind_speed_10m;
    const description = getWeatherDescription(current.weather_code);

    return (
      `The current weather in ${name}, ${country} is: ${description}.\n` +
      `- Temperature: ${temp}°C (Feels like: ${feelsLike}°C)\n` +
      `- Humidity: ${humidity}%\n` +
      `- Wind Speed: ${windSpeed} km/h`
    );
  } catch (error) {
    console.error("Error fetching weather:", error);
    return `An unexpected error occurred while fetching the weather for ${city}. Please try again later.`;
  }
};

/**
 * A tool that fetches real weather data using the Open-Meteo API.
 */
export const getWeather = tool(_getWeather, {
  name: "get_weather",
  description:
    "Get the current accurate weather for a given city including temperature, humidity, and wind speed.",
  schema: z.object({
    city: z.string().describe("The name of the city to get weather for"),
  }),
});
