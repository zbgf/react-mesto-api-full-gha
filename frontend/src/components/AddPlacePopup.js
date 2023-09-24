import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const cardPlace = React.useRef(null);
  const cardLink = React.useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({name: cardPlace.current.value, link: cardLink.current.value,});
  }

  React.useEffect(() => {
    cardPlace.current.value = '';
    cardLink.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm  title="Новое место" button="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input id="place-input" className="popup__input popup__input_type_place" type="text" name="place" placeholder="Название" required ref={cardPlace} />
      <span className="popup__error_place-input popup__error"></span>
      <input id="link-input" className="popup__input popup__input_type_link" type="url" name="link" placeholder="Ссылка на картинку" required ref={cardLink} />
      <span className="popup__error_link-input popup__error"></span>      
    </PopupWithForm>
  )
}

export default AddPlacePopup;
