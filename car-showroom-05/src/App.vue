<template>
  <!-- Navigation Global Component -->
  <NavBar />
  <RouterView/>
  <!-- <CarDetail/> -->
  </template>
  
  <script>
  import { RouterView } from "vue-router";
  import CarDetail from "./views/CarDetail.vue"
  
  export default{
      name:"App",
      components:{
        CarDetail,
      }
   
  }
  </script>
  