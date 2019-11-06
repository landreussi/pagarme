const express = require('express')

const router = express.Router()

router.use('/payables', require('./payables').routes)
router.use('/transactions', require('./transactions').routes)

module.exports = router
