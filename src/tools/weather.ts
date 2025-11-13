import { tool } from "langchain";
import * as z from "zod";

/**
 * A standard tool example that is a mock weather fetching tool.
 */
export const getWeather = tool(({ city }) => `It's always sunny in ${city}!`, {
  name: "get_weather",
  description: "Get the weather for a given city",
  schema: z.object({
    city: z.string(),
  }),
});
