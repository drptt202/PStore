const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const employeeSchema = new mongoose.Schema({
    Email: { type: String, unique: true, trim: true, required: [true, 'Email must be required'] },
    Password: { type: String, trim: true, required: [true, 'Password must be required'], minlength: [6, 'Password must be at least 6 characters'] },
    FirstName: { type: String, trim: true, required: [true, 'First name must be required'] },
    LastName: { type: String, trim: true, required: [true, 'Last name must be required'] },
    DateOfBirth: { type: String, trim: true, required: [true, 'Date of birth must be required'] },
    Phone: { type: String, trim: true, required: [true, 'Phone number must be required'] },
    Role: String,
    Status: Boolean
}, { timestamps: true })

employeeSchema.pre('save', function (next) {
    let employee = this
    bcrypt.hash(employee.Password, 10, function (error, hash) {
        if (error) {
            return next(error)
        } else {
            employee.Password = hash
            next()
        }
    })
})
const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee