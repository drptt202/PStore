const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    // _id: mongoose.SchemaTypes.ObjectId,
    Status: String,
    Username: String,
    CartItems: []
}, { timestamps: true })

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart