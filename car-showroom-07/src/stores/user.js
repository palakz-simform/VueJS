import { defineStore } from 'pinia'
import axios from 'axios'
export const useUserStore = defineStore('demo', {
    state: () => ({

        name: "",
        email: "",
        role: "",
        password: "",
        age: "",
        dob: "",
        gender: "",
        login: false

    }),

    actions: {
        async logInUser(user) {
            try {
                const res = await axios.get('https://testapi.io/api/dartya/resource/users')
                const data = await res.data.data
                if (res.status == 200) {
                    const userData = data.find(udata => udata.email == user.email)
                    console.log(userData)
                    if (!userData) {
                        alert("Invalid Email!! Please try again")
                        return false
                    }
                    if (userData.password == user.password) {
                        this.name = userData.name,
                            this.email = userData.email,
                            this.role = userData.role,
                            this.password = userData.password,
                            this.age = userData.age,
                            this.dob = userData.dob,
                            this.gender = userData.gender
                        this.login = true
                        return true
                    }
                    else {
                        alert("Invalid Password!! Please try again")
                        return false
                    }
                }
            }
            catch (err) {
                alert("Error occured!! Please try again")
                return false
            }
        },
        async registerUser(data) {
            try {
                const res = await axios.post('https://testapi.io/api/dartya/resource/users', {
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    password: data.password,
                    age: data.age,
                    dob: data.dob,
                    gender: data.gender
                })
                if (res.status === 201) {
                    return true
                }
            }
            catch (error) {
                alert("Error occured! Please try again")
                return false;
            }

        }

    }
})