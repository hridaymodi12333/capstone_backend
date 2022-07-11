const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserData = require("../../user-crud/models/users.model");
const jsCookie = require('js-cookie')



const createUser = async (req, res) => {
    try {
        if (req.body.confirmPassword === req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10)
            // res.header('Access-Control-Allow-Origin','*' )

            const token = jwt.sign({ username: req.body.username, email: req.body.email }, "qwertyuiopasdfghjklzxcvbnmqwertyui")
            const tokenArr = []
            tokenArr.push({ token: token })
            req.body.tokens = tokenArr
            const newUser = new UserData(req.body);
            const addedUser = await newUser.save();
            res.send(addedUser)
        }
        else {
            res.send({ message: "Passwords do not match" })
        }
    } catch (error) {
        res.send(error)
    }

};

const loginUser = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const savedUser = await UserData.findOne({ email })
        if (savedUser) {
            const verifyPassword = await bcrypt.compare(password, savedUser.password)
            if (verifyPassword) {
                const token = jwt.sign({ username: savedUser.username, role: savedUser.role }, "qwertyuiopasdfghjklzxcvbnmqwertyui")

                    // valid for 2 hours
                res.cookie("jwt", token, { expires: new Date(Date.now() + 7200000), secure: false })
                const userLoginData= {
                    username: savedUser.username,
                    first_name: savedUser.first_name,
                    last_name: savedUser.last_name,
                    email: savedUser.email,
                    phone: savedUser.phone,
                    role: savedUser.role,
                    loginStatus: true,
                    token: token
                }

                // localStorage.setItem("userData", userLoginData)
                // console.log(cookie)
                // console.log(res.cookies)
                res.json(userLoginData)
            }
            else {
                res.json({message:"incorrect credentials"})
            }
        }

        else {
            res.json({message:"incorrect credentials"})
        }
    } catch (error) {
        console.log(error)
    }
};


const logoutUser = (req, res) => {
   
    res.clearCookie('jwt')
    res.json({ message: "user logout successfully", username: req.body.username });
}


const exportObject = {
    createUser,
    loginUser,
    logoutUser
    // getUserByToken
}



module.exports = exportObject;



