
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config()
const app = express()
const { connectDB } = require('./config/db')
const authRoute = require('./routes/authRoute')
const productRoute = require('./routes/productRoute')
const cartRoute = require('./routes/cartRoute')
const adminRoute = require('./routes/adminRoute')
const storeRoute = require('./routes/storeRoute')




connectDB()
app.use(cors())
app.use(express.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

//Mount the routes
app.use('/api/v1/auth/', authRoute)
app.use('/api/v1/product', productRoute)
app.use('/api/v1/cart', cartRoute)
app.use('/api/v1/admin', adminRoute)
app.use('/api/v1/store', storeRoute)



app.get('/', (req, res, next) => {
    res.status(200).json({ status: 'success' })
})

const port = process.env.APP_PORT

app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})