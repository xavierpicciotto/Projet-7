<template>
  <div class="about">
    <h1>About Groupomania</h1>
    <img src="../assets/GRP.png" alt="Siège social groupomania">
    <p>Notre entreprise, spécialisée dans la grande distribution, est en pleine expansion. Nous avons actuellement
      plus de 600 collaborateurs et avons beaucoup recruté depuis quelques années. Nous étions uniquement
      300 il y a 3 ans.</p>
  </div>
</template>

<script>
  export default {
    name: "About",
  }
</script>

<style lang="scss" scoped>
  .about {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 5%;
    img {
      height: auto;
      width: 100%;
    }
  }

  h1 {
    text-align: center;
    color: white;
    font-size: 2.7vh;
    margin-top: 5%;
    margin-bottom: 10%;
  }

  p {
    font-size: 3vh;
    color: white;
  }

</style>