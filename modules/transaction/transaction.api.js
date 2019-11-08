const express = require('express')
const invariant = require('invariant')
const router = express.Router()
const { asyncHandler } = require('../../utils/errors')
const service = require('./transaction.service')
const payableService = require('../payable/payable.service')
const { toISODate } = require('../../utils')

router.get(
    '/',
    asyncHandler(async (req, res) => {
        res.json(await service.getTransactions())
    })
)

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { value, description, method, cardNumber, cardName, expirationDate, cvv } = req.body

        const CARD_NUMBER_LENGTH = 16
        const CVV_LENGTH = 3
        const DAYS_IN_MONTH = 30

        invariant(value, 'Value is required')
        invariant(description, 'Description is required')
        invariant(method, 'Method is required')
        invariant(cardName, 'Card Name is required')
        invariant(expirationDate, 'Expiration Date is required')
        invariant(cardNumber.length === CARD_NUMBER_LENGTH, 'Card Number is incorrect')
        invariant(cvv.length === CVV_LENGTH, 'Verification Code is incorrect')

        const month = expirationDate.slice(0, 2)
        const year = expirationDate.slice(-4)

        const expirationDateObject = new Date(year, month)

        const transaction = {
            value,
            description,
            method,
            cardName,
            expirationDate: toISODate(expirationDateObject),
            cardNumber: Number(cardNumber.slice(-4)),
            cvv: Number(cvv)
        }

        const createdTransaction = await service.addTransaction(transaction)
        let createdPayable
        if (createdTransaction) {
            const now = new Date()
            const nextMonth = new Date()
            nextMonth.setDate(now.getDate() + DAYS_IN_MONTH)

            const methodData = {
                credit_card: {
                    status: 'waiting_funds',
                    paymentDate: toISODate(nextMonth),
                    value: value - (value * 0.05)
                },
                debit_card: {
                    status: 'paid',
                    paymentDate: toISODate(now),
                    value: value - (value * 0.03)
                }
            }

            const payable = {
                transactionId: createdTransaction.id,
                ...methodData[method]
            }

            createdPayable = await payableService.addPayable(payable)
        }
        res.json({
            createdTransaction,
            createdPayable
        })
    })
)

module.exports = router