<template>
<div class="car-detail">
    <div class="image">
        <img src="https://imgd.aeplcdn.com/1200x900/n/cw/ec/112947/wagon-r-2022-exterior-right-front-three-quarter.jpeg">
    </div>
    <div class="info">
        <div class="title">
            <h1>Maruti suzuki</h1>
        </div>
        <div class="description">
            <h3>Description of Car : </h3>
            <p>mply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an</p>
        </div>
        <div class="price">
            <h3>Price of Car : </h3>
            <emp><p>Rs. 500</p></emp>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'CarDetail'
}
</script>

<style scoped>
.car-detail {
    margin: auto;
    margin-top: 50px;
    margin-bottom: 50px;
    height: 700px;
    box-shadow: 0px 1px 10px;
    max-width: 1500px;
    display: flex;
    box-shadow: 5px 10px 18px #888888;

}
.info{
        margin-top:20px;        
    }
.image {
    max-width: 700px;
    align-self: center;
}

img {
    width: 100%;
    margin-left:20px;
}

.title {    
    width: 800px;
    height: 100px;
}
.title h1{
    color:maroon;
}
.description {   
    padding-left:80px;

    height: 200px;    
}
.description h3{
    color:maroon;
    font-size:25px;
}
.description p{
    
    font-size:18px;
}
.price {
    
    padding-left:80px;
}
.price h3{
    color:maroon;
    font-size:25px;
}
.price p{
    font-size:18px;
}

@media (max-width:1500px) {

    .car-detail {

        height: 500px;
        box-shadow: 0px 1px 10px;
        max-width: 800px;
        display: flex;
        box-shadow: 5px 10px 18px #888888;

    }

    .image {
        max-width: 400px;
        align-self: center;


    }

    img {
        width: 100%;
    }
   

    .title {
        
        max-width: 400px;
        height: 100px;
    }

    .description {
       padding-right:10px;
        height: 150px
    }

    .price {
        
        height: 100px;
    }

    @media(max-width: 810px) {

        .car-detail {
            margin-left: 10px;
            margin-right: 10px;
            flex-direction: column;
            height: 800px;         
            display: flex;
           
        }

        .image {
            max-width: 400px;
            align-self: center;

        }
        img {
            width: 100%;
        }
        .title {
            
            max-width: 100%;
            height: 70px;
        }

        .description {
            padding-left:40px;
            height: 150px
        }

        .price {
            padding-left:40px;
            height: 100px;
        }
    }

}
</style>
