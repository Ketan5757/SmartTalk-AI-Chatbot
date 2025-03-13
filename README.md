# SmartTalk-AI

SmartTalk-AI is an AI-powered chat application that integrates real-time weather updates and the latest news using OpenWeather API and News API. The app also supports image analysis, code assistance, and interactive AI conversations.

## Features

- 🔹 **User Authentication**: Secure login and sign-up using **Clerk**.
- 🔹 **AI-Powered Chat**: Real-time AI chat responses powered by **Google's Gemini AI**.
- 🔹 **Live Weather Data**: Fetches **real-time weather updates** using **OpenWeather API**.
- 🔹 **Latest News Updates**: Retrieves **breaking news headlines** from **News API**.
- 🔹 **Combined Query Functionality**: Fetches **both weather and news in a single request**.
- 🔹 **Image Upload & Analysis**: Uses **ImageKit** for image processing.
- 🔹 **Code Assistance**: AI-powered help for coding-related questions.
- 🔹 **Dashboard & Chat Management**: Users can **manage multiple conversations**.
- 🔹 **React Router for Navigation**: Enables seamless routing.
- 🔹 **Vite for Fast Performance**: Ensures optimized builds.

## Tech Stack

| Technology        | Purpose |
|------------------|---------|
| **React.js**     | Frontend Framework |
| **Vite**         | Build Tool |
| **React Router** | Routing |
| **Clerk**        | Authentication |
| **Google Gemini AI** | AI Chatbot Functionality |
| **React Query**  | Data Fetching & Caching |
| **ImageKit**     | Image Upload & Processing |
| **OpenWeather API** | Fetches Live Weather Data |
| **News API**     | Fetches Latest News |
| **TanStack Query** | Optimized API Handling |
| **Tailwind CSS** | Styling |

## Project Structure

📦 SmartTalk-AI ├── 📂 src │ ├── 📂 components │ │ ├── ChatList.jsx │ │ ├── NewPrompt.jsx │ │ ├── Upload.jsx │ ├── 📂 layouts │ │ ├── RootLayout.jsx │ │ ├── DashboardLayout.jsx │ ├── 📂 routes │ │ ├── Homepage.jsx │ │ ├── DashboardPage.jsx │ │ ├── ChatPage.jsx │ │ ├── SignInPage.jsx │ │ ├── SignUpPage.jsx │ ├── 📂 styles │ │ ├── index.css │ ├── 📂 lib │ │ ├── gemini.js │ ├── App.jsx │ ├── main.jsx ├── .env ├── .gitignore ├── index.html ├── vite.config.js ├── package.json ├── README.md

bash
Copy
Edit

## Installation & Setup

### Prerequisites

Ensure you have **Node.js** and **npm** installed on your system.

### Clone the Repository

```sh
git clone https://github.com/yourusername/SmartTalk-AI.git
cd SmartTalk-AI
Install Dependencies
sh
Copy
Edit
npm install
Install ImageKit Dependency
sh
Copy
Edit
npm install imagekitio-react
Environment Variables
Create a .env file in the root directory and add the following:

ini
Copy
Edit
VITE_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
VITE_IMAGE_KIT_ENDPOINT=your-imagekit-endpoint
VITE_IMAGE_KIT_PUBLIC_KEY=your-imagekit-public-key
VITE_GEMINI_PUBLIC_KEY=your-gemini-api-key
VITE_API_URL=http://localhost:3000
VITE_OPENWEATHER_API_KEY=your-openweather-api-key
VITE_NEWS_API_KEY=your-news-api-key
Run the Project
sh
Copy
Edit
npm run dev