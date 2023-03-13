<template>
<Navbar />

<div class="add-car-button">
    <button class="button" @click="addCar()">Add Car</button>
</div>
<div class="modal-overlay" v-if="showModal ">
</div>

<div class="modal" v-if="showModal">
    <carform :title="title" :addForm="addForm" :editForm="editForm" :showModal="showModal" @show-model="showModalx" @display-data="setdata" :carData="carData" @edit-data="editCarData"></carform>
</div>

<div class="car-card">
    <div v-for="item in cars_info" :key="item.id">
        <gallery_card :id="item.id" :name="item.name" :image="item.image" :description="item.description" :price="item.price" @get-Price-Info="getPrice" @get-car="getCar" @delete-car="deleteCar" />
    </div>
</div>
</template>

    
    
<script>
import gallery_card from "./components/gallery-card.vue";
import carform from "./components/car-form.vue";
import Navbar from "./components/Nav-bar";
export default {
    name: "App",
    components: {
        gallery_card,
        Navbar,
        carform,
    },
    methods: {
        addCar() {
            this.showModal = true,
            this.title = 'Add Car',
            this.addForm = true
        },
        getPrice(price) {
            alert("Price is : Rs. " + price);
        },
        showModalx() {
            this.showModal = false;
        },
        setdata(formdata) {
            this.showModal = false;
            this.cars_info.push(formdata)
            this.addForm = false

        },

        getCar(cardata) {
            this.showModal = true
            this.editForm = true
            this.carData = cardata;
            this.title = cardata.title;

        },
        editCarData(data) {
            this.showModal = false;
            const toCarUpdate = this.cars_info.filter(car => car.id === data.id)[0];

            toCarUpdate.name = data.name,
                toCarUpdate.description = data.description,
                toCarUpdate.image = data.image,
                toCarUpdate.price = data.price
            this.editForm = false
        },
        deleteCar(data) {
            if (this.cars_info) {
                var newCarData = this.cars_info.filter(car => car.id != data.id);
                this.cars_info = newCarData
            }

        }
    },
    data() {
        return {
            showModal: false,
            title: "",
            addForm: false,
            editForm: false,
            carData: {},
            cars_info: [{
                    id: 1,
                    name: "Maruti Suzuki Wagon R",
                    image: "https://imgd.aeplcdn.com/1200x900/n/cw/ec/112947/wagon-r-2022-exterior-right-front-three-quarter.jpeg",
                    description: "This is the first major update for the Wagon R since this generation was launched in 2019 and sees it get cosmetic...",
                    price: 354000
                },
                {
                    id: 2,
                    name: "BMW 5 Series",
                    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/96443/5-series-exterior-right-front-three-quarter-4.jpeg",
                    description: "Under the hood, the updated BMW 5 Series is offered with a 2.0-litre, four-cylinder petrol engine in the 520d M...",
                    price: 0
                },
                {
                    id: 3,
                    name: "Audi Q8",
                    image: "https://imgd-ct.aeplcdn.com/664x415/n/cw/ec/34470/q8-exterior-left-front-three-quarter.jpeg",
                    description: "If you want an SUV that stands out, drives well, and will never be common place (given its steep pricing)...",
                    price: 10600000
                },
                {
                    id: 4,
                    name: "Nissan GT-R",
                    image: "https://imgd.aeplcdn.com/0x0/cw/ec/20361/Nissan-GTR-Right-Front-Three-Quarter-84904.jpg?",
                    description: "The Godzilla has finally arrived on the Indian shores. The beast in question is the Nissan GT-R...",
                    price: 20000000,
                },
                {
                    id: 5,
                    name: "Toyota Fortuner",
                    image: "https://imgd.aeplcdn.com/0x0/n/cw/ec/44709/fortuner-exterior-right-front-three-quarter-19.jpeg",
                    description: "This Toyota Fortuner Legender model isn't a world apart from the standard version, and yet gets a ...",
                    price: 0,
                },
                {
                    id: 6,
                    name: "Toyota Innova Crystal",
                    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/140809/innova-crysta-2023-exterior-left-front-three-quarter.jpeg",
                    description: "The Toyota Innova Crysta needs no introduction in the country. It has done everything right that it set out...",
                    price: 0,
                },
                {
                    id: 7,
                    name: "Maruti Swift",
                    image: "https://imgd.aeplcdn.com/1200x900/n/cw/ec/54399/exterior-right-front-three-quarter-10.jpeg",
                    description: "What makes the Maruti Suzuki Swift such a fascinating proposition is that it's not only sporty to drive... ",
                    price: 607000,
                },
                {
                    id: 8,
                    name: "Maruti Ertiga",
                    image: "https://imgd.aeplcdn.com/0x0/n/cw/ec/115777/2022-ertiga-exterior-right-front-three-quarter-3.jpeg",
                    description: "The recently updated Ertiga gets a tweaked engine, new gearbox and newer features that put it in line with...",
                    price: 835000,
                },
                {
                    id: 9,
                    name: "Audi A3 Cabriolet",
                    image: "https://imgd.aeplcdn.com/664x374/cw/ec/28430/Audi-A3-Right-Front-Three-Quarter-165478.jpg",
                    description: "If the sight of a convertible ever tugged at your heart, then the Audi A3 Cabriolet is one that can easily... ",
                    price: 0
                },
                {
                    id: 10,
                    name: "Nissan Sunny",
                    image: "https://imgd.aeplcdn.com/664x374/ec/94/C0/9725/img/m/Nissan-Sunny-Right-Front-Three-Quarter-48975_ol.jpg",
                    description: "The Nissan Sunny is a no-nonsense C-segment sedan that offers a spacious rear seat and a large boot to...",
                    price: 709000,
                },
                {
                    id: 11,
                    name: "Honda City",
                    image: "https://images.news18.com/ibnlive/uploads/2020/06/1592401324_2020-honda-city.jpg",
                    description: "The current model of the Honda City, which was introduced in 2020, features a sporty and modern exterior design... ",
                    price: 564000,
                },

                {
                    id: 12,
                    name: "Hyundai Verna",
                    image: "https://imgd-ct.aeplcdn.com/664x415/n/cw/ec/41197/verna-exterior-left-front-three-quarter.jpeg",
                    description: "The current model of the Hyundai Verna, which was introduced in 2020, features a modern and sporty exterior... ",
                    price: 787000,
                },
            ],
        };
    },
};
</script>
    
    
<style scoped>
.car-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.add-car-button {
    display: flex;
    justify-content: end;
    padding: 20px;
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

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 100%;
    max-width: 400px;
    background-color: #fff;
    border-radius: 5px;
    height: 600px;
}

@media (max-width: 800px) {
    .car-card {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
}
</style>
