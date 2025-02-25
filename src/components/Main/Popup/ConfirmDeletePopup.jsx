import React from "react";
import "../../../blocks/popup.css";

export default function ConfirmDeletePopup({ onConfirm, onClose }) {
  return (
    <div>
      <button
        className="popup__button popup__button_confirm"
        type="button"
        onClick={onConfirm}
      >
        Sí
      </button>
    </div>
  );
}
