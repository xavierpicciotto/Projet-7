<template>
    <div class="home-page">
        <div class="logo-container">
            <img src="../assets/groupomania.png" alt="">
        </div>
        <i class="fas fa-house-user"></i>
        <h1> {{ option }} </h1>
        <div>
            <form>
                <!--identifiant-->
                <label for="name-user">Nom utilisateur</label>
                <input v-model="userAccount.name" id="userName" type="text" name="name-user" placeholder="identifiant">
                <!--mot de passe-->
                <label for="password-user">Password</label>
                <input v-model="userAccount.password" id="password" type="password" placeholder="password">
                <!--confirmation du mot de passe-->
                <label  for="confirm-password-user">Confirm password</label>
                <input v-model="userAccount.confirmPassword" v-if="userSignUp" id="confirmPassword" type="password" placeholder="confirm your password">
                <!--acceptation conditions-->
                <div v-if="userSignUp"  class="agreement-box">
                    <input id="agreement" type="checkbox">
                    <p>J'accepte les conditions</p>
                </div>
                <!--valider-->
                <button id="validate" type="submit">Valider</button>
            </form>
            <!--change entre login et sign up-->
            <div @click="changeLoginOption()" class="sign-up-box">
                <i class="fas fa-sign-in-alt"></i>
                <p> {{ switchOption }} </p>
            </div>

        </div>
        <router-link to="/about">About</router-link>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        data: () => {
            return {
                option: "Login",
                switchOption : "SignUp",
                userSignUp: false,
                userAccount: {
                    name: "",
                    password: "",
                    confirmPassword: "",
                },
            }
        },
        methods:  {
            changeLoginOption() {
                if(this.userSignUp === true){
                this.userSignUp = false    
                this.option = "Login"
                this.switchOption = "SignUp"
                    return
                }
                this.userSignUp = true;
                this.option = "SignUp"
                this.switchOption = "Login"
                
            }
        },
    }
</script>

<style scoped lang="scss">
    .home-page {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    .agreement-box {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .sign-up-box {
        margin-top: 5%;
        background-color: cyan;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
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