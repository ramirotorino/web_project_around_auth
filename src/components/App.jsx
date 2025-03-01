import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import SignIn from "../pages/SignIn.jsx";
import SignUp from "../pages/SignUp.jsx";
import api from "../utils/api";
import { login, register, checkToken } from "../utils/auth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken()
      .then((userData) => {
        setCurrentUser(userData);
        navigate("/");
      })
      .catch(() => {
        console.warn("Sesión inválida o expirada.");
        localStorage.removeItem("token");
        navigate("/signin");
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleLogin = (data) => {
    console.log("Login exitoso", data);
    localStorage.setItem("token", data.token); // Store the token
    //setCurrentUser(data.user); // Assuming the user data is returned
    navigate("/");
  };

  const handleRegister = (email, password) => {
    return register(email, password).catch(() => {
      alert("Error en el registro. Intenta nuevamente.");
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [handleLogin]);

  const handleUpdateUser = (data) => {
    api
      .updateUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData); // ✅ Actualizar estado global del usuario
      })
      .catch((error) =>
        console.error("Error al actualizar el usuario:", error)
      );
  };

  const handleUpdateAvatar = (data) => {
    api
      .updateAvatar(data)
      .then((newData) => {
        setCurrentUser(newData); // ✅ Actualizar avatar en el estado global
      })
      .catch((error) => console.error("Error al actualizar el avatar:", error));
  };

  const handleAddPlaceSubmit = (cardData) => {
    setIsLoading(true);
    return api
      .addCard(cardData)
      .then((newCard) => {
        setCards((prevCards) => [newCard, ...prevCards]); // ✅ Añadir nueva tarjeta al inicio
      })
      .catch((error) => console.error("Error al agregar la tarjeta:", error))
      .finally(() => setIsLoading(false)); // ✅ Desactiva la carga
  };

  const handleCardDelete = (card) => {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
      })
      .catch((error) => console.error("Error al eliminar la tarjeta:", error))
      .finally(() => setIsLoading(false));
  };

  const handleCardLike = (card) => {
    api
      .changeLikeCardStatus(card._id, !card.isLiked)
      .then((newCard) => {
        setCards((prevCards) =>
          prevCards.map((c) =>
            c._id === card._id ? { ...c, isLiked: newCard.isLiked } : c
          )
        );
      })
      .catch((error) => console.error("Error al actualizar el like:", error));
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        handleUpdateUser,
        handleUpdateAvatar,
      }}
    >
      <div className="page">
        <Header />
        <Routes>
          <Route
            path="/signup"
            element={<SignUp onRegister={handleRegister} />}
          />
          <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
          <Route
            path="*"
            element={
              <Main
                cards={cards}
                onAddPlaceSubmit={handleAddPlaceSubmit}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
