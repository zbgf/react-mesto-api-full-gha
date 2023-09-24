function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="button popup__close" type="button" onClick={props.onClose}></button>
        <img className="popup__authImage" src={props.image} alt={props.title}/>
        <p className="popup__authTitle">{props.title}</p>
      </div>
    </div>
  )
}

export default InfoTooltip;