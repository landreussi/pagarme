(async () => {
    const getExpressApp = require('./utils/app')
    const app = await getExpressApp()

    app.listen(process.env.HTTP_PORT)
})()

