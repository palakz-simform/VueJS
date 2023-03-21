<template>
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
                <div v-show="error_name">
                    <p class="error">{{error_msg }}</p>
                </div>
            </div>
            <!-- Email -->
            <div class="row">
                <label>Email:</label>
                <input type="email" v-model="form.email" ref="email">
                <div v-show="error_email">
                    <p class="error">{{error_msg }}</p>
                </div>
            </div>
            <!-- Password -->
            <div class="row">
                <label>Password:</label>
                <input type="password" v-model="form.password" ref="password">
                <div v-if="error_password">
                    <p class="error">{{error_msg}}</p>
                </div>
            </div>
            <!-- Confirm Password -->
            <div class="row">
                <label>Confirm Password:</label>
                <input type="password" v-model="form.confirmPassword" ref="confirmPassword">
                <div v-if="error_confirmPassword">
                    <p class="error">{{error_msg}}</p>
                </div>
            </div>
            <!-- Role -->
            <div class="row">
                <label>Role:</label>
                <select v-model="form.role" ref="role">
                    <option value="Admin">Admin</option>
                    <option value="Employee">Employee</option>
                    <option value="Customer">Customer</option>
                </select>
                <div v-if="error_role">
                    <p class="error">{{error_msg}}</p>
                </div>
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
                <div v-if="error_gender">
                    <p class="error">{{error_msg}}</p>
                </div>
            </div>
            <!-- Age -->
            <div class="row">
                <label>Age:</label>
                <input type="number" v-model="form.age" ref="age" onkeydown="return (event.keyCode !== 107 && event.keyCode !== 109 && event.keyCode !== 69);">
                <!-- Prevent the user from pressing key : +,-,e -->
                <div v-if="error_age">
                    <p class="error">{{ error_msg }}</p>
                </div>
            </div>
            <!-- DOB -->
            <div class="row">
                <label>Date of Birth:</label>
                <input type="date" v-model="form.dob" ref="dob" :max="formattedDate()" min="1923-12-31">
                <div v-if="error_dob">
                    <p class="error">{{ error_msg }}</p>
                </div>
            </div>

            <button class="submit" @click.prevent="submit">Register</button>
        </div>
    </div>

