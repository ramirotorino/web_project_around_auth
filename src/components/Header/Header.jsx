import React, { useContext } from "react";

import logo from "../../images/logo.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useContext(CurrentUserContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/signin");
  };

  return (
    <header className="header">
      <img src={logo} alt="Logo de Around The U.S." className="header__logo" />
      <nav className="header__nav">
        {isAuthenticated && currentUser ? (
          <div className="header__user-info">
            <span className="header__email">{currentUser.email}</span>
            <button className="header__logout" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        ) : location.pathname === "/signin" ? (
          <Link to="/signup" className="header__link header__link--white">
            Regístrate
          </Link>
        ) : location.pathname === "/signup" ? (
          <Link to="/signin" className="header__link header__link--white">
            Iniciar sesión
          </Link>
        ) : null}
      </nav>
    </header>
  );
};

export default Header;
