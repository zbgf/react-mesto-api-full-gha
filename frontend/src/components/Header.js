import logo from '../images/head/logo.svg';
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="логотип" />
      <div className="header__auth">
        <p className="header__email">{props.email}</p>
        <Link className="header__link" to={props.route} onClick={props.onClick}>{props.title}</Link>
      </div>
    </header>
  )
}

export default Header;