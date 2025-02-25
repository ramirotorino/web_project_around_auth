import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./components/App";
import logo from "./images/logo.svg";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
