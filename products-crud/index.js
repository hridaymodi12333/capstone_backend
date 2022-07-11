const express = require("express");
const cors = require("cors")
const connectToMongo = require("./config/db");
const { createOneProduct,findProductName,findAllProduct,updateProduct,deleteProduct,bulkUpload,findProductId}  = require("./controllers/product.controllers");
const {authenticateUser, authenticateAdmin} = require("../authentication/middleware/auth");
const fs = require("fs");
const app = express();
port = 8081;
connectToMongo();
app.use(express.json());
app.use(express.static('public'));
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','http://localhost:3000' )
    res.header('Access-Control-Allow-Credentials',true )
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    next();
})
app.use(cors())
// app.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin','*' )
//     next();
//})
// routes for CRUD operation for admin on products
app.get('/read-all',authenticateAdmin,findAllProduct)
app.get('/tags/:tagName',findProductName)
app.get('/id/:id',findProductId)
app.post('/create-one',authenticateAdmin,createOneProduct)
app.post('/bulk-upload',authenticateAdmin,bulkUpload)
app.put('/update/:_id',updateProduct)
app.delete('/delete/:_id',authenticateAdmin,deleteProduct)

app.get("/:name", (req,res)=>{
    const filename = req.params.name
    const loc = __dirname + "/public/" + filename
    if(fs.existsSync(loc)){
        res.sendFile(loc)
    }
    else{
        res.sendFile(__dirname + "/public/img.jpg")
    }

})
    


// listening the port
app.listen(port,()=>{
    console.log(`Server started on ${port}`)
})
