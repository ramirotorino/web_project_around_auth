import React, { useRef, useContext } from "react"; // ✅ Importar useRef y useContext
import "../../../../blocks/popup.css";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext"; // ✅ Importar contexto

export default function EditAvatar({ isOpen, onClose }) {
  const avatarRef = useRef(null); // ✅ Referencia para el input
  const { handleUpdateAvatar } = useContext(CurrentUserContext); // ✅ Obtener la función del contexto

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateAvatar({ avatar: avatarRef.current.value }); // ✅ Enviar nuevo avatar
    onClose(); // ✅ Cerrar popup después de actualizar
  };

  return (
    <form
      className="popup__form"
      name="edit-avatar-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="popup__field">
        <input
          type="url"
          className="popup__input"
          name="avatar"
          placeholder="Enlace de imagen"
          required
          ref={avatarRef} // ✅ Usar referencia para capturar el valor
        />
        <span className="popup__error" id="avatar-error"></span>
      </label>
      <button type="submit" className="popup__button">
        Guardar
      </button>
    </form>
  );
}
