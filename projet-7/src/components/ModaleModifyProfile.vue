<template>
    <div class="bloc-modale" v-if="modifyProfile">
        <div class="overlay" v-on:click="toggleModify"></div>

        <div class="modale card">
            <div v-on:click="toggleModify" class="btn-close btn btn-danger">X</div>
            <h3>Modify your profile {{currentUser.username}}.</h3>
            <form @submit.prevent="handleModify" name="form" class="container">
                <div class="form-group"> <label for="username">Username: {{currentUser.username}}</label>
                    <input v-model="user.username" v-validate="'min:3|max:20'" name="username" type="text">
                </div>
                <div class="form-group"> <label for="email">Email: {{currentUser.email}}</label>
                    <input v-model="user.email" v-validate="'email|max:50'" name="email" type="email">
                </div>
                <div class="form-group"> <label for="password">Password</label>
                    <input v-model="user.password" v-validate="'min:6|max:40'" name="password" type="password">
                </div>
                <div class="form-group">
                    <button class="btn btn-success btn-block">Aplly changes</button>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
    import User from '../models/user';
    export default {
        name: "ModaleModifyProfile",
        props: ["modifyProfile", "toggleModify"],
        data() {
            return {
                user: new User('', '', '')
            }
        },
        computed: {
            currentUser() {
                return JSON.parse(localStorage.getItem('user'))
            },
        },
        methods: {

            handleModify() {
                this.$validator.validate().then(isValid => {
                    if (isValid) {
                        const userUpdate = {
                            ...this.user,
                            id: this.currentUser.id
                        }
                        this.$store.dispatch(`auth/modify`, userUpdate).then(() => {
                            console.log('HandleModify responce')
                            this.$router.push('/')
                        })
                    }
                })
            }
        }

    };
</script>


<style lang="scss" scoped>
    .bloc-modale {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .overlay {
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .modale {
        background: #03b1ffed;
        color: #333;
        padding: 50px;
        top: 50px;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: white;
        font-size: 1.3em;
    }

    input {
        border: none;
        border-radius: 0.6em;
        font-size: 1.5em;

        &:focus {
            border: 1px solid rgba(0, 195, 255, 0.788);
            outline: none;
        }
    }

    button {
        font-size: 1.1em;
    }

    .btn-close {
        position: absolute;
        top: 10px;
        right: 10px;
    }
</style>