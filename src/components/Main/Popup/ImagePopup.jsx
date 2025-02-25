import React from "react";
import "../../../blocks/popup.css";
import CloseIcon from "../../../images/CloseIcon.svg";

export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup image-popup ${isOpen ? "popup__opened" : ""}`}>
      <div className="popup__content popup__content_content_image">
        {card ? (
          <div className="popup__image-container">
            <button
              className="popup__close-button image-popup__close-button"
              type="button"
              onClick={onClose}
              aria-label="Close image popup"
            >
              <img src={CloseIcon} alt="Close popup" />
            </button>
            <img className="popup__image" src={card.link} alt={card.name} />
            <p className="popup__caption">{card.name}</p>
          </div>
        ) : (
          <p>No se seleccionó ninguna tarjeta</p>
        )}
      </div>
    </div>
  );
}
