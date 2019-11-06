const path = require('path')

module.exports = {
    rootDir: path.resolve(__dirname, '../'),
    moduleFileExtensions: [
        'js',
        'json'
    ],
    coverageDirectory: '<rootDir>/coverage',
    collectCoverage: false,
    collectCoverageFrom: [
        '**/*.js'
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/'
    ]
}