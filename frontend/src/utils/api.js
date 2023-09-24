export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  } 

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => {return this._getResponseData(res)})
  }

  setUserData(profileData) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ name: profileData.name, about: profileData.about })
    })
    .then(res => {return this._getResponseData(res)})
  }

  setAvatarData(avatarLink) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: avatarLink.avatar })
    })
    .then(res => {return this._getResponseData(res)})
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => {return this._getResponseData(res)})
  }

  addNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    })
    .then(res => {return this._getResponseData(res)})
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {return this._getResponseData(res)})
  }

  changeLike(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers
    })
    .then(res => {return this._getResponseData(res)})
  }
}

// export const api = new Api({
//   url: 'https://mesto.nomoreparties.co/v1/cohort-68',
//   headers: {
//     authorization: '10e9c4a8-f3b5-4b69-81f6-f55fe8e9d1ca',
//     'Content-Type': 'application/json'
//   }
// });

export const api = new Api({
  url: 'https://api.zbgf.mesto.nomoredomainsrocks.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});