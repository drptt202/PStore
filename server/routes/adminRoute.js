const express = require('express')
const { register, password, profile, editProfile, getAllEmployees, addProduct, addQuantity,
    updateQuantity, deleteProduct, updateImg, confirm, shipping, bill, cancelled,
    accept, success, fail, getAllCustomers, editStatus, updateProduct, countFail, countAccept } = require('../controllers/adminController')
const { getAllProduct } = require('../controllers/productController');
const { verifyToken } = require('../middleware/verifyToken');

const Router = express.Router()

Router.route('/product').get(getAllProduct)


Router.route('/order/accept').post(verifyToken, accept)

Router.route('/order/accept').put(countAccept)

Router.route('/order/success').post(verifyToken, success)

Router.route('/order/fail').post(verifyToken, fail)

Router.route('/order/fail').put(countFail)

Router.route('/order/type=4').get(confirm)

Router.route('/order/type=5').get(shipping)

Router.route('/order/type=6').get(bill)

Router.route('/order/type=7').get(cancelled)

Router.route('/store').post(addQuantity)

Router.route('/store').put(updateQuantity)

Router.route('/product').post(addProduct)


Router.route('/product/:code').delete(deleteProduct)

Router.route('/product/:code').put(updateImg)

Router.route('/product/:id').post(updateProduct)

Router.route('/register').post(register)

Router.route('/profile').get(verifyToken, profile)

Router.route('/password').put(verifyToken, password)

Router.route('/edit').put(verifyToken, editProfile)

Router.route('/edit/:id').post(verifyToken, editProfile)

Router.route('/edit').post(verifyToken, editStatus)

Router.route('/employees').get(getAllEmployees)

Router.route('/customers').get(getAllCustomers)


module.exports = Router