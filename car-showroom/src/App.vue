<template>
  <Navbar />
  <div class="car-card">
    <div v-for="item in cars_info" :key="item.id">
      <gallery_card
        :name="item.name"
        :image="item.image"
        :description="item.desc"
        :price="item.price"
        @get-Price-Info="getPrice"
      />
    </div>
  </div>
</template>

<script>
import gallery_card from "./components/gallery-card.vue";
import Navbar from "./Nav-bar";
export default {
  name: "App",
  components: {
    gallery_card,
    Navbar,
  },
  methods: {
    getPrice(price) {
      alert("Price is : " + price);
    },
  },
  data() {
    return {
      cars_info: [
        {
          id: 1,
          name: "Maruti Suzuki Wagon R",
          image: require("./assets/images/1Maruti.jpg"),
          desc: "This is the first major update for the Wagon R since this generation was launched in 2019 and sees it get cosmetic updates as well as new engine options. Like we've said earlier",
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
      ],
    };
  },
};
</script>

<style>
.car-card {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

@media (max-width: 800px) {
  .car-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
<!-- Here we are using the relative path "./assets/photo.jpeg" , it will get replaced by an auto-generated URL based on the Webpack output configuration. -->
<!-- With Webpack, you can use require() to dynamically load and bundle your assets,  -->
<!-- Webpack is a popular module bundler for JavaScript applications. It is used to bundle and optimize various assets, such as JavaScript code, CSS, images, and other static assets, into a single JavaScript file that can be loaded in the browser. -->
