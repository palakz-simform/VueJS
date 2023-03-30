import { defineStore } from 'pinia'
import axios from 'axios'
export const useCarStore = defineStore('counter', {
    state: () => {
        return {
            cars_info: [],
            showModal: false,
            addForm: false,
        }
    },
    actions: {
        // fetching data
        getData() {
            axios.get("https://testapi.io/api/dartya/resource/cardata").then((response) => {
                this.cars_info = response.data.data
            })
        },

        // Add Car data
        setdata(formdata) {
            this.showModal = false;
            const id = this.cars_info.length + 1;
            axios.post('https://testapi.io/api/dartya/resource/cardata/', {
                id: id,
                name: formdata.name,
                image: formdata.image,
                details: formdata.description,
                price: formdata.price
            }).then((res) => {
                if (res.status === 201) {
                    this.getData()
                } else {
                    alert("Error!!")
                }
                this.addForm = false
            })
                .catch(error => {
                    alert("Error : " + error)
                });
        },
    }
})