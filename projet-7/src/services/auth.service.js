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
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  delete(user) {
    user = {
      username: user.username,
      email: user.email,
      id: user.id
    }    
    console.log(JSON.stringify(user) + " = AUTH service before")
    return axios.delete(API_URL + 'delete',user)
    .then(response => {
      console.log("auth service delete ACTIVE = " + JSON.stringify(response))})
    .catch(err => console.log("auth service delete ERROR ="+err))
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }

}

export default new AuthService();