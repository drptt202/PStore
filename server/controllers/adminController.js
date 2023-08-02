const Employee = require('../models/Employee')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.register = async (req, res, next) => {
    try {
        const employee = await Employee.create(req.body)
        const token = jwt.sign({ Email: employee.Email, Role: employee.Role }, process.env.APP_SECRET)
        res.status(200).json({
            status: 'success',
            data: {
                token,
                Email: employee.Email,
                Role: employee.Role
            }
        })
    } catch (error) {
        res.json(error)
    }
}

exports.password = async (req, res, next) => {
    try {
        const { Username } = req
        const employee = await Employee.findOne({ Email: Username })
        if (bcrypt.compareSync(req.body.oldPassword, employee.Password)) {
            employee.Password = req.body.newPassword
            await employee.save()

            res.status(200).json({
                status: 'success',
                data: {
                    employee
                }
            })
        }
    } catch (error) {
        res.json(error)
    }
}

exports.profile = async (req, res, next) => {
    try {
        const { Username, Role } = req
        const employee = await Employee.findOne({ Email: Username })

        res.status(200).json({
            status: 'success',
            data: {
                employee,
                Role
            }
        })
    } catch (error) {
        res.json(error)
    }
}

exports.editProfile = async (req, res, next) => {
    try {
        const { Username } = req
        const employee = await Employee.findOneAndUpdate({ Email: Username }, { ...req.body }, { new: true, runValidators: true })

        res.status(200).json({
            status: 'success',
            data: {
                employee
            }
        })
    } catch (error) {
        res.json(error)
    }
}