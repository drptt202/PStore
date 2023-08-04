const express = require('express')

const { getAllbyCategory, getAllbyCategoryandBrand, getProductDetails, upload, getTop5, getSelling } = require('../controllers/productController')

const Router = express.Router()

Router.route('/upload/:code').put(upload)

Router.route('/top-5').get(getTop5)
Router.route('/top-selling').get(getSelling)

Router.route('/:category').get(getAllbyCategory)
Router.route('/:category/n/:brand').get(getAllbyCategoryandBrand);
Router.route('/:category/:name').get(getProductDetails)
module.exports = Router