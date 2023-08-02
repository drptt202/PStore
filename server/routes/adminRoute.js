const express = require('express')
const { register, password, profile, editProfile } = require('../controllers/adminController')
const { verifyToken } = require('../middleware/verifyToken');

const Router = express.Router()

Router.route('/register').post(register)

Router.route('/profile').get(verifyToken, profile)

Router.route('/password').put(verifyToken, password)

Router.route('/edit').put(verifyToken, editProfile)

module.exports = Router