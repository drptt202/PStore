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
        const { category, name } = req.params
        const product = await Product.find({ $and: [{ Category: category }, { Name: name }] });
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

exports.getTop5 = async (req, res, next) => {
    try {
        const product = await Product.aggregate([{ $sample: { size: 5 } }]);
        res.status(200).json({
            status: 'success',
            data: { product }
        })
    } catch (error) {
        res.json(error)
    }
}

exports.getSelling = async (req, res, next) => {
    try {
        const product = await Product.aggregate([{ $sample: { size: 5 } }]);
        res.status(200).json({
            status: 'success',
            data: { product }
        })
    } catch (error) {
        res.json(error)
    }
}