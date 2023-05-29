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
                        <div v-show="error_email" class="error">{{ error_msg }}</div>
                    </div>
                    <div class="row row-password">
                        <label>Password:</label>
                        <input type="password" v-model="password" ref="password">
                        <div v-show="error_password" class="error">{{ error_msg }}</div>
                    </div>
                    <div class="row row-button">
                        <button @click.prevent="login()" class="submit">Login</button>
                    </div>
                </div>
            </div>

        </form>
    </div>
</template>

<script>
import {
    mapActions
} from 'pinia'
import router from '../router/index'
import {
    useUserStore
} from '../stores/user'

export default {
    name: 'LoginPage',
    data() {
        return {
            error_email: false,
            error_password: false,
            error_msg: "",
            email: "",
            password: "",
        }
    },

    methods: {
        ...mapActions(useUserStore, ['logInUser']),
        getUserData() {
            return {
                email: this.email,
                password: this.password
            }
        },
        async login() {
            this.error_email = false,
                this.error_password = false
            if (this.checkEmail() && this.checkPassword()) {
                const data = this.getUserData()
                const result = await this.logInUser(data)
                if (result == true) {
                    alert("Logged In Successfully!!")
                    router.push({
                        name: 'home'
                    })
                }
            }
        },
        checkEmail() {
            if (this.email === "") {
                this.showError("email")
                this.error_msg = "**Please enter email**"
                return false;
            } else if (this.email !== "") {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.email)) {
                    this.showError("email")
                    this.error_msg = "**Please enter valid email**"
                    return false;
                }
                return true
            }
            return true;
        },
        checkPassword() {
            if (this.password === "") {
                this.showError("password")
                this.error_msg = "**Please enter password**"
                return false;
            } else if (this.password !== "") {
                const passRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,12}$/;
                if (!passRegex.test(this.password)) {
                    this.showError("password")
                    this.error_msg = "**Password must be 8-12 characters, 1 number, 1 special character**"
                    return false;
                }
                return true
            }
            return true
        },
        showError(error) {
            this[`error_${error}`] = true;
            this.$refs[error].focus();
        }

    }
}
</script>

<style src="../../public/style.css" scoped></style>
