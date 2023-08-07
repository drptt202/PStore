const express = require('express')

const { postComment, getComment } = require('../controllers/commentController')
const Router = express.Router()

Router.route('/:itemID').get(getComment)
Router.route('/:itemID').post(postComment)


module.exports = Router