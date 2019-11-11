const getExpressApp = async () => {
    const express = require('express')
    const cors = require('cors')
    const morgan = require('morgan')
    const app = express()

    require('dotenv').config({
        path: `.env.${process.env.NODE_ENV}`
    })

    const config = require('../config')
    const errors = require('./errors')

    app.use(
        morgan(
            ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
        )
    )
    
    app.use(cors())
    app.use(express.json())

    await config.database.setup()

    app.use('/', require('../modules'))
    app.use('*', errors.errorHandler)

    return app
}

module.exports = getExpressApp