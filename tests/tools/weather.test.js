import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { _getWeather } from "../../src/tools/weather.js";

describe("getWeather tool", () => {
  test("should return correct weather string for a given city", () => {
    const city = "San Francisco";
    const result = _getWeather({ city });
    assert.strictEqual(result, "It's always sunny in San Francisco!");
  });

  test("should handle different city names", () => {
    const city = "New York";
    const result = _getWeather({ city });
    assert.strictEqual(result, "It's always sunny in New York!");
  });
});
