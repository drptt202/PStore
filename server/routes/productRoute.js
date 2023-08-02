const express = require('express')

const { getAllbyCategory, getAllbyCategoryandBrand, getProductDetails, upload } = require('../controllers/productController')

const Router = express.Router()

Router.route('/upload/:code').put(upload)


Router.route('/:category').get(getAllbyCategory)
Router.route('/:category/n/:brand').get(getAllbyCategoryandBrand);
Router.route('/:category/:code').get(getProductDetails)

module.exports = Router