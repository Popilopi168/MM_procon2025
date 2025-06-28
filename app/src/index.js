import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home.jsx";
import Loading from "./pages/Loading";
import Stream from "./pages/Stream";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/onboarding", element: <Onboarding /> },
  { path: "/home", element: <Home /> },
  { path: "/loading", element: <Loading /> },
  { path: "/stream", element: <Stream /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
