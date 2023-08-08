const express = require('express')
const { register, password, profile, editProfile, getAllEmployees } = require('../controllers/adminController')
const { getAllProduct } = require('../controllers/productController');
const { verifyToken } = require('../middleware/verifyToken');

const Router = express.Router()

Router.route('/product').get(getAllProduct)

Router.route('/register').post(register)

Router.route('/profile').get(verifyToken, profile)

Router.route('/password').put(verifyToken, password)

Router.route('/edit').put(verifyToken, editProfile)

Router.route('/employees').get(verifyToken, getAllEmployees)

module.exports = Router