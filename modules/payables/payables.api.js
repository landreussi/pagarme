const express = require('express')
const router = express.Router()
const { asyncHandler } = require('../../utils/errors')
// const service = require('./payables.service')

router.get(
    '/',
    asyncHandler(async (req, res) => {
        res.json('hey');
    })
);