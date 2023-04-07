<template>
    <div>
        <form>
            <div class="login-form">
                <div class="heading">
                    <h1>Registration Form</h1>
                </div>
                <!-- Car Add/Edit Form -->

                <div class="form">
                    <!-- Name -->
                    <div class="row">
                        <label>Name:</label>
                        <input type="text" v-model="form.name" ref="name">
                        <div v-show="error_name" class="error">{{ error_msg }} </div>
                    </div>
                    <!-- Email -->
                    <div class="row">
                        <label>Email:</label>
                        <input type="email" v-model="form.email" ref="email">
                        <div v-show="error_email" class="error">{{ error_msg }} </div>
                    </div>
                    <!-- Password -->
                    <div class="row">
                        <label>Password:</label>
                        <input type="password" v-model="form.password" ref="password">
                        <div v-if="error_password" class="error">{{ error_msg }} </div>
                    </div>
                    <!-- Confirm Password -->
                    <div class="row">
                        <label>Confirm Password:</label>
                        <input type="password" v-model="form.confirmPassword" ref="confirmPassword">
                        <div v-if="error_confirmPassword" class="error">{{ error_msg }} </div>
                    </div>
                    <!-- Role -->
                    <div class="row">
                        <label>Role:</label>
                        <select v-model="form.role" ref="role">
                            <option value="Admin">Admin</option>
                            <option value="Employee">Employee</option>
                            <option value="Customer">Customer</option>
                        </select>
                        <div v-if="error_role" class="error">{{ error_msg }} </div>
                    </div>
                    <!-- Gender -->
                    <div class="gender-class">
                        <div class="row-gender row ">
                            <label>Gender:</label>
                            <div class="gender">
                                <div class="male">
                                    <input type="radio" value="male" name="gender" v-model="form.gender" ref="gender" />
                                    <label>Male</label>
                                </div>
                                <div class="female">
                                    <input type="radio" value="female" name="gender" v-model="form.gender" ref="gender" />
                                    <label>Female</label>
                                </div>
                            </div>
                        </div>
                        <div v-if="error_gender" class="error">{{ error_msg }} </div>
                    </div>
                    <!-- Age -->
                    <div class="row">
                        <label>Age:</label>
                        <input type="number" v-model.number="form.age" ref="age"
                            onkeydown="return (event.keyCode !== 107 && event.keyCode !== 109 && event.keyCode !== 69);">
                        <!-- Prevent the user from pressing key : +,-,e -->
                        <div v-if="error_age" class="error">{{ error_msg }}</div>
                    </div>
                    <!-- DOB -->
                    <div class="row">
                        <label>Date of Birth:</label>
                        <input type="date" v-model="form.dob" ref="dob" :max="formattedDate()" min="1923-12-31">
                        <div v-if="error_dob" class="error">{{ error_msg }}</div>
                    </div>
                    <div class="row row-button">
                        <button class="submit" @click.prevent="submit">Register</button>
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
import {
    useUserStore
} from '../stores/user'
import router from '../router'
export default {
    name: 'RegisterPage',

    data() {
        return {
            error_name: false,
            error_email: false,
            error_password: false,
            error_confirmPassword: false,
            error_role: false,
            error_gender: false,
            error_age: false,
            error_dob: false,
            error_msg: "",
            form: {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: '',
                gender: '',
                age: '',
                dob: ''
            },
        }
    },
    methods: {
        ...mapActions(useUserStore, ['registerUser']),

        async submit() {
            // clear error
            this.error_name = false
            this.error_email = false,
                this.error_password = false,
                this.error_confirmPassword = false,
                this.error_role = false,
                this.error_gender = false,
                this.error_age = false,
                this.error_dob = false

            if (this.checkName() && this.checkEmail() && this.checkPassword() && this.checkConfirmPassword() && this.checkRole() && this.checkGender() && this.checkAge() && this.checkDOB()) {
                const data = {
                    name: this.form.name,
                    email: this.form.email,
                    role: this.form.role,
                    password: this.form.password,
                    age: this.form.age,
                    dob: this.form.dob,
                    gender: this.form.gender
                }
                const result = await this.registerUser(data)
            }
        },
        checkName() {
            if (this.form.name === "") {
                this.showError("name")
                this.error_msg = "**Please enter name**"
                return false;
            }
            return true
        },
        checkEmail() {
            if (this.form.email === "") {
                this.showError("email")
                this.error_msg = "**Please enter email**"
                return false;
            } else if (this.form.email !== "") {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.form.email)) {
                    this.showError("email")
                    this.error_msg = "**Please enter valid email**"
                    return false;
                }
                return true
            }
            return true;
        },
        checkPassword() {
            if (this.form.password === "") {
                this.showError("password")
                this.error_msg = "**Please enter password**"
                return false;
            } else if (this.form.password !== "") {
                const passRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,12}$/;
                if (!passRegex.test(this.form.password)) {
                    this.showError("password")
                    this.error_msg = "**Password must be 8-12 characters, 1 number, 1 special character**"
                    return false;
                }

                return true
            }
            return true
        },
        checkConfirmPassword() {
            if (this.form.confirmPassword === "") {
                this.showError("confirmPassword")
                this.error_msg = "**Please enter the password again to confirm**"
                return false;
            } else if (this.form.confirmPassword !== "") {
                if (this.form.password !== this.form.confirmPassword) {
                    this.showError("confirmPassword")
                    this.error_msg = "**Confirm Password does not match the Password field**"
                    return false;
                }
                return true;
            }
            return true;
        },
        checkRole() {
            if (this.form.role === "") {
                this.showError("role")
                this.error_msg = "**Please choose your role**"
                return false;
            }
            return true;
        },
        checkGender() {
            if (this.form.gender === "") {
                this.showError("gender")
                this.error_msg = "**Please choose your gender**"
                return false;
            }
            return true
        },
        checkAge() {
            if (this.form.age === "") {
                this.showError("age")
                this.error_msg = "**Please enter your age**"
                return false;
            } else if (this.form.age !== "") {
                const age = this.form.age
                if (typeof this.form.age != 'number' || age.toString().includes(".")) {
                    this.showError("age")
                    this.error_msg = "**Age should be whole number**"
                    return false
                } else if (this.form.age < 18 || this.form.age > 100) {
                    this.showError("age")
                    this.error_msg = "**Age should be between 18-100**"
                    return false
                }
                return true
            }
            return true
        },
        checkDOB() {
            if (this.form.dob === "") {
                this.showError("dob")
                this.error_msg = "**Please choose your Date of Birth**"
                return false;
            }
            return true;
        },
        showError(error) {
            this[`error_${error}`] = true;
            this.$refs[error].focus();
        },
        formattedDate() {
            const today = new Date();
            const year = today.getFullYear();
            const month = (today.getMonth() + 1).toString().padStart(2, '0'); // add 1 to adjust for 0-based indexing
            const day = today.getDate().toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            return formattedDate
        }

    }

}
</script>

<style src="../../public/style.css" scoped></style>
