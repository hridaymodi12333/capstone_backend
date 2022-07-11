const UserData = require("../models/users.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const generateToken= async(username,email)=>{
    const token= jwt.sign({username,email},"qwertyuiopasdfghjklzxcvbnmqwertyui")

    return token;
}


const createUser=async(req,res)=>{
    if(req.body.confirmPassword===req.body.password)
    {
        req.body.password=await bcrypt.hash(req.body.password ,10)
        const token= jwt.sign({username: req.body.username,email: req.body.email},"qwertyuiopasdfghjklzxcvbnmqwertyui")
        const tokenArr= []
        tokenArr.push({token:token})
        req.body.tokens= tokenArr
        const newUser= new UserData(req.body);
        const addedUser = await newUser.save();
        res.send(addedUser)
    }
    else{
        res.send({message:"Passwords do not match" })
    }
};

const findAllUsers = async(req,res)=>{
    const allUser= await UserData.find();
    res.send(allUser);
};

const findUserName=async(req,res)=>{
    const username= req.params.username
    const allUser= await UserData.findOne({username});
    res.send(allUser);
}


const updateUser=async(req,res)=>{
    const username= req.params.username
    console.log(req.body)
    req.body.username = username;
    console.log(req.body)
    const updatedUser = await UserData.findOneAndUpdate({username},req.body,{new:true})
    res.json(updatedUser);
}

const deleteUser=async(req,res)=>{
    const username= req.params.username
    const deletedUser= await UserData.findOneAndDelete({username});
    res.json(deletedUser);
}
const exportObject= {
    createUser,
    findAllUsers,
    findUserName,
    updateUser,
    deleteUser
}



module.exports=exportObject;



