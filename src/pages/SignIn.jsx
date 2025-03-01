import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { login } from "../utils/auth.js";
import InfoTooltip from "../components/InfoTooltip.jsx";
import "../blocks/login.css";

const SignIn = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [infoTooltip, setInfoTooltip] = useState({
    isOpen: false,
    isSuccess: false,
    message: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setInfoTooltip({
        isOpen: true,
        isSuccess: false,
        message: "Los campos de email y contraseña son obligatorios.",
      });
      return;
    }

    console.log("Enviando login con:", { email, password });

    login(email, password)
      .then((data) => {
        console.log("Login exitoso");
        onLogin();
      })
      .catch((error) => {
        console.error("Error en login");
        setInfoTooltip({
          isOpen: true,
          isSuccess: false,
          message:
            error.message || "Error al iniciar sesión. Intenta nuevamente.",
        });
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Token encontrado en localStorage, redirigiendo...");
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="login-container">
      <h2 className="login-title">Inicia sesión</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="login-input"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="login-input"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">
          Inicia sesión
        </button>
      </form>
      <p className="login-register-link">
        ¿Aún no eres miembro? <Link to="/signup">Regístrate aquí</Link>
      </p>
      <InfoTooltip
        isOpen={infoTooltip.isOpen}
        isSuccess={infoTooltip.isSuccess}
        message={infoTooltip.message}
        onClose={() => setInfoTooltip({ isOpen: false })}
      />
    </div>
  );
};

export default SignIn;
