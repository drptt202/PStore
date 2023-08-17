const express = require('express')

const { getAllbyCategory, getAllbyCategoryandBrand, getProductDetails, getTop5, getSelling, searchbyKeyword, searchTop5 } = require('../controllers/productController')

const Router = express.Router()

Router.route('/top-5').get(getTop5)
Router.route('/top-selling').get(getSelling)
Router.route('/search/:keyword').get(searchbyKeyword)

Router.route('/search/:keyword').post(searchTop5)


Router.route('/:category').get(getAllbyCategory)
Router.route('/:category/n/:brand').get(getAllbyCategoryandBrand);
Router.route('/:category/:name').get(getProductDetails)
module.exports = Router