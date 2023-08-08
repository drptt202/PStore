const Product = require('../models/Product');
const Store = require('../models/Store');

exports.getAllProduct = async (req, res, next) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            status: 'success',
            data: { products }
        })
    } catch (error) {
        res.json(error);
    }
}

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

exports.store = async (req, res, next) => {
    try {
        const store = await Store.find({}, { ProductCode: 1 });
        res.status(200).json({
            status: 'success',
            data: { store: store[0] }
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

exports.getTop5 = async (req, res, next) => {
    try {
        const products = await Product.aggregate([{ $sample: { size: 5 } }]);
        res.status(200).json({
            status: 'success',
            data: { products }
        })
    } catch (error) {
        res.json(error)
    }
}

exports.getSelling = async (req, res, next) => {
    try {
        const products = await Product.aggregate([{ $sample: { size: 5 } }]);
        res.status(200).json({
            status: 'success',
            data: { products }
        })
    } catch (error) {
        res.json(error)
    }
}

exports.searchTop5 = async (req, res, next) => {
    try {
        const { keyword } = req.params
        const products = await Product.find({ Name: new RegExp(keyword, "i") }).limit(5);
        res.status(200).json({
            status: 'success',
            data: { products }
        })
    } catch (error) {
        res.json(error)
    }
}

exports.searchbyKeyword = async (req, res, next) => {
    try {
        const { keyword } = req.params
        const products = await Product.find({ Name: new RegExp(keyword, "i") });
        res.status(200).json({
            status: 'success',
            data: { products }
        })
    } catch (error) {
        res.json(error)
    }
}