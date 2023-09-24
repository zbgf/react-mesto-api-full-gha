import React from "react";
import {api} from "../utils/api"
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({onEditProfile, onEditAvatar, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__title">
          <div className="profile__avatar">
            <img className="profile__image" src={currentUser.avatar} alt="аватар" />
            <button className="profile__avatarEdit" type="button" onClick={onEditAvatar}></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit button" type="button" onClick={onEditProfile}></button>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add button" type="button" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        <ul className="element">
          {cards.map((card) => <Card 
            card={card} 
            key={card._id} 
            onCardClick={onCardClick} 
            onCardLike={onCardLike} 
            onCardDelete={onCardDelete} 
          />)}
        </ul>
      </section>
    </main>
  )
}

export default Main;