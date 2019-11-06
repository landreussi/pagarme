const boom = require('boom')

const asyncHandler = fn => (req, res, next) => fn(req, res, next).catch(next)

const errorHandler = (err, req, res) => {
    if (boom.isBoom(err)) {
        res.status(err.output.statusCode).json({ error: err.output.payload })
    } else {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    asyncHandler,
    errorHandler
}
