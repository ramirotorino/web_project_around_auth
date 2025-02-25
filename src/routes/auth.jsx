import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

import App from "../components/App.jsx";

// Simulación de autenticación (debes reemplazar esto con tu lógica real)
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const AuthRoutes = () => {
  return (
    <Routes>
      {/* Ruta principal protegida */}
      <Route
        path="/"
        element={isAuthenticated() ? <App /> : <Navigate to="/signin" />}
      />

      {/* Rutas de autenticación */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Cualquier otra ruta redirige a /signin si no está autenticado */}
      <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  );
};

export default AuthRoutes;
