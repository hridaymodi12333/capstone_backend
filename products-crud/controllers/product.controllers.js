const ProductData = require("../models/products.model")
const fs = require("fs");



const createOneProduct = async (req, res) => {
    const newProduct = new ProductData(req.body);
    const addedProduct = await newProduct.save();
    res.send(addedProduct)
};
// upload using CSV file
const bulkUpload = (req, res) => {
    // const fileData = fs.readFileSync("data.csv", { encoding: "utf-8" }).toString().split("\r\n")
    const fileData = req.body.data.toLowerCase().split("\n")

    // console.log(fileData)
    fileData.map(async (data) => {
        console.log(data)
        const val = data.split(",");
        console.log(val)
        const dataToObj = {
            // numberOfPhotos: val[0],
            productName: val[0],
            companyName: val[1],
            price: val[2],
            stock: val[3],
            tags: val.slice(4)
        }
        const newProduct = new ProductData(dataToObj)
        const addedProduct = await newProduct.save()
        console.log(dataToObj)
        // res.json(addedProduct)
    })
}

const findAllProduct = async (req, res) => {
    const allProduct = await ProductData.find();
    res.send(allProduct);
};

const findProductName = async (req, res) => {
    const tagName = req.params.tagName
    const allProduct = await ProductData.find({ tags: tagName });
    res.send(allProduct);
}
const findProductId = async (req, res) => {
    const id = req.params.id
    const allProduct = await ProductData.findOne({ _id: id });
    res.json(allProduct);
}


const updateProduct = async (req, res) => {
    const _id = req.params._id
    const updatedProduct = await ProductData.findOneAndUpdate({ _id }, req.body, { new: true })
    res.send(updatedProduct);
}

const deleteProduct = async (req, res) => {
    const _id = req.params._id
    const deletedProduct = await ProductData.findOneAndDelete({ _id });
    res.send(deletedProduct);
}
const exportObject = {
    createOneProduct,
    findProductName,
    findAllProduct,
    updateProduct,
    deleteProduct,
    bulkUpload,
    findProductId
}



module.exports = exportObject;



