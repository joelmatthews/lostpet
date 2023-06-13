import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'

import Root from "./pages/Root";
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/Home';
import LostPetRootLayout from './pages/LostPetRootLayout';
import LostPetIndex from './pages/LostPetIndex';
import LoginPage from './pages/Login';
import LostPetShowPage from './pages/LostPetShowPage';

import { loader as rootLoader } from './pages/Root';
import { action as registerAction } from './pages/Home';
import { loader as indexDataLoader } from './pages/Home';
import { loader as lostPetLoader } from './pages/LostPetIndex';
import { loader as lostPetShowLoader } from './pages/LostPetShowPage';
import { action as lostPetDeleteAction } from './pages/LostPetShowPage';
import { action as loginAction } from './pages/Login';
import { action as logoutAction } from './pages/Logout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: registerAction,
    id: "root",
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: indexDataLoader,
      },
      {
        path: "lostpets",
        element: <LostPetRootLayout />,
        children: [
          {
            index: true,
            element: <LostPetIndex />,
            loader: lostPetLoader,
            id: 'index'
          },
          {
            path: ':lostPetId',
            id: 'lostPetShow',
            loader: lostPetShowLoader,
            children: [
              {
                index: true,
                element: <LostPetShowPage />,
                action: lostPetDeleteAction
              }
            ]
          }
        ]
      },
      {
        path: "login",
        element: <LoginPage />,
        action: loginAction
      },
      {
        path: "logout",
        action: logoutAction
      }
    ]
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
