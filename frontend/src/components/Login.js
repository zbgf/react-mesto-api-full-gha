import React from "react";

function Login(props) {
  const email = React.useRef(null);
  const password = React.useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    props.handleLogin(email.current.value, password.current.value);
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input className="auth__input" type="email" placeholder="Email" required ref={email}/>
        <input className="auth__input" type="password" placeholder="Пароль" required ref={password}/>
        <button className="auth__button" type="submit">Войти</button>
      </form>
    </section>
  )
}

export default Login;