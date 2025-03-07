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
          img: img.dbData?.filePath ? { filePath: img.dbData.filePath } : undefined,
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
        history: data?.history?.map((message) => ({
          role: message.role,
          parts: [{ text: message.parts[0].text }],
        })) || [],
        generationConfig: {},
      });

      // 🔹 Ask Gemini to detect if the query is about weather
      const input = [{
        text: `You are an AI chatbot. Identify if the user is asking about the weather.
        
        - If it's a weather query, extract the city and return JSON like:
          { "weather_query": true, "location": "Mannheim" }
        
        - If it's NOT a weather query, return:
          { "weather_query": false }  

        User message: "${text}"`
      }];

      console.log("🔵 Sending query to Gemini...");
      const result = await chat.sendMessageStream(input);

      let accumulatedText = "";
      for await (const chunk of result.stream) {
        accumulatedText += chunk.text();
      }

      console.log("📝 Gemini Raw Response:", accumulatedText);

      try {
        // 🔹 Clean response (removes markdown formatting if present)
        const cleanText = accumulatedText.replace(/```json|```/g, "").trim();
        const parsedResponse = JSON.parse(cleanText);

        // 🔹 If Gemini says it's NOT a weather query, get a normal AI response
        if (parsedResponse.weather_query === false) {
          console.log("🔵 Not a weather query, fetching normal AI response...");

          const aiResponse = await chat.sendMessageStream([{ text }]);
          let aiText = "";

          for await (const chunk of aiResponse.stream) {
            aiText += chunk.text();
          }

          setAnswer(aiText);
          await new Promise((resolve) => setTimeout(resolve, 100));
          await mutation.mutateAsync();
          setLoading(false);
          return;
        }

        // 🔹 If Gemini detected a weather query, fetch weather data
        if (parsedResponse.weather_query && parsedResponse.location) {
          console.log("🌤️ Gemini detected a weather query for:", parsedResponse.location);

          const weatherRes = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/weather/${encodeURIComponent(parsedResponse.location)}`,
            { withCredentials: true }
          );

          const { 
            weather, temperature, humidity, wind_speed, feels_like, 
            rain_chance, sunrise, sunset, air_quality 
          } = weatherRes.data;

          const formatTime = (timestamp) => {
              const date = new Date(timestamp * 1000);
              return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          };

          // 🔹 Generate a realistic weather report
          const weatherText = `🌤️ **Weather Report for ${parsedResponse.location}:**  
          - 🌡️ Temperature: **${temperature}°C** 
          - ☁️ Condition: **${weather}**  
          - 💧 Humidity: **${humidity}%**  
          - 💨 Wind Speed: **${wind_speed} m/s**  
          ${rain_chance ? `- 🌧️ Chance of Rain: **${rain_chance}%**` : ""}  
          ${air_quality ? `- 🌍 Air Quality Index (AQI): **${air_quality}**` : ""} `
          

          console.log("✅ Enhanced Weather Response Generated:", weatherText);

          setAnswer(weatherText);
          await new Promise((resolve) => setTimeout(resolve, 100));
          await mutation.mutateAsync();
          setLoading(false);
          return;
        }
      } catch (err) {
        console.log("📝 Gemini did not return JSON, using normal response.");
      }

      setAnswer(accumulatedText);
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
