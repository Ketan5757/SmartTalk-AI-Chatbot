import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// 1️⃣ Get Weather Data (Frontend calls Backend)
export const getWeather = async (city) => {
  try {
    const response = await axios.get(`${API_URL}/api/weather/${city}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching weather:", error);
    return null;
  }
};

// 2️⃣ Get Train Schedules (Frontend calls Backend)
export const getTrainSchedule = async (station) => {
  try {
    const response = await axios.get(`${API_URL}/api/trains/${station}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching train schedule:", error);
    return null;
  }
};

// 3️⃣ Get Route Directions (Frontend calls Backend)
export const getRoute = async (origin, destination) => {
  try {
    const response = await axios.get(`${API_URL}/api/routes/${origin}/${destination}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching route:", error);
    return null;
  }
};
