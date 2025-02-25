import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import api from "../utils/api"; // ✅ Importar API
import { CurrentUserContext } from "../contexts/CurrentUserContext"; // ✅ Importar contexto

function App() {
  const [currentUser, setCurrentUser] = useState(null); // ✅ Estado para el usuario actual
  const [cards, setCards] = useState([]); // ✅ Estado de tarjetas
  const [isLoading, setIsLoading] = useState(false); // ✅ Estado global para la carga

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

  // ✅ Función para actualizar el usuario en la API
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

  // ✅ Nueva función para actualizar el avatar
  const handleUpdateAvatar = (data) => {
    api
      .updateAvatar(data)
      .then((newData) => {
        setCurrentUser(newData); // ✅ Actualizar avatar en el estado global
      })
      .catch((error) => console.error("Error al actualizar el avatar:", error));
  };

  // ✅ Función para manejar la adición de una nueva tarjeta
  // ✅ Asegurar que se envían los datos correctos a la API
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
        <Main
          cards={cards} // ✅ Pasar tarjetas a `Main`
          onAddPlaceSubmit={handleAddPlaceSubmit} // ✅ Pasar función de añadir tarjetas
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
