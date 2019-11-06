const Sequelize = require('sequelize')

module.exports = {
    name: 'payable',
    entity: {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        transactionId: {
            type: Sequelize.UUID,
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
