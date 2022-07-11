const CouponsData = require("../models/coupons.model")



const addCoupon = async (req, res) => {
    try {
        const newCoupon = new CouponsData(req.body);
        const addedCoupon = await newCoupon.save();
        res.send(addedCoupon)
        
        // error
    } catch (error) {
        console.log(error)
    }
};

const findAllCoupons = async (req, res) => {
    const allCoupons = await CouponsData.find();
    res.json(allCoupons);
};

const findCoupon = async (req, res) => {
    const code = req.params.code
    const allProduct = await CouponsData.findOne({ code });
    res.json(allProduct);
}


const updateCoupon = async (req, res) => {
    const code = req.params.code
    const updatedProduct = await CouponsData.findOneAndUpdate({ code }, req.body, { new: true })
    res.send(updatedProduct);
}

const deleteCoupon= async (req, res) => {
    const code = req.params.code
    const deletedProduct = await CouponsData.findOneAndDelete({ code });
    res.send(deletedProduct);
}
const exportObject = {
    addCoupon,
findCoupon,
updateCoupon,
deleteCoupon,
findAllCoupons
}



module.exports = exportObject;



