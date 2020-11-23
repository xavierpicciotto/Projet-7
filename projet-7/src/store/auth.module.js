import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));

//vérification
console.log("USER proffile:  " + JSON.stringify(user));

const initialState = user ?
  {
    status: {
      loggedIn: true
    },
    user
  } :
  {
    status: {
      loggedIn: false
    },
    user: null
  };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {

    delete(req) {
      const userId = req.state.user.id
      console.log('auth module USER ID = ',JSON.stringify(userId))
      return AuthService.delete(userId)
      .then(() => {
        console.log('auth module response');
        return ;
      })
      .catch(err => console.log(" auth module ERROR ="+err))
    },

    login({
      commit
    }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },

    logout({
      commit
    }) {
      AuthService.logout();
      commit('logout');
    },

    register({
      commit
    }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    modify(req){
      console.log(JSON.stringify(req) +"auth module")
      const user = {
        ...req.state.modify,
        id: req.state.user.id
      }
      return AuthService.modify(user).then(x => console.log(x))
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
  }
};