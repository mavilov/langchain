import * as z from "zod";
import { tool } from "langchain";

/**
 * This tool predicts nationality based on a person name.
 * It uses this public API: https://api.nationalize.io/?name=johnson
 */
export const getNationality = tool(
  async ({ name }) => {
    const response = await fetch(`https://api.nationalize.io/?name=${name}`);
    const data = await response.json();
    const countries = data.country;
    if (countries && countries.length > 0) {
      const textualResponse = countries
        .sort((a: any, b: any) => b.probability - a.probability)
        .map((country: any) => {
          return `Country: ${country.country_id}, Probability: ${Math.round(
            country.probability * 100
          )}%`;
        })
        .join("; ");

      return `The nationality of ${name} is most likely [${textualResponse}].`;
    }
    return `I couldn't determine the nationality of ${name}.`;
  },
  {
    name: "get_nationality",
    description: "Get the predicted nationality for a given name",
    schema: z.object({
      name: z.string(),
    }),
  }
);
