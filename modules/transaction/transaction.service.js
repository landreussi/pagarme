const invariant = require('invariant')
const { database } = require('../../config') 
const { withPagination } = require('../../utils')
const { transaction: Transaction } = database.models

const addTransaction = async transaction => {
    invariant(transaction, 'Transaction data is required')
    return await Transaction.create(transaction)
}

const getTransactions = (where, pagination = {}) => 
    Transaction.findAndCountAll(
        withPagination(
            {
                where,
                order: [['createdAt', 'DESC']]
            },
            pagination
        )
    )

module.exports = {
    addTransaction,
    getTransactions
}