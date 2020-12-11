import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  delete() {
    const user = JSON.parse(localStorage.getItem('user'));

    return axios.delete(API_URL + 'delete/' + user.id, {
        headers: authHeader()
      })
      .then(response => {
        localStorage.removeItem('user');
        console.log("auth service delete ACTIVED = " + JSON.stringify(response.data))
      })
      .catch(err => console.log("auth service delete ERROR =" + err))
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }).then((response) => {
      return response.data
    })
  }

  modify(user) {
    console.log(user)
    return axios.put(API_URL + 'modify/' + user.id, {
        username: user.username,
        email: user.email,
        password: user.password
      }, {
        headers: authHeader()
      }).then(response => {
        if (response.data.username && response.data.email) {
          console.log(JSON.stringify(response.data))
          let user = JSON.parse(localStorage.getItem('user'))
          user.username = response.data.username,
            user.email = response.data.email
          console.log(user)
          localStorage.setItem('user', JSON.stringify(user));
        }

        return response.data
      })
  }
}

export default new AuthService();