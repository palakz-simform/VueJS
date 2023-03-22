<template>
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
        <div v-show="error_email">
            <p class="error">{{error_msg }}</p>
        </div>
    </div>
    <div class="row">
        <label>Password:</label>
        <input type="password" v-model="form.password" ref="password">
        <div v-if="error_password">
            <p class="error">{{ error_msg }}</p>
        </div>
    </div>
        <button @click.prevent="login" class="submit">Login</button>  
</div>
</div>

</form>
</template>

<script>
import axios from 'axios'
import router from '../router'

    export default {
        name:'LoginPage',
        data(){
        return{
                error_email: false,
                error_password: false,
                error_msg: "",
                form: {
                    email: '',
                    password: '',
                }
        }
        },
        methods:{
            login(){
                this.error_email = false,
                this.error_password = false
                if (this.checkEmail() && this.checkPassword() ) {
                    axios.get('https://testapi.io/api/dartya/resource/users').then((res)=>{
                        const data = res.data.data
                        if(res.status==200){
                            const userData = data.find(udata => udata.email==this.form.email)
                            if(userData.password==this.form.password){
                                alert("Logged In Successfully!!")
                                router.push({name:'home'})
                            }
                            else{
                                alert("Error Logging In!!\n\nPlease try again")
                            }
                          
                        }
                    })}
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
                console.log("aa")
                this.error_password = true;
                this.error_msg = "**Please enter password**"
                this.$refs.password.focus()
                return false;
            } else if (this.form.password !== "") {
                if (this.form.password.length < 8) {
                    this.error_password = true;
                    this.error_msg = "**Password must be greater than 8 characters**"
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


<style scoped>
form{
    margin: auto;
    margin-top:80px;
    max-width: 400px;
    box-shadow: 5px 10px 18px #888888;
   
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

input,
textarea {
    margin-left: 40px;
    margin-top: 10px;
    margin-right: 40px;
    height: 28px;
    padding-left: 5px;
    ;
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
    margin-left: 150px;
    margin-bottom: 30px;

}

.submit:hover {
    background-color: transparent;
    color: brown;
    border: 3px solid brown;
}

@media (max-width:500px){  
    .heading {
     
    align-items: center;
    display: contents;
}
.submit {    
   margin-left:40px;  

}
}
</style>
