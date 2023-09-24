import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import success from "../images/auth/success.svg";
import error from "../images/auth/error.svg";
import { Routes, Route, useNavigate } from "react-router-dom";
import { apiAuth } from "../utils/apiAuth";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLogged, setLogged] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isInfoTooltipPopup, setInfoTooltipPopup] = React.useState(false);
  const [infoTooltipImage, setInfoTooltipImage] = React.useState("");
  const [popupTitle, setPopupTitle] = React.useState("");
  const navigate = useNavigate();

  function handleEditProfileClick() {setEditProfilePopupOpen(true)};
  function handleEditAvatarClick() {setEditAvatarPopupOpen(true)};
  function handleAddPlaceClick() {setAddPlacePopupOpen(true)};
  function onCardClick(card) {setSelectedCard(card)};
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipPopup(false);
  };

  function handleUpdateUser(user) {
    api.setUserData(user)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
  };

  function handleUpdateAvatar(user) {
    api.setAvatarData(user)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
  };

  React.useEffect(() => {
    api.getUserData()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id))
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
  };

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
  };

  function handleInfoTooltip() {setInfoTooltipPopup(true)};

  function handleRegister(email, password) {
    apiAuth.register(email, password)
      .then(() => {
        navigate("/sign-in");
        setInfoTooltipImage(success);
        setPopupTitle("Вы успешно зарегистрировались!");
        handleInfoTooltip();
      })
      .catch(err => {
        console.log(`Ошибка.....: ${err}`);
        setInfoTooltipImage(error);
        setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltip();
      })
  };

  function handleLogin(email, password) {
    apiAuth.login(email, password)
      .then((res) => {
        navigate("/");
        localStorage.setItem("jwt", res.token);
        setLogged(true);
        setEmail(email);
      })
      .catch(err => {
        console.log(`Ошибка.....: ${err}`);
        setInfoTooltipImage(error);
        setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltip();
      })
  };

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      apiAuth.getJwt(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setLogged(true);
          }})
          .catch(err => console.log(`Ошибка.....: ${err}`))
    }}, []);

  React.useEffect(() => {
    if (isLogged === true) {navigate("/")}
  }, [isLogged, navigate]);

  function handleSignOut() {
    navigate("/sign-in");
    localStorage.removeItem("jwt");
    setLogged(false);
    setEmail("");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <div className="body">
          <Routes>
            <Route path="/sign-in" element={
              <div>
                <Header route="/sign-up" title="Регистрация" />
                <Login handleLogin={handleLogin} />
              </div>
            }/>

            <Route path="/sign-up" element={
              <div>
                <Header route="/sign-in" title="Войти" />
                <Register handleRegister={handleRegister} />
              </div>
            }/>

            <Route exact path="/" element={
              <div>
                <Header route="/"title="Выйти" email={email} onClick={handleSignOut} />
                <ProtectedRoute
                  onEditProfile={handleEditProfileClick} 
                  onEditAvatar={handleEditAvatarClick} 
                  onAddPlace={handleAddPlaceClick} 
                  onCardClick={onCardClick} 
                  cards={cards} 
                  onCardLike={handleCardLike} 
                  onCardDelete={handleCardDelete} 
                  component={Main}
                  isLogged={isLogged}
                />
                <Footer />
              </div>
            }/>
          </Routes>
        </div>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip 
          image={infoTooltipImage} 
          title={popupTitle} 
          isOpen={isInfoTooltipPopup} 
          onClose={closeAllPopups} 
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;