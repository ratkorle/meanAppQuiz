const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validate = require('mongoose-validator');

// VALIDATORS
const nameValidator = [
    validate({
        validator: 'matches',
        arguments: /^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/,   //Regular Expression for First Name and Last name that must be alphabetic 3-20 characters and space between them.
        message: 'No special characters or numbers allowed. You have to provide first name and last name with space between them!'
    }),
    validate({
        validator: 'isLength',
        arguments: [3, 30],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];
const emailValidator = [
    validate({
        validator: 'isEmail',
        message: 'You have to provide valid e-mail !'
    }),
    validate({
        validator: 'isLength',
        arguments: [3, 35],
        message: 'E-mail should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];
// BASIC USER SCHEMA
const UserSchema = new Schema({
    name: {type: String, required: true, validate: nameValidator},
    email: {type: String, required: true, lowercase: true, unique: true, validate: emailValidator},
    score: {type: String},
    timeSpent: {type: String}
});

module.exports = mongoose.model('User', UserSchema);