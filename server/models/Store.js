const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
    ProductCode: {},
}, { timestamps: true })

const Store = mongoose.model('Store', storeSchema);

module.exports = Store