</form>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
    name: 'RegisterPage',
    data() {
        return {
            error_name:false,
            error_email: false,
            error_password: false,
            error_confirmPassword: false,
            error_role: false,
            error_gender: false,
            error_age: false,
            error_dob: false,
          
            error_msg: "",
            form: {
                name:'',
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

        submit() {
            // clear error
            this.error_name=false
            this.error_email = false,
                this.error_password = false,
                this.error_confirmPassword = false,
                this.error_role = false,
                this.error_gender = false,
                this.error_age = false,
                this.error_dob = false

            if (this.checkName() &&this.checkEmail() && this.checkPassword() && this.checkConfirmPassword() && this.checkRole() && this.checkGender() && this.checkAge() && this.checkDOB()) {
                axios.post('https://testapi.io/api/dartya/resource/users',{
                    name:this.form.name,
                    email:this.form.email,
                    role:this.form.role,
                    password:this.form.password,
                    age:this.form.age,
                    dob:this.form.dob,
                    gender:this.form.gender               
                }).then((res)=>{                   
                    if(res.status===201){
                        alert(' User added Successfully: \n\nName: ' + this.form.name +'\nEmail: ' + this.form.email + '\nRole :' + this.form.role + '\nGender:' + this.form.gender+ '\nAge:' + this.form.age+ '\nDate of Birth:' + this.form.dob)
                        router.push({name: 'login'})                        
                    }
                    else{
                        alert("Error!!")
                    }
                  
                })
               
            }
     

        },
        checkName(){
            if (this.form.name === "") {
                this.error_name = true
                this.error_msg = "**Please enter name**"
                this.$refs.name.focus()
                return false;
            }
            return true
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
                if (this.form.password.length < 8) {
                    this.error_password = true
                    this.error_msg = "**Password must be greater than 8 characters**"
                    this.$refs.password.focus()
                    return false;
                }
                return true
            }
            return true
        },
        checkConfirmPassword() {
            if (this.form.confirmPassword === "") {
                this.error_confirmPassword = true
                this.error_msg = "**Please enter the password again to confirm**"
                this.$refs.confirmPassword.focus()
                return false;
            } else if (this.form.confirmPassword !== "") {
                if (this.form.password !== this.form.confirmPassword) {
                    this.error_confirmPassword = true
                    this.error_msg = "**Confirm Password does not math the Password field**"
                    this.$refs.confirmPassword.focus()
                    return false;
                }
                return true;
            }
            return true;
        },
        checkRole() {
            if (this.form.role === "") {
                this.error_role = true
                this.error_msg = "**Please choose your role**"
                this.$refs.role.focus()
                return false;
            }
            return true;
        },
        checkGender() {
            if (this.form.gender === "") {
                this.error_gender = true
                this.error_msg = "**Please choose your gender**"
                this.$refs.gender.focus()
                return false;
            }
            return true
        },
        checkAge() {
            if (this.form.age === "") {
                this.error_age = true
                this.error_msg = "**Please enter your age**"
                this.$refs.age.focus()
                return false;
            } else if (this.form.age !== "") {
                const age = this.form.age
                if (typeof this.form.age != 'number' || age.toString().includes(".")) {
                    this.error_age = true
                    this.error_msg = "**Age should be whole number**"
                    this.$refs.age.focus()
                    return false
                } else if (this.form.age < 18 || this.form.age > 100) {
                    this.error_age = true
                    this.error_msg = "**Age should be between 18-100**"
                    this.$refs.age.focus()
                    return false
                }
                return true
            }
            return true
        },
        checkDOB() {
            if (this.form.dob === "") {
                this.error_dob = true
                this.error_msg = "**Please choose your Date of Birth**"
                this.$refs.dob.focus()
                return false;
            }
            return true;
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

<style scoped>
form {
    margin: auto;
    margin-top: 80px;
    max-width: 500px;
    box-shadow: 5px 10px 18px #888888;
    margin-bottom: 80px;

}

h1 {
    text-align: center;
    color: brown
}

div.row {
    height: 80px;
    margin-top: 0px;
}

.heading {
    display: flex;
    justify-content: space-between;
    padding: 1px 10px 5px 120px;
}

.button {
    height: 20px;
    margin-top: 10px;
    font-weight: bold;
    background-color: transparent;
    border: none;
    font-size: 18px;
}

label {
    padding-left: 40px;
    font-size: 18px;
}

.error {
    color: red;
    padding-left: 40px;
    margin-top: 2px;
    margin-bottom: 0px;

}

.row {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    margin-top: 10px;
}

.row-gender {
    display: flex;
    flex-direction: column;
}

input,
textarea,
select {
    margin-left: 40px;
    margin-top: 10px;
    margin-right: 40px;
    height: 28px;
    padding-left: 5px;
    ;
}

input[type="date"],
select {
    margin-top: 0px;
    height: 31px;
}

input[type="radio"],
.gender {
    margin: 0px;
    display: flex;
    align-items: center;
    width: 15px;
    margin-left: 20px;

}

input[type="radio"]:focus {
    outline: none !important;
    border-color: rgb(0, 0, 0);
    box-shadow: 0 0 0px rgb(0, 0, 0);
}

.gender {

    display: flex;
    flex-direction: column;
}

.gender-class {
    height: 90px;
}

div.row-gender.row {
    display: flex;
    flex-direction: row;
    height: 40px;
}

.female label,
.male label {
    padding-left: 10px;
}

.female,
.male {
    display: flex;
    width: 30px;

}

select {
    height: 33px;

}

textarea:focus,
input:focus {
    outline: none !important;
    border-color: brown;
    box-shadow: 0 0 10px rgb(196, 105, 105);
}

.submit {
    width: 100px;
    height: 35px;
    background-color: brown;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    margin-top: 25px;
    margin-left: 195px;
    margin-bottom: 40px;

}

.submit:hover {
    background-color: transparent;
    color: brown;
    border: 3px solid brown;
}

@media (max-width: 500px) {
    form {
        max-width: 400px;
    }

    .heading {

        padding: 1px 10px 5px 70px;
    }

    .submit {

        margin-left: 140px;
        margin-bottom: 20px;

    }
}
</style>
