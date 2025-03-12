import express from "express";
import cors from "cors";
import axios from "axios";
import ImageKit from "imagekit";
import mongoose from "mongoose";
import Chat from "./models/chat.js";
import UserChats from "./models/userChats.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

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

// Weather API route
app.get("/api/weather/:location", async (req, res) => {
  const location = req.params.location;
  console.log(`🌍 Fetching weather data for: ${location}`);

  if (!location) {
    return res
      .status(400)
      .json({ error: "❌ Invalid location parameter." });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: location,
          appid: process.env.WEATHER_API_KEY, // Ensure API Key is correct
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
    if (error.response) {
      console.error(
        `❌ OpenWeather API Error:`,
        error.response.data
      );
      res
        .status(error.response.status)
        .json({ error: error.response.data.message || "Error fetching weather data!" });
    } else {
      console.error(`❌ Internal Server Error:`, error.message);
      res
        .status(500)
        .json({ error: "Internal server error while fetching weather data!" });
    }
  }
});

// Deutsche Bahn API route with improved error logging
app.get("/api/deutschebahn", async (req, res) => {
  const { departure, destination } = req.query;
  console.log(`🚆 Fetching train data from ${departure} to ${destination}`);

  if (!departure || !destination) {
    return res.status(400).json({ error: "❌ Please provide both departure and destination parameters." });
  }

  try {
    // Replace the URL below with the actual Deutsche Bahn API endpoint.
    const dbApiUrl = `https://api.deutschebahn.com/timetables/v1/routes`;

    const response = await axios.get(dbApiUrl, {
      params: {
        departure,
        destination,
      },
      headers: {
        'X-Client-ID': process.env.VITE_DB_CLIENT_ID,
        'X-API-Key': process.env.DB_API_KEY,
      } 
    });

    // Log the external API response for debugging
    console.log("✅ Deutsche Bahn API Response:", response.data);

    if (response.data && response.data.trains) {
      res.json({ trains: response.data.trains });
    } else {
      console.error("❌ No train data found in the response.");
      res.status(404).json({ error: "No train data found" });
    }
  } catch (error) {
    if (error.response) {
      console.error("❌ Error fetching train data:", error.response.data);
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      console.error("❌ Error fetching train data:", error.message);
      res.status(500).json({ error: "Failed to fetch train data" });
    }
  }
});

// Create new chat
app.post("/api/chats", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const { text } = req.body;

  try {
    const newChat = new Chat({
      userId,
      history: [{ role: "user", parts: [{ text }] }],
    });

    const savedChat = await newChat.save();

    const userChats = await UserChats.find({ userId });

    if (!userChats.length) {
      const newUsersChats = new UserChats({
        userId,
        chats: [{ _id: savedChat._id, title: text.substring(0, 40) }],
      });
      await newUsersChats.save();
    } else {
      await UserChats.updateOne(
        { userId },
        { $push: { chats: { _id: savedChat._id, title: text.substring(0, 40) } } }
      );
    }

    res.status(201).send(savedChat._id);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating chat!");
  }
});

// Fetch user chats
app.get("/api/userchats", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;

  try {
    const userChats = await UserChats.findOne({ userId });
    if (!userChats) return res.status(200).json([]);
    res.status(200).send(userChats.chats);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching userchats!");
  }
});

// Fetch chat by ID
app.get("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;

  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId });
    res.status(200).send(chat);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching chat!");
  }
});

// Update chat by ID
app.put("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const { question, answer, img } = req.body;

  const newItems = [
    ...(question ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }] : []),
    { role: "model", parts: [{ text: answer }] },
  ];

  try {
    const updatedChat = await Chat.findOneAndUpdate(
      { _id: req.params.id, userId },
      { $push: { history: { $each: newItems } } },
      { new: true } // Ensures the updated chat is returned
    );

    res.status(200).send(updatedChat);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating chat!");
  }
});

app.listen(port, () => {
  connect();
  console.log("Server running on port", port);
});
