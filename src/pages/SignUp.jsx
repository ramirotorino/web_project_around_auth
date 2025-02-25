import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../utils/auth.js";
import "../blocks/register.css"; // Asegurar que los estilos se importan correctamente

const SignUp = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, password)
      .then(() => {
        alert("Registro exitoso");
        navigate("/signin"); // Redirige a inicio de sesión tras registrarse
      })
      .catch(() => alert("Error en el registro"));
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="register-container">
      <h2 className="register-title">Regístrate</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="register-input"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="register-input"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="register-button">
          Registrarse
        </button>
      </form>
      <p className="register-login-link">
        ¿Ya tienes cuenta? <Link to="/signin">Inicia sesión aquí</Link>
      </p>
    </div>
  );
};

export default SignUp;
