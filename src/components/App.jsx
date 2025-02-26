import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import SignIn from "../pages/SignIn.jsx";
import SignUp from "../pages/SignUp.jsx";
import api from "../utils/api";
import { login, register, checkToken } from "../utils/auth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext"; // ✅ Importar contexto

function App() {
  const [currentUser, setCurrentUser] = useState(null); // ✅ Estado para el usuario actual
  const [cards, setCards] = useState([]); // ✅ Estado de tarjetas
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken()
      .then((userData) => {
        setCurrentUser(userData);
        navigate("/");
      })
      .catch(() => {
        localStorage.removeItem("token"); // ✅ Eliminar token inválido
        navigate("/signin");
      });
  }, []);

  useEffect(() => {
    setIsLoading(true); // ✅ Activa el estado de carga antes de la solicitud

    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData); // ✅ Guardar datos del usuario
        setCards(cardsData); // ✅ Guardar tarjetas
      })
      .catch((err) => console.error("Error al obtener los datos:", err))
      .finally(() => setIsLoading(false)); // ✅ Desactiva el estado de carga cuando todo termine
  }, []);

  // ✅ Nueva función para manejar el inicio de sesión
  const handleLogin = (email, password) => {
    return login(email, password).then((data) => {
      checkToken().then((userData) => {
        setCurrentUser(userData);
        navigate("/");
      });
    });
  };

  // ✅ Nueva función para manejar el registro
  const handleRegister = (email, password) => {
    return register(email, password);
  };

  // Función para actualizar el usuario en la API
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

  // función para actualizar el avatar
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
          {/* ✅ Se agregan las rutas de autenticación */}
          <Route
            path="/signup"
            element={<SignUp onRegister={handleRegister} />}
          />
          <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
          {/* ✅ Mantiene tu estructura original de `Main` */}
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
