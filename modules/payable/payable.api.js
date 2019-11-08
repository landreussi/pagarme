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

        const total = {
            paids: paids.reduce((previous, paid) => previous + Number(paid.value), 0),
            waitingFunds: waitingFunds.reduce((previous, waitingFund) => previous + Number(waitingFund.value), 0)
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