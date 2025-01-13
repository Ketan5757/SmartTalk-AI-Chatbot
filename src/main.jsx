import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from "./routes/homepage/homepage"
import Dashboard from "./routes/dashboard/dashboard"
import chatpage  from "./routes/chatpage/chatpage"



const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>
  },
  {
    path: "/dashboard",
    
    children:[
      {path:"/dashboard", element: <Dashboard/>},
      {path:"/dashboard/chats/:id", element: <chatpage/>},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
