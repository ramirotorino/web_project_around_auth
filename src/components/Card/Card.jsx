import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "../../blocks/elements.css";

export default function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  if (!card) {
    console.error("La tarjeta no tiene datos válidos:", card);
    return null;
  }

  const { name, link, isLiked, _id } = card;

  // ✅ Aplicar la clase de "like" activo correctamente
  const cardLikeButtonClassName = `elements__like-btn ${
    isLiked ? "elements__like-btn-active" : ""
  }`;

  // ✅ Llamar a `onCardLike` cuando se haga clic en el botón de "like"
  const handleLikeClick = () => {
    onCardLike(card);
  };

  return (
    <li className="elements__picture">
      <img
        className="elements__picture-size"
        src={link}
        alt={name}
        onClick={() => onCardClick(card)}
      />
      <button
        aria-label="Delete card"
        className="elements__picture-trash-btn"
        type="button"
        onClick={() => onCardDelete(card)}
      ></button>
      <div className="elements__picture-name-section">
        <h2 className="elements__picture-name">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName} // ✅ Aplicar la clase correcta
          onClick={handleLikeClick}
        ></button>
      </div>
    </li>
  );
}
