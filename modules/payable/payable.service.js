const invariant = require('invariant')
const { database } = require('../../config')
const { payable: Payable } = database.models

const addPayable = async payable => {
    invariant(payable, 'Payable data is required')
    return await Payable.create(payable)
}

const getPayables = where => 
    Payable.findAll({
        where
    })

module.exports = {
    addPayable,
    getPayables
}