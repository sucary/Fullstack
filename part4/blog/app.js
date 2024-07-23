const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
// const middleware = require('./utils/middleware')
app.use(express.json())

mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.mongoUrl)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch(error => {
        logger.info('error connecting to MongoDB:', error.message)
    })

const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)


app.use(cors())
app.use(express.static('dist'))
app.use('/api/blogs', notesRouter)

module.exports = app