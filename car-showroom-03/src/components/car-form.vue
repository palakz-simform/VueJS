<template>
    <div class="heading">
        <h1>Add Car</h1>
        <button class="button" @click="showModalx">x</button>
    </div>
    <div class="form">
        <div class="row">
            <label>Name:</label>
            <input type="text" v-model="form.name">
        </div>
        <div class="row">
            <label>Image:</label>
            <input type="url" v-model="form.image">
        </div>
        <div class="row">
            <label>Description:</label>
            <textarea v-model="form.description"></textarea>
        </div>
        <div class="row">
            <label>Price:</label>
            <input type="number" v-model="form.price" onkeydown="return (event.keyCode !== 107 && event.keyCode !== 109);">
        </div>
        <button @click="submit" class="submit">Submit</button>
    
    </div>
    </template>
    
    <script>
    export default {
        name: "car-form",
        props: {
            showModal: Boolean
        },
        emits: ['show-model', 'display-data'],
        methods: {
            showModalx() {
                this.$emit("show-model")
            },
            submit() {
                this.error = []
                if (this.form.name === "" || typeof this.form.name != 'string') {
                    this.error.push("Enter valid name")
                }
                if (this.form.image === "") {
                    this.error.push("Enter image URL")
                }
                if (this.form.image != "") {
                    const url = this.form.image
                    const imgExtension = ['jpg', 'jpeg', 'gif', 'png'];
                    const extension = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
                    if (!(imgExtension.includes(extension))) {
                        this.error.push("Enter valid image URL")
                    }

                    // const imageUrlRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
                    // // Test if the URL matches the image URL pattern
                    // if(imageUrlRegex.test(this.form.image)!==true){
                    //     this.error.push("Enter valid image URL")
                    // }
                }
                if (this.form.description === "") {
                    this.error.push("Enter description")
                } else if (this.form.description.length < 30 || this.form.description.length > 120 || typeof this.form.description != 'string') {
                    this.error.push("Description must be 30-120 characters long")
                }
                if (this.form.price === "") {
                    this.error.push("Enter price")
                }
    
                if (this.error.length > 0) {
                    var error_list = ''
                    for (let err in this.error) {    
                        error_list += this.error[err] + '\n'
                    }
                    alert(error_list)
                } else {
                    this.$emit("display-data", this.form)
                    alert('Created data: \n\nName: ' + this.form.name + '\n\nImage:' + this.form.image + '\n\nDescription :' + this.form.description + '\n\nPrice Rs.:' + this.form.price);
                    this.showModalx()
                }
    
            }
        },
        data() {
            return {
                form: {
                    name: '',
                    image: '',
                    description: '',
                    price: ''
                },
                errors: []
            }
        }
    };
    </script>
    
    <style scoped>
    h1 {
        text-align: center;
        color: brown
    }
    
    .heading {
        display: flex;
        justify-content: space-between;
        padding: 1px 10px 5px 150px;
    }
    
    .button {
        height: 20px;
        margin-top: 10px;
        font-weight: bold;
        background-color: transparent;
        border: none;
        font-size: 18px;  
    }
    
    label {
        padding-left: 40px;
        font-size: 18px;
    }
    
    .row {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        margin-top: 10px;
    }
    
    input,
    textarea {
        margin-left: 40px;
        margin-top: 10px;
        margin-right: 40px;
        height: 28px;
    }
    
    textarea:focus,
    input:focus {
        outline: none !important;
        border-color: brown;
        box-shadow: 0 0 10px rgb(196, 105, 105);
    }
    
    .submit {
        width: 100px;
        height: 35px;
        background-color: brown;
        color: white;
        font-weight: bold;
        border: none;
        border-radius: 10px;
        font-size: 15px;
        margin-top: 25px;
        margin-left: 140px;
    
    }
    
    .submit:hover {
        background-color: transparent;
        color: brown;
        border: 3px solid brown;
    }
    </style>
    