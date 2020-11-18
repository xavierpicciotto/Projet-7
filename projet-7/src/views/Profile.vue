<template>
  <div class="container">
    <!--Block de la page.-->
    <header class="jumbotron jumbotron-fluid gradient">
      <div class="container">
        <h3 class="display-4">
          Hello <strong>{{currentUser.username}}.</strong>
        </h3>
        <p class="lead">Welcome to your personal page.</p>
      </div>
    </header>
    <!--Infos complémentaire-->
    <div class="user-information container gradient">
      <div class="row">
        <p class="col-sm">
          <strong>Id:</strong>
          {{currentUser.id}}
        </p>
        <p class="col-sm">
          <strong>Email:</strong>
          {{currentUser.email}}
        </p>
      </div>
    </div>

    <!--selection des contenus-->
    <div class="user-content container jumbotron jumbotron-fluid">
      <div v-on:click="$router.push('/user')" class="user-acces col-11 text-center">Acces User content.</div>
      <div v-if="showAdminBoard" v-on:click="$router.push('/admin')" class="user-acces col-11 text-center">Acces Admin
        content.</div>
      <div v-if="showModeratorBoard" v-on:click="$router.push('/mod')" class="user-acces col-11 text-center">Acces
        Moderator content.</div>
    </div>
    <!--editeur de profil-->
    <div class="editor container jumbotron jumbotron-fluid rounded-bottom">
      <button v-on:click="editProfile = !editProfile" class="btn bg-primary text-white col-md-4">Edit Profile
      </button>
      <!--account delete-->
      <button v-on:click="toggleModale" class="btn bg-danger text-white sticky-right col-md-4">
      Delete account</button>
      <modaleAccountDelete :accountDelete="accountDelete" :toggleModale="toggleModale"></modaleAccountDelete>
    </div>
    <!--modify account-->
    <div v-if="editProfile">zaa</div>
    
  </div>
</template>

<script>
  import ModaleAccountDelete from "../components/ModaleAccountDelete.vue";

  export default {
    name: 'Profile',
    data() {
      return {
        editProfile: false,
        accountDelete: false,
      }
    },
    components: {
      modaleAccountDelete: ModaleAccountDelete
    },
    methods: {
      toggleModale: function () {
        this.accountDelete = !this.accountDelete;
      },
    },
    computed: {
      //Récupère les infos sur le store.
      currentUser() {
        return this.$store.state.auth.user;
      },
      showAdminBoard() {
        if (this.currentUser && this.currentUser.roles) {
          return this.currentUser.roles.includes('ROLE_ADMIN');
        }

        return false;
      },
      showModeratorBoard() {
        if (this.currentUser && this.currentUser.roles) {
          return this.currentUser.roles.includes('ROLE_MODERATOR');
        }

        return false;
      }
    },
    //Connection auto.
    mounted() {
      if (!this.currentUser) {
        this.$router.push('/login');
      }
    }
  };
</script>

<style lang="scss" scoped>
  header {
    color: white;
    border-top-left-radius: 3em;
    border-top-right-radius: 1em;
    margin-bottom: 0;
  }

  .gradient {
    background: rgb(2, 0, 36);
    background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(49, 55, 195, 1) 0%, rgba(32, 108, 215, 1) 48%, rgba(0, 212, 255, 1) 100%);
  }

  .user-information {
    color: white;
  }

  .user-content {
    background-color: #f1f1f1;
    margin-bottom: 0;

    .user-acces {
      cursor: pointer;
      font-size: 2em;
      color: white;
      text-shadow: 2px 2px black;
      border-radius: 0.5em;
      margin: auto;
      margin-bottom: 5%;
      padding: 12%;
      background: linear-gradient(to right, #127eff, #f17979);
      box-shadow: 2px 2px rgba(0, 0, 0, 0.363);

      &:hover {
        font-size: 2.05em;
        box-shadow: 3px 3px rgba(0, 0, 0, 0.52);
      }
    }

    button {
      font-size: 1.3em;
      background-color: #5d4ff5;
      border: transparent;
    }
  }

  .editor {
    background-color: #f1f1f1;
    display: flex;
    justify-content: space-around;

    button {
      font-size: 1.5em;
    }
  }
</style>