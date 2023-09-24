function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="button popup__close" type="button" onClick={props.onClose}></button>
        <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button className="popup__button" type="submit">{props.button}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;