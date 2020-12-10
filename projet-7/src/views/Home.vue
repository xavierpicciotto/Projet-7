<template>
  <div class="home-page text-center">
    <div>
      <form @submit.prevent="handleLogin" class="form-signin">
        <div v-if="message" class="alert" :class="loading ? 'alert-success' : 'alert-danger'"> {{message}} </div>
        <h2 class="h3 mb-3 font-weight-normal text-white">Please sign in</h2>
        <!--User name-->
        <input v-model="user.username" v-validate="'required'" type="text" name="username" class="form-control"
          placeholder="User name" required>
        <hr>
        <!--Mot de passe-->
        <input v-model="user.password" v-validate="'required'" type="password" name="password" class="form-control"
          placeholder="Password" required>
        <!--Checkbox-->
        <div class="checkbox mb-3">
          <label class="text-white">
            <input v-model="realClient" class="checkbox" type="checkbox" value="verification"> Je ne suis pas un robot.
          </label>
        </div>
        <!--Boutton de connection-->
        <button class="btn btn-lg btn-success btn-block" type="submit">Login</button>
        <hr>
        <p>Or</p>
        <!--Page pour l'inscription-->
        <router-link to="/Register">
          <button class="btn btn-lg btn-primary btn-block text-center" type="button">Register</button>
        </router-link>
      </form>

      <!--informations annexes-->
      <p class="mt-5 mb-3 text-white">&copy;Groupomania départment 2019-2020.</p>
      <router-link to="/about" class="text-danger">About Groupomania</router-link>
    </div>

  </div>
</template>

<script>
  import User from '../models/user';

  export default {
    name: 'Home',
    data() {
      return {
        user: new User('', '', ''),
        loading: "",
        message: '',
        realClient: false,
      };
    },
    computed: {
      loggedIn() {
        console.log(this.$store)
        return this.$store.state.auth.status.loggedIn;
      }
    },
    created() {
      //redirection auto sur le profile pendant la creation.
      if (this.loggedIn) {
        this.$router.push('/profile');
      }
    },
    methods: {
      handleLogin() {
        if (this.realClient) {
          this.loading = true;
          this.$validator.validateAll().then(isValid => {
            //test
            console.log('test validator = ' + isValid)
            if (!isValid) {
              this.loading = false;
              return;
            }
            if (this.user.username && this.user.password) {
              this.$store.dispatch('auth/login', this.user).then(
                () => {
                  this.loading = true;
                  this.message = "Connexion Successfull !"
                  this.$router.push('/profile');
                },
                error => {
                  this.loading = false;
                  this.message = "Error occured :" + error
                }
              );
            }
          });
        }
        if (!this.realClient) {
          this.message = "remember to check the box."
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  body {
    height: 100%;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
  }

  hr {
    margin: 5%;
  }

  .form-signin .checkbox {
    margin-top: 10%;
    font-size: 1.5em;
  }
</style>>