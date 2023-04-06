<template>
    <div>
        <!-- Add Car Button -->
        <div class="add-car-button">
            <button class="button" @click="addCar()">Add Car</button>
        </div>

        <!-- Style applied when Add/Edit form is displayed -->
        <transition name="fade">
            <div class="modal-overlay" v-if="showModal"></div>
        </transition>

        <!-- Add/Edit Car Component -->
        <transition name="car-form">
            <carform v-if="showModal" :title="title" :addForm="addForm" :editForm="editForm" :showModal="showModal"
                @show-model="showModalx" @display-data="setdata" :carData="carData" @edit-data="editCarData"></carform>
        </transition>

        <!-- gallery-card.vue component -->
        <div class="car-content">
            <transition-group class="car-card" name="car-card" tag="div" appear @before-enter="beforeEnter" @enter="enter"
                @before-leave="beforeLeave" @leave="leave">
                <div v-for="(item, index) in cars_info" :key="item.id" :data-index="index">
                    <gallery_card :id="item.id" :name="item.name" :image="item.image" :description="item.details"
                        :price="item.price" @edit-car="getCar" @delete-car="deleteCar" />
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
import carform from "@/components/car-form.vue";
import gallery_card from "@/components/gallery-card.vue";
import axios from 'axios'
import gsap from 'gsap'
export default {
    name: "HomePage",
    mounted() {
        this.getData()

    },
    components: {
        carform,
        gallery_card
    },
    data() {
        return {
            showModal: false,
            title: "",
            addForm: false,
            editForm: false,
            carData: {},
            cars_info: [],
        };
    },
    methods: {
        // fetching data
        getData() {
            axios.get("https://testapi.io/api/dartya/resource/cardata").then((response) => {
                this.cars_info = response.data.data
            })
        },

        // Display Add Car form
        addCar() {
            this.showModal = true,
                this.title = 'Add Car',
                this.addForm = true
        },

        // Close form when 'x' button is clicked on the form
        showModalx() {
            this.showModal = false;
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

        // Show car data
        getCar(cardata) {
            this.showModal = true
            this.editForm = true
            this.carData = cardata;
            this.title = cardata.title;
        },

        // Edit Car Data
        editCarData(data) {
            this.showModal = false;
            axios.put('https://testapi.io/api/dartya/resource/cardata/' + data.id, {
                id: data.id,
                name: data.name,
                image: data.image,
                details: data.description,
                price: data.price
            }).then((res) => {
                if (res.status === 200) {
                    this.getData()
                } else {
                    alert("Error!!")
                }
                this.editForm = false

            }).catch(error => {
                alert("Error : " + error)
            });
        },

        // Delete Car Data
        deleteCar(data) {
            if (confirm("Do you want to delete this car data ?") == true) {
                axios.delete('https://testapi.io/api/dartya/resource/cardata/' + data.id).then((res) => {
                    if (res.status === 204) {
                        this.getData()
                        alert("Car : " + data.name + " deleted successuflly!")
                    } else {
                        alert("Error!!")
                    }
                }).catch(error => {
                    alert("Error : " + error)
                })
            }
        },

        beforeEnter(el) {
            el.style.opacity = 0;
            el.style.transform = 'translateY(100px)'
        },
        enter(el, done) {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                onComplete: done,
                delay: el.dataset.index * 0.1
            })
        },
        beforeLeave(el) {
            el.style.opacity = 1
        },
        leave(el, done) {
            gsap.to(el, {
                opacity: 0,
                scaleY: 0.01,
                duration: 0.3,
                onComplete: done
            })
        }
    },
};
</script>

<style scoped>
.car-content {
    display: flex;
    justify-content: center;
}

.car-card {
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    margin-bottom: 10px;
}

.add-car-button {
    display: flex;
    justify-content: end;
    padding: 20px;
    margin-right: 30px;
}

button {
    width: 100px;
    height: 35px;
    background-color: brown;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    font-size: 15px;
}

button:hover {
    background-color: transparent;
    color: brown;
    border: 3px solid brown;
}

.modal-overlay {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.6);
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease !important;
}

.car-card-leave-active {
    transition: all 0.5s ease;
    position: absolute;
}

.car-card-move {
    transition: all 0.5s ease;
}

.car-form-enter-active {
    animation: pop 0.5s;
}

.car-form-leave-active {
    animation: pop 0.5s reverse;
}

@keyframes pop {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

@media (max-width: 1880px) {
    .car-card {
        grid-template-columns: auto auto auto auto;
        gap: 20px;
    }
}

@media (max-width: 1540px) {
    .car-card {
        grid-template-columns: auto auto auto;
        gap: 10px;
    }
}

@media (max-width: 980px) {
    .car-card {
        grid-template-columns: auto auto;
    }
}

@media (max-width: 800px) {
    .car-card {
        gap: 5px;
    }

    .add-car-button {
        display: flex;
        justify-content: end;
        padding: 20px;
        margin-right: 0px;
    }
}

@media (max-width:400px) {
    .modal {
        max-width: 300px;
    }
}</style>
