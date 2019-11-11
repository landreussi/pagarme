const { toISODate } = require('./index')

describe('Test Utils', () => {
    test('ISODate function is working properly', () => {
        const fakeDate = new Date(1970, 3, 2)
        expect(toISODate(fakeDate)).toBe('1970-04-02')
    })
})