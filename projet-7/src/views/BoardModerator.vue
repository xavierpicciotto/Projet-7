<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'User',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getModeratorBoard().then(
      response => {
        this.content = response.data.message;
      },
      err => {
        this.content = err.response.data.message
      }
    );
  }
};
</script>