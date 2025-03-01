import React from "react";
import successIcon from "../images/exito-icon.svg";
import errorIcon from "../images/error-icon.svg";
import CloseIcon from "../images/CloseIcon.svg";

const InfoTooltip = ({ isSuccess, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="info-tooltip info-tooltip__opened">
      <div className="info-tooltip__container">
        <button className="info-tooltip__close-button" onClick={onClose}>
          <img
            src={CloseIcon}
            alt="Cerrar popup"
            className="info-tooltip__close-icon"
          />
        </button>

        <img
          src={isSuccess ? successIcon : errorIcon}
          alt={isSuccess ? "Éxito" : "Error"}
          className="info-tooltip__icon"
        />

        <p className="info-tooltip__message">
          {isSuccess
            ? "¡Correcto! Ya estás registrado."
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </p>
      </div>
    </div>
  );
};

export default InfoTooltip;
