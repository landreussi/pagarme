const Sequelize = require('sequelize')

module.exports = {
    name: 'transaction',
    entity: {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        value: {
            type: Sequelize.DECIMAL(18, 2),
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        method: {
            type: Sequelize.ENUM(['debit_card', 'credit_card']),
            allowNull: false
        },
        cardNumber: {
            type: Sequelize.SMALLINT,
            allowNull: false
        },
        cardName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        expirationDate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        cvv: {
            type: Sequelize.SMALLINT,
            allowNull: false
        }
    },
    relations: models => {
        const { transaction, payable } = models
        transaction.hasMany(payable)
    }
}