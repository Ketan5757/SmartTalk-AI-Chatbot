import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './routes/homepage/homepage';
import Dashboard from './routes/dashboard/dashboard';
import Chatpage from './routes/chatpage/chatpage'; // Fixed import name

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/dashboard',
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/dashboard/chats/:id', element: <Chatpage /> }, // Fixed component usage
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
