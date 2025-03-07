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

      // 🔹 Immediately update local UI instead of waiting for re-fetch
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

  // 🔹 Enhanced Weather Query Detection
  const isWeatherQuery = (text) => {
    const keywords = ["weather", "temperature", "forecast", "humidity", "wind"];
    return keywords.some((keyword) => text.toLowerCase().includes(keyword));
  };

  // 🔹 Improved Location Extraction
  const extractLocation = (text) => {
    const words = text.toLowerCase().split(" ");
    const stopWords = [
      "weather", "temperature", "forecast", "humidity", "wind",
      "is", "the", "in", "what", "how", "whats", "was", "will", "be",
      "yesterday", "today", "tomorrow", "next", "day", "week", "month", "sunny", "cloudy"
    ];

    // Filter out stopwords and join the rest as the location
    const filteredWords = words.filter(word => !stopWords.includes(word));

    // Capitalize first letter of each word (for correct formatting)
    const location = filteredWords.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    console.log("🔍 Corrected Extracted Location:", location); // Debugging log

    return location || null;
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

          console.log("✅ Weather API Request:", `${import.meta.env.VITE_API_URL}/api/weather/${encodeURIComponent(location)}`); // Debugging log
          console.log("✅ Weather API Response:", weatherRes.data);
          if (!location || location.trim() === "") {
            setAnswer("❌ I couldn't detect a valid location. Please specify a city name.");
            setLoading(false);
            return;
          }

          const weatherInfo = weatherRes.data;
          const weatherText = `🌤️ The current weather in **${weatherInfo.location}** is **${weatherInfo.weather}**.
            - 🌡️ Temperature: **${weatherInfo.temperature}°C**
            - 💧 Humidity: **${weatherInfo.humidity}%**
            - 💨 Wind Speed: **${weatherInfo.wind_speed} m/s**`;

          console.log("📩 Before setting answer:", answer);
          setAnswer(weatherText);

          await new Promise((resolve) => setTimeout(resolve, 100)); // Ensures state updates

          console.log("📩 After setting answer:", answer);  // Confirm that answer is set

          await mutation.mutateAsync();  // Wait for chat update
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
      const chat = model.startChat({
        history: data?.history?.map((message) => ({
          role: message.role,
          parts: [{ text: message.parts[0].text }],
        })) || [],
        generationConfig: {},
      });

      // const input = [
      //   ...data?.history?.map((message) => message.parts[0].text) || [],
      //   img.dbData?.filePath ? [img.dbData, text] : text,
      // ];
      // const input = [     ...data?.history?.map((message) => ({ text: message.parts[0].text })) || [],     ...(img.dbData?.filePath ? [{ text }, img.dbData] : [{ text }]) ];


      const input = [
        ...(data?.history?.map((message) => ({ text: message.parts[0].text })) || []),
        ...(img.dbData?.base64
          ? [
            { text }, // Add the text message
            {
              inlineData: {
                mimeType: img.dbData.mimeType || "image/png", // Adjust the mimeType dynamically
                data: img.dbData.base64 // Now properly passing base64-encoded data
              }
            }
          ]
          : [{ text }]
        ),
      ];

      console.log('----------', input)

      const result = await chat.sendMessageStream(input);


      let accumulatedText = "";
      for await (const chunk of result.stream) {
        accumulatedText += chunk.text();
        console.log("📝 AI Response Chunk:", chunk.text());

        // If AI asks for an image, log the request
        if (chunk.text().toLowerCase().includes("please provide an image")) {
          console.warn("⚠️ AI is asking for an image, but none was detected.");
        }

        setAnswer((prev) => prev + chunk.text());
      }

      // Ensure the final AI answer is set before updating chat history
      await new Promise((resolve) => setTimeout(resolve, 100));

      console.log("✅ Final AI answer:", accumulatedText);

      // Force re-render by calling setAnswer again
      setAnswer(accumulatedText);

      // Ensure chat history is updated before UI refresh
      data.history.push({ role: "user", parts: [{ text: question }] });
      data.history.push({ role: "model", parts: [{ text: answer }] });
      await mutation.mutateAsync();

      setLoading(false);


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
