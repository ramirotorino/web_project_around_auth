import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../utils/auth.js";
import InfoTooltip from "../components/InfoTooltip.jsx";
import "../blocks/register.css";

const SignUp = (onRegister) => {
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
    register(email, password)
      .then(() => {
        setInfoTooltip({
          isOpen: true,
          isSuccess: true,
          message: "¡Correcto! Ya estás registrado.",
        });
      })
      .catch(() => {
        setInfoTooltip({
          isOpen: true,
          isSuccess: false,
          message: "Uy, algo salió mal. Por favor, inténtalo de nuevo.",
        });
      });
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
        ¿Ya tienes cuenta?{" "}
        <Link to="/signin" className="login-register-link">
          Inicia sesión aquí
        </Link>
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

export default SignUp;
