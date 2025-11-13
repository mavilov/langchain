import { tool } from "langchain";
import * as z from "zod";

export const _getWeather = ({ city }) => `It's always sunny in ${city}!`;

/**
 * A standard tool example that is a mock weather fetching tool.
 */
export const getWeather = tool(_getWeather, {
  name: "get_weather",
  description: "Get the weather for a given city",
  schema: z.object({
    city: z.string(),
  }),
});
