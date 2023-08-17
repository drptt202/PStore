const express = require('express')

const { getAllCartItems, addItemToCart, deleteItemInCart, getAllType1, getAllType2, getAllType3, getAllType4, cancelOrder, checkOut, decreaseItem, comment } = require('../controllers/cartController')
const { verifyToken } = require('../middleware/verifyToken');

const Router = express.Router()

Router.route('/').get(verifyToken, getAllCartItems)
Router.route('/:itemID').post(verifyToken, addItemToCart)
Router.route('/:itemID').delete(verifyToken, deleteItemInCart)

Router.route('/:itemID').put(verifyToken, decreaseItem)

//Check out
Router.route('/checkout/:itemID').post(verifyToken, checkOut)

Router.route('/comment/post').post(verifyToken, comment)

//To confirm
Router.route('/type=1').get(verifyToken, getAllType1)

//Cancel order
Router.route('/cancel/:itemID').post(verifyToken, cancelOrder)

//To ship
Router.route('/type=2').get(verifyToken, getAllType2)

//Completed
Router.route('/type=3').get(verifyToken, getAllType3)

//Cancelled
Router.route('/type=4').get(verifyToken, getAllType4)

module.exports = Router
