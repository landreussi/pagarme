const express = require('express')
const invariant = require('invariant')
const router = express.Router()
const { asyncHandler } = require('../../utils/errors')
const service = require('./transaction.service')

router.get(
    '/',
    asyncHandler(async (req, res) => {
        res.json('hey')
    })
)

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { value, description, method, cardNumber, cardName, expirationDate, cvv } = req.body

        const CARD_NUMBER_LENGTH = 16
        const CVV_LENGTH = 3

        invariant(value, 'Value is required')
        invariant(description, 'Description is required')
        invariant(method, 'Method is required')
        invariant(cardName, 'Card Name is required')
        invariant(expirationDate, 'Expiration Date is required')
        invariant(cardNumber.length === CARD_NUMBER_LENGTH, 'Card Number is incorrect')
        invariant(cvv.length === CVV_LENGTH, 'Verification Code is incorrect')

        const transaction = {
            value,
            description,
            method,
            cardName,
            expirationDate,
            cardNumber: cardNumber.substring(cardNumber.length - 4).parseInt(),
            cvv: cvv.parseInt()
        }

        const createdTransaction = await service.addTransaction(transaction)
        res.json(createdTransaction)
    })
)

module.exports = router