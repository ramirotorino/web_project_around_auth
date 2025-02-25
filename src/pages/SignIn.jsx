import React from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("token", "user-authenticated");
    navigate("/");
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
};

export default SignIn;
