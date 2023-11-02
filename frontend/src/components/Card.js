import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = (`element__trash ${isOwn ? '' : 'element__trash_hidden'}`);
  const isLiked = props.card.likes.some(id => id === currentUser._id);
  const cardLikeButtonClassName = (`element__like ${isLiked ? 'element__like_active' : ''}`);

  function handleCardClick() {props.onCardClick(props.card)};
  function handleLikeClick() {props.onCardLike(props.card)};
  function handleDeleteClick() {props.onCardDelete(props.card)};

  return (
    <li className="element__list">
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
      <img src={props.card.link} className="element__image" alt={props.card.name} onClick={handleCardClick} />
      <div className="element__header">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__likeWrapper">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <span className="element__likeCount">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;