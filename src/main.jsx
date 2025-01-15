import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './routes/homepage/homepage';
import Rootlayout from './layouts/rootlayout/rootlayout';
import Dashboardlayout from './layouts/dashboardlayout/dashboardlayout';
import Dashboard from './routes/dashboard/dashboard';
import Chatpage from './routes/chatpage/chatpage';

const router = createBrowserRouter([
  {
    element: <Rootlayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        element: <Dashboardlayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/dashboard/chats/:id",
            element: <Chatpage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
