const mongoose = require('mongoose')


const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        default: 'default.png',
    }
})


module.exports = mongoose.model('Article', articleSchema)