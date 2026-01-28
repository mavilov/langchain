import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { _getWeather } from "../../src/tools/weather.js";

describe("getWeather tool", () => {
  test("should return weather information for a given city", async () => {
    const city = "San Francisco";
    const result = await _getWeather({ city });

    // Check that the response contains basic weather info
    assert.ok(
      result.includes("San Francisco"),
      "Response should include the city name",
    );
    assert.ok(
      result.includes("Temperature"),
      "Response should include temperature information",
    );
    assert.ok(result.includes("°C"), "Response should include Celsius unit");
  });

  test("should handle city not found", async () => {
    const city = "ThisCityDoesNotExist12345";
    const result = await _getWeather({ city });
    assert.ok(
      result.includes("couldn't find a city"),
      "Should return a user-friendly error for unknown cities",
    );
  });
});
