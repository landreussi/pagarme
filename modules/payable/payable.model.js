const Sequelize = require('sequelize')
const { database } = require('../../config')

module.exports = {
    name: 'payable',
    entity: {
        id: database.pk,
        transactionId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM(['paid', 'waiting_funds']),
            allowNull: false
        },
        paymentDate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        value: {
            type: Sequelize.DECIMAL(18, 2),
            allowNull: false
        },

    },
    relations: models => {
        const { transaction, payable } = models
        payable.belongsTo(transaction)
    }
}
