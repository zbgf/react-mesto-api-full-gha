export default class Api {
  constructor({ url }) {
    this._url = url;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  } 

  getUserData() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {return this._getResponseData(res)})
  }

  setUserData(profileData) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({ name: profileData.name, about: profileData.about })
    })
    .then(res => {return this._getResponseData(res)})
  }

  setAvatarData(avatarLink) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ avatar: avatarLink.avatar })
    })
    .then(res => {return this._getResponseData(res)})
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {return this._getResponseData(res)})
  }

  addNewCard({ name, link }) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, link })
    })
    .then(res => {return this._getResponseData(res)})
  }

  deleteCard(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {return this._getResponseData(res)})
  }

  changeLike(cardId, isLiked) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {return this._getResponseData(res)})
  }
}

export const api = new Api({
  url: 'https://api.zbgf.mesto.nomoredomainsrocks.ru',
});