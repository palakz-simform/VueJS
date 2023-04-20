<template>
    <!-- Card of each car -->
    <div class="card-car">
        <div class="car-heading">
            <h1>{{ name }}</h1>
        </div>
        <div class="car-image">
            <img :src="image" />
        </div>
        <div class="car-description">
            <p>{{ description }}</p>
        </div>
        <div class="car-btn">
            <button class="car-edit-btn" @click="showeditform()"><i class="fa-solid fa-pen"></i></button>
            <button class="button-info" @click="getPrice" title="Get Price" :disabled="hasPrice">
                {{ price != 0 ? "Info" : "Available Soon" }}
            </button>
            <button class="car-delete-btn" @click="deleteData()"><i class="fa-sharp fa-solid fa-trash"></i></button>
        </div>
    </div>
</template>

<script>
export default {
    name: "gallery_card",
    props: ["id", "name", "image", "formtype", "description", "price", "showModalEdit"],
    emit: ["get-Price-Info", 'edit-car', 'delete-car'],
    methods: {

        // Emitting event to pass the price to the parent component
        getPrice() {
            this.$emit("get-Price-Info", this.price);
        },

        // Function to get a particular car data 
        getCarData() {
            return {
                id: this.id,
                name: this.name,
                image: this.image,
                description: this.description,
                price: this.price,
                title: "Edit Car"
            }
        },
        // On clicking edit button emit event 'edit-car'
        showeditform() {
            const cardata = this.getCarData()
            this.$emit('edit-car', cardata)
        },
        // On clicking delete button emit event 'delete-car'
        deleteData() {
            const cardata = this.getCarData()
            this.$emit('delete-car', cardata)
        }

    },

    computed: {
        // check if the car has price, if not return false and dissable the button
        hasPrice() {
            if (this.price == 0) {
                return true;
            } else {
                return false;
            }
        },
    },
};
</script>

<style scoped>
.card-car {
    width: 350px;
    margin: 10px;
    margin-left: 30px;
    margin-right: 30px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    background-color: rgb(216, 215, 214);
}

.card-car:hover {
    transform: scale(0.95);
    transition: 0.25s;
}

.car-heading h1 {
    padding-top: 8px;
    margin-top: 0px;
    margin-bottom: 0px;

}

.car-heading {
    height: 50px;
    text-align: center;
    background-color: rgb(44, 44, 44);
    color: wheat;
    overflow: hidden;

}

.car-image {
    width: 350px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
}

img {
    width: 350px;
    height: 200px;
}

.car-description p {
    font-weight: bold;
    line-height: 20px;
    padding: 4px;
}

.car-description {
    height: 80px;
    width: 350px;
    text-align: center;
    overflow: hidden;
}

button:disabled,
button[disabled] {
    cursor: not-allowed;
}

.car-btn {
    width: 350px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.car-edit-btn,
.car-delete-btn {
    width: 55px;
    height: 34px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: rgb(44, 44, 44);
    color: wheat;
    font-weight: bolder;
    border-radius: 10px;
    cursor: pointer;
}

.button-info {
    width: 150px;
    height: 34px;
    background-color: rgb(44, 44, 44);
    color: wheat;
    font-weight: bolder;
    border-radius: 10px;
    cursor: pointer;
}

.button-info:hover,
.car-edit-btn:hover,
.car-delete-btn:hover {
    background-color: transparent;
    color: rgb(44, 44, 44);
    font-weight: bolder;
    border: 3px solid rgb(44, 44, 44);
}

@media (max-width: 1155px) {
    .card-car {
        width: 300px;
        margin-left: 20px;
        margin-right: 20px;
    }

    .car-heading {
        height: 40px;
        font-size: 10px;
    }

    .car-image {
        width: 300px;
        height: 175px;
    }

    img {
        width: 300px;
        height: 175px;
    }

    .car-description p {
        padding: 6px;
    }

    .car-description {
        height: 120px;
        width: 300px;
    }

    .car-btn {
        width: 300px;
    }

    .button-info {
        width: 100px;
    }
}

@media (max-width: 690px) {
    .card-car {
        margin: 5px;
        width: 175px;
        margin-left: 10px;
        margin-right: 10px;
    }

    .car-heading {
        height: 25px;
        font-size: 8px;
    }

    .car-heading h1 {
        padding-top: 4px;
    }

    .car-image {
        width: 175px;
        height: 100px;
    }

    img {
        width: 175px;
        height: 100px;
    }

    .car-description p {
        font-size: 12px;
    }

    .car-description {
        width: 175px;
        text-align: center;
    }

    .car-btn {
        width: 175px;
        height: 50px;
    }

    .button-info {
        width: 70px;
        height: 35px;
    }
}

@media (max-width: 410px) {
    .card-car {
        margin: 5px;
        width: 160px;
        margin-left: 5px;
        margin-right: 5px;
    }

    .car-image {
        width: 160px;
    }

    img {
        width: 160px;
    }

    .car-description {
        width: 160px;
    }

    .car-btn {
        width: 160px;
    }
}
</style>
