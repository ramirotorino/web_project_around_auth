import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"; // ✅ Importar contexto
import avatar from "../../images/profilePhoto.png";
import Popup from "../Main/Popup/Popup";
import NewCard from "./form/NewCard/NewCard";
import EditProfile from "./form/EditProfile/EditProfile.jsx";
import EditAvatar from "./form/EditAvatar/EditAvatar";
import Card from "../Card/Card";
import ImagePopup from "./Popup/ImagePopup";
import ConfirmDeletePopup from "./Popup/ConfirmDeletePopup";

// Import styles
import "../../../src/blocks/profile.css";
import "../../../src/blocks/popup.css";
import "../../../src/blocks/page.css";
import "../../../src/blocks/mediaQueries.css";
import "../../../src/blocks/header.css";
import "../../../src/blocks/footer.css";
import "../../blocks/elements.css";

function Main({ cards, onAddPlaceSubmit, onCardDelete, onCardLike }) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext); // ✅ Obtener usuario desde el contexto
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deleteCard, setDeleteCard] = useState(null);

  // Function to handle opening a popup
  const handleOpenPopup = (popupConfig) => {
    setPopup(popupConfig);
  };

  // Function to handle closing the current popup
  const handleClosePopup = () => {
    setPopup(null);
  };

  // Function to handle card selection (image popup)
  const handleCardClick = (card) => {
    console.log("Card selected for image popup:", card);
    setSelectedCard(card);
  };

  // Function to close the image popup
  const handleCloseImagePopup = () => {
    setSelectedCard(null);
  };

  // Function to handle card deletion
  const handleCardDelete = (card) => {
    setDeleteCard(card);

    // ✅ Mostrar el popup de confirmación antes de eliminar
    handleOpenPopup({
      title: "¿Estás seguro?",
      type: "delete",
      children: (
        <ConfirmDeletePopup
          isOpen={true}
          onConfirm={() => confirmCardDelete(card)} // ✅ Nueva función que realmente elimina la tarjeta
          onClose={handleClosePopup}
        />
      ),
    });
  };

  // ✅ Nueva función para eliminar la tarjeta después de la confirmación
  const confirmCardDelete = (card) => {
    console.log("🗑️ Confirmando eliminación de tarjeta:", card);
    onCardDelete(card); // ✅ Llamar a la función de `App.jsx`
    setDeleteCard(null);
    handleClosePopup(); // ✅ Cerrar el popup después de eliminar
  };

  // ✅ Función para manejar los likes y dislikes
  function handleCardLike(card) {
    if (!card) {
      console.error("Error: card no está definido", card);
      return;
    }

    console.log("Datos de la tarjeta antes del like:", card);
    onCardLike(card); // ✅ Llama a la función que se maneja en `App.jsx`
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            src={currentUser?.avatar || avatar} // ✅ Usar avatar del contexto
            alt="Profile photo"
            className="profile__photo profile__avatar"
          />
          <button
            className="profile__avatar-edit"
            onClick={() =>
              handleOpenPopup({
                title: "Cambiar foto de perfil",
                type: "profile",
                children: (
                  <EditAvatar isOpen={true} onClose={handleClosePopup} />
                ),
              })
            }
          >
            <img src="src/images/pencilEditButton.svg" alt="Edit Avatar Icon" />
          </button>
        </div>
        <div className="profile__info">
          <div className="profile__info-text">
            <h2 className="profile__info-name">
              {currentUser?.name || "Cargando..."}{" "}
              {/* ✅ Usar nombre del contexto */}
            </h2>
            <p className="profile__info-about">
              {currentUser?.about || "Cargando..."}{" "}
              {/* ✅ Usar descripción del contexto */}
            </p>
          </div>
          <button
            className="profile__info-edit"
            onClick={() =>
              handleOpenPopup({
                title: "Editar Perfil",
                type: "profile",
                children: (
                  <EditProfile
                    isOpen={true}
                    onClose={handleClosePopup}
                    onSubmit={handleUpdateUser} // ✅ Se pasa handleUpdateUser a EditProfile
                    name={currentUser?.name}
                    about={currentUser?.about}
                  />
                ),
              })
            }
          >
            <img
              className="profile__info-edit-pencil"
              src="src/images/pencilEditButton.svg"
              alt="Pencil Edit Button"
            />
          </button>
        </div>
        <button
          className="profile__add-img"
          type="button"
          onClick={() =>
            handleOpenPopup({
              title: "Nuevo Lugar",
              type: "profile",
              children: (
                <NewCard
                  onAddPlaceSubmit={onAddPlaceSubmit} // ✅ Ahora está pasando la función correcta
                  onClosePopup={handleClosePopup} // ✅ Para cerrar el popup después de agregar
                />
              ),
            })
          }
        >
          Nueva Tarjeta
        </button>
      </section>

      {/* Card list */}
      <section className="elements">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardLike={handleCardLike}
              onCardClick={() => handleCardClick(card)}
              onCardDelete={handleCardDelete}
            />
          ))}
        </ul>
      </section>

      {/* General popup */}
      {popup && (
        <Popup
          onClose={handleClosePopup}
          title={popup.title}
          type={popup.type}
          isOpen={true}
        >
          {popup.children}
        </Popup>
      )}

      {/* Image popup */}
      <ImagePopup
        isOpen={!!selectedCard}
        onClose={handleCloseImagePopup}
        card={selectedCard}
      />
    </main>
  );
}

export default Main;
