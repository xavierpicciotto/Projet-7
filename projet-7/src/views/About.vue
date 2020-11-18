<template>
  <div class="about">
    <h1>About Groupomania</h1>    
    <router-link to="/">
    <h2>HOME</h2>
    </router-link>
  </div>
</template>

<script>

export default {
  name: "About",
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
