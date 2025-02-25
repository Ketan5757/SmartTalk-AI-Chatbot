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
      formRef.current.reset();
      setQuestion("");
      setAnswer("");
      setImg({ isLoading: false, error: "", dbData: {}, aiData: {} });
    },
  });

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data, question, answer, img.dbData]);

  // 🔹 Enhanced Weather Query Detection
  const isWeatherQuery = (text) => {
    const keywords = ["weather", "temperature", "forecast", "humidity", "wind"];
    return keywords.some((keyword) => text.toLowerCase().includes(keyword));
  };

  // 🔹 Improved Location Extraction
  const extractLocation = (text) => {
    const words = text.toLowerCase().split(" ");
    return words.find((word) => !["weather", "temperature", "forecast", "humidity", "wind", "is", "the", "in", "what"].includes(word));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value.trim();
    if (!text) return;

    setQuestion(text);
    setLoading(true);

    console.log("🟢 User input received:", text);

    // Weather Query Handling
    if (isWeatherQuery(text)) {
      console.log("🌤️ Detected a weather-related query. Processing...");

      let location = extractLocation(text);
      if (location) {
        location = location.charAt(0).toUpperCase() + location.slice(1);
        console.log("🌍 Extracted location:", location);

        try {
          const weatherRes = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/weather/${encodeURIComponent(location)}`,
            { withCredentials: true }
          );

          console.log("✅ Weather API Response:", weatherRes.data);
          if (weatherRes.data.error) {
            setAnswer("❌ City not found. Please enter a valid location.");
            setLoading(false);
            return;
          }

          const weatherInfo = weatherRes.data;
          const weatherText = `🌤️ The current weather in **${weatherInfo.location}** is **${weatherInfo.weather}**.
            - 🌡️ Temperature: **${weatherInfo.temperature}°C**
            - 💧 Humidity: **${weatherInfo.humidity}%**
            - 💨 Wind Speed: **${weatherInfo.wind_speed} m/s**`;

          console.log("📩 Setting weather answer in chat:", weatherText);
          setAnswer(weatherText);
          mutation.mutate();
          setLoading(false);
          return;
        } catch (error) {
          console.error("❌ Weather API error:", error.response?.data || error.message);
          setAnswer("⚠️ Unable to fetch the weather. Please try again later.");
          setLoading(false);
          return;
        }
      } else {
        console.log("❌ No valid location found in query. Sending to AI model.");
      }
    }

    console.log("🔵 Not a weather query. Sending to AI model...");

    try {
      const chat = model.startChat({ generationConfig: {} });
      const result = await chat.sendMessageStream([text]);

      let accumulatedText = "";
      for await (const chunk of result.stream) {
        accumulatedText += chunk.text();
        console.log("📝 Received AI response chunk:", chunk.text());
        setAnswer(accumulatedText);
      }

      console.log("✅ Final AI answer:", accumulatedText);
      mutation.mutate();
    } catch (err) {
      console.error("❌ AI model error:", err);
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
