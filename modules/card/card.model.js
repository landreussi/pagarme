const Sequelize = require('sequelize')

module.exports = {
    name: 'card',
    entity: {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        number: {
            type: Sequelize.NUMBER(4),
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        expirationDate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        cvv: {
            type: Sequelize.NUMBER(3),
            allowNull: false
        }
    },
    relations: () => {

    }
}
