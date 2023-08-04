const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    ProductCode: {},
}, { timestamps: true })

const Store = mongoose.model('Store', storeSchema);

module.exports = Store