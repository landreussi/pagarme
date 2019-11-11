const request = require('supertest')
const { toISODate, getExpressApp } = require('../../utils')

describe('Test Transactions', () => {
    let app

    beforeAll(async () => app = await getExpressApp())

    const fakeTransaction = {
        value: 100,
        description: 'Teste Pagarme',
        cardName: 'LUCAS ANDREUSSI',
        expirationDate: '04/2020',
        cardNumber: '1234123412341234',
        cvv: '686'
    }

    test('create transaction with debit_card', () =>
        request(app)
            .post('/transaction')
            .send({ 
                ...fakeTransaction,
                method: 'debit_card'
             })
            .expect(200)
            .then(response => {
                const transaction = JSON.parse(response.text)
                expect(transaction.createdTransaction.cardNumber).toBe(1234)
                expect(transaction.createdPayable.value).toBe('97.00')
                expect(transaction.createdPayable.paymentDate).toBe(toISODate(new Date))

            })
            .catch(error => expect(error).not.toBeDefined())
    )
    test('create transaction with credit_card', () => 
        request(app)
            .post('/transaction')
            .send({
                ...fakeTransaction,
                method: 'credit_card'
            })
            .expect(200)
            .then(response => {
                const transaction = JSON.parse(response.text)
                const nextMonth = new Date()
                nextMonth.setDate(nextMonth.getDate() + 30)
                expect(transaction.createdTransaction.cardNumber).toBe(1234)
                expect(transaction.createdPayable.value).toBe('95.00')
                expect(transaction.createdPayable.paymentDate).toBe(toISODate(nextMonth))

            })
            .catch(error => expect(error).not.toBeDefined())
    )
    test('get transactions is returning correct content', () => 
        request(app)
            .get('/transaction')
            .expect(200)
            .then(response => {
                const transaction = JSON.parse(response.text)

                expect(typeof transaction.count).toBe('number')
                expect(Array.isArray(transaction.rows)).toBeTruthy()
            })
            .catch(error => expect(error).not.toBeDefined())
    )
})