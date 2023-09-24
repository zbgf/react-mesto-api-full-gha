import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatar = React.useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({avatar: avatar.current.value});
  };

  React.useEffect(() => {avatar.current.value = ''}, [props.isOpen]);

  return (
    <PopupWithForm  title="Обновить аватар" button="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input id="avatar-input" className="popup__input popup__input_type_avatar" type="url" name="avatar" placeholder="Ссылка на аватар" required ref={avatar} />
      <span className="popup__error_avatar-input popup__error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
