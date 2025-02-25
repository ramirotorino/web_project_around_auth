import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

import CloseIcon from "../../../../images/CloseIcon.svg";

export default function EditProfile({ isOpen, onClose, onSubmit }) {
  const currentUser = useContext(CurrentUserContext); // ✅ Obtener el usuario actual desde el contexto

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // ✅ Actualizar los valores cuando el popup se abra
  useEffect(() => {
    if (isOpen) {
      setName(currentUser?.name || "");
      setDescription(currentUser?.about || "");
    }
  }, [isOpen, currentUser]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, about: description }); // ✅ Enviar datos al padre (API)
    onClose(); // ✅ Cerrar popup después de guardar
  };

  return (
    <div
      style={{
        display: isOpen ? "flex" : "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "430px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button
          style={{
            position: "relative",
            top: "-48px",
            right: "-201px",
            background: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          <img src={CloseIcon} alt="Close popup" />
        </button>
        <h3
          className="popup__title"
          style={{ textAlign: "center", marginBottom: "20px", color: "#000" }}
        >
          Editar Perfil
        </h3>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            width: "100%",
          }}
          onSubmit={handleSubmit}
        >
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              color: "#000",
            }}
          >
            <input
              type="text"
              name="name"
              value={name} // ✅ Controlado por estado
              onChange={handleNameChange} // ✅ Manejar cambios
              placeholder="Nombre"
              required
              className="popup__input"
            />
          </label>
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              color: "#000",
            }}
          >
            <input
              type="text"
              name="about"
              value={description} // ✅ Controlado por estado
              onChange={handleDescriptionChange} // ✅ Manejar cambios
              placeholder="Acerca de mí"
              required
              className="popup__input"
            />
          </label>
          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}
