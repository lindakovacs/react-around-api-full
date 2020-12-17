class Auth {
  constructor(options) {
    this.options = options;
  }

  register(email, password) {
     return fetch(`${this.options.baseUrl}/signup`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ email, password }),
     }).then((res) => {
       return res.json();
     });
  }

  authorize(userid, password) {
    return fetch(`${this.options.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userid, password: password }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data.message) {
          localStorage.setItem('token', data.token);
          return data;
          // } else {
          //   return;
        }
      });
  }

  getContent(token) {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        Acccept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.ok
          ? res.json()
          : Promise.reject(`${res.status} - ${res.message}`);
      })
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
  }
}
const auth = new Auth({
  // baseUrl: 'https://register.nomoreparties.co',
  baseUrl: 'http://localhost:3001',
});

export default auth;

