const Product = require('../models/Product')

exports.getAllbyCategory = async (req, res, next) => {
    try {
        const { category } = req.params
        const products = await Product.find({ Category: category });
        res.status(200).json({
            status: 'success',
            data: { products }
        })
    } catch (error) {
        res.json(error);
    }
}
exports.getAllbyCategoryandBrand = async (req, res, next) => {
    try {
        const { category, brand } = req.params
        const products = await Product.find({ $and: [{ Category: category }, { Brand: brand }] });
        res.status(200).json({
            status: 'success',
            data: { products }
        })
    } catch (error) {
        res.json(error);
    }
}

exports.getProductDetails = async (req, res, next) => {
    try {
        const { category, code } = req.params
        const product = await Product.find({ $and: [{ Category: category }, { Code: code }] });
        res.status(200).json({
            status: 'success',
            data: { product }
        })
    } catch (error) {
        res.json(error);
    }
}

exports.upload = async (req, res, next) => {

}