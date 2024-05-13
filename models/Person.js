const mongoose = require('mongoose');

// Define the Person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        unique: true // Assuming email is a string
        // Add any additional validations for email if needed
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    }
});

const Person = mongoose.model('Person', personSchema);
module.exports = Person;
