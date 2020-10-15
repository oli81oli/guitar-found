const mongoose = require('mongoose')
const Schema = mongoose.Schema

const guitarSchema = new Schema({
   
    name: String,
    model: String,
    image: {
        type: String,
        default: 'https://res.cloudinary.com/dpflfpgcj/image/upload/v1602170825/zwfbadfhd2zp8pryso0a.png'
    },
    state: {
        type: String,
        enum: ['nueva', 'casi nueva', 'restaurada', 'mas de 7 años', 'otro'],
        lowercase: true
    },
    price: {
        type: Number,
        min: 1
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})



module.exports = mongoose.model('Guitar', guitarSchema)