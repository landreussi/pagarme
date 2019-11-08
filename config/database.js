const Sequelize = require('sequelize')
const path = require('path')
const glob = require('glob')

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

const models = {}
const modelPaths = {}

const _setModels = () => {
    glob.sync('./**/**/*.model.js').forEach(modelPath => {
        const model = require(path.resolve(modelPath))
        const sqlModel = sequelize.define(model.name, model.entity, model.options)
        models[model.name] = sqlModel
        modelPaths[model.name] = modelPath
    })
}

const _setRelationships = () => {
    for (const key in modelPaths) {
        const modelPath = modelPaths[key]
        const model = require(path.resolve(modelPath))

        if (model.relations) model.relations(models)
    }
}

const setup = async () => {
    try {
        await sequelize.authenticate()
        console.log('DB connection has been established successfully.')
        _setModels()
        _setRelationships()
        return sequelize.sync()
    } catch (error) {
        console.error('Unable to connect to the DB:', error.message)
        throw error
    }
}

const pk = {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    comment: 'ID'
}

module.exports = {
    sequelize,
    setup,
    models,
    pk
}
