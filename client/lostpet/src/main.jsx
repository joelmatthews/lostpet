import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'

import Root from "./pages/Root";
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/Home';
import LostPetIndex from './pages/LostPetIndex';

import { loader as rootLoader } from './pages/Root';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    id: "root",
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "lostpets",
        element: <LostPetIndex />,
      }
    ]
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
