import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";

const Header = () => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <header className="header">
      <img src={logo} alt="Logo de Around The U.S." className="header__logo" />
      <nav className="header__nav">
        {location.pathname === "/signin" ? (
          <Link to="/signup" className="header__link">
            Regístrate
          </Link>
        ) : location.pathname === "/signup" ? (
          <Link to="/signin" className="header__link">
            Iniciar sesión
          </Link>
        ) : null}
      </nav>
    </header>
  );
};

export default Header;
