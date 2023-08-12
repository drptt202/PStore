const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    ProductCode: String,
    Comments: [{
        Username: String,
        Point: Number,
        Title: String
    }]
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment

