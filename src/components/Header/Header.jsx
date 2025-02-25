import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <header>
      <h1>Mi Aplicación</h1>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Cerrar Sesión</button>
      ) : (
        <nav>
          <Link to="/signin">Iniciar Sesión</Link>
          <Link to="/signup">Registrarse</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
