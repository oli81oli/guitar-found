const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        default: 'Anonimo'
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        validate: {
            validator: function (val) {
                let email = new RegExp("[a-zA-Z0-9_.-]+@+[a-zA-Z0-9_.-]+.com+")
                return email.test(val);
            },
            message: ` is not a valid email!`
        },
    },
    favGuitars: [{
        type: Schema.Types.ObjectId,
        ref: 'Guitar'
    }],

    createdGuitars: [{
        type: Schema.Types.ObjectId,
        ref: 'Guitar'
    }],
    phone: Number
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User