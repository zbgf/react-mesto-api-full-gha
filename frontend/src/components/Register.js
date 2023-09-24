import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const email = React.useRef(null);
  const password = React.useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    props.handleRegister(email.current.value, password.current.value);
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input className="auth__input" type="email" placeholder="Email" required ref={email}/>
        <input className="auth__input" type="password" placeholder="Пароль" required ref={password}/>
        <button className="auth__button" type="submit">Зарегистрироваться</button>
      </form>
      <Link className="auth__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
    </section>
  )
}

export default Register;