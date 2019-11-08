const invariant = require('invariant')
const { database } = require('../../config') 
const { transaction: Transaction } = database.models

const addTransaction = async transaction => {
    invariant(transaction, 'Transaction data is required')
    return await Transaction.create(transaction)
}

module.exports = {
    addTransaction
}