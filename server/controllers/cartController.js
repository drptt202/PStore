const Cart = require('../models/Cart')
const Product = require('../models/Product')

const getItems = async (Username, Status, req, res, next) => {
    try {
        let result = []
        const tmp = await Cart.find({ $and: [{ Username: Username }, { Status: Status }] })
        for (let item of tmp[0].CartItems) {
            const tmp3 = await Product.find({ Code: item })
            result = [...result, tmp3[0]]
        }

        let carts = result.filter((item, index) => {
            return result.findIndex(obj => obj.Code === item.Code) === index;
        });

        let count = result.reduce((acc, val) => {
            acc[val.Code] = (acc[val.Code] || 0) + 1;
            return acc;
        }, {});

        res.status(200).json({
            status: "success",
            data: {
                result,
                carts,
                count,
                Status
            }
        })
    }
    catch (err) {
        res.json(err)
    }
}

exports.getAllCartItems = (req, res, next) => {
    const { Username } = req

    getItems(Username, "Shopping Cart", req, res, next)
}

exports.deleteItemInCart = async (req, res, next) => {
    try {
        const { Username } = req

        await Cart.updateOne({ $and: [{ Username: Username }, { Status: "Shopping Cart" }] }, {
            $pull: {
                CartItems: req.params.itemID,
            },
        })
        const carts = await Cart.find({ $and: [{ Username: Username }, { Status: "Shopping Cart" }] })
        res.status(200).json({
            status: "success",
            data: {
                carts,
                Status: "Shopping Cart"
            }
        })
    }
    catch (err) {
        res.json(err)
    }
}

exports.addItemToCart = async (req, res, next) => {
    try {
        const { Username } = req

        await Cart.updateOne({ $and: [{ Username: Username }, { Status: "Shopping Cart" }] }, {
            $push: {
                CartItems: req.params.itemID,
            },
        })
        const carts = await Cart.find({ $and: [{ Username: Username }, { Status: "Shopping Cart" }] })
        res.status(200).json({
            status: "success",
            data: {
                carts,
                Status: "Shopping Cart"
            }
        })
    }
    catch (err) {
        res.json(err)
    }
}

exports.checkOut = async function (req, res, next) {
    try {
        const { Username } = req

        await Cart.updateOne({ $and: [{ Username: Username }, { Status: "To confirm" }] }, {
            $push: {
                CartItems: req.params.itemID,
            },
        })
        await Cart.updateOne({ $and: [{ Username: Username }, { Status: "Shopping Cart" }] }, {
            $pull: {
                CartItems: req.params.itemID,
            },
        })
        const carts = await Cart.find({ $and: [{ Username: Username }, { Status: "To confirm" }] })
        res.status(200).json({
            status: "success",
            data: {
                carts,
                Status: "To confirm"
            }
        })
    }
    catch (err) {
        res.json(err)
    }
}

exports.delivery = async function (req, res, next) {
    try {
        const { Username } = req

        await Cart.updateOne({ $and: [{ Username: Username }, { Status: "To Ship" }] }, {
            $push: {
                CartItems: req.params.itemID,
            },
        })
        await Cart.updateOne({ $and: [{ Username: Username }, { Status: "To confirm" }] }, {
            $pull: {
                CartItems: req.params.itemID,
            },
        })
        const carts = await Cart.find({ $and: [{ Username: Username }, { Status: "To Ship" }] })
        res.status(200).json({
            status: "success",
            data: {
                carts,
                Status: "To Ship"
            }
        })
    }
    catch (err) {
        res.json(err)
    }
}


exports.getAllType1 = async function (req, res, next) {
    const { Username } = req

    getItems(Username, "To confirm", req, res, next)
}

exports.getAllType2 = async function (req, res, next) {
    const { Username } = req

    getItems(Username, "To ship", req, res, next)
}

exports.getAllType3 = async function (req, res, next) {
    const { Username } = req

    getItems(Username, "Completed", req, res, next)
}

exports.getAllType4 = async function (req, res, next) {
    const { Username } = req

    getItems(Username, "Cancelled", req, res, next)
}

exports.cancelOrder = async function (req, res, next) {
    try {
        const { Username } = req

        await Cart.updateOne({ $and: [{ Username: Username }, { Status: "Cancelled" }] }, {
            $push: {
                CartItems: req.params.itemID,
            },
        })
        await Cart.updateOne({ $and: [{ Username: Username }, { Status: "To confirm" }] }, {
            $pull: {
                CartItems: req.params.itemID,
            },
        })
        const carts = await Cart.find({ $and: [{ Username: Username }, { Status: "Cancelled" }] })
        res.status(200).json({
            status: "success",
            data: {
                carts,
                Status: "Cancelled"
            }
        })
    }
    catch (err) {
        res.json(err)
    }
}

exports.decreaseItem = async (req, res, next) => {
    try {
        const { Username } = req
        const arr = await Cart.find({ $and: [{ Username: Username }, { Status: "Shopping Cart" }] }, { CartItems: 1 })
        const temp = arr[0].CartItems
        const index = temp.indexOf(req.params.itemID)
        if (index > -1) {
            temp.splice(index, 1);
        }

        await Cart.findOneAndUpdate({ $and: [{ Username: Username }, { Status: "Shopping Cart" }] }, {
            CartItems: temp
        })
        const carts = await Cart.find({ $and: [{ Username: Username }, { Status: "Shopping Cart" }] })
        res.status(200).json({
            status: "success",
            data: {
                carts
            }
        })
    }
    catch (err) {
        res.json(err)
    }
}