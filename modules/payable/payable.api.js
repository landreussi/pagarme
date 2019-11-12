const express = require('express')
const router = express.Router()
const { asyncHandler } = require('../../utils/errors')
const service = require('./payable.service')

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const [ paids, waitingFunds ] = await Promise.all([
            service.getPayables({ status: 'paid' }),
            service.getPayables({ status: 'waiting_funds' })
        ])

        const sumValues = (previous, payable) => previous + Number(payable.value)

        const total = {
            paids: paids.reduce(sumValues, 0),
            waitingFunds: waitingFunds.reduce(sumValues, 0)
        }

        res.json({
            paids: {
                total: total.paids,
                list: paids
            },
            waitingFunds: {
                total: total.waitingFunds,
                list: waitingFunds
            }
        })
    })
)

module.exports = router