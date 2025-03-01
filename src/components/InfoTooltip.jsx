import React from "react";
import successIcon from "../images/exito-icon.svg";
import errorIcon from "../images/error-icon.svg";

const InfoTooltip = ({ isSuccess, message, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="info-tooltip info-tooltip__opened">
      <div className="info-tooltip__container">
        <button className="info-tooltip__close-button" onClick={onClose}>
          &times;
        </button>

        <img
          src={isSuccess ? successIcon : errorIcon}
          alt={isSuccess ? "Éxito" : "Error"}
          className="info-tooltip__icon"
        />

        <p className="info-tooltip__message">{String(message)}</p>
      </div>
    </div>
  );
};

export default InfoTooltip;
