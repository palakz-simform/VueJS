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
            gender: "",
            login: false
        }

    },
    actions: {
        registerUser(data) {
            axios.post('https://testapi.io/api/dartya/resource/users', {
                name: data.name,
                email: data.email,
                role: data.role,
                password: data.password,
                age: data.age,
                dob: data.dob,
                gender: data.gender
            }).then((res) => {
                if (res.status === 201) {
                    alert(' User added Successfully: \n\nName: ' + data.name + '\nEmail: ' + data.email + '\nRole :' + data.role + '\nGender:' + data.gender + '\nAge:' + data.age + '\nDate of Birth:' + data.dob)
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
                    console.log(userData)
                    if (userData.password == this.password) {
                        alert("Logged In Successfully!!")
                        this.name = userData.name,
                            this.email = userData.email,
                            this.role = userData.role,
                            this.password = userData.password,
                            this.age = userData.age,
                            this.dob = userData.dob,
                            this.gender = userData.gender
                        this.login = true
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