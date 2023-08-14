const express = require('express')
const { login, register, password, profile, editProfile, address } = require('../controllers/authController')
const { verifyToken } = require('../middleware/verifyToken');
const Router = express.Router()

Router.route('/register').post(register)

Router.route('/login').post(login)

Router.route('/profile').get(verifyToken, profile)

Router.route('/address').get(verifyToken, address)

Router.route('/password').put(verifyToken, password)

Router.route('/edit').put(verifyToken, editProfile)

module.exports = Router