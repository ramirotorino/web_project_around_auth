import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { login, register } from "./utils/auth.js";

import AuthRoutes from "./routes/auth.jsx";

import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import "./index.css";
import App from "./components/App";
import logo from "./images/logo.svg";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/signin"
          element={
            <SignIn onLogin={(email, password) => login(email, password)} />
          }
        />
        <Route
          path="/signup"
          element={
            <SignUp
              onRegister={(email, password) => register(email, password)}
            />
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
