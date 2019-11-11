const toISODate = date => date.toISOString().split('T')[0]
const getExpressApp = require('./app')

const withPagination = (options, pagination = {}) => {
    const limit = pagination.limit ? Number(pagination.limit) : 50
    const page = pagination.page && Number(pagination.page)

    return { ...options, limit, offset: limit && page ? limit * page : 0 }
}

module.exports = {
    toISODate, 
    withPagination,
    getExpressApp
}