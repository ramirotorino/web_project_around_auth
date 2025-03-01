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
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [isFetchingUser, setIsFetchingUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isFetchingUser && !currentUser) {
      setIsFetchingUser(true);
      checkToken()
        .then(() => {
          if (!currentUser) {
            // ✅ Evita doble llamada
            return api.getUserInfo();
          }
          return null;
        })
        .then((fullUserData) => {
          if (fullUserData) {
            setCurrentUser(fullUserData);
            localStorage.setItem("currentUser", JSON.stringify(fullUserData));
          }
        })
        .catch(() => {
          console.warn("Sesión inválida o expirada.");
          localStorage.removeItem("token");
          localStorage.removeItem("currentUser");
          navigate("/signin");
        })
        .finally(() => setIsFetchingUser(false));
    }
  }, [navigate, isFetchingUser, currentUser]);

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
    localStorage.setItem("token", data.token);
    navigate("/"); // ✅ Redirigir inmediatamente después del login

    setIsFetchingUser(true);
    api
      .getUserInfo()
      .then((fullUserData) => {
        setCurrentUser(fullUserData);
        localStorage.setItem("currentUser", JSON.stringify(fullUserData));
      })
      .catch(() => {
        console.error("Error al obtener datos del usuario después de login.");
      })
      .finally(() => setIsFetchingUser(false));
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
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleUpdateUser = (data) => {
    api
      .updateUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        localStorage.setItem("currentUser", JSON.stringify(newData));
      })
      .catch((error) =>
        console.error("Error al actualizar el usuario:", error)
      );
  };

  const handleUpdateAvatar = (data) => {
    api
      .updateAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
        localStorage.setItem("currentUser", JSON.stringify(newData));
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
