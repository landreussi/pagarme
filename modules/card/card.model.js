const Sequelize = require('sequelize')

module.exports = {
    name: 'card',
    entity: {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        number: {
            type: Sequelize.SMALLINT,
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
            type: Sequelize.SMALLINT,
            allowNull: false
        }
    },
    relations: () => {
        
    }
}
