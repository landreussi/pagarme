const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotEnv = require('dotenv-safe')
const app = express()

const config = require('./config')

dotEnv.config()

app.use(
    morgan(
        ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
    )
)

app.use(cors())
app.use(express.json())
app.set('connection',
    config.database.setup().then(() => {
        console.log('done')
    })
);

