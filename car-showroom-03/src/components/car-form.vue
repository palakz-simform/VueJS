<template>
  <div class="heading">
    <h1>Add Car</h1>
    <button class="button" @click="showModelx">x</button>
  </div>
<div class="form">
  <div class="row">
    <label>Name:</label>
    <input type="text">
  </div>
  <div class="row">
    <label>Description:</label>
    <textarea></textarea>
  </div>
  <div class="row">
    <label>Image:</label>
    <input type="file">
  </div>
  <div class="row">
    <label>Price:</label>
    <input type="number">
  </div>

  <button class="submit">Submit</button>

</div>
</template>

<script>
export default {
  name: "car-form",
  props:{
    showModel:String
  },
  methods:{
    showModelx(){
      this.$emit("show-model")
    }
  }
};
</script>


<style scoped>
h1{
text-align: center;
color:brown

}
.heading{
  display:flex;
  justify-content: space-between;
  padding:5px 10px 5px 150px;
}
.button{
  height:20px;
  margin-top:18px;
  font-weight: bold;
  background-color: transparent;
  border:none;

}
label{
  padding-left:40px;
  font-size:18px;
}
.row{
  display:flex;
  flex-direction: column;
  margin-bottom:20px;
  margin-top:10px;
}
input,textarea{
  margin-left:40px;
  margin-top:10px;
  margin-right:40px;
  height:25px;
}
input:focus{
  border-color:brown !important
}
.submit{
  width: 100px;
    height: 35px;
    background-color: brown;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    margin-top:25px;
    margin-left:140px;
    
}
.submit:hover{
  background-color: transparent;
    color: brown;
    border: 3px solid brown;
}
</style>