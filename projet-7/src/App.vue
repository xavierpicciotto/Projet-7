<template>
  <div id="app">
    <nav>
      <p>Groupomania Network</p>
      <div v-if="currentUser">
          <button type="button" class="logout btn btn-danger" @click.prevent="logOut"><i class="fas fa-sign-out-alt">Logout</i></button>
      </div>
    </nav>
    <!--Logo-->

    <div class="logo-container text-center">
      <router-link to="/">
        <img src="./assets/icon.svg" alt="">
      </router-link>
      <h1>Groupomania</h1>
    </div>

    <!--Affichages des vues dynamiques-->
    <div class="container">
      <router-view />
    </div>

  </div>
</template>

<script>
  export default {
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      },
    },
    methods: {
      logOut() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/');
      },
    }
  };
</script>
<style lang="scss">
  body {
    background: linear-gradient(to right, #9fcbff, #001280c7);

    img {
      width: 200px;
      height: auto;
      border-radius: 15px;
      -webkit-animation: spin 9.5s linear infinite;
      -moz-animation: spin 9.5s linear infinite;
      animation: spin 9.5s linear infinite;
    }
    nav{
    width: 100%;
    height: auto;
    background-color: #393939e6;
    display: flex;
    align-items: baseline;
    padding: 0.351em;
    border-bottom: 1px solid red;
    p{
      width: 100%;
      color: white;
      margin: auto;
    }
    div{
      display: flex;
    }
    }

    h1 {
      margin-top: -25px;
      color: white;
      text-shadow: 3px 3px black;
    }

    h2 {
      margin-top: 10px;
      color: white;
      text-shadow: 3px 3px black;
    }

    form {
      width: 100%;
      max-width: 500px;
      padding: 15px;
      margin: auto;

      p {
        color: white;
        font-size: 1em;
      }

      .form-control {
        position: relative;
        box-sizing: border-box;
        height: auto;
        font-style: bold;
        padding: 10px;
        font-size: 1.2em;
      }

      input [type="text"] {
        margin-bottom: 25px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
      }

      input[type="password"] {
        margin-bottom: 35px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    }

    a {
      color: inherit;
      text-decoration: none;
    }
  }

  //fait tourner le logo. 
  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>