const express = require('express')

const router = express.Router()

router.use('/payable', require('./payable').routes)
router.use('/transaction', require('./transaction').routes)

module.exports = router
