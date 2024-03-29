import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import LocalizationContextProvider from "./contexts/DateLocalizationProvider";
import MUITheme from "./contexts/MUITheme";

import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/Home";
import LostPetRootLayout from "./pages/LostPetRootLayout";
import LostPetIndex from "./pages/LostPetIndex";
import LoginPage from "./pages/Login";
import LostPetShowPage from "./pages/LostPetShowPage";
import LostPetNew from "./pages/LostPetNew";
import LostPetEdit from "./pages/LostPetEdit";

import { loader as rootLoader } from "./pages/Root";
import { action as registerAction } from "./pages/Home";
import { loader as indexDataLoader } from "./pages/Home";
import { loader as lostPetLoader } from "./pages/LostPetIndex";
import { action as lostPetNewAction } from "./pages/LostPetNew";
import { loader as lostPetEditLoader } from "./pages/LostPetEdit";
import { action as lostPetEditAction } from "./pages/LostPetEdit";
import { loader as lostPetShowLoader } from "./pages/LostPetShowPage";
import { action as lostPetDeleteAction } from "./pages/LostPetShowPage";
import { action as loginAction } from "./pages/Login";
import { action as logoutAction } from "./pages/Logout";

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
            id: "index",
          },
          {
            path: "new",
            id: "new",
            element: <LostPetNew />,
            action: lostPetNewAction,
          },
          {
            path: ":lostPetId",
            id: "lostPetShow",
            loader: lostPetShowLoader,
            children: [
              {
                index: true,
                element: <LostPetShowPage />,
                action: lostPetDeleteAction,
              },
              {
                path: "edit",
                element: <LostPetEdit />,
                action: lostPetEditAction,
                loader: lostPetEditLoader,
              },
            ],
          },
        ],
      },
      {
        path: "login",
        element: <LoginPage />,
        action: loginAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MUITheme>
      <LocalizationContextProvider>
        <RouterProvider router={router} />
      </LocalizationContextProvider>
    </MUITheme>
  </React.StrictMode>
);
