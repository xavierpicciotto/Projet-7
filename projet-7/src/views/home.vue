<template>
    <div class="home-page">
        <div class="logo-container">
            <img src="../assets/groupomania.png" alt="">
        </div>
        <h1>Login</h1>
        <i class="fas fa-house-user"></i>
        <div>
            <form>
                <label for="name-user">Nom utilisateur</label>
                <input id="userName" type="text" name="name-user" placeholder="identifiant">
                <label for="password-user">Password</label>
                <input id="password" type="password" placeholder="password">
                <label for="confirm-password-user">Confirm password</label>
                <input id="confirmPassword" type="password" placeholder="confirm your password">
                <div class="agreement-box">
                    <input id="agreement" type="checkbox">
                    <p>J'accepte les conditions</p>
                </div>
                <button id="validate" type="submit">Valider</button>
            </form>
            <div class="sign-up-box">
                <i class="fas fa-sign-in-alt"></i>
                <p>Inscription</p>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        props: {
            url: String
        },
        data: () => {

        }
    }
</script>

<style scoped lang="scss">
    .home-page {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .agreement-box {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .fa-house-user {
        font-size: 9em;
        margin: 5%;
        color: rgb(0, 140, 255);
    }

    img {
        width: 35%;
        height: auto;
    }
</style>>