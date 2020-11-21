<template>
    <div class="bloc-modale" v-if="accountDelete">
        <div class="overlay" v-on:click="toggleDelete"></div>

        <div class="modale card">
            <div v-on:click="toggleDelete" class="btn-close btn btn-danger">X</div>
            <h3>Delete your Account {{currentUser.username}} ?</h3>
            <div @click="handleDelete" class="agree btn btn-danger">Yes I agree</div>
        </div>
    </div>
</template>


<script>
    export default {
        name: "ModaleAccountDelete",
        props: ["accountDelete", "toggleDelete"],
        computed: {
            currentUser() {
                const user = this.$store.state.auth.user;
                return user;
            },
        },
        methods: {

            handleDelete() {
                let id = this.currentUser.id
                console.log(id + "handledelete")
                this.$store.dispatch(`auth/delete`, id)
                    .then(() => {
                        console.log('handleDelete responce ')
                        this.$store.dispatch('auth/logout');
                        this.$router.push('/');
                    })
                    .catch(err => console.log('handleDelete ERROR result =' + err));
            }
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
        background: #f1f1f1;
        color: #333;
        padding: 50px;
        position: fixed;
        top: 30%;
    }

    .agree {
        margin-top: 25px;
        padding: 4%;
        font-size: 1.5em;
    }

    .btn-close {
        position: absolute;
        top: 10px;
        right: 10px;
    }
</style>