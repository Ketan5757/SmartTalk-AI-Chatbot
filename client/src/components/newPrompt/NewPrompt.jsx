import { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const NewPrompt = ({ data }) => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const [img, setImg] = useState({
        isLoading: false,
        error: "",
        dbData: {},
        aiData: {},
    });

    // Initialize chat model
    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: "Hello, I have 2 dogs in my house." }],
            },
            {
                role: "model",
                parts: [{ text: "Great to meet you. What would you like to know?" }],
            },
        ],
        generationConfig: {},
    });

    const endRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [data, question, answer, img.dbData]);

    const queryClient = useQueryClient();

    // Mutation for updating chat history
    const mutation = useMutation({
        mutationFn: async () => {
            return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question: question.length ? question : undefined,
                    answer,
                    img: img.dbData?.filePath || undefined,
                }),
            }).then((res) => res.json());
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chat", data._id] }).then(() => {
                formRef.current.reset()
                setQuestion("");
                setAnswer("");
                setImg({
                    isLoading: false,
                    error: "",
                    dbData: {},
                    aiData: {},
                });
            });
        },
        onError: (err) => {
            console.error("Error updating chat:", err);
        },
    });

    // Function to handle sending a message
    const add = async (text, isInitial) => {
        if (!isInitial) setQuestion(text);

        try {
            const result = await chat.sendMessageStream(
                Object.entries(img.aiData).length ? [img.aiData, text] : [text]
            );

            let accumulatedText = "";

            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                console.log("Chunk received:", chunkText);
                accumulatedText += chunkText;
                setAnswer(accumulatedText);
            }

            mutation.mutate();
        } catch (err) {
            console.error("Error in chat response:", err);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const text = e.target.text.value.trim();
        if (!text) return;

        add(text, false);
    };

    //IN PRODUCTION WE DONT NEED IT
    const hasRun = useRef(false)
    useEffect(() => {
        if (!hasRun.current) {
            if (data?.history?.length === 1) {
                add(data.history[0].parts[0].text, true);
            }
        }
        hasRun.current = true;
    }, []);

    return (
        <>
            {/* Loading Indicator */}
            {img.isLoading && <div>Loading...</div>}

            {/* Display Image if Available */}
            {img.dbData?.filePath && (
                <IKImage
                    urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                    path={img.dbData?.filePath}
                    width="380"
                    transformation={[{ width: 380 }]}
                />
            )}

            {/* User's Question */}
            {question && <div className="message user">{question}</div>}

            {/* AI's Response */}
            {answer && <div className="message"><Markdown>{answer}</Markdown></div>}

            {/* Scroll to Bottom */}
            <div className="endChat" ref={endRef}></div>

            {/* Input Form */}
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
