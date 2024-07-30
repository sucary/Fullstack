const app = require('./app')
const config = require('./utils/config')
const cors = require('cors')


const logger = require('./utils/logger')

app.use(cors())

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})