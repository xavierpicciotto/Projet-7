<template>
    <div class="home-page text-center">
        <div class="logo-container">
            <img src="../assets/groupomania.svg" alt="">
        </div>
        <div>
            <form class="form-signup">
                <h1 class="h3 mb-3 font-weight-normal text-white">Please sign up</h1>
                <!--User name-->
                <input v-model="user.name" type="text" id="inputName" class="form-control" placeholder="Your user name"
                    required autofocus>
                <hr>
                <!--Mot de passe-->
                <input v-model="user.password" type="password" id="newPassword" class="form-control"
                    placeholder="Password" required>
                <input v-model="comfirPassword" type="password" id="comfirmPassword" class="form-control"
                    placeholder="Comfirm password" required>
                <!--Checkbox-->
                <div class="checkbox mb-3">
                    <label class="text-white">
                        <input v-model="agreeRules" class="checkbox" type="checkbox" value="verification"> I accepte the
                        rules.
                    </label>
                </div>
                <!--Page pour l'inscription-->
                <button class="btn btn-lg btn-success btn-block text-center" type="submit">Register me</button>
                <hr>
                <!--Retour a l'accueil-->
                <router-link to="/">
                    <button class="btn btn-lg btn-primary btn-block text-center" type="button">Return login</button>
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
        name: 'Register',
        data: () => {
            return {
                user: {
                    name: "",
                    password: "",

                },
                comfirPassword: "",
                agreeRules: false,
            }
        },
        methods: {
            login() {
                let user = {
                    ...this.user
                }
                if (this.realClient === true) {
                    user = JSON.stringify(user)
                    console.log(user)
                }
            }
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

    .form-signup {
        width: 100%;
        max-width: 500px;
        padding: 15px;
        margin: auto;
        margin-top: 5%;

        p {
            color: white;
            font-size: 1em;
        }

        .checkbox {
            font-weight: 400;
        }

        hr {
            margin: 5%;
        }

        .form-control {
            position: relative;
            box-sizing: border-box;
            height: auto;
            padding: 10px;
            font-size: 16px;
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

        .checkbox {
            font-size: 1.5em;
        }
    }

    a {
        color: #fd2d01;
        text-decoration: none;
    }
</style>>