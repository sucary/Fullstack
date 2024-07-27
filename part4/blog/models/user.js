const mongoose = require('mongoose')

// This validation applies to both username and password
const validate = (number) => {
    return number.length >= 3
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validate,
            message: props => `${props.value} is not a valid username`
        }
    },
    name: String,
    passwordHash: {
        type: String,
        validate: {
            validator: validate,
            message: props => `${props.value} is not a valid password`
        }
    }
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User