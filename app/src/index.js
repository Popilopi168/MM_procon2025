import React from "react";
import ReactDOM from "react-dom/client";
import './input.css';

import App from "./App.js";
import Onboarding from "./pages/Onboarding.jsx";
import Home from "./pages/Home.jsx";
import Loading from "./pages/Loading.jsx";
import Stream from "./pages/Stream.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals.js";

import { PlayerProvider } from "./context/PlayerContext";
import TextAliveProvider from "./components/TextAliveProvider";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/onboarding", element: <Onboarding /> },
  { path: "/home", element: <Home /> },
  { path: "/loading", element: <Loading /> },
  { path: "/stream", element: <Stream /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PlayerProvider>
    <TextAliveProvider>
      <RouterProvider router={router} />
    </TextAliveProvider>
  </PlayerProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
