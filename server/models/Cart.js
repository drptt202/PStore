const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    Status: String,
    Username: String,
    CartItems: []
}, { timestamps: true })

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart