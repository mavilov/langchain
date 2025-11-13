import { createAgent } from "langchain";
import { getWeather } from "./tools/weather.ts";
import { getNationality } from "./tools/nationality.ts";

const agent = createAgent({
  model: "ollama:llama3.1",
  tools: [getWeather, getNationality],
});

/* const response = await agent.invoke({
  messages: [{ role: "user", content: "What's the weather in Tokyo?" }],
});
 */

const response = await agent.invoke({
  messages: [
    {
      role: "user",
      content: "What's the nationality of a person named Abo Toyota?",
    },
  ],
});

console.log(response);
