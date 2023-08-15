const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const customerSchema = new mongoose.Schema({
    Username: { type: String, unique: true, trim: true, required: [true, 'User name must be required'] },
    Password: { type: String, trim: true, required: [true, 'Password must be required'], minlength: [6, 'Password must be at least 6 characters'], maxlength: 30 },
    ID: { type: Number, trim: true, required: [true, 'ID must be required'] },
    FirstName: { type: String, trim: true, required: [true, 'First name must be required'] },
    LastName: { type: String, trim: true, required: [true, 'Last name must be required'] },
    DateOfBirth: { type: String, trim: true, required: [true, 'Date of birth must be required'] },
    Phone: { type: String, trim: true, required: [true, 'Phone number must be required'] },
    Email: { type: String, unique: true, trim: true, required: [true, 'Email must be required'] },
}, { timestamps: true })

customerSchema.pre('validate', function (next) {
    let customer = this
    if (customer.Password.length > 30) {
        next()
    }
    else {
        customerSchema.pre('save', function (next) {
            bcrypt.hash(customer.Password, 10, function (error, hash) {
                if (error) {
                    return next(error)
                } else {
                    customer.Password = hash
                    next()
                }
            })
        })
    }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer