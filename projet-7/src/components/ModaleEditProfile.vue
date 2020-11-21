<template>
    <div class="bloc-modale" v-if="editProfile">
        <div class="overlay" v-on:click="toggleEdit"></div>

        <div class="modale card">
            <div v-on:click="toggleEdit" class="btn-close btn btn-danger">X</div>
            <h3>Modify your profile {{currentUser.username}}.</h3>
            <form name="form" class="container">
                <div class="form-group"> <label for="username">Username: {{currentUser.username}}</label>
                    <input v-model="user.username" v-validate="'required|min:3|max:20'" name="username" type="text">
                </div>
                <div class="form-group"> <label for="email">Email: {{currentUser.email}}</label>
                    <input v-model="user.email" v-validate="'required|email|max:50'" name="email" type="email">
                </div>
                <div class="form-group"> <label for="password">Password</label>
                    <input v-model="user.password" v-validate="'required|min:6|max:40'" name="password" type="password">
                </div>
                <div class="form-group">
                    <button class="btn btn-success btn-block">Modify</button>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
    import User from '../models/user';
    export default {
        name: "ModaleEditProfile",
        props: ["editProfile", "toggleEdit"],
        data() {
            return {
                user: new User('', '', ''),
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
        },
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
        background: #5ecaf5;
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
    input{
        border: none;
        border-radius: 0.6em;
        font-size: 1.5em;
        &:focus{
            border: 1px solid rgba(0, 195, 255, 0.788);
            outline: none;
        }
    }
    button{
        font-size: 1.1em;
    }
    .btn-close {
        position: absolute;
        top: 10px;
        right: 10px;
    }
</style>