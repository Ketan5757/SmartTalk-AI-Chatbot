import { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const endRef = useRef(null);
  const formRef = useRef(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      console.log("🔄 Updating chat history:", { question, answer, img });
      return axios.put(
        `${import.meta.env.VITE_API_URL}/api/chats/${data._id}`,
        {
          question: question.length ? question : undefined,
          answer,
          img: img.dbData?.filePath || undefined,
        },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      console.log("✅ Chat history updated!");
      queryClient.invalidateQueries({ queryKey: ["chat", data._id] });

      data.history.push({ role: "user", parts: [{ text: question }] });
      data.history.push({ role: "model", parts: [{ text: answer }] });

      formRef.current.reset();
      setQuestion("");
      setAnswer("");
      setImg({ isLoading: false, error: "", dbData: {}, aiData: {} });
    },
  });

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data, question, answer, img.dbData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value.trim();
    if (!text) return;

    setQuestion(text);
    setLoading(true);
    console.log("🟢 User input received:", text);

    try {
      const chat = model.startChat({
        history:
          data?.history?.map((message) => ({
            role: message.role,
            parts: [{ text: message.parts[0].text }],
          })) || [],
        generationConfig: {},
      });

      // 🔹 Gemini prompt update: Detect weather, train, or news queries.
      const input = [
        {
          text: `You are an AI chatbot. Identify if the user is asking about the weather, train journeys with Deutsche Bahn, or news.
          
- If it's a weather query, extract the city and return JSON like:
  { "weather_query": true, "location": "Mannheim" }
  
- If it's a train query, extract the departure and destination and return JSON like:
  { "train_query": true, "departure": "Mannheim", "destination": "Heidelberg" }
  
- If it's a news query, extract the topic or location and return JSON like:
  { "news_query": true, "query": "Mannheim" }
  
- If it's neither, return:
  { "weather_query": false, "train_query": false, "news_query": false }
  
User message: "${text}"`
        },
      ];

      console.log("🔵 Sending query to Gemini...");
      const result = await chat.sendMessageStream(input);

      let accumulatedText = "";
      for await (const chunk of result.stream) {
        accumulatedText += chunk.text();
      }

      console.log("📝 Gemini Raw Response:", accumulatedText);

      try {
        // 🔹 Clean and parse the Gemini response.
        const cleanText = accumulatedText.replace(/```json|```/g, "").trim();
        const parsedResponse = JSON.parse(cleanText);

        // ADD: Combined weather & news query functionality
        if (
          parsedResponse.weather_query &&
          parsedResponse.location &&
          parsedResponse.news_query &&
          parsedResponse.query
        ) {
          console.log("🔄 Detected combined weather and news query.");
          const [weatherRes, newsRes] = await Promise.all([
            axios.get(
              `${import.meta.env.VITE_API_URL}/api/weather/${encodeURIComponent(
                parsedResponse.location
              )}`,
              { withCredentials: true }
            ),
            axios.get(
              `${import.meta.env.VITE_API_URL}/api/news/${encodeURIComponent(
                parsedResponse.query
              )}`,
              { withCredentials: true }
            ),
          ]);

          let combinedText = "";

          // Process weather response:
          const {
            weather,
            temperature,
            humidity,
            wind_speed,
            rain_chance,
            air_quality,
          } = weatherRes.data;
          combinedText += `🌤️ **Weather Report for ${parsedResponse.location}:**  
- 🌡️ Temperature: **${temperature}°C**  
- ☁️ Condition: **${weather}**  
- 💧 Humidity: **${humidity}%**  
- 💨 Wind Speed: **${wind_speed} m/s**  
${rain_chance ? `- 🌧️ Chance of Rain: **${rain_chance}%**` : ""}  
${air_quality ? `- 🌍 Air Quality Index (AQI): **${air_quality}**` : ""}\n\n`;

          // Process news response:
          const articles = newsRes.data;
          combinedText += `📰 **Latest news for "${parsedResponse.query}":**\n`;
          articles.forEach((article) => {
            combinedText += `- **${article.title}** from ${article.source} ([Read More](${article.url}))\n`;
          });

          setAnswer(combinedText);
          await new Promise((resolve) => setTimeout(resolve, 100));
          await mutation.mutateAsync();
          setLoading(false);
          return;
        }

        // 🔹 Check if the query is a train query.
        if (
          parsedResponse.train_query &&
          parsedResponse.departure &&
          parsedResponse.destination
        ) {
          console.log(
            "🚆 Detected train query from",
            parsedResponse.departure,
            "to",
            parsedResponse.destination
          );
          const trainRes = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/deutschebahn?departure=${encodeURIComponent(
              parsedResponse.departure
            )}&destination=${encodeURIComponent(parsedResponse.destination)}`,
            { withCredentials: true }
          );
          const trains = trainRes.data.trains;
          let trainText = `🚆 **Train options from ${parsedResponse.departure} to ${parsedResponse.destination}:**\n`;
          trains.forEach((train) => {
            trainText += `- ${train.name} departing at ${train.departureTime}, arriving at ${train.arrivalTime}\n`;
          });
          setAnswer(trainText);
          await new Promise((resolve) => setTimeout(resolve, 100));
          await mutation.mutateAsync();
          setLoading(false);
          return;
        }

        // 🔹 Check if the query is a weather query.
        if (parsedResponse.weather_query && parsedResponse.location) {
          console.log(
            "🌤️ Gemini detected a weather query for:",
            parsedResponse.location
          );
          const weatherRes = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/weather/${encodeURIComponent(
              parsedResponse.location
            )}`,
            { withCredentials: true }
          );
          const {
            weather,
            temperature,
            humidity,
            wind_speed,
            rain_chance,
            air_quality,
          } = weatherRes.data;

          const weatherText = `🌤️ **Weather Report for ${parsedResponse.location}:**  
          - 🌡️ Temperature: **${temperature}°C**  
          - ☁️ Condition: **${weather}**  
          - 💧 Humidity: **${humidity}%**  
          - 💨 Wind Speed: **${wind_speed} m/s**  
          ${rain_chance ? `- 🌧️ Chance of Rain: **${rain_chance}%**` : ""}  
          ${air_quality ? `- 🌍 Air Quality Index (AQI): **${air_quality}**` : ""} `;
          
          setAnswer(weatherText);
          await new Promise((resolve) => setTimeout(resolve, 100));
          await mutation.mutateAsync();
          setLoading(false);
          return;
        }

        // 🔹 Check if the query is a news query.
        if (parsedResponse.news_query && parsedResponse.query) {
          console.log(
            "📰 Gemini detected a news query for:",
            parsedResponse.query
          );
          const newsRes = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/news/${encodeURIComponent(
              parsedResponse.query
            )}`,
            { withCredentials: true }
          );
          const articles = newsRes.data;
          let newsText = `📰 **Latest news for "${parsedResponse.query}":**\n`;
          articles.forEach((article) => {
            newsText += `- **${article.title}** from ${article.source} ([Read More](${article.url}))\n`;
          });
          setAnswer(newsText);
          await new Promise((resolve) => setTimeout(resolve, 100));
          await mutation.mutateAsync();
          setLoading(false);
          return;
        }
      } catch (err) {
        console.log("📝 Gemini did not return valid JSON, using normal response.");
      }

      // Fallback: if none of the special queries are detected, get a normal AI response.
      console.log("🔵 Not a weather, train, or news query, fetching normal AI response...");
      const inputMessage = Object.entries(img.aiData).length
        ? [img.aiData, { text }]
        : [{ text }];
      const aiResponse = await chat.sendMessageStream(inputMessage);
      let aiText = "";
      for await (const chunk of aiResponse.stream) {
        aiText += chunk.text();
      }
      setAnswer(aiText);
      await new Promise((resolve) => setTimeout(resolve, 100));
      await mutation.mutateAsync();
      setLoading(false);
    } catch (err) {
      console.error("❌ Gemini API error:", err);
      setAnswer("⚠️ An error occurred, please try again.");
    } finally {
      setLoading(false);
    }

    formRef.current.reset();
  };

  return (
    <>
      {loading && <div>⏳ Processing your request...</div>}
      {img.isLoading && <div>⏳ Uploading image...</div>}

      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}
        />
      )}

      {question && <div className="message user">{question}</div>}
      {answer && <div className="message"><Markdown>{answer}</Markdown></div>}

      <div className="endChat" ref={endRef}></div>

      <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
        <Upload setImg={setImg} />
        <input type="text" name="text" placeholder="Ask me anything..." required />
        <button type="submit">
          <img src="/arrow.png" alt="Send" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
