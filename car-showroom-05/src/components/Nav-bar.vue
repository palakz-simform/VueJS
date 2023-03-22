<template>
<div class="title">
    <RouterLink to="/"><h1>Car Gallery</h1></RouterLink>
    <hr />
    <div class="nav">
        <RouterLink class="link" to="/" >Home</RouterLink>
        <RouterLink class="link" to="/login">Login</RouterLink>
        <RouterLink class="link" to="/register">Register</RouterLink>
      
    </div>
</div>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
    name: "Nav-bar",
};
</script>

<style>
.title {
    text-align: center;
}

hr {
    width: 8%;
    border: 5px solid brown;
    border-radius: 5px;
}

.title h1 {
    color: black;
    font-size: 40px;
    text-shadow: 0 0 3px gray;
  
}
.nav{
    height:50px;
    background-color: rgb(44, 44, 44);
    margin-top : 20px;    
    padding-right:50px;
    display: flex;
    justify-content: end;
    align-items: center;
}
.link{
    margin-right:70px;
    color:wheat;
    font-size: 18px;
    font-weight: bold;
    width:50px;
    text-decoration: none;
}
a.router-link-exact-active {
font-size: 22px;
}
a{
    text-decoration: none;;
}

@media (max-width: 500px) {
    .link{
    margin-right:20px;   
}
}


</style>
