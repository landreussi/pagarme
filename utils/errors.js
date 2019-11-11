const asyncHandler = fn => (req, res, next) => fn(req, res, next).catch(next)

const errorHandler = (err, req, res) => {
    console.error(err)
    res.status(500).json({ error: err.message })
}

module.exports = {
    asyncHandler,
    errorHandler
}
