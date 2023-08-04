const express = require('express')

const { store } = require('../controllers/productController')
const Router = express.Router()

Router.route('/item').get(store)
module.exports = Router