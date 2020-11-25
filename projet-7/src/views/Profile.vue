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
      <div v-on:click="$router.push('/user')" class="user acces col-11 text-center">User content.</div>
      <div v-if="showAdminBoard" v-on:click="$router.push('/admin')" class="admin acces col-11 text-center">Admin
        content.</div>
      <div v-if="showModeratorBoard" v-on:click="$router.push('/mod')" class="moderator acces col-11 text-center">
        Moderator content.</div>
    </div>
    <!--editeur de profil-->
    <div class="editor container jumbotron jumbotron-fluid">
      <button v-on:click="toggleModify" class="btn bg-primary text-white col-md-4">Edit Profile
      </button>
      <!--account delete-->
      <button v-on:click="toggleDelete" class="btn bg-danger text-white sticky-right col-md-4">
        Delete account</button>
      <modaleAccountDelete :accountDelete="accountDelete" :toggleDelete="toggleDelete"></modaleAccountDelete>
    </div>
    <!--modify account-->
    <modaleModifyProfile :modifyProfile="modifyProfile" :toggleModify="toggleModify"></modaleModifyProfile>

  </div>
</template>

<script>
  import ModaleAccountDelete from "../components/ModaleAccountDelete.vue";
  import ModaleModifyProfile from "../components/ModaleModifyProfile";

  export default {
    name: 'Profile',
    data() {
      return {
        modifyProfile: false,
        accountDelete: false,
      }
    },
    components: {
      ModaleAccountDelete: ModaleAccountDelete,
      ModaleModifyProfile: ModaleModifyProfile,
    },
    methods: {
      toggleDelete: function () {
        this.accountDelete = !this.accountDelete;
      },
      toggleModify() {
        this.modifyProfile = !this.modifyProfile;
      },
    },
    computed: {
      //Récupère les infos sur le User.
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

    .acces {
      cursor: pointer;
      font-size: 2em;
      color: white;
      text-shadow: 2px 2px black;
      border-radius: 0.5em;
      margin: auto;
      margin-bottom: 5%;
      padding: 12%;
      box-shadow: 2px 2px rgba(0, 0, 0, 0.363);

      &:hover {
        font-size: 2.05em;
        box-shadow: 3px 3px rgba(0, 0, 0, 0.52);
      }
    }

    .user {
      background-image: url(https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80);
      background-position: center;
      background-size: cover;
    }

    .admin {
      background-image: url(https://cdn.pixabay.com/photo/2017/01/26/03/29/office-2009693_960_720.jpg);
      background-position: center;
      background-size: cover;
    }

    .moderator {
      background-image: url(https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80);
      background-position: center;
      background-size: cover;
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
    padding-top: 0;
    button {
      font-size: 1.5em;
      border-radius: 1em;
    }
    @media screen and (max-width: 765px) {
      flex-direction: column;
    }
  }
</style>