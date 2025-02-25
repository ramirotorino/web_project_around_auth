import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { login } from "../utils/auth.js";
import "../blocks/login.css"; // Asegurar que los estilos se importan

const SignIn = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password)
      .then(() => navigate("/"))
      .catch(() => alert("Error al iniciar sesión"));
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

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
    </div>
  );
};

export default SignIn;
