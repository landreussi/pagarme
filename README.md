# Teste técnico Pagar.me

## Testes:

- Rode uma instância do PostgreSQL localmente
- Insira os dados da instância no arquivo ```.env.test```
- Instale as dependencias usando ```npm i``` ou ```yarn```
- Para executar a API use ```npm run dev```
- Para rodar testes automatizados use ```npm t```
- O relatório de cobertura de código estará na pasta ```coverage```


## Produção: 

 - Construa um container usando ```docker build -t pagarme:latest . ```
 - Rode os containeres do banco e da API simultaneamente usando ```docker-compose up```

 ## Endpoints:

**Cria transação**
----
  Cria a transação e o pagável para a mesma.

* **URL**

  /transaction

* **Método:**

  `POST`
  

* **Parâmetros**

  Valor, Descrição, Método, Nome do cliente, Data de expiração do cartão, Número do cartão, Código de verificação (CVV)

* **Resposta sucesso:**

  * **Código:** 200 <br />
    **Conteúdo:** `{ createdPayment: { ...paymentData }, createdTransaction: { ...transactionData }}`
 
* **Resposta erro:**

  * **Código:** 500 INTERNAL ERROR <br />
    **Conteúdo:** `{ error : "<something> is required'" }`

* **Exemplo de chamada:**

  ```bash
    curl -d '{"value": 100.00, "description": "Teste Pagarme", "method": "credit_card", "cardName": "LUCAS ANDREUSSI", "expirationDate": "04/2020", "cardNumber": "1234123412341234", "cvv":"686"}' -H "Content-Type: application/json" -X POST http://localhost:3000/transaction
    ```

**Lista transação**
----
  Lista todas as transações feitas pela API.

* **URL**

  /transaction

* **Método:**

  `GET`
  

* **Parâmetros**

  Nenhum

* **Resposta sucesso:**

  * **Código:** 200 <br />
    **Conteúdo:** `{ count: <number>, rows: [...list]}`
 
* **Resposta erro:**

  * **Código:** 500 INTERNAL ERROR <br />


* **Exemplo de chamada:**

  ```bash
    curl localhost:3000/transaction
  ```

**Lista pagáveis**
----
  Lista todas todos os pagáveis feitos pela API, incluindo um valor total para cada status: ```paid``` e ```waiting_funds```.

* **URL**

  /payable

* **Método:**

  `GET`
  

* **Parâmetros**

  Nenhum

* **Resposta sucesso:**

  * **Código:** 200 <br />
    **Conteúdo:** `{ paids: { total: <number>, list: [...paidList]}, waitingFunds: { total: <number>, list: [...waitingFundsList]}`
 
* **Resposta erro:**

  * **Código:** 500 INTERNAL ERROR <br />


* **Exemplo de chamada:**

  ```bash
    curl localhost:3000/payable
  ```