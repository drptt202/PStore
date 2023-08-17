const Employee = require('../models/Employee')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Product = require('../models/Product')
const Store = require('../models/Store')
const Customer = require('../models/Customer')
const Cart = require('../models/Cart')

exports.register = async (req, res, next) => {
    try {
        const customer = await Customer.find({ Email: req.body.Email })
        if (customer.length == 0) {
            const employee = await Employee.create(req.body)
            const token = jwt.sign({ Email: employee.Email, Role: employee.Role }, process.env.APP_SECRET)
            bcrypt.hash(employee.Password, 10, function (error, hash) {
                if (!error) {
                    employee.Password = hash
                }
            })
            await employee.save()
            res.status(200).json({
                status: 'success',
                data: {
                    token,
                    Email: employee.Email,
                    Role: employee.Role
                }
            })
        }
        else {
            res.status(404).json({
                status: 'Không thể tạo tài khoản bằng Email này',
            })
        }

    } catch (error) {
        res.json(error)
    }
}

exports.addProduct = async (req, res, next) => {
    try {
        await Product.create(req.body)
        res.status(200).json({
            status: 'success'
        })
    } catch (error) {
        res.json(error)
    }
}

exports.updateImg = async (req, res, next) => {
    try {
        const { code } = req.params
        const { Image } = req.body
        const product = await Product.find({ Code: code })
        product[0].Image = Image
        await product[0].save();
        res.status(200).json({
            status: 'success',
            product
        })
    } catch (error) {
        res.json(error)
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        await Product.findByIdAndUpdate({ _id: id }, { ...req.body }, { new: true, runValidators: true });
        res.status(200).json({
            status: 'success',
            id
        })
    } catch (error) {
        res.json(error)
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const { code } = req.params
        await Product.deleteOne({ Code: code })
        const tmp = await Store.find({ _id: "64cc3f33dcdd79205bf59848" })
        delete tmp[0].ProductCode[code]
        await Store.findOneAndReplace({ _id: "64cc3f33dcdd79205bf59848" }, {
            ProductCode: tmp[0].ProductCode
        })
        res.status(200).json({
            status: 'success'
        })
    } catch (error) {
        res.json(error)
    }
}

exports.addQuantity = async (req, res, next) => {
    try {
        const tmp = await Store.find({ _id: "64cc3f33dcdd79205bf59848" })
        tmp[0].ProductCode[req.body.Code] = req.body.Quantity
        await Store.findOneAndReplace({ _id: "64cc3f33dcdd79205bf59848" }, {
            ProductCode: tmp[0].ProductCode
        })
        res.status(200).json({
            status: 'success'
        })
    } catch (error) {
        res.json(error)
    }
}

exports.updateQuantity = async (req, res, next) => {
    try {
        const tmp = await Store.find({ _id: "64cc3f33dcdd79205bf59848" })
        tmp[0].ProductCode[req.body.Code] = req.body.Quantity
        await Store.findOneAndReplace({ _id: "64cc3f33dcdd79205bf59848" }, {
            ProductCode: tmp[0].ProductCode
        })
        res.status(200).json({
            status: 'success'
        })
    } catch (error) {
        res.json(error)
    }
}

exports.password = async (req, res, next) => {
    try {
        const { Username } = req
        const employee = await Employee.find({ Email: Username })
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

        const employee = await Employee.find({ Email: Username })

        res.status(200).json({
            status: 'success',
            data: {
                employee,
                Role,
            }
        })
    } catch (error) {
        res.json(error)
    }
}

exports.editStatus = async (req, res, next) => {
    try {
        const { email } = req.params
        const employee = await Employee.findOne({ Email: email })
        await Employee.findOneAndUpdate({ Email: email }, { Status: !employee.Status }, { new: true, runValidators: true });
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


exports.editProfile = async (req, res, next) => {
    try {
        const { id } = req.params
        await Employee.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true, runValidators: true })
        const hash = await bcrypt.hash(req.body.Password, 10)
        await Customer.findOneAndUpdate({ _id: id }, { Password: hash })

        res.status(200).json({
            status: 'success',
        })
    } catch (error) {
        res.json(error)
    }
}

exports.getAllEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find()

        res.status(200).json({
            status: 'success',
            data: {
                employees
            }
        })
    } catch (error) {
        res.json(error)
    }
}

exports.shipping = async (req, res, next) => {
    getItems("To ship", req, res, next)

}

exports.confirm = async (req, res, next) => {
    getItems("To confirm", req, res, next)
}

exports.bill = async (req, res, next) => {
    getItems("Completed", req, res, next)

}

exports.cancelled = async (req, res, next) => {
    getItems("Cancelled", req, res, next)

}

const getItems = async (Status, req, res, next) => {
    try {
        let result = []
        const items = await Cart.find({ Status: Status })
        for (let item of items) {
            for (let product of item.CartItems) {
                const code = await Product.find({ Code: product.Item })
                const data = {
                    Employee: product.Employee,
                    Username: item.Username,
                    Item: code[0],
                    OrderDate: product.OrderDate,
                    AcceptDate: product.AcceptDate,
                    Date: product.Date,
                    CancelledDate: product.CancelledDate,
                    Address: product.Address,
                    Rating: product.Rating
                }
                result = [...result, data]
            }
        }
        let carts = []
        for (let i = 0; i < result.length; i++) {
            const counts = {};
            for (const order of result) {
                if (order.Employee === result[i].Employee && order.OrderDate === result[i].OrderDate) {
                    counts[order.Item.Code] = counts[order.Item.Code] ? counts[order.Item.Code] + 1 : 1;
                }
            }
            const index = result.findIndex(obj => obj.Item.Code === result[i].Item.Code && obj.Employee === result[i].Employee && obj.OrderDate === result[i].OrderDate)
            if (index === i) {
                const data = {
                    Employee: result[i].Employee,
                    Address: result[i].Address,
                    Username: result[i].Username,
                    Item: result[i].Item,
                    OrderDate: result[i].OrderDate,
                    AcceptDate: result[i].AcceptDate,
                    Date: result[i].Date,
                    CancelledDate: result[i].CancelledDate,
                    Count: counts[result[i].Item.Code],
                    Rating: result[i].Rating
                }
                carts = [...carts, data]
            }
        }

        res.status(200).json({
            status: "success",
            data: {
                result,
                carts,
                Status
            }
        })
    }
    catch (err) {
        res.json(err)
    }
}

exports.accept = async (req, res, next) => {
    try {
        const { Username } = req
        const { User, itemID, OrderDate, Address } = req.body
        const date = new Date();
        const employee = await Employee.find({ Email: Username })
        const name = employee[0].FirstName + " " + employee[0].LastName
        await Cart.updateOne({ $and: [{ Username: User }, { Status: "To ship" }] }, {
            $push: {
                CartItems: {
                    Employee: name,
                    Item: itemID,
                    OrderDate: OrderDate,
                    AcceptDate: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
                    Date: "",
                    CancelledDate: "",
                    Address: Address,
                    Rating: []
                },
            }
        })
        const tmp = await Store.find({ _id: "64cc3f33dcdd79205bf59848" })
        let sum = parseInt(tmp[0].ProductCode[itemID]) - 1;
        let result = sum.toString();
        tmp[0].ProductCode[itemID] = result
        await Store.findOneAndReplace({ _id: "64cc3f33dcdd79205bf59848" }, {
            ProductCode: tmp[0].ProductCode
        })
        await Cart.updateOne({ $and: [{ Username: User }, { Status: "To confirm" }] }, {
            $pull: {
                CartItems: {
                    Item: itemID,
                },
            },
        })
        res.status(200).json({
            status: "success",
        })
    }
    catch (err) {
        res.json(err)
    }
}


exports.success = async (req, res, next) => {
    try {
        const { Username } = req
        const { User, itemID, OrderDate, AcceptDate, Address, check } = req.body
        const date = new Date();
        const employee = await Employee.find({ Email: Username })
        const name = check ? "" : employee[0].FirstName + " " + employee[0].LastName
        await Cart.updateOne({ $and: [{ Username: User }, { Status: "Completed" }] }, {
            $push: {
                CartItems: {
                    Employee: name,
                    Item: itemID,
                    OrderDate: OrderDate,
                    AcceptDate: AcceptDate,
                    Date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
                    CancelledDate: "",
                    Address: Address,
                    Rating: []
                },
            }
        })

        await Cart.updateOne({ $and: [{ Username: User }, { Status: "To ship" }] }, {
            $pull: {
                CartItems: {
                    Item: itemID,
                },
            },
        })
        res.status(200).json({
            status: "success"
        })
    }
    catch (err) {
        res.json(err)
    }
}

exports.fail = async (req, res, next) => {
    try {
        const { Username } = req
        const { User, itemID, OrderDate, AcceptDate, Address } = req.body
        const date = new Date();
        const employee = await Employee.find({ Email: Username })
        const name = employee[0].FirstName + " " + employee[0].LastName
        await Cart.updateOne({ $and: [{ Username: User }, { Status: "Cancelled" }] }, {
            $push: {
                CartItems: {
                    Employee: name,
                    Item: itemID,
                    OrderDate: OrderDate,
                    AcceptDate: AcceptDate,
                    Date: "",
                    CancelledDate: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
                    Address: Address
                },
            }
        })
        const tmp = await Store.find({ _id: "64cc3f33dcdd79205bf59848" })
        let sum = parseInt(tmp[0].ProductCode[itemID]) + 1;
        let result = sum.toString();
        tmp[0].ProductCode[itemID] = result
        await Store.findOneAndReplace({ _id: "64cc3f33dcdd79205bf59848" }, {
            ProductCode: tmp[0].ProductCode
        })
        await Cart.updateOne({ $and: [{ Username: User }, { Status: "To ship" }] }, {
            $pull: {
                CartItems: {
                    Item: itemID,
                },
            },
        })
        res.status(200).json({
            status: "success"
        })
    }
    catch (err) {
        res.json(err)
    }
}


exports.getAllCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.find()

        res.status(200).json({
            status: 'success',
            data: {
                customers
            }
        })
    } catch (error) {
        res.json(error)
    }
}