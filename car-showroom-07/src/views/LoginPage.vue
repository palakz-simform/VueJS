<template>
<div>
    <form>
        <div class="login-form">
            <div class="heading">
                <h1>Login Form</h1>
            </div>
            <!-- Car Add/Edit Form -->

            <div class="form">
                <div class="row">
                    <label>Email:</label>
                    <input type="email" v-model="email" ref="email">
                    <div v-show="error_email" class="error">{{error_msg }}</div>
                </div>
                <div class="row row-password">
                    <label>Password:</label>
                    <input type="password" v-model="password" ref="password">
                    <div v-show="error_password" class="error">{{error_msg }}</div>
                </div>
                <div class="row row-button">
                    <button @click.prevent="login" class="submit">Login</button>
                </div>
            </div>
        </div>

    </form>
</div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import {useUserStore} from '../stores/user'
export default {
    name: 'LoginPage',
    data() {
        return {
            error_email: false,
            error_password: false,
            error_msg: "",
        }
    },
    computed:{
        ...mapWritableState(useUserStore,['email','password'])
    },
    methods: {
        ...mapActions(useUserStore,['logInUser']),
        login() {
            this.error_email = false,
                this.error_password = false
            if (this.checkEmail() && this.checkPassword()) {
                this.logInUser()
            }
        },
        checkEmail() {
            if (this.email === "") {
                this.error_email = true
                this.error_msg = "**Please enter email**"
                this.$refs.email.focus()
                return false;
            } else if (this.email !== "") {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.email)) {
                    this.error_email = true
                    this.error_msg = "**Please enter valid email**"
                    this.$refs.email.focus()
                    return false;
                }
                return true
            }
            return true;
        },
        checkPassword() {
            if (this.password === "") {
                this.error_password = true
                this.error_msg = "**Please enter password**"
                this.$refs.password.focus()
                return false;
            } else if (this.password !== "") {
                const passRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,12}$/;
                if (!passRegex.test(this.password)) {
                    this.error_password = true;
                    this.error_msg = "**Password must be 8-12 characters, 1 number, 1 special character**"
                    this.$refs.password.focus()
                    return false;
                }

                return true
            }
            return true
        },
    }
}
</script>

<style src="../../public/style.css" scoped></style>
