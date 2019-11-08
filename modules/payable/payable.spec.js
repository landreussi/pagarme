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
                
                expect(payables.paids).toBeTruthy()
                expect(payables.waitingFunds).toBeTruthy()
                expect(typeof payables.paids.total).toBe('number')
                expect(typeof payables.waitingFunds.total).toBe('number')
                expect(Array.isArray(payables.paids.list)).toBeTruthy()
                expect(Array.isArray(payables.waitingFunds.list)).toBeTruthy()
            })
    )
})