const mongoose = require("mongoose");

const couponsSchema = new mongoose.Schema({
  
    code: {
        type: String,
        required:true,
        unique: true
    },
    type: {
        type: String,
        required:true
    },
    eligibility: {
        type: String,
        default:"all" 
    },
    value: {
        type: Number,
        required:true
    },
    expiryDate: {
        type: Date,
        default: Date.now()+86400
    }


})

const CouponsData = mongoose.model("CouponsData", couponsSchema)
module.exports = CouponsData;