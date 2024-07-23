const mongoose = require('mongoose')
const config = require('../utils/config')


const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

console.log('connecting to', config.mongoUrl)

mongoose.connect(config.mongoUrl)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

module.exports = mongoose.model('Blog', blogSchema)