function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.card ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_image">
        <button className="button popup__close" type="button" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card ? props.card.link : ""} alt={props.card ? props.card.name : ""} />
        <p className="popup__place">{props.card ? props.card.name : ""}</p>
      </div>
    </div>
  )
}

export default ImagePopup;