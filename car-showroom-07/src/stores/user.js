import { defineStore } from 'pinia'
import router from '../router'
import axios from 'axios'
export const useUserStore = defineStore('user', {
    state: () => {
        return {
            name: "",
            email: "",
            role: "",
            password: "",
            age: "",
            dob: "",
            gender: ""
        }

    },
    actions: {
        registerUser() {
            axios.post('https://testapi.io/api/dartya/resource/users', {
                name: this.name,
                email: this.email,
                role: this.role,
                password: this.password,
                age: this.age,
                dob: this.dob,
                gender: this.gender
            }).then((res) => {
                if (res.status === 201) {
                    alert(' User added Successfully: \n\nName: ' + this.name + '\nEmail: ' + this.email + '\nRole :' + this.role + '\nGender:' + this.gender + '\nAge:' + this.age + '\nDate of Birth:' + this.dob)
                    router.push({
                        name: 'login'
                    })
                } else {
                    alert("Error!!")
                }
            }).catch((err) => alert("Error occured! Please try again" + err))
        },
        logInUser() {
            axios.get('https://testapi.io/api/dartya/resource/users').then((res) => {
                const data = res.data.data
                if (res.status == 200) {
                    const userData = data.find(udata => udata.email == this.email)
                    if (userData.password == this.password) {
                        alert("Logged In Successfully!!")
                        router.push({
                            name: 'home'
                        })
                    } else {
                        alert("Invalid Email or Password!! Please try again")
                    }

                }
            }).catch((err) => alert("Error occured! Please try again" + err))
        }

    }
})