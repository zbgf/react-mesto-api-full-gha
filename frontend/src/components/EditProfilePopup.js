import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');

  function handleNameChange(e) {setName(e.target.value)};
  function handleAboutChange(e) {setAbout(e.target.value)};

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({name: name, about: about,});
  };

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [props.isOpen]);

  return (
    <PopupWithForm  title="Редактировать профиль" button="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input id="name-input" className="popup__input popup__input_type_name" type="text" name="name" required onChange={handleNameChange} value={name || ''} />
      <span className="popup__error_name-input popup__error"></span>
      <input id="about-input" className="popup__input popup__input_type_about" type="text" name="about" required onChange={handleAboutChange} value={about || ''} />
      <span className="popup__error_about-input popup__error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;