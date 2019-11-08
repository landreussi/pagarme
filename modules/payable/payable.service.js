const invariant = require('invariant')
const { database } = require('../../config')
const { payable: Payable } = database.models

const addPayable = async payable => {
    invariant(payable, 'Payable data is required')
    return await Payable.create(payable)
}

module.exports = {
    addPayable
}