import express from "express";
import cors from "cors";
import axios from "axios";
import ImageKit from "imagekit";
import mongoose from "mongoose";
import Chat from "./models/chat.js";
import UserChats from "./models/userChats.js";
import { requireAuth} from "@clerk/express";

const port = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

// Image upload authentication
app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

//  Weather API Route
app.get("/api/weather/:location", async (req, res) => {
  const location = req.params.location;
  console.log(`🌍 Fetching weather data for: ${location}`);

  if (!location) {
    return res.status(400).json({ error: "❌ Invalid location parameter." });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: location,
          appid: process.env.WEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    console.log("✅ Weather API Response:", response.data);
    res.json({
      location: response.data.name,
      weather: response.data.weather[0].description,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind_speed: response.data.wind.speed,
    });
  } catch (error) {
    console.error(
      `❌ OpenWeather API Error:`,
      error.response?.data || error.message
    );
    res
      .status(error.response?.status || 500)
      .json({ error: "Error fetching weather data!" });
  }
});

//  Deutsche Bahn API Route
app.get("/api/deutschebahn", async (req, res) => {
  const { departure, destination } = req.query;
  console.log(
    `🚆 Fetching train data from ${departure} to ${destination}`
  );

  if (!departure || !destination) {
    return res
      .status(400)
      .json({
        error:
          "❌ Please provide both departure and destination parameters.",
      });
  }

  try {
    const dbApiUrl = `https://api.deutschebahn.com/timetables/v1/routes`;

    const response = await axios.get(dbApiUrl, {
      params: { departure, destination },
      headers: {
        "X-Client-ID": process.env.VITE_DB_CLIENT_ID,
        "X-API-Key": process.env.DB_API_KEY,
      },
    });

    console.log("✅ Deutsche Bahn API Response:", response.data);

    res.json(
      response.data.trains
        ? { trains: response.data.trains }
        : { error: "No train data found" }
    );
  } catch (error) {
    console.error(
      "❌ Error fetching train data:",
      error.response?.data || error.message
    );
    res
      .status(error.response?.status || 500)
      .json({ error: "Failed to fetch train data" });
  }
});

//  News API Route 
app.get("/api/news/:query", async (req, res) => {
  const query = req.params.query;
  console.log(`📰 Fetching news for: ${query}`);

  if (!query) {
    return res
      .status(400)
      .json({ error: "❌ Invalid query parameter." });
  }

  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: query,
        apiKey: process.env.NEWS_API_KEY, // Store this in your .env file
        language: "en",
        sortBy: "publishedAt",
        pageSize: 5, // Limit to top 5 articles
      },
    });

    console.log("✅ News API Response:", response.data);

    if (!response.data.articles.length) {
      return res
        .status(404)
        .json({ error: "No news found for this query." });
    }

    res.json(
      response.data.articles.map((article) => ({
        title: article.title,
        source: article.source.name,
        url: article.url,
      }))
    );
  } catch (error) {
    console.error(
      "❌ Error fetching news:",
      error.response?.data || error.message
    );
    res
      .status(error.response?.status || 500)
      .json({ error: "Error fetching news!" });
  }
});

// 💬 Create New Chat
app.post("/api/chats", requireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const { text } = req.body;

  try {
    const newChat = new Chat({
      userId,
      history: [{ role: "user", parts: [{ text }] }],
    });

    const savedChat = await newChat.save();
    await UserChats.updateOne(
      { userId },
      { $push: { chats: { _id: savedChat._id, title: text.substring(0, 40) } } },
      { upsert: true }
    );

    res.status(201).send(savedChat._id);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating chat!");
  }
});

// 💬 Fetch User Chats
app.get("/api/userchats", requireAuth(), async (req, res) => {
  const userId = req.auth.userId;

  try {
    const userChats = await UserChats.findOne({ userId });
    res.status(200).json(userChats?.chats || []);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching userchats!");
  }
});

// 💬 Fetch Chat by ID
app.get("/api/chats/:id", requireAuth(), async (req, res) => {
  const userId = req.auth.userId;

  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId });
    res.status(200).send(chat);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching chat!");
  }
});

//  Update Chat by ID
app.put("/api/chats/:id", requireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const { question, answer, img } = req.body;

  const newItems = [
    ...(question
      ? [
          {
            role: "user",
            parts: [{ text: question }],
            ...(img && { img }),
          },
        ]
      : []),
    { role: "model", parts: [{ text: answer }] },
  ];

  try {
    const updatedChat = await Chat.findOneAndUpdate(
      { _id: req.params.id, userId },
      { $push: { history: { $each: newItems } } },
      { new: true }
    );

    res.status(200).send(updatedChat);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating chat!");
  }
});

app.listen(port, () => {
  connect();
  console.log("🚀 Server running on port", port);
});
