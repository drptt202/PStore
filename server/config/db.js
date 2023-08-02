
// To connect with your mongoDB database
const mongoose = require("mongoose");
const uri = process.env.DB_URI
const dbName = process.env.DB_NAME
// Connecting to database
module.exports = {
    connectDB: () => {
        try {
            mongoose.connect(
                uri,
                {
                    dbName: dbName,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                })
            console.log(`Connected to ${dbName} database`)
        }
        catch {
            (err) =>
                console.log(err)
        }
    }
}
