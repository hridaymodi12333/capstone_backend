const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    // numberOfPhotos:{
    //     type:Number,
    //     default:1
    // },
    productName: {
        type: String,
        required: true,
        unique: true
    },
    companyName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    tags:{
        type: Array
    },

    // productDetails: {
    //     size:String,
    //     seater:Number,
    //     material:String
    // },
    stock: {
        type: Number,
        default: 25
    },
    sold: {
        type: Number,
        default: 0
    }


})

const ProductData = mongoose.model("ProductData", productSchema)
module.exports = ProductData;