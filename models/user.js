
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    user_name: {
        type: String,
        required: [true, 'Please provide a valid username']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a valid password'],
        minlength: 8
    },
    password_confirm: {
        type: String, 
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(el) {
                return el === this.password
            },
            message: "Passwords are not the same"
        }
    }
}, { timestamps: true })

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)

    this.password_confirm = undefined

    next()
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel