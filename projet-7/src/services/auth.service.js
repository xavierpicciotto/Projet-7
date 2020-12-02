import axios from 'axios';

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
          console.log(JSON.stringify(response.data))
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  delete(user) {
    console.log(" = AUTH service before USER ID = " + JSON.stringify(user))
    return axios.delete(API_URL + `${user}`)
      .then(response => {
        this.logout();
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
    }).then(() => {
      console.log("auth service Register response = OK")
    }).catch(err => console.log(err));
  }

  modify(user) {
    return axios.put(API_URL + 'modify/' + user.id, {
        username: user.username,
        email: user.email,
        password: user.password
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
      .catch(err => console.log(err))
  }
}

export default new AuthService();