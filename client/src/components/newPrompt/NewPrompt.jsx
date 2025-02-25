import { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from 'axios';

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

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
      return axios.put(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        question: question.length ? question : undefined,
        answer,
        img: img.dbData?.filePath || undefined,
      }, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value.trim();
    if (!text) return;

    setQuestion(text);

    const locationMatch = text.match(/weather in ([a-zA-Z\s]+)/i);

    if (locationMatch) {
      const location = locationMatch[1].split(" ")[0].trim();

      try {
        const weatherRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/weather/${location}`, { withCredentials: true });

        const weatherInfo = weatherRes.data;
        const weatherText = `The current weather in ${weatherInfo.location} is ${weatherInfo.weather}. The temperature is ${weatherInfo.temperature}°C, humidity is around ${weatherInfo.humidity}%, and wind speed is ${weatherInfo.wind_speed} m/s.`;

        setAnswer(weatherText);
        mutation.mutate();
      } catch (error) {
        console.error(error);
        setAnswer("I'm having trouble fetching the weather right now. Please try again later.");
      }
    } else {
      try {
        const chat = model.startChat({ generationConfig: {} });
        const result = await chat.sendMessageStream([text]);

        let accumulatedText = "";
        for await (const chunk of result.stream) {
          accumulatedText += chunk.text();
          setAnswer(accumulatedText);
        }

        mutation.mutate();
      } catch (err) {
        setAnswer("An error occurred, please try again.");
      }
    }

    formRef.current.reset();
  };

  return (
    <>
      {img.isLoading && <div>Loading...</div>}

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
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" name="text" placeholder="Ask me anything..." />
        <button type="submit">
          <img src="/arrow.png" alt="Send" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
