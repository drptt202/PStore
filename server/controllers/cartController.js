const Cart = require('../models/Cart')
const Product = require('../models/Product')

const getItems = async (Username, Status, req, res, next) => {
    try {
        let result = []
        const tmp = await Cart.find({ $and: [{ Username: Username }, { Status: Status }] })
        for (let item of tmp[0].CartItems) {
            const code = await Product.find({ Code: item.Item })
            const data = {
                Item: code[0],
                OrderDate: item.OrderDate,
                AcceptDate: item.AcceptDate,
                Date: item.Date,
                CancelledDate: item.CancelledDate,
                Address: item.Address,
                Rating: item.Rating
            }
            result = [...result, data]
        }

        let carts = result.filter((item, index) => {
            return result.findIndex(obj => obj.Item.Code === item.Item.Code) === index;
        });

        let count = result.reduce((acc, val) => {
            acc[val.Item.Code] = (acc[val.Item.Code] || 0) + 1;
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
                CartItems: {
                    Item: req.params.itemID,
                },
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
                CartItems: {
                    Item: req.params.itemID,
                    OrderDate: "",
                    AcceptDate: "",
                    Date: "",
                    CancelledDate: ""
                },
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

exports.decreaseItem = async (req, res, next) => {
    try {
        const { Username } = req
        const arr = await Cart.find({ $and: [{ Username: Username }, { Status: "Shopping Cart" }] }, { CartItems: 1 })
        const temp = arr[0].CartItems
        let index = temp.findIndex(obj => obj.Item === req.params.itemID);
        if (index !== -1) {
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

exports.checkOut = async function (req, res, next) {
    try {
        const { Username } = req
        const date = new Date();
        const { Address } = req.body

        await Cart.updateOne({ $and: [{ Username: Username }, { Status: "To confirm" }] }, {
            $push: {
                CartItems: {
                    Item: req.params.itemID,
                    OrderDate: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
                    AcceptDate: "",
                    Date: "",
                    CancelledDate: "",
                    Address,
                    Rating: []
                },
            }
        })

        await Cart.findOneAndUpdate({ $and: [{ Username: Username }, { Status: "Shopping Cart" }] }, {
            CartItems: []
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
        const date = new Date();
        const { OrderDate, Address } = req.body

        await Cart.updateOne({ $and: [{ Username: Username }, { Status: "Cancelled" }] }, {
            $push: {
                CartItems: {
                    Item: req.params.itemID,
                    OrderDate: OrderDate,
                    AcceptDate: "",
                    Date: "",
                    CancelledDate: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
                    Address: Address,
                    Rating: []
                },
            }
        })
        await Cart.updateOne({ $and: [{ Username: Username }, { Status: "To confirm" }] }, {
            $pull: {
                CartItems: {
                    Item: req.params.itemID,
                },
            },
        })
        res.status(200).json({
            status: "success",
            data: {
                Status: "Cancelled",
            }
        })
    }
    catch (err) {
        res.json(err)
    }
}

exports.comment = async function (req, res, next) {
    try {

        const { Username } = req
        const { Point, Title, Employee, Item, OrderDate, AcceptDate, Date, Address } = req.body
        let data = {
            "Point": Point,
            "Title": Title
        }

        const carts = await Cart.findOne({ $and: [{ Username: Username }, { Status: "Completed" }] })
        const result = carts.CartItems
        for (let index = 0; index < result.length; index++) {
            if (result[index].Employee === Employee,
                result[index].Item === Item,
                result[index].OrderDate === OrderDate,
                result[index].AcceptDate === AcceptDate,
                result[index].Date === Date,
                result[index].Address === Address
            ) {
                await Cart.updateOne({ $and: [{ Username: Username }, { Status: "Completed" }] },
                    {
                        $push: {
                            [`CartItems.${index}.Rating`]: data
                        }
                    })

            }
        }
        res.status(200).json({
            status: "success",
            data: {
                string
            }

        })

    }
    catch (err) {
        res.json(err)
    }
}