import AuthService from '../services/auth.service';

//Récupère l'utilisateur si déjà connecté.
const user = JSON.parse(localStorage.getItem('user'));

//vérification
console.log("USER proffile:  " + JSON.stringify(user));

//Initialise l'état initiale si il y a un utilisateur.
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
 
    delete({ commit }) {
      return AuthService.delete()
      .then(() => {
        commit('delete')
        return
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

    modify({ commit }, user){
      console.log(user)
      return AuthService.modify(user)
      .then((user) => {
        commit('modifySuccess', user);
        return Promise.resolve(user)
      })
      .catch(error => {
        return Promise.reject(error);
      })
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
    delete(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    modifySuccess(state){
      state.status.loggedIn = true;
      state.user = user;      
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
  }
};