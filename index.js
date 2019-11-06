const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

require('dotenv-safe').config()

const config = require('./config')
const errors = require('./utils/errors')

app.use(
    morgan(
        ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
    )
)

app.use(cors())
app.use(express.json())
app.set('connection',
    config.database.setup().then(() => {
        app.use('/', require('./modules'))
        app.use('*', errors.errorHandler)
    })
)
app.listen(process.env.HTTP_PORT)

