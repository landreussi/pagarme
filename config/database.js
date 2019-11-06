const Sequelize = require('sequelize')

const { DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_LOGGING } = process.env

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    dialect: 'mysql',
    logging: DATABASE_LOGGING,
    pool: {
        max: 30,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    timezone: '-03:00',
})

const setup = async () => {
    try {
        await sequelize.authenticate()
        console.log('Database connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error.message)
        throw error
    }
}

module.exports = {
    sequelize,
    setup,
};
