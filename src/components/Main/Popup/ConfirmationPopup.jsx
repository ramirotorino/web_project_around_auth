import React from "react";
import "@/blocks/popup.css";

export default function ConfirmDeletePopup({ isOpen, onClose, onConfirm }) {
  const popupClass = `popup ${isOpen ? "popup_opened" : ""}`;

  return (
    <div className={popupClass}>
      <div className="popup__container">
        <button
          aria-label="Close modal"
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        <h3 className="popup__title">¿Estás seguro?</h3>
        <button
          className="popup__confirm-button"
          type="button"
          onClick={onConfirm}
        >
          Sí
        </button>
      </div>
    </div>
  );
}
