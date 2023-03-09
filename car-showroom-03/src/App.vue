<template>
<Navbar />

<div class="add-car-button">
    <button class="button" @click="showModel = false">Add Car</button>
    <transition name="fade" appear>
        <div class="modal-overlay" v-if="!showModel" @click="showModel = false">
        </div>
    </transition>
    <transition name="slide" appear>
        <div class="modal" v-if="!showModel">
            <carform :showModel="showModel" @show-model="showModelx"></carform>
        </div>
    </transition>
</div>
<div class="gallery">
    <div class="car-card">
        <div v-for="item in cars_info" :key="item.id">
            <gallery_card :name="item.name" :image="item.image" :description="item.desc" :price="item.price" @get-Price-Info="getPrice" />
        </div>
    </div>
</div>

</template>

<script>
import gallery_card from "./components/gallery-card.vue";
import carform from "./components/car-form.vue";
import Navbar from "./Nav-bar";
export default {
    name: "App",
    components: {
        gallery_card,
        Navbar,
        carform,
    },
    methods: {
        getPrice(price) {
            alert("Price is : " + price);
        },
        showModelx() {
            this.showModel = true
        
        }
    },
    data() {
        return {
            showModel: true,
            cars_info: [{
                    id: 1,
                    name: "Maruti Suzuki Wagon R",
                    image: require("./assets/images/1Maruti.jpg"),
                    desc: "This is the first f ffffffffff ffffff f aaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaa aaaaaaaaamajor update for the Wagon R since this generation was launched in 2019 and sees it get cosmetic updates as well as new engine options. Like we've said earlier",
                    price: "Rs. 3.54 Lakhs",
                },
                {
                    id: 2,
                    name: "BMW 5 Series",
                    image: require("./assets/images/2BMW.jpg"),
                    desc: "Under the hood, the updated BMW 5 Series is offered with a 2.0-litre, four-cylinder petrol engine in the 520d M Sport guise. This engine produces 248bhp and 350Nm of torque. ",
                    price: "",
                },
                {
                    id: 3,
                    name: "Audi Q8",
                    image: require("./assets/images/3Audi.jpg"),
                    desc: "If you want an SUV that stands out, drives well, and will never be common place (given its steep pricing), the Q8 is a great option. And not to mention, it is a comfortable option for four adults.",
                    price: "Rs.1.06 Crore",
                },
                {
                    id: 4,
                    name: "Nissan GT-R",
                    image: require("./assets/images/4Ngtr.jpg"),
                    desc: "The Godzilla has finally arrived on the Indian shores. The beast in question is the Nissan GT-R, the Japanese car makers flagship supercar. The GT-R was born to be an everyday supercar ",
                    price: "Rs. 2.12 Crore",
                },
                {
                    id: 5,
                    name: "Toyota Fortuner",
                    image: require("./assets/images/5Toyota.jpg"),
                    desc: "This Toyota Fortuner Legender model isn't a world apart from the standard version, and yet gets a more premium looking face and more features on the inside...",
                    price: "",
                },
                {
                    id: 6,
                    name: "Toyota Innova Crystal",
                    image: require("./assets/images/6innova.jpg"),
                    desc: "The Toyota Innova Crysta needs no introduction in the country. It has done everything right that it set out to do, to such an extent that people swear by it. Be it a spacious and practical cabin...",
                    price: "",
                },
                {
                    id: 7,
                    name: "Maruti Swift",
                    image: require("./assets/images/7swift.jpg"),
                    desc: "What makes the Maruti Suzuki Swift such a fascinating proposition is that it's not only sporty to drive and look at, but also offers reasonable rear-seat space and equipment. ",
                    price: "Rs. 6.07 Lakhs",
                },
                {
                    id: 8,
                    name: "Maruti Ertiga",
                    image: require("./assets/images/8ertiga.jpg"),
                    desc: "The recently updated Ertiga gets a tweaked engine, new gearbox and newer features that put it in line with other Maruti models. It however continues with the well-accepted...",
                    price: "Rs. 8.35 Lakhs",
                },
                {
                    id: 9,
                    name: "Audi A3 Cabriolet",
                    image: require("./assets/images/9audi a3.jpg"),
                    desc: "If the sight of a convertible ever tugged at your heart, then the Audi A3 Cabriolet is one that can easily lure you, especially in that lip-smacking shade Audi calls ‘Vegas Yellow’. ",
                    price: "",
                },
                {
                    id: 10,
                    name: "Nissan Sunny",
                    image: require("./assets/images/10Sunny.jpg"),
                    desc: "The Nissan Sunny is a no-nonsense C-segment sedan that offers a spacious rear seat and a large boot to accommodate plenty of luggage. While it could have done with an improved features list...",
                    price: "Rs. 7.07 Lakhs",
                },
                {
                    id: 11,
                    name: "Honda City",
                    image: require("./assets/images/11Hondacity.jpg"),
                    desc: "The current model of the Honda City, which was introduced in 2020, features a sporty and modern exterior design with a sleek front grille, LED headlights, and sharp lines. It is available... ",
                    price: "Rs. 5.64 Lakhs",
                },

                {
                    id: 12,
                    name: "Hyundai Verna",
                    image: require("./assets/images/12Verna.jpg"),
                    desc: "The current model of the Hyundai Verna, which was introduced in 2020, features a modern and sporty exterior design with a bold front grille, LED headlights, and sharp lines. ",
                    price: "Rs. 7.87 Lakhs",
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
    z-index: 98;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.6);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    width: 100%;
    max-width: 400px;
    background-color: #fff;
    border-radius: 5px;
    height:550px;
}

@media (max-width: 800px) {
    .car-card {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
}
</style>
