import React from "react";
import "../../../blocks/popup.css";
import CloseIcon from "../../../images/CloseIcon.svg";

export default function Popup({ isOpen, title, children, onClose }) {
  console.log("Popup renderizado:", { isOpen, title, children });

  if (typeof isOpen !== "boolean") {
    console.error(
      "Error: 'isOpen' debe ser un booleano. Valor actual:",
      isOpen
    );
    return null;
  }

  const popupClass = `popup ${isOpen ? "popup__opened" : ""}`;

  return (
    <div className={popupClass}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={() => {
            onClose();
          }}
          aria-label="Cerrar popup"
        >
          <img src={CloseIcon} alt="Close popup" />
        </button>
        {title && <h2 className="popup__title">{title}</h2>}
        <div className="popup__content">
          {children || (
            <p style={{ color: "red" }}>Advertencia: Contenido faltante</p>
          )}
        </div>
      </div>
    </div>
  );
}
