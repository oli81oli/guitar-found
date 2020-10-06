const mongoose = require('mongoose')
const Schema = mongoose.Schema

const guitarSchema = new Schema({
    name: String,
    model: String,
    image: {
        type: String,
        default: 'https'
    },
    state: {
        type: String,
        enum: ['nueva', 'casi nueva', 'restaurada', 'mas de 7 años', 'otro'],
        lowercase: false
    },
    price: {
        type: Number,
        min: 1
    },
    owner: {
        type: Schema.Types.ObjectId,
        rel: 'User'
    }
}, {
    timestamps: true
})



module.exports = mongoose.model('Guitar', guitarSchema)