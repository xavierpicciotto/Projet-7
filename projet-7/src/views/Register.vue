<template>
    <div class="home-page text-center">
        <div>
            <h2>Please register</h2>
            <form name="form" @submit.prevent="handleRegister">
                <div>
                    <div class="form-group">
                        <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
                            {{message}}</div>
                        <label for="username">Username</label>
                        <input v-model="user.username" v-validate="'required|min:3|max:20'" type="text"
                            class="form-control" name="username" />
                        <div v-if="submitted && errors.has('username')" class="alert-danger">
                            {{errors.first('username')}}</div>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input v-model="user.email" v-validate="'required|email|max:50'" type="email"
                            class="form-control" name="email" />
                        <div v-if="submitted && errors.has('email')" class="alert-danger">{{errors.first('email')}}
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input v-model="user.password" v-validate="'required|min:6|max:40'" type="password"
                            class="form-control" name="password" />
                        <div v-if="submitted && errors.has('password')" class="alert-danger">
                            {{errors.first('password')}}</div>
                    </div>
                    <div class="checkbox mb-3">
                        <input v-model="agreeClient" class="checkbox" type="checkbox" value="verification"> I accepte
                        the rules.
                    </div>
                    <div class="form-group">
                        <button class="btn btn-success btn-block">Sign Up</button>
                    </div>
                    <hr>
                    <router-link to="/">
                        <button class="btn btn-lg btn-primary btn-block text-center" type="button">Home</button>
                    </router-link>
                </div>
            </form>

            <!--informations annexes-->
            <p class="mt-5 mb-3 text-white">&copy;Groupomania départment 2019-2020.</p>
            <router-link to="/about" class="text-danger">About Groupomania</router-link>
        </div>

    </div>
</template>

<script>
    import User from '../models/user';

    export default {
        name: 'Register',
        data() {
            return {
                user: new User('', '', ''),
                submitted: false,
                agreeClient: false,
                successful: false,
                message: '',
            };
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        mounted() {
            if (this.loggedIn) {
                this.$router.push('/profile');
            }
        },
        methods: {
            handleRegister() {
                this.submitted = true;
                this.$validator.validate().then(isValid => {
                    if (isValid) {
                        this.$store.dispatch('auth/register', this.user).then(
                            response => {
                                this.message = response.message;
                                this.successful = true;
                            },
                            err => {
                                this.message = err.response.data.message;
                                this.successful = false
                            }
                        );
                    }
                });
            }
        }
    };
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

    input {
        font-size: 2.5em;
    }

    label {
        color: white;
        font-size: 1.5em;
    }

    .checkbox {
        font-weight: 400;
        color: white;
    }

    hr {
        margin: 5%;
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
</style>>