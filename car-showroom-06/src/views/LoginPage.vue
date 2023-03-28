<template>
     <button @click="show=!show">Toggle</button>
<form>   
        <div class="login-form">
        <div class="heading">
            <h1>Login Form</h1>
        </div>
        <!-- Car Add/Edit Form -->

        <div class="form">
            <div class="row">
                <label>Email:</label>
                <input type="email" v-model="form.email" ref="email">
                <div v-show="error_email" class="error">{{error_msg }}</div>
            </div>
            <div class="row row-password">
                <label>Password:</label>
                <input type="password" v-model="form.password" ref="password">
                <div v-show="error_password" class="error">{{error_msg }}</div>
            </div>
            <div class="row row-button">
                <button @click.prevent="login" class="submit">Login</button>
            </div>
        </div>
    </div>

</form>
</template>

<script>
import axios from 'axios'

export default {
    name: 'LoginPage',
    data() {
        return {
            show:true,
            error_email: false,
            error_password: false,
            error_msg: "",
            form: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        login() {
            this.error_email = false,
                this.error_password = false
            if (this.checkEmail() && this.checkPassword()) {
                axios.get('https://testapi.io/api/dartya/resource/users').then((res) => {
                    const data = res.data.data
                    if (res.status == 200) {
                        const userData = data.find(udata => udata.email == this.form.email)
                        if (userData.password == this.form.password) {
                            alert("Logged In Successfully!!")
                            this.$router.push({
                                name: 'home'
                            })
                        } else {
                            alert("Error Logging In!!\n\nPlease try again")
                        }

                    }
                })
            }
        },
        checkEmail() {
            if (this.form.email === "") {
                this.error_email = true
                this.error_msg = "**Please enter email**"
                this.$refs.email.focus()
                return false;
            } else if (this.form.email !== "") {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.form.email)) {
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
            if (this.form.password === "") {
                this.error_password = true
                this.error_msg = "**Please enter password**"
                this.$refs.password.focus()
                return false;
            } else if (this.form.password !== "") {
                const passRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,12}$/;
                if (!passRegex.test(this.form.password)) {
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
