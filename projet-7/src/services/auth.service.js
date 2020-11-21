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



  delete(req) {
    console.log(" = AUTH service before" +JSON.stringify(req))
    const id = req.state.user.id
    console.log(JSON.stringify(id) +"RASSSSSSSSSS")
    return axios.delete(API_URL + `${id}`)
    .then(response => {
      this.logout();
      console.log("auth service delete ACTIVE = " + JSON.stringify(response.data))})
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