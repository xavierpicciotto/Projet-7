<template>
    <div class="home-page text-center">
        <div class="logo-container">
            <img src="../assets/groupomania.svg" alt="">
        </div>
        <div>
            <form class="form-signin">
                <h1 class="h3 mb-3 font-weight-normal text-white">Please sign in</h1>
                <!--User name-->
                <input v-model="user.name" type="text" id="userName" class="form-control" placeholder="User name" required autocomplete="off" autofocus>
                <hr>
                <!--Mot de passe-->
                <input v-model="user.password" type="password" id="userPassword" class="form-control" placeholder="Password" required>
                <!--Checkbox-->
                <div class="checkbox mb-3">
                    <label class="text-white">
                        <input v-model="realClient" class="checkbox" type="checkbox" value="verification"> Je ne suis pas un robot.
                    </label>
                </div>
                <!--Boutton de connection-->
                <button @click="login" class="btn btn-lg btn-success btn-block" type="submit">Login</button>
                <hr>
                <p>Or</p>
                <!--Page pour l'inscription-->
                <router-link to="/Register">
                <button class="btn btn-lg btn-primary btn-block text-center" type="button">Register</button>
                </router-link>
            </form>

            <!--informations annexes-->
            <p class="mt-5 mb-3 text-white">&copy;Groupomania départment 2019-2020.</p>
            <router-link to="/about">About Groupomania</router-link>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'Home',
        data: () => {
            return {
                user: {
                    name: "",
                    password: "",
                },
                realClient: false,
            }
        },
        methods: {
            login(){
                let user = {
                    ...this.user
                }
                if(this.realClient === true) {
                    user = JSON.stringify(user)
                    console.log(user)
                }
            },
        },
    }
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

    img {
        width: 200px;
        height: auto;
        border-radius: 15px;
    }

    .form-signin {
        width: 100%;
        max-width: 500px;
        padding: 15px;
        margin: auto;
        margin-top: 5%;
        p {
            color: white;
            font-size: 1em;
        }
        
    }
    hr {
        margin: 5%;
    }

    .form-signin .checkbox {
        margin-top: 10%;
        font-size: 1.5em;
    }

    .form-signin .form-control {
        position: relative;
        box-sizing: border-box;
        height: auto;
        padding: 10px;
        font-size: 16px;
    }

    .form-signin .form-control:focus {
        z-index: 2;
    }

    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
    a {
        color: #fd2d01;
        text-decoration: none;
    }
</style>>