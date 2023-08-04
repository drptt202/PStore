const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    // _id: mongoose.SchemaTypes.ObjectId,
    Brand: { type: String, trim: true },
    Category: { type: String, trim: true },
    Name: { type: String, trim: true },
    Price: { type: Number, trim: true },
    Image: { type: String, trim: true },
    CPU: { type: String, trim: true },
    RAM: { type: String, trim: true },
    DISK: { type: String, trim: true },
    Release: { type: String, trim: true },
    Feature: { type: String, trim: true },
    Image: String,
    Code: { type: String, trim: true, unique: true },
    Description: { type: String },
    Status: { type: String }
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema);

module.exports = Product