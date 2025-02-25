import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthRoutes from "./routes/auth";

import "./index.css";
import App from "./components/App";
import logo from "./images/logo.svg";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
