const request = require('supertest')
const getExpressApp = require('../../utils/app')
const { toISODate } = require('../../utils')

describe('Test Transactions', () => {
    let app

    beforeAll(async () => app = await getExpressApp())

    test('create transaction with debit_card', () =>
        request(app)
            .post('/transaction')
            .send({ 
                value: 100.00, 
                description: 'Teste Pagarme', 
                method: 'debit_card', 
                cardName: 'LUCAS ANDREUSSI', 
                expirationDate: '04/2020', 
                cardNumber: '12341234123412324', 
                cvv: '686'
             })
            .expect(200)
            .then(response => {
                const transaction = JSON.parse(response.text)
                expect(transaction.createdTransaction.cardNumber).toBe('1234')
                expect(transaction.createdPayable.value).toBe(97.00)
                expect(transaction.createdPayable.paymentDate).toBe(toISODate(new Date))

            })
    )
})