const Customer = require('../models/Customer')
const Employee = require('../models/Employee')
const Address = require('../models/Address')

const Cart = require('../models/Cart')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const status = [
    "Shopping Cart",
    "To confirm",
    "To ship",
    "Completed",
    "Cancelled"
]

exports.register = async (req, res, next) => {
    try {
        const employee = await Employee.find({ Email: req.body.Email })
        if (employee.length == 0) {
            const customer = await Customer.create(req.body)
            await Address.create({ Username: req.body.Username, Address: [] })
            const token = jwt.sign({ Username: customer.Username }, process.env.APP_SECRET)
            for (let item of status) {
                await Cart.create({ Status: item, Username: req.body.Username, CartItems: [] })
            }
            res.status(200).json({
                status: 'success',
                data: {
                    token,
                    Username: customer.Username
                }
            })

        }
        else {
            res.status(404).json({
                status: 'Không thể tạo tài khoản bằng Email này',
            })
        }
        // res.json()
    } catch (error) {
        res.json(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const customer = await Customer.findOne({ Username: req.body.Username })
        const employee = await Employee.findOne({ Email: req.body.Username })

        if (customer) {
            if (bcrypt.compareSync(req.body.Password, customer.Password)) {
                const token = jwt.sign({ Username: customer.Username, Role: 'User' }, process.env.APP_SECRET)
                res.status(200).json({
                    status: 'success',
                    data: {
                        token,
                        Username: customer.Username,
                        Role: 'User'
                    }
                })
            } else {
                //Password is not correct
            }
        }
        else {
            if (!employee) {
                //Sai ten dang nhap
            }
            if (employee) {
                if (bcrypt.compareSync(req.body.Password, employee.Password)) {
                    const token = jwt.sign({ Username: employee.Email, Role: employee.Role }, process.env.APP_SECRET)
                    res.status(200).json({
                        status: 'success',
                        data: {
                            token,
                            Email: employee.Email,
                            Role: employee.Role
                        }
                    })
                } else {
                    //Password is not correct
                }
            }
        }

    } catch (error) {
        res.json(error)
    }
}

exports.profile = async (req, res, next) => {
    try {
        const { Username } = req
        const customer = await Customer.findOne({ Username })

        res.status(200).json({
            status: 'success',
            data: {
                customer
            }
        })
    } catch (error) {
        res.json(error)
    }
}

exports.password = async (req, res, next) => {
    try {
        const { Username } = req
        const customer = await Customer.findOne({ Username: Username })
        if (bcrypt.compareSync(req.body.oldPassword, customer.Password)) {
            customer.Password = req.body.newPassword
            await customer.save()

            res.status(200).json({
                status: 'success',
                data: {
                    customer
                }
            })
        }
    } catch (error) {
        res.json(error)
    }
}

exports.editProfile = async (req, res, next) => {
    try {
        const { Username } = req
        const customer = await Customer.findOneAndUpdate({ Username: Username }, { ...req.body }, { new: true, runValidators: true });

        res.status(200).json({
            status: 'success',
            data: {
                customer
            }
        })
    } catch (error) {
        res.json(error)
    }
}