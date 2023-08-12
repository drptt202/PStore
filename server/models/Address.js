const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    Username: String,
    Address: []
}, { timestamps: true })

const Address = mongoose.model('Address', addressSchema)

module.exports = Address

