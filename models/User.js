const { Schema, model } = require('mongoose')

const userSchema = Schema({
    username: {
        type: String,
        required: [true, 'The username is required.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, "The password is required."]
    }
})

module.exports = model('writer', userSchema)