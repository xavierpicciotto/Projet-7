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

    delete({
      commit
    }, user) {
      console.log('auth module user = '+ JSON.stringify(user))
      return AuthService.delete(user)
      .then(x => {
        console.log('auth module PROMISE object= ' + JSON.stringify(x));
        commit('deleteSuccess', x);
        return Promise.resolve(x)
      })
      .catch(err => console.log("ERROR auth module"+err))
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
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    }
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
    deleteSuccess(state) {
      state.status.loggedIn = false;
      state.user = null;
    }
  }
};