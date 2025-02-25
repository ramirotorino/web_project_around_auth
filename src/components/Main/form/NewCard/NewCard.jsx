import React, { useState } from "react";
import "../../../../blocks/popup.css";

export default function NewCard({ onAddPlaceSubmit, onClosePopup }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const handleLinkChange = (e) => setLink(e.target.value);
  const [errors, setErrors] = useState({ title: "", link: "" });
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      console.error("El formulario no es válido, revisa los errores:", errors);
      return; // ⛔ Evita continuar si hay errores
    }

    setIsSubmitting(true); // ✅ Activa el indicador de carga

    onAddPlaceSubmit({ name: title, link })
      .then(() => {
        setTitle(""); // ✅ Limpia el formulario después de añadir la tarjeta
        setLink("");
        setIsValid(false);
        onClosePopup(); // ✅ Cierra el popup
      })
      .catch((error) => {
        console.error("Error al agregar la tarjeta:", error);
      })
      .finally(() => setIsSubmitting(false)); // ✅ Desactiva el indicador de carga
  };

  // Funciones para manejar los cambios en los inputs
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    validateForm(e.target);
  };

  // ✅ Función para validar el formulario
  const validateForm = (input) => {
    let newErrors = { ...errors };
    if (input.name === "card-name") {
      newErrors.title =
        input.value.length < 3 ? "El título es obligatorio" : "";
    } else if (input.name === "link") {
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      newErrors.link = !urlRegex.test(input.value) ? "URL inválida" : "";
    }

    setErrors(newErrors);
    setIsValid(!newErrors.title && !newErrors.link); // ✅ Solo si no hay errores
  };

  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_card-name"
          id="card-name"
          maxLength="30"
          minLength="1"
          name="card-name"
          placeholder="Title"
          required
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="card-link"
          name="link"
          placeholder="Image link"
          required
          type="url"
          value={link}
          onChange={handleLinkChange}
        />
      </label>
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
