const Sequelize = require('sequelize')

const { DB_NAME, 
        DB_USERNAME, 
        DB_PASSWORD, 
        DB_HOST } = process.env

const sequelize = new Sequelize({
    username: DB_USERNAME, 
    database: DB_NAME, 
    password: DB_PASSWORD,
    host: DB_HOST,
    dialect: 'postgres'
})

const setup = async () => {
    try {
        await sequelize.authenticate()
        console.log('DB connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the DB:', error.message)
        throw error
    }
}

module.exports = {
    sequelize,
    setup,
};
