class ApiAuth {
  constructor(url) {
    this._url = url;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  } 

  register(email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email, password })
    })
    .then(res => {return this._getResponseData(res)})
  }

  login(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email, password })
    })
    .then(res => {return this._getResponseData(res)})
  }

  getJwt() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {return this._getResponseData(res)})
  }
}

export const apiAuth = new ApiAuth('https://api.zbgf.mesto.nomoredomainsrocks.ru');
