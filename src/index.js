import { createAgent } from "langchain";
import { getWeather } from "./tools/weather.js";
import { getNationality } from "./tools/nationality.js";

const agent = createAgent({
  model: "ollama:llama3.1",
  tools: [getWeather, getNationality],
});

const response = await agent.invoke({
  messages: [{ role: "user", content: "What's the weather in Tokyo?" }],
});

/* const response = await agent.invoke({
  messages: [
    {
      role: "user",
      content: "What's the nationality of a person named Abo Toyota?",
    },
  ],
});
 */
response.messages.forEach((message) => console.log(message.content));
