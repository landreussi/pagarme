const request = require('supertest')
const getExpressApp = require('../../utils/app')

describe('Test Payables', () => {
    let app

    beforeAll(async () => app = await getExpressApp())

    test('get payables is returning correct content', () => 
        request(app)
            .get('/payable')
            .expect(200)
            .then(response => {
                const payables = JSON.parse(response.text)
                const statuses = [ 'paids', 'waitingFunds' ]
                
                for (const index in statuses) {
                    expect(payables[statuses[index]]).toBeTruthy()
                    expect(typeof payables[statuses[index]].total).toBe('number')
                    expect(Array.isArray(payables[statuses[index]].list)).toBeTruthy()
                }
            })
            .catch(error => expect(error).not.toBeDefined())
    )
})