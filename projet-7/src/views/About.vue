<template>
  <div class="about">
    <h1>About Groupomania</h1>
    <HelloWorld>si</HelloWorld>    
    <router-link to="/">
    <h2>HOME</h2>
    </router-link>
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";

export default {
  name: "app",
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss" scoped>
  h1 {
    text-align: center;
    color: white;
    font-size: 2.5em;
    margin-bottom: 20%;
  }
  h2{
    text-align: center;
    font-size: 5em;
  }
</style>
