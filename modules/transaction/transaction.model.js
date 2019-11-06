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
        cardId: {
            type: Sequelize.UUID,
            allowNull: false
        }
    },
    relations: () => {

    }
}