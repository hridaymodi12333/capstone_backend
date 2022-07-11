const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    first_name:{
        type:String,
        required:true,
        
    },
    last_name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
        
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    role:{
        type:String,
        default:"user"
    }
})

const UserData= mongoose.model("UserData",userSchema)
module.exports=UserData